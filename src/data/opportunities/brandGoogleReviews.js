/**
 * Google Maps customer reviews per brand listing.
 * Sourced from the brand's Google Business Profile store pages.
 */

/** @typedef {{ name: string, rating: number, text: string }} GoogleReview */

/** @typedef {{ rating: number, count: number, placeName?: string, reviews: GoogleReview[] }} BrandGoogleReviewBundle */

/** @type {Record<string, BrandGoogleReviewBundle>} */
export const BRAND_GOOGLE_REVIEWS = {
  odette: {
    rating: 4.9,
    count: 34,
    placeName: 'ODETTE Phoenix Market City, Bengaluru',
    reviews: [
      {
        name: 'Suak Kamei',
        rating: 5,
        text: 'I absolutely adore the trendy styles of this store — the clothes fit so well and they look amazing. Soft, comfortable material, good fabric, and colour holds after washing. Their customer service is second to none!',
      },
      {
        name: 'Pritam Adhikari',
        rating: 5,
        text: 'Nice shopping time at Odette, loved the collection.',
      },
      {
        name: 'Pratiksha Patidar',
        rating: 5,
        text: 'I had a good experience shopping with Odette! Their dresses are really cute and trendy. If you visit Phoenix Mall Bangalore Whitefield often, I strongly recommend you visit this store on the 2nd floor.',
      },
      {
        name: 'Ananya R',
        rating: 5,
        text: 'Lovely collections and a best place in town to get head-turning outfits!',
      },
    ],
  },
};

/**
 * @param {string} slug
 * @returns {BrandGoogleReviewBundle | null}
 */
export function getBrandGoogleReviews(slug) {
  return BRAND_GOOGLE_REVIEWS[slug] ?? null;
}
