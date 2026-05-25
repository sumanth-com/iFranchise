/**
 * Blog card / hero assets and optional Unsplash URLs for avatars.
 */

import blogFallback from '../../assets/Blog.jfif';
import blogPageHero from '../../assets/bloghero.png';
import blog1 from '../../assets/Blog1.jfif';
import blog2 from '../../assets/Blog2.jfif';
import blog3 from '../../assets/Blog3.jfif';
import blog4 from '../../assets/Blog4.png';

/** Blog listing page top section (left-side hero image). */
export const BLOG_PAGE_HERO_IMAGE = blogPageHero;

/** Local images for blog cards and matching detail-page heroes (one per post). */
export const BLOG_POST_IMAGES = [blog1, blog2, blog3, blog4];

export const BLOG_FALLBACK = blogFallback;

export const PHOTO = {
  businessPlanning: '1454165804606-c3d57bc86b40',
  handshakeDeal: '1521791136064-7986c2920216',
  qsrRestaurant: '1555396273-367ea4eb4db5',
  cafeService: '1600880292203-116d7a67b4fe',
  analyticsDashboard: '1551288049-bebda4e38f71',
  financeReview: '1554224155-8d04cb21cd6c',
  retailCheckout: '1556740758-90de374c12ad',
  apparelRetail: '1441986300917-64644bd600e8',
  diningInterior: '1414235077-542ef22eaf0b',
  commercialKitchen: '1559339352-fea4428380b0',
  indianDining: '1596040033-05c1d9168575',
  highStreetStore: '1555529669-e69e7aa0ba9a',
  mallShopping: '1483985988357-763728e52755',
  teamMeeting: '1556761175-b3a081ff254a',
  marketCharts: '1559526324-4b87b5e36e44',
};

const SIZES = {
  thumb: { w: 480, h: 270, q: 72 },
  card: { w: 720, h: 405, q: 75 },
  hero: { w: 1100, h: 620, q: 78 },
  section: { w: 840, h: 472, q: 75 },
  banner: { w: 1200, h: 400, q: 75 },
  avatar: { w: 96, h: 96, q: 80 },
};

/**
 * @param {string} id Unsplash photo id (with hash suffix)
 * @ {'thumb' | 'card' | 'hero' | 'section' | 'banner' | 'avatar'} [variant]
 */
export function blogPhoto(id, variant = 'card') {
  const { w, h, q } = SIZES[variant] || SIZES.card;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=${q}`;
}

export const BLOG_IMG_SIZES = {
  card: '(max-width: 768px) 100vw, 50vw',
  hero: '(max-width: 1024px) 100vw, 1100px',
  section: '(max-width: 768px) 100vw, 840px',
  thumb: '96px',
  banner: '100vw',
};
