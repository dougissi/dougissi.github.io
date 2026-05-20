// Manual social-share meta overrides, keyed by route path.
//
// At build time, scripts/generate-og-routes.js writes a static
// <route>/index.html for each entry here, with the og:* meta tags swapped.
//
// Every post in src/posts.json already gets an auto-generated entry (title
// from post.title, description from post.summary, image from post.imgFileName).
// Use this file for:
//   1. Routes that aren't posts (e.g. /trips/zambia)
//   2. Per-post overrides (an entry here takes precedence over the auto entry)
//
// To override a post's share image, add:
//   '/<post-slug>': { image: '/assets/.../custom-og.jpg' }
//
// Set image: null to omit the share image entirely for a route.

module.exports = {
  '/trips/zambia': {
    title: 'Zambia Mission Trip — June 5-15, 2026',
    description: 'Garden Church mission trip to Lusaka, Zambia — June 5-15, 2026. See needs and how to support.',
    image: '/assets/zambia/chesed-academy-og.jpg',
  },
};
