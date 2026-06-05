// CMS content schema (T-003).
//
// JavaScript project (no TypeScript), so document shapes are documented here as
// JSDoc typedefs. These are the single source of truth for what each Firestore
// collection holds; the read layer (content.js), the write API (/api/content)
// and the seed script all conform to these shapes.
//
// Field names are chosen to map 1:1 onto what the storefront components already
// read (e.g. product `name`, `image`, `price`) so swapping the data source does
// not change the markup.

/** The Firestore collection names used by the CMS. */
export const COLLECTIONS = {
  products: 'products',
  blogs: 'blogs',
  brands: 'brands',
  banners: 'banners',
  services: 'services',
  settings: 'settings',
  submissions: 'submissions',
};

/** Collections that are ordinary lists of documents (CRUD editors). */
export const LIST_COLLECTIONS = [
  'products',
  'blogs',
  'brands',
  'banners',
  'services',
];

/** Banner placements. */
export const BANNER_TYPES = ['hero', 'promo', 'fullwidth'];

/** Home product-tab keys (a product may belong to several). */
export const PRODUCT_TABS = ['features', 'seller', 'sales'];

/** Document id of the single global settings document. */
export const SETTINGS_DOC_ID = 'global';

/**
 * @typedef {Object} Product
 * @property {string} [id]            Firestore document id (added on read).
 * @property {string} name            Display name.
 * @property {string} image           Image URL (Cloudinary or /img/*).
 * @property {string} [price]         Formatted price, e.g. "$35.00". Optional.
 * @property {string} slug            URL slug used by /shop/[id] (falls back to id).
 * @property {string} [description]   Long description for the product page.
 * @property {string[]} tabs          Subset of PRODUCT_TABS for the home tabs.
 * @property {boolean} bestSeller     Whether it appears in the Best Sellers slider.
 * @property {number} order           Sort order (ascending).
 */

/**
 * @typedef {Object} Blog
 * @property {string} [id]
 * @property {string} title
 * @property {string} slug            Unique URL slug used by /blog/[slug].
 * @property {string} category
 * @property {string} author
 * @property {string} date            Human-readable date string, e.g. "22 Aug, 2025".
 * @property {string} image           Card / hero image URL.
 * @property {string} [metaImage]     Small author avatar URL.
 * @property {string} [excerpt]       Short summary for listings.
 * @property {string} body            Full post body (plain text / simple HTML).
 * @property {number} order
 */

/**
 * @typedef {Object} Brand
 * @property {string} [id]
 * @property {string} image           Logo image URL.
 * @property {string} [hoverImage]    Hover-state logo URL.
 * @property {string} [link]          Outbound link.
 * @property {number} order
 */

/**
 * @typedef {Object} Banner
 * @property {string} [id]
 * @property {('hero'|'promo'|'fullwidth')} type
 * @property {string} [discount]      e.g. "70%" (rendered in a <span>).
 * @property {string} [discountLabel] e.g. "Sale Off".
 * @property {string} title           Main headline (may contain a line break).
 * @property {string} [subtext]       Supporting paragraph.
 * @property {string} [ctaLabel]      Button label.
 * @property {string} [ctaLink]       Button href.
 * @property {string} [image]         Banner image / background URL.
 * @property {boolean} [active]       For single-slot types (hero|fullwidth): the
 *                                    banner currently shown on the storefront.
 * @property {number} order
 */

/**
 * @typedef {Object} Service
 * @property {string} [id]
 * @property {string} title
 * @property {string} text
 * @property {string} image           Icon/illustration URL.
 * @property {number} [width]         Intrinsic image width (preserves layout).
 * @property {number} [height]        Intrinsic image height.
 * @property {string} [cssClass]      Layout modifier: one|two|three|four.
 * @property {number} order
 */

/**
 * @typedef {Object} ShippingItem
 * @property {string} image
 * @property {string} title
 * @property {string} text
 */

/**
 * @typedef {Object} FooterLink
 * @property {string} label
 * @property {string} href
 */

/**
 * @typedef {Object} ContactStore
 * @property {string} title
 * @property {string} address
 * @property {string} phone
 * @property {string} email
 * @property {string} [website]
 */

/**
 * @typedef {Object} Settings
 * @property {ShippingItem[]} shipping
 * @property {string} contactEmail
 * @property {string} address
 * @property {string[]} phones
 * @property {FooterLink[]} infoLinks
 * @property {FooterLink[]} accountLinks
 * @property {string} newsletterText
 * @property {string} copyright
 * @property {string} contactHeading
 * @property {ContactStore[]} stores
 * @property {string} [mapEmbedUrl]
 */

/**
 * @typedef {Object} Submission
 * @property {string} [id]
 * @property {string} name
 * @property {string} email
 * @property {string} [subject]
 * @property {string} message
 * @property {boolean} read
 * @property {string} createdAt        ISO timestamp.
 */

/**
 * Allowed fields per collection, used by /api/content to validate payloads and
 * strip unknown keys. `required` lists fields that must be present on create.
 */
export const FIELD_SPECS = {
  products: {
    fields: ['name', 'image', 'price', 'slug', 'description', 'tabs', 'bestSeller', 'order'],
    required: ['name', 'image'],
  },
  blogs: {
    fields: ['title', 'slug', 'category', 'author', 'date', 'image', 'metaImage', 'excerpt', 'body', 'order'],
    required: ['title'],
  },
  brands: {
    fields: ['image', 'hoverImage', 'link', 'order'],
    required: ['image'],
  },
  banners: {
    fields: ['type', 'discount', 'discountLabel', 'title', 'subtext', 'ctaLabel', 'ctaLink', 'image', 'active', 'order'],
    required: ['type', 'title'],
  },
  services: {
    fields: ['title', 'text', 'image', 'width', 'height', 'cssClass', 'order'],
    required: ['title'],
  },
  settings: {
    fields: ['shipping', 'contactEmail', 'address', 'phones', 'infoLinks', 'accountLinks', 'newsletterText', 'copyright', 'contactHeading', 'stores', 'mapEmbedUrl'],
    required: [],
  },
};
