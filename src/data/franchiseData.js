// ═══════════════════════════════════════════════════════════════════════════════
// CENTRALIZED FRANCHISE OPPORTUNITIES DATA
// ═══════════════════════════════════════════════════════════════════════════════
// This is the SINGLE SOURCE OF TRUTH for all franchise data across the platform.
// Any changes here automatically update:
// - Franchise Opportunities Page
// - Brand Owners Dashboard
// - Investors Dashboard
// - All statistics and metrics
// ═══════════════════════════════════════════════════════════════════════════════
//
// Franchise Opportunities page adds derived filter keys per row via
// enrichFranchiseRow (src/lib/franchiseOpportunityFilters.js): brand, location,
// franchiseModel, investmentRangeLabel, investmentRangeBuckets - without changing
// the raw objects below for other routes.
//
// ═══════════════════════════════════════════════════════════════════════════════

export const franchiseOpportunities = [
  {
    id: 1,
    brandName: 'BurgerBlast',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT MARKET',
    investment: '$100K-$250K',
    model: 'FOFO',
    locations: 'Pan India',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune'],
    roi: '35%',
    industry: 'Food & Beverage',
    status: 'active',
    addedDate: '2024-01-15',
    minInvestment: 100000,
    maxInvestment: 250000
  },
  {
    id: 2,
    brandName: 'FitLife Gym',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    badge: 'HIGH ROI',
    investment: '$150K-$300K',
    model: 'FICO',
    locations: 'Major Metro Cities',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'],
    roi: '40%',
    industry: 'Health & Wellness',
    status: 'active',
    addedDate: '2024-02-20',
    minInvestment: 150000,
    maxInvestment: 300000
  },
  {
    id: 3,
    brandName: 'EcoClean Solutions',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    investment: '$50K-$150K',
    model: 'FOCO',
    locations: 'Tier 2 & 3 Cities',
    cities: ['Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh'],
    roi: '28%',
    industry: 'Home Services',
    status: 'active',
    addedDate: '2024-03-10',
    minInvestment: 50000,
    maxInvestment: 150000
  },
  {
    id: 4,
    brandName: 'TechTutor Education',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    badge: 'TRENDING',
    investment: '$75K-$200K',
    model: 'FOFO',
    locations: 'Suburban Zones',
    cities: ['Pune', 'Ahmedabad', 'Surat', 'Nagpur'],
    roi: '32%',
    industry: 'Education',
    status: 'active',
    addedDate: '2024-01-25',
    minInvestment: 75000,
    maxInvestment: 200000
  },
  {
    id: 5,
    brandName: 'QuickClean Services',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    badge: 'HIGH ROI',
    investment: '$30K-$80K',
    model: 'FICO',
    locations: 'Pan India',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
    roi: '45%',
    industry: 'Home Services',
    status: 'active',
    addedDate: '2024-02-05',
    minInvestment: 30000,
    maxInvestment: 80000
  },
  {
    id: 6,
    brandName: 'TechRepair Pro',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    investment: '$40K-$120K',
    model: 'FOFO',
    locations: 'Major Metro Cities',
    cities: ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai'],
    roi: '38%',
    industry: 'Technology',
    status: 'active',
    addedDate: '2024-03-15',
    minInvestment: 40000,
    maxInvestment: 120000
  },
  {
    id: 7,
    brandName: 'EduLearn Center',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    badge: 'GROWING',
    investment: '$60K-$150K',
    model: 'COFO',
    locations: 'Urban & Suburban',
    cities: ['Delhi', 'Mumbai', 'Kolkata', 'Jaipur', 'Lucknow'],
    roi: '30%',
    industry: 'Education',
    status: 'active',
    addedDate: '2024-01-30',
    minInvestment: 60000,
    maxInvestment: 150000
  },
  {
    id: 8,
    brandName: 'StyleSalon',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1560066988-a4f3a1b1b4b8?auto=format&fit=crop&w=600&q=80',
    badge: 'POPULAR',
    investment: '$45K-$120K',
    model: 'COCO',
    locations: 'Malls & Markets',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad'],
    roi: '33%',
    industry: 'Retail',
    status: 'active',
    addedDate: '2024-02-12',
    minInvestment: 45000,
    maxInvestment: 120000
  },
  {
    id: 9,
    brandName: 'PetParadise',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1601758228041-f3be275a173f?auto=format&fit=crop&w=600&q=80',
    badge: 'TRENDING',
    investment: '$80K-$200K',
    model: 'FICO',
    locations: 'Urban Cities',
    cities: ['Mumbai', 'Bengaluru', 'Delhi', 'Pune'],
    roi: '36%',
    industry: 'Retail',
    status: 'active',
    addedDate: '2024-03-01',
    minInvestment: 80000,
    maxInvestment: 200000
  },
  {
    id: 10,
    brandName: 'AutoCare Express',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    badge: 'HIGH ROI',
    investment: '$35K-$100K',
    model: 'FOCO',
    locations: 'Service Hubs',
    cities: ['Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad'],
    roi: '42%',
    industry: 'Home Services',
    status: 'active',
    addedDate: '2024-02-18',
    minInvestment: 35000,
    maxInvestment: 100000
  },
  {
    id: 11,
    brandName: 'CoffeeHaven',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    badge: 'POPULAR',
    investment: '$120K-$300K',
    model: 'FOFO',
    locations: 'City Centers',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai'],
    roi: '25%',
    industry: 'Food & Beverage',
    status: 'active',
    addedDate: '2024-01-20',
    minInvestment: 120000,
    maxInvestment: 300000
  },
  {
    id: 12,
    brandName: 'GreenThumb Garden',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1585859608211-45b8c5d3d4b6?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    investment: '$25K-$75K',
    model: 'FIFO',
    locations: 'Residential Zones',
    cities: ['Pune', 'Jaipur', 'Chandigarh', 'Indore'],
    roi: '40%',
    industry: 'Home Services',
    status: 'active',
    addedDate: '2024-03-05',
    minInvestment: 25000,
    maxInvestment: 75000
  },
  {
    id: 13,
    brandName: 'SmoothieKing',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80',
    badge: 'GROWING',
    investment: '$90K-$220K',
    model: 'FOCO',
    locations: 'Shopping Malls',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai'],
    roi: '31%',
    industry: 'Food & Beverage',
    status: 'active',
    addedDate: '2024-02-08',
    minInvestment: 90000,
    maxInvestment: 220000
  },
  {
    id: 14,
    brandName: 'YogaZen Studio',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    badge: 'TRENDING',
    investment: '$55K-$150K',
    model: 'FICO',
    locations: 'Wellness Hubs',
    cities: ['Mumbai', 'Bengaluru', 'Pune', 'Hyderabad'],
    roi: '37%',
    industry: 'Health & Wellness',
    status: 'active',
    addedDate: '2024-02-25',
    minInvestment: 55000,
    maxInvestment: 150000
  },
  {
    id: 15,
    brandName: 'BookWorm Store',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228d39?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    investment: '$70K-$180K',
    model: 'FOFO',
    locations: 'Market Areas',
    cities: ['Delhi', 'Kolkata', 'Jaipur', 'Lucknow'],
    roi: '29%',
    industry: 'Retail',
    status: 'active',
    addedDate: '2024-03-12',
    minInvestment: 70000,
    maxInvestment: 180000
  },
  {
    id: 16,
    brandName: 'CleanSweep Pro',
    category: 'Home Services',
    image: 'https://images.unsplash.com/photo-1584464491433-2240d6b7c57e?auto=format&fit=crop&w=600&q=80',
    badge: 'HIGH ROI',
    investment: '$40K-$110K',
    model: 'FOCO',
    locations: 'Business Hubs',
    cities: ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai'],
    roi: '44%',
    industry: 'Home Services',
    status: 'active',
    addedDate: '2024-02-15',
    minInvestment: 40000,
    maxInvestment: 110000
  },
  {
    id: 17,
    brandName: 'CodeAcademy',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    badge: 'POPULAR',
    investment: '$85K-$200K',
    model: 'COFO',
    locations: 'IT Cities',
    cities: ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai'],
    roi: '34%',
    industry: 'Education',
    status: 'active',
    addedDate: '2024-01-28',
    minInvestment: 85000,
    maxInvestment: 200000
  },
  {
    id: 18,
    brandName: 'PastaPerfect',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    badge: 'TRENDING',
    investment: '$130K-$280K',
    model: 'FOFO',
    locations: 'City Centers',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'],
    roi: '27%',
    industry: 'Food & Beverage',
    status: 'active',
    addedDate: '2024-02-22',
    minInvestment: 130000,
    maxInvestment: 280000
  },
  {
    id: 19,
    brandName: 'SpaRetreat',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    badge: 'GROWING',
    investment: '$100K-$250K',
    model: 'FICO',
    locations: 'Tourist Areas',
    cities: ['Goa', 'Jaipur', 'Udaipur', 'Mumbai'],
    roi: '39%',
    industry: 'Health & Wellness',
    status: 'active',
    addedDate: '2024-02-10',
    minInvestment: 100000,
    maxInvestment: 250000
  },
  {
    id: 20,
    brandName: 'GameZone',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW',
    investment: '$200K-$400K',
    model: 'COCO',
    locations: 'Entertainment Zones',
    cities: ['Mumbai', 'Delhi', 'Bengaluru'],
    roi: '32%',
    industry: 'Entertainment',
    status: 'active',
    addedDate: '2024-03-08',
    minInvestment: 200000,
    maxInvestment: 400000
  },
  {
    id: 21,
    brandName: 'FreshMart',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
    badge: 'HIGH ROI',
    investment: '$150K-$350K',
    model: 'FOCO',
    locations: 'Suburban Zones',
    cities: ['Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow'],
    roi: '41%',
    industry: 'Retail',
    status: 'active',
    addedDate: '2024-02-28',
    minInvestment: 150000,
    maxInvestment: 350000
  },
  {
    id: 22,
    brandName: 'MindfulMeditation',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1593874405796-086834828d39?auto=format&fit=crop&w=600&q=80',
    badge: 'TRENDING',
    investment: '$45K-$120K',
    model: 'FICO',
    locations: 'Urban Hubs',
    cities: ['Mumbai', 'Bengaluru', 'Pune', 'Hyderabad', 'Delhi'],
    roi: '36%',
    industry: 'Health & Wellness',
    status: 'active',
    addedDate: '2024-03-03',
    minInvestment: 45000,
    maxInvestment: 120000
  },
  {
    id: 23,
    brandName: 'Taco Fiesta',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1565034969-9a1a8a2c7c3a?auto=format&fit=crop&w=600&q=80',
    badge: 'POPULAR',
    investment: '$80K-$200K',
    model: 'FOFO',
    locations: 'Food Courts',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai'],
    roi: '30%',
    industry: 'Food & Beverage',
    status: 'active',
    addedDate: '2024-02-03',
    minInvestment: 80000,
    maxInvestment: 200000
  },
  {
    id: 24,
    brandName: 'KidZone Play',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1542744173-8e7a5d373a97?auto=format&fit=crop&w=600&q=80',
    badge: 'GROWING',
    investment: '$120K-$300K',
    model: 'FICO',
    locations: 'Family Zones',
    cities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune'],
    roi: '35%',
    industry: 'Entertainment',
    status: 'active',
    addedDate: '2024-02-14',
    minInvestment: 120000,
    maxInvestment: 300000
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC CALCULATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════
// These functions automatically calculate live metrics from the opportunities data

/**
 * Get all active franchise opportunities
 */
export const getActiveOpportunities = () => {
  return franchiseOpportunities.filter(opp => opp.status === 'active');
};

/**
 * Calculate total unique cities across all opportunities
 */
export const getTotalCities = () => {
  const allCities = new Set();
  franchiseOpportunities.forEach(opp => {
    if (opp.cities && Array.isArray(opp.cities)) {
      opp.cities.forEach(city => allCities.add(city));
    }
  });
  return allCities.size;
};

/**
 * Get unique cities list
 */
export const getUniqueCities = () => {
  const allCities = new Set();
  franchiseOpportunities.forEach(opp => {
    if (opp.cities && Array.isArray(opp.cities)) {
      opp.cities.forEach(city => allCities.add(city));
    }
  });
  return Array.from(allCities).sort();
};

/**
 * Calculate total unique markets/industries
 */
export const getTotalMarkets = () => {
  const markets = new Set(franchiseOpportunities.map(opp => opp.industry));
  return markets.size;
};

/**
 * Calculate estimated total revenue potential
 */
export const getTotalRevenuePotential = () => {
  const total = franchiseOpportunities.reduce((sum, opp) => {
    return sum + (opp.maxInvestment || 0);
  }, 0);
  return total;
};

/**
 * Format revenue in millions
 */
export const formatRevenue = (amount) => {
  const millions = amount / 1000000;
  return `$${millions.toFixed(1)}M`;
};

/**
 * Calculate average ROI across all opportunities
 */
export const getAverageROI = () => {
  const rois = franchiseOpportunities.map(opp => 
    parseInt(opp.roi.replace('%', ''), 10)
  );
  const avg = rois.reduce((sum, roi) => sum + roi, 0) / rois.length;
  return Math.round(avg);
};

/**
 * Calculate minimum investment available
 */
export const getMinimumInvestment = () => {
  const min = Math.min(...franchiseOpportunities.map(opp => opp.minInvestment));
  return min;
};

/**
 * Format investment amount
 */
export const formatInvestment = (amount) => {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount}`;
};

/**
 * Get opportunities by category/industry
 */
export const getOpportunitiesByIndustry = () => {
  const byIndustry = {};
  franchiseOpportunities.forEach(opp => {
    if (!byIndustry[opp.industry]) {
      byIndustry[opp.industry] = [];
    }
    byIndustry[opp.industry].push(opp);
  });
  return byIndustry;
};

/**
 * Get opportunity count by industry
 */
export const getIndustryCount = (industry) => {
  return franchiseOpportunities.filter(opp => opp.industry === industry).length;
};

/**
 * Get top opportunities by ROI
 */
export const getTopOpportunitiesByROI = (limit = 3) => {
  return [...franchiseOpportunities]
    .sort((a, b) => {
      const roiA = parseInt(a.roi.replace('%', ''), 10);
      const roiB = parseInt(b.roi.replace('%', ''), 10);
      return roiB - roiA;
    })
    .slice(0, limit);
};

/**
 * Get newest opportunities
 */
export const getNewestOpportunities = (limit = 3) => {
  return [...franchiseOpportunities]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, limit);
};

/**
 * Get trending opportunities (HIGH ROI or TRENDING badge)
 */
export const getTrendingOpportunities = (limit = 3) => {
  return franchiseOpportunities
    .filter(opp => opp.badge === 'HIGH ROI' || opp.badge === 'TRENDING')
    .slice(0, limit);
};

/**
 * Get city-wise opportunity distribution
 */
export const getCityDistribution = () => {
  const cityCount = {};
  franchiseOpportunities.forEach(opp => {
    if (opp.cities && Array.isArray(opp.cities)) {
      opp.cities.forEach(city => {
        cityCount[city] = (cityCount[city] || 0) + 1;
      });
    }
  });
  return cityCount;
};

/**
 * Get top cities by opportunity count
 */
export const getTopCities = (limit = 5) => {
  const cityCount = getCityDistribution();
  return Object.entries(cityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([city, count]) => ({ city, count }));
};

/**
 * Calculate growth metrics (simulated based on recent additions)
 */
export const calculateGrowthMetrics = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
  
  const recentOpportunities = franchiseOpportunities.filter(opp => 
    new Date(opp.addedDate) >= threeMonthsAgo
  );
  
  const growthRate = (recentOpportunities.length / franchiseOpportunities.length) * 100;
  
  return {
    recentCount: recentOpportunities.length,
    totalCount: franchiseOpportunities.length,
    growthRate: Math.round(growthRate)
  };
};

/**
 * Get market trends data
 */
export const getMarketTrends = () => {
  const industries = getOpportunitiesByIndustry();
  return Object.entries(industries)
    .map(([industry, opps]) => ({
      industry,
      count: opps.length,
      avgROI: Math.round(
        opps.reduce((sum, opp) => sum + parseInt(opp.roi.replace('%', ''), 10), 0) / opps.length
      )
    }))
    .sort((a, b) => b.count - a.count);
};
