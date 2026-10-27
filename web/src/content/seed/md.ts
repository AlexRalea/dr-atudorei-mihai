import type { PortableTextContent, PTBlock, PTMarkDef, PTSpan } from '../../lib/types.ts';

/**
 * Transformă un Markdown minimal în Portable Text (formatul Sanity), ca textele
 * de pornire să poată fi scrise lizibil aici și importate apoi în CMS.
 *
 * Suportă: paragrafe, `## ` / `### `, liste `- ` și `1. `, `> ` (casetă de evidențiere),
 * **bold**, *italic* și [link](/adresa/).
 */
export function md(strings: TemplateStringsArray, ...values: unknown[]): PortableTextContent {
  const source = String.raw({ raw: strings }, ...values);
  const lines = dedent(source).split('\n');
  const content: PortableTextContent = [];
  let key = 0;
  const nextKey = () => `k${(key++).toString(36)}`;

  let paragraph: string[] = [];
  const flushParagraph = () => {
    if (paragraph.length) content.push(block(paragraph.join(' '), nextKey));
    paragraph = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      continue;
    }
    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    const bullet = /^-\s+(.*)$/.exec(line);
    const numbered = /^\d+\.\s+(.*)$/.exec(line);
    const callout = /^>\s+(.*)$/.exec(line);

    if (heading) {
      flushParagraph();
      content.push(block(heading[2], nextKey, heading[1].length === 2 ? 'h2' : 'h3'));
    } else if (bullet || numbered) {
      flushParagraph();
      const item = block((bullet ?? numbered)![1], nextKey);
      item.listItem = bullet ? 'bullet' : 'number';
      item.level = 1;
      content.push(item);
    } else if (callout) {
      flushParagraph();
      content.push({ _type: 'callout', _key: nextKey(), tone: 'info', text: callout[1] });
    } else {
      paragraph.push(line);
    }
  }
  flushParagraph();
  return content;
}

function block(text: string, nextKey: () => string, style: PTBlock['style'] = 'normal'): PTBlock {
  const markDefs: PTMarkDef[] = [];
  const children: PTSpan[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;

  const push = (value: string, marks: string[] = []) => {
    if (value) children.push({ _type: 'span', _key: nextKey(), text: value, marks });
  };

  for (const match of text.matchAll(pattern)) {
    push(text.slice(last, match.index));
    if (match[1]) push(match[1], ['strong']);
    else if (match[2]) push(match[2], ['em']);
    else {
      const linkKey = nextKey();
      markDefs.push({ _type: 'link', _key: linkKey, href: match[4] });
      push(match[3], [linkKey]);
    }
    last = match.index + match[0].length;
  }
  push(text.slice(last));

  return { _type: 'block', _key: nextKey(), style, children, markDefs };
}

function dedent(text: string): string {
  const lines = text.replace(/^\n/, '').split('\n');
  const indents = lines.filter((line) => line.trim()).map((line) => /^\s*/.exec(line)![0].length);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(min)).join('\n');
}
