import { slugify } from './format.ts';
import type { PortableTextContent, PTBlock, PTCallout, PTImage } from './types.ts';

export type PTGroup =
  | { kind: 'html'; key: string; html: string }
  | { kind: 'image'; key: string; node: PTImage }
  | { kind: 'callout'; key: string; node: PTCallout };

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderSpans(block: PTBlock): string {
  const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
  return block.children
    .map((span) => {
      let html = escapeHtml(span.text).replace(/\n/g, '<br>');
      for (const mark of span.marks ?? []) {
        if (mark === 'strong') html = `<strong>${html}</strong>`;
        else if (mark === 'em') html = `<em>${html}</em>`;
        else {
          const def = defs.get(mark);
          if (def?._type === 'link' && def.href) {
            const external = /^https?:\/\//.test(def.href);
            const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
            html = `<a href="${escapeHtml(def.href)}"${attrs}>${html}</a>`;
          }
        }
      }
      return html;
    })
    .join('');
}

export function blockText(block: PTBlock): string {
  return block.children.map((span) => span.text).join('');
}

/**
 * Împarte conținutul în grupuri: textul (paragrafe, titluri, liste) devine HTML,
 * iar imaginile și casetele rămân noduri randate de componente Astro.
 */
export function groupPortableText(content: PortableTextContent = []): PTGroup[] {
  const groups: PTGroup[] = [];
  let html: string[] = [];
  let list: { tag: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (!list) return;
    html.push(`<${list.tag}>${list.items.map((item) => `<li>${item}</li>`).join('')}</${list.tag}>`);
    list = null;
  };
  const flushHtml = (key: string) => {
    flushList();
    if (html.length) groups.push({ kind: 'html', key, html: html.join('') });
    html = [];
  };

  for (const node of content) {
    if (node._type === 'block') {
      const inner = renderSpans(node);
      if (node.listItem) {
        const tag = node.listItem === 'number' ? 'ol' : 'ul';
        if (list && list.tag !== tag) flushList();
        list ??= { tag, items: [] };
        list.items.push(inner);
        continue;
      }
      flushList();
      if (!inner.trim()) continue;
      switch (node.style) {
        case 'h2':
          html.push(`<h2 id="${slugify(blockText(node))}">${inner}</h2>`);
          break;
        case 'h3':
          html.push(`<h3>${inner}</h3>`);
          break;
        case 'blockquote':
          html.push(`<blockquote><p>${inner}</p></blockquote>`);
          break;
        default:
          html.push(`<p>${inner}</p>`);
      }
    } else if (node._type === 'image') {
      flushHtml(`${node._key}-before`);
      if (node.url) groups.push({ kind: 'image', key: node._key, node });
    } else if (node._type === 'callout') {
      flushHtml(`${node._key}-before`);
      groups.push({ kind: 'callout', key: node._key, node });
    }
  }
  flushHtml('end');
  return groups;
}

export function toPlainText(content: PortableTextContent = []): string {
  return content
    .map((node) => {
      if (node._type === 'block') return blockText(node);
      if (node._type === 'callout') return node.text;
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}

/** Titlurile de nivel 2, pentru cuprinsul paginii. */
export function headings(content: PortableTextContent = []): { id: string; text: string }[] {
  return content
    .filter((node): node is PTBlock => node._type === 'block' && node.style === 'h2')
    .map((node) => ({ id: slugify(blockText(node)), text: blockText(node) }));
}
