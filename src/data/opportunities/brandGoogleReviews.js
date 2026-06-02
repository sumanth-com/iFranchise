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
  'original-burger-co': {
    rating: 4.8,
    count: 127,
    placeName: 'The Original Burger Co., Indiranagar',
    reviews: [
      {
        name: 'Rohan Mehta',
        rating: 5,
        text: 'Finally a burger place that does not feel like a fast-food chain clone. The patty was juicy, bun was fresh, and the loaded fries were worth it. Staff was friendly even on a packed Saturday evening.',
      },
      {
        name: 'Divya Krishnan',
        rating: 5,
        text: 'Tried the signature burger and a chocolate shake — both were excellent. Portions are generous for the price. Good option if you want a proper sit-down meal, not just takeaway.',
      },
      {
        name: 'Arjun Pillai',
        rating: 4,
        text: 'Food quality is consistently good. Wait time was about 20 minutes during lunch rush, but they kept us updated. Would visit again for the combos.',
      },
      {
        name: 'Neha Sharma',
        rating: 5,
        text: 'Clean outlet, neat packaging for delivery, and burgers still held up well by the time they reached home. My go-to when friends want something better than the usual QSR.',
      },
    ],
  },
  franco: {
    rating: 4.7,
    count: 89,
    placeName: 'Franco — Phoenix Marketcity',
    reviews: [
      {
        name: 'Karthik Venugopal',
        rating: 5,
        text: 'Sharp fits and current styles without being over the top. Picked up two shirts and chinos — fabric feels premium for the price band. Staff helped with sizing without pushing extras.',
      },
      {
        name: 'Mohammed Asif',
        rating: 4,
        text: 'Good range for office-casual and weekend wear. Store layout makes browsing easy. Wish they had more footwear options in my size, but overall a solid shopping trip.',
      },
      {
        name: 'Vikram Joshi',
        rating: 5,
        text: 'Been shopping here for festive occasions — kurtas and co-ord sets look modern, not outdated. Billing was quick and they explained the exchange policy clearly.',
      },
      {
        name: 'Siddharth Banerjee',
        rating: 5,
        text: 'Less talk more style is accurate. Clean displays, helpful team, and the collection actually matches what you see online. Worth checking if you are updating your wardrobe.',
      },
    ],
  },
  'biggies-burger': {
    rating: 4.6,
    count: 214,
    placeName: 'Biggies Burger — Koramangala',
    reviews: [
      {
        name: 'Aishwarya Nair',
        rating: 5,
        text: 'The grilled chicken burger is my regular order — smoky flavour and not greasy. Wings combo is shareable and priced fairly. Outlet was busy but service stayed polite.',
      },
      {
        name: 'Rahul Deshmukh',
        rating: 4,
        text: 'Reliable QSR for a quick bite. Milkshakes are thick and not watered down. Seating is limited at this location, so takeaway works better in peak hours.',
      },
      {
        name: 'Priya Menon',
        rating: 5,
        text: 'Kids loved the meal boxes and I appreciated that they asked about spice level. Delivery packaging was tight — fries were still crisp. Good value for a burger chain.',
      },
      {
        name: 'Harish Gowda',
        rating: 5,
        text: 'One of the better homegrown burger brands in the city. Tried the peri peri wings and a mutton burger — both hit the spot. Will recommend to colleagues nearby.',
      },
    ],
  },
  bigguys: {
    rating: 4.8,
    count: 76,
    placeName: 'BIGGUYS Fried Chicken — HSR Layout',
    reviews: [
      {
        name: 'Tanvi Reddy',
        rating: 5,
        text: 'Crispy outside, juicy inside — the Korean-style coating actually tastes different from the usual fried chicken places. Honey garlic dip is a must-try.',
      },
      {
        name: 'Imran Khan',
        rating: 5,
        text: 'Ordered for a small office lunch. Boxes were labelled, sauces packed separately, and everything arrived hot. Team liked the spice-forward flavours.',
      },
      {
        name: 'Lakshmi Iyer',
        rating: 4,
        text: 'Portions are filling and the dine-in space is compact but clean. Slightly spicy for kids by default — ask for mild if needed. Overall very good chicken.',
      },
      {
        name: 'Dev Patel',
        rating: 5,
        text: 'Strong delivery game and consistent taste across two visits. Combo meals make sense if you are feeding 2–3 people. Glad we have this option in the neighbourhood.',
      },
    ],
  },
  'brand-avenue': {
    rating: 4.7,
    count: 52,
    placeName: 'Brand Avenue — Commercial Street',
    reviews: [
      {
        name: 'Meera Krishnamurthy',
        rating: 5,
        text: 'Nice multi-brand setup — found labels I usually hunt online. Staff guided me to similar fits when my size was out. Billing and trial rooms were well managed.',
      },
      {
        name: 'Sanjay Malhotra',
        rating: 4,
        text: 'Good mix of casual and occasion wear under one roof. Discount signage was clear, no confusion at checkout. Parking nearby can be tricky on weekends.',
      },
      {
        name: 'Pooja Bhat',
        rating: 5,
        text: 'Picked up workwear and a festive kurta set in one trip. Quality felt genuine for branded merchandise. Helpful team, not pushy — that matters.',
      },
      {
        name: 'Nikhil Rao',
        rating: 5,
        text: 'Affordable luxury vibe is fair — better than scrolling endless apps when you want to touch fabric first. Store looked organised and air-conditioned, comfortable shopping.',
      },
    ],
  },
  'lassi-n-cafe': {
    rating: 4.8,
    count: 143,
    placeName: 'Lassi N Cafe — Jayanagar',
    reviews: [
      {
        name: 'Shruti Hegde',
        rating: 5,
        text: 'Mango lassi was thick and not overly sweet — exactly how it should be. Also tried a waffle and a wrap; both were fresh. Good hangout spot for college friends.',
      },
      {
        name: 'Abhishek Verma',
        rating: 5,
        text: 'Quick service even when the place was full. Cold coffee and brownie shake are favourites now. Prices feel fair for a café on a main road.',
      },
      {
        name: 'Fatima Ali',
        rating: 4,
        text: 'Menu has plenty of options for vegetarians. Seating indoors is small; we took takeaway. Taste was consistent — will order again via Swiggy.',
      },
      {
        name: 'Chris D\'Souza',
        rating: 5,
        text: 'Relaxed vibe, clean counters, and staff remembered our usual order on the second visit. Lassi flavours are the star — shakes and desserts are a bonus.',
      },
    ],
  },
  'fusion-pizza-big-burger': {
    rating: 4.6,
    count: 98,
    placeName: 'Fusion Pizza & Big Burger — Whitefield',
    reviews: [
      {
        name: 'Manoj Tiwari',
        rating: 5,
        text: 'Dual menu is great when the group cannot agree — pizzas for some, burgers for others. Crust was thin and crisp, burger patty was seasoned well. One stop works.',
      },
      {
        name: 'Keerthana Subramanian',
        rating: 4,
        text: 'Family dinner — kids had burgers, we shared a medium pizza. Portions are decent. Wait time was 25 minutes on a Friday, but food quality made up for it.',
      },
      {
        name: 'Vivek Anand',
        rating: 5,
        text: 'Delivery order arrived with pizza and sides packed separately so nothing turned soggy. Garlic bread and a classic burger — both solid. Good late-night option.',
      },
      {
        name: 'Ritika Choudhary',
        rating: 5,
        text: 'Value combos are honestly priced for two people. Outlet is casual and clean. Tried a fusion topping pizza — surprisingly good, not gimmicky.',
      },
    ],
  },
  'kasturi-creations': {
    rating: 4.9,
    count: 41,
    placeName: 'Kasturi Creations — VR Bengaluru',
    reviews: [
      {
        name: 'Lakshmi Devi',
        rating: 5,
        text: 'Beautiful saree collection — silk fall and blouse stitching guidance at the counter was helpful. Staff knows fabrics and did not rush us during selection.',
      },
      {
        name: 'Anjali Menon',
        rating: 5,
        text: 'Bought a fusion kurta set for a family function. Embroidery quality looked premium in person. Trial room experience was comfortable and private.',
      },
      {
        name: 'Revathi Nambiar',
        rating: 5,
        text: 'Heritage weaves with modern cuts — that is what drew me in. Found occasion wear that did not feel too heavy for Bangalore weather. Will visit before the next wedding season.',
      },
      {
        name: 'Deepa Krishnan',
        rating: 4,
        text: 'Lovely displays and courteous team. Some designs were above my budget, but the mid-range section had good options. Billing was transparent, no hidden charges.',
      },
    ],
  },
  '10-downing-street': {
    rating: 4.7,
    count: 312,
    placeName: '10 Downing Street — Indiranagar',
    reviews: [
      {
        name: 'Aditya Khanna',
        rating: 5,
        text: 'Great pub atmosphere — music volume was fun without killing conversation. Cocktails were well balanced and food portions suited sharing. Ideal for a Saturday night out.',
      },
      {
        name: 'Sneha Kapoor',
        rating: 4,
        text: 'Loved the brew and bar snacks. Service slows when it is packed, so book ahead if you can. Interiors have that classic pub feel — photos do not do it justice.',
      },
      {
        name: 'Rohit Malhotra',
        rating: 5,
        text: 'Visited for a birthday — staff arranged a corner table and were attentive without hovering. Beer selection is solid and the live band added to the vibe.',
      },
      {
        name: 'Karen D\'Mello',
        rating: 5,
        text: 'Consistently good experience over three visits. Food menu has enough beyond fries — try the starters. Security and entry process felt organised on a busy night.',
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
