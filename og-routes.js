// Per-route social-share meta overrides.
//
// At build time, scripts/generate-og-routes.js reads this file and writes a
// static <route>/index.html for each entry, with the og:* meta tags swapped.
// Routes NOT listed here fall back to the defaults in public/index.html
// (currently the Doug headshot share card).
//
// To add an override for a post, add an entry keyed by its route path, e.g.:
//   '/party-split': { image: '/assets/images/party_split_thumbnail.png' }
//
// Fields are all optional. Set image: null to omit the share image entirely.

module.exports = {
  '/trips/zambia': {
    title: 'Zambia Mission Trip — June 5-15, 2026',
    description: 'Garden Church mission trip to Lusaka, Zambia — June 5-15, 2026. See needs and how to support.',
    image: '/assets/zambia/chesed-academy.jpg',
  },
};
