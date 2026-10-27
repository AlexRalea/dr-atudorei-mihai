const image = (field: string) =>
  `"${field}": ${field}{ "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "alt": coalesce(alt, "") }`;

const portableText = (field: string) =>
  `"${field}": coalesce(${field}[]{
    ...,
    _type == "image" => {
      _type, _key, alt, caption,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height
    }
  }, [])`;

const list = (field: string) => `"${field}": coalesce(${field}, [])`;

const seo = `seo{ title, description, noindex, ${image('image')} }`;

const slugFields = `"slug": slug.current, ${list('previousSlugs')}`;

const faqs = `"faqs": coalesce(faqs[]{ question, answer }, [])`;

export const settingsQuery = `*[_id == "siteSettings"][0]{
  siteName, specialty, description, phone, email,
  clinic{ name, street, city, county, postalCode, mapsUrl },
  "hours": coalesce(hours[]{ days, hours }, []),
  cmrCode, googleBusinessUrl, social, heroTitle, heroText
}`;

export const doctorQuery = `*[_id == "doctor"][0]{
  name, role, specialty, shortBio,
  ${portableText('bio')},
  ${image('portrait')},
  ${list('focusAreas')},
  "education": coalesce(education[]{ period, title, institution }, []),
  ${list('memberships')}
}`;

export const conditionsQuery = `*[_type == "condition" && defined(slug.current)] | order(order asc, title asc){
  title, ${slugFields}, aka, symptomPrompt, summary,
  ${portableText('overview')},
  ${list('symptoms')}, ${list('causes')}, ${list('whenToSee')},
  ${portableText('treatment')},
  ${portableText('recovery')},
  ${faqs},
  "relatedServices": coalesce(relatedServices[]->slug.current, []),
  reviewedAt, ${seo}
}`;

export const servicesQuery = `*[_type == "service" && defined(slug.current)] | order(order asc, title asc){
  title, ${slugFields}, icon, summary,
  ${portableText('overview')},
  ${list('indications')},
  "steps": coalesce(steps[]{ title, text }, []),
  ${portableText('recovery')},
  ${faqs},
  "relatedConditions": coalesce(relatedConditions[]->slug.current, []),
  ${seo}
}`;

export const articlesQuery = `*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
  title, ${slugFields}, excerpt, category, publishedAt, reviewedAt,
  ${image('cover')},
  ${portableText('body')},
  "relatedConditions": coalesce(relatedConditions[]->slug.current, []),
  ${seo}
}`;

export const faqsQuery = `*[_type == "faq"] | order(order asc){ question, answer, category, showOnHome }`;

export const pagesQuery = `*[_type == "page" && defined(slug.current)] | order(title asc){
  title, ${slugFields}, intro, showInFooter,
  ${portableText('body')},
  ${seo}
}`;

export const redirectsQuery = `*[_type == "redirect" && defined(from) && defined(to)]{ from, to }`;
