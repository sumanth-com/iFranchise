/** Professional portrait URLs. face-cropped, consistent sizing */
const avatar = (photoId) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&crop=faces&w=128&h=128&q=85`;

/**
 * Home page testimonial columns. each column has unique people (no duplicates across columns).
 */
export const TESTIMONIAL_COLUMNS = {
  left: [
    {
      id: 'arjun-patel',
      quote:
        'iFranchise helped me scale from 2 outlets to 9 within months. The process is structured and reliable.',
      name: 'Arjun Patel',
      role: 'Franchise Investor',
      avatar: avatar('1507003211169-0a1dd7228f2d'),
      rating: 5,
    },
    {
      id: 'priya-menon',
      quote:
        'Territory planning and investor matching were sharp. We opened three new cities on schedule.',
      name: 'Priya Menon',
      role: 'Multi-Unit Operator',
      avatar: avatar('1573496359142-b8d87734a5a2'),
      rating: 5,
    },
    {
      id: 'vikram-singh',
      quote:
        'From franchise documentation to launch playbooks, everything was built for Indian market realities.',
      name: 'Vikram Singh',
      role: 'QSR Brand Owner',
      avatar: avatar('1472099645785-5658abf4ff4e'),
      rating: 5,
    },
  ],
  middle: [
    {
      id: 'neha-reddy',
      quote:
        'I avoided a wrong investment because of their insights. That alone saved me a huge amount.',
      name: 'Neha Reddy',
      role: 'First-time Investor',
      avatar: avatar('1580489944761-15a19d654956'),
      rating: 5,
    },
    {
      id: 'kiran-sharma',
      quote: 'The platform makes opportunity comparison simple and data-driven.',
      name: 'Kiran Sharma',
      role: 'Investment Advisor',
      avatar: avatar('1519085360753-af0119f7cbe7'),
      rating: 5,
    },
    {
      id: 'ananya-iyer',
      quote:
        'Clear unit economics and city-wise demand signals made our expansion committee confident.',
      name: 'Ananya Iyer',
      role: 'Expansion Consultant',
      avatar: avatar('1594744803329-e58b31de8bf5'),
      rating: 5,
    },
  ],
  right: [
    {
      id: 'ishaan-rao',
      quote: "They understand both operators and investors. That's rare.",
      name: 'Ishaan Rao',
      role: 'Director',
      avatar: avatar('1560250097-0b93528c311a'),
      rating: 5,
    },
    {
      id: 'rajesh-kumar',
      quote: 'Our conversion rate improved significantly after working with iFranchise.',
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      avatar: avatar('1500648767791-00dcc994a43e'),
      rating: 5,
    },
    {
      id: 'meera-nair',
      quote: 'Transparent process, clear ROI expectations, and strong execution across India.',
      name: 'Meera Nair',
      role: 'Franchise CEO',
      avatar: avatar('1573497019940-1c28c88b4f3e'),
      rating: 5,
    },
  ],
};

export const HOME_TESTIMONIALS_MOBILE = [
  ...TESTIMONIAL_COLUMNS.left,
  ...TESTIMONIAL_COLUMNS.middle,
  ...TESTIMONIAL_COLUMNS.right,
];

/** Small avatar stack under testimonial sections */
export const TESTIMONIAL_AVATAR_STRIP = [
  TESTIMONIAL_COLUMNS.left[0].avatar,
  TESTIMONIAL_COLUMNS.middle[0].avatar,
  TESTIMONIAL_COLUMNS.right[0].avatar,
  TESTIMONIAL_COLUMNS.middle[1].avatar,
];

/** About page marquee cards */
export const ABOUT_PAGE_TESTIMONIALS = [
  {
    name: 'Rohit Verma',
    company: 'ScaleCraft Ventures',
    avatar: TESTIMONIAL_COLUMNS.left[1].avatar,
    quote:
      'Working with iFranchise gave our team the clarity and speed we needed for expansion. The process is transparent and data-driven.',
    icon: '◎',
  },
  {
    name: 'Divya Krishnan',
    company: 'Urban Bites Collective',
    avatar: TESTIMONIAL_COLUMNS.middle[2].avatar,
    quote:
      'Finally, franchise services designed with operators in mind: smart matching, clear economics, and reliable support.',
    icon: '✕',
  },
  {
    name: 'Aditya Malhotra',
    company: 'Northline Franchise Group',
    avatar: TESTIMONIAL_COLUMNS.right[2].avatar,
    quote:
      'We scaled across tier 1 and tier 2 cities with a playbook that investors actually understood and trusted.',
    icon: '◌',
  },
];
