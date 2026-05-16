import { useEffect, useMemo, useState } from 'react';
import ImageCarousel from './ImageCarousel';

const franchiseDetailsData = {
  1: {
    name: 'BurgerBlast',
    status: 'Verified',
    badge: 'Premium Listing',
    tagline: 'A premium burger franchise built for metro growth.',
    banner:
      'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1555992336-03a23c5b8f8a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    ],
    keyInfo: {
      investment: '$100K - $250K',
      space: '1000 - 1500 sq ft',
      roi: '35%',
      payback: '20 months',
      outlets: '25+',
    },
    overview:
      'BurgerBlast offers a high-quality burger experience with premium ingredients, standardized recipes, and strong brand recognition in fast-growing urban areas.',
    businessModel:
      'Franchise model: FOFO with comprehensive support. Central team provides menu development, supply chain, marketing, and operational training.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$25K' },
      { label: 'Setup & Interiors', value: '$75K' },
      { label: 'Equipment & Licensing', value: '$40K' },
      { label: 'Working Capital', value: '$20K - $60K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    faqs: [
      {
        q: 'Do I need restaurant experience?',
        a: 'No. We provide comprehensive training and operational support for first-time restaurant owners.',
      },
      {
        q: 'How long does setup take?',
        a: 'Typical setup is 12-16 weeks after location finalization and agreement closure.',
      },
    ],
    reviews: [
      { name: 'John D', rating: 5, text: 'Excellent support team and proven business model. Exceeded revenue expectations.' },
      { name: 'Sarah M', rating: 5, text: 'Great brand recognition and quality ingredients. Customers love the products.' },
    ],
    aboutBrand: [
      'BurgerBlast is a **premium burger franchise** built for entrepreneurs who want quality food service and strong brand recognition.',
      'The brand combines **premium ingredients** with standardized recipes, ensuring consistent quality across all locations.',
      'With centralized supply chain and marketing support, partners gain **operational excellence** from day one.',
      'Its focus on quality and customer experience helps investors build **long-term brand loyalty** and repeat business.',
    ],
    financialHighlights: {
      investmentRange: '$100K - $250K',
      areaRequired: '1000 - 1500 sq ft',
      franchiseFee: '$25K',
    },
    financialTable: [
      { storeSize: 'Express (800-1000 sq ft)', investmentCost: '$80K - $120K', royaltyFees: '5%', franchiseFees: '$20K' },
      { storeSize: 'Standard (1000-1500 sq ft)', investmentCost: '$100K - $250K', royaltyFees: '6%', franchiseFees: '$25K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$200K - $350K', royaltyFees: '7%', franchiseFees: '$35K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise owned and company operated, ideal for passive investors.' },
      { name: 'FOFO', description: 'Franchise owned and franchise operated, perfect for hands-on operators.' },
      { name: 'Multi-Unit', description: 'Multiple locations for experienced operators seeking expansion.' },
    ],
    whyChoose: [
      { title: 'Premium Brand Recognition', description: 'Strong brand identity that attracts quality-conscious customers.' },
      { title: 'Quality Supply Chain', description: 'Premium ingredients sourced from trusted suppliers.' },
      { title: 'Proven Business Model', description: 'Successful track record across multiple markets.' },
      { title: 'Comprehensive Training', description: 'Extensive operational and management training programs.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development', 'Master Franchise'],
    operationsReturns: {
      roi: '35% projected annual ROI',
      payback: '18-24 months payback window',
      hours: '8-10 management hours per day',
      staff: '12-20 staff members per outlet',
    },
    expansionPlans: ['North India', 'South India', 'East India', 'West India', 'Central India'],
    requirements: [
      { label: 'Property Type', value: 'High-traffic retail centers / shopping malls / downtown locations' },
      { label: 'Space Requirement', value: 'Minimum 1000 sq ft with kitchen ventilation and parking' },
    ],
    trainingSupport: ['4-week training program', 'Operations manual', 'Marketing support', 'Ongoing consulting'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with renewal options' },
      { label: 'Legal Agreement', value: 'Comprehensive franchise agreement with brand standards' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'All financial numbers are indicative and vary by location, market conditions, and operational efficiency. Final projections provided during due diligence.',
  },
  2: {
    name: 'FitLife Gym',
    status: 'Verified',
    badge: 'High ROI',
    tagline: 'A premium fitness franchise focused on health and wellness.',
    banner:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1600&q=80',
    ],
    keyInfo: {
      investment: '$150K - $300K',
      space: '3000 - 5000 sq ft',
      roi: '40%',
      payback: '24 months',
      outlets: '15+',
    },
    overview:
      'FitLife Gym offers a comprehensive fitness experience with modern equipment, personal training services, and wellness programs in growing suburban areas.',
    businessModel:
      'Franchise model: FICO with hybrid support. Central team provides equipment sourcing, staff training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$35K' },
      { label: 'Equipment & Setup', value: '$120K' },
      { label: 'Interior & Branding', value: '$45K' },
      { label: 'Working Capital', value: '$30K - $80K' },
    ],
    locations: ['Pune', 'Kolkata', 'Jaipur', 'Lucknow', 'Indore'],
    faqs: [
      {
        q: 'Do I need fitness industry experience?',
        a: 'No. We provide comprehensive training in fitness operations, management, and customer service.',
      },
      {
        q: 'What kind of support is provided?',
        a: 'Full support including equipment selection, staff hiring, marketing campaigns, and operational guidance.',
      },
    ],
    reviews: [
      { name: 'Mike R', rating: 5, text: 'Great business model with strong recurring revenue. Excellent support from corporate team.' },
      { name: 'Lisa T', rating: 5, text: 'Premium equipment and facilities. Members love the atmosphere and services.' },
    ],
    aboutBrand: [
      'FitLife Gym is a **premium fitness franchise** designed for health-conscious entrepreneurs who want quality facilities.',
      'The brand combines **modern equipment** with personalized services, creating a comprehensive wellness experience.',
      'With centralized equipment sourcing and training programs, partners gain **operational excellence** from launch.',
      'Its focus on member retention and service quality helps investors build **stable, recurring revenue** streams.',
    ],
    financialHighlights: {
      investmentRange: '$150K - $300K',
      areaRequired: '3000 - 5000 sq ft',
      franchiseFee: '$35K',
    },
    financialTable: [
      { storeSize: 'Studio (2000-3000 sq ft)', investmentCost: '$120K - $200K', royaltyFees: '6%', franchiseFees: '$30K' },
      { storeSize: 'Standard (3000-5000 sq ft)', investmentCost: '$150K - $300K', royaltyFees: '7%', franchiseFees: '$35K' },
      { storeSize: 'Flagship (5000+ sq ft)', investmentCost: '$250K - $400K', royaltyFees: '8%', franchiseFees: '$45K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for semi-passive investors.' },
      { name: 'FOFO', description: 'Full franchise ownership for hands-on fitness entrepreneurs.' },
      { name: 'Multi-Unit', description: 'Multiple locations for experienced fitness operators.' },
    ],
    whyChoose: [
      { title: 'Growing Fitness Market', description: 'Increasing health consciousness driving demand for quality gyms.' },
      { title: 'Premium Equipment', description: 'State-of-the-art fitness equipment and facilities.' },
      { title: 'Recurring Revenue', description: 'Membership-based model with predictable monthly income.' },
      { title: 'Operational Support', description: 'Comprehensive training and ongoing business guidance.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '40% projected annual ROI',
      payback: '24-30 months payback window',
      hours: '10-15 management hours per week',
      staff: '8-15 staff members per location',
    },
    expansionPlans: ['North India', 'West India', 'South India', 'East India'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / office complexes / residential communities' },
      { label: 'Space Requirement', value: 'Minimum 3000 sq ft with parking and accessibility' },
    ],
    trainingSupport: ['6-week training program', 'Operations manual', 'Marketing toolkit', 'Equipment procurement'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with performance milestones' },
      { label: 'Legal Agreement', value: 'Comprehensive fitness franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Financial projections vary by location, demographics, and operational efficiency. Detailed analysis provided during due diligence.',
  },
  // Add more franchises here...
  3: {
    name: 'EcoClean Solutions',
    status: 'New',
    badge: 'Eco-Friendly',
    tagline: 'Sustainable cleaning services for environmentally conscious businesses.',
    banner:
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    ],
    keyInfo: {
      investment: '$50K - $150K',
      space: '500 - 800 sq ft',
      roi: '28%',
      payback: '15 months',
      outlets: '8+',
    },
    overview:
      'EcoClean Solutions provides environmentally friendly cleaning services using green products and sustainable practices for commercial and residential clients.',
    businessModel:
      'Franchise model: FOCO with mobile operations. Central team provides eco-friendly products, training, marketing, and client acquisition support.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$15K' },
      { label: 'Equipment & Supplies', value: '$25K' },
      { label: 'Vehicle & Setup', value: '$20K' },
      { label: 'Working Capital', value: '$10K - $30K' },
    ],
    locations: ['Bangalore', 'Pune', 'Gurgaon', 'Noida', 'Chandigarh'],
    faqs: [
      {
        q: 'Do I need cleaning experience?',
        a: 'No. We provide comprehensive training in eco-friendly cleaning techniques and business operations.',
      },
      {
        q: 'Is this a mobile business?',
        a: 'Yes. Most operations are mobile with minimal office space required, reducing overhead costs.',
      },
    ],
    reviews: [
      { name: 'Green Earth Co', rating: 5, text: 'Excellent eco-friendly services. Our clients love the sustainable approach.' },
      { name: 'Jennifer L', rating: 5, text: 'Great business model with low overhead and strong demand for green services.' },
    ],
    aboutBrand: [
      'EcoClean Solutions is an **eco-friendly cleaning franchise** built for environmentally conscious entrepreneurs.',
      'The brand combines **green cleaning products** with sustainable practices, appealing to environmentally aware clients.',
      'With mobile operations and centralized support, partners gain **flexible business models** with low overhead.',
      'Its focus on sustainability and quality helps investors build **reputation-based businesses** with loyal client bases.',
    ],
    financialHighlights: {
      investmentRange: '$50K - $150K',
      areaRequired: '500 - 800 sq ft',
      franchiseFee: '$15K',
    },
    financialTable: [
      { storeSize: 'Mobile Only', investmentCost: '$40K - $80K', royaltyFees: '5%', franchiseFees: '$12K' },
      { storeSize: 'Mobile + Small Office', investmentCost: '$50K - $120K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Mobile + Full Office', investmentCost: '$80K - $180K', royaltyFees: '7%', franchiseFees: '$20K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise owned with company operations, perfect for passive investors.' },
      { name: 'FOFO', description: 'Full franchise ownership for hands-on cleaning entrepreneurs.' },
      { name: 'Mobile Only', description: 'Low-cost mobile operations with minimal overhead.' },
    ],
    whyChoose: [
      { title: 'Growing Green Market', description: 'Increasing demand for eco-friendly services across all sectors.' },
      { title: 'Low Overhead', description: 'Mobile operations reduce fixed costs and increase profitability.' },
      { title: 'Recurring Revenue', description: 'Commercial contracts provide stable monthly income.' },
      { title: 'Environmental Impact', description: 'Make a positive environmental impact while building your business.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '28% projected annual ROI',
      payback: '15-20 months payback window',
      hours: '15-25 hours per week',
      staff: '2-6 staff members per location',
    },
    expansionPlans: ['North India', 'South India', 'East India', 'West India'],
    requirements: [
      { label: 'Property Type', value: 'Home-based operations with optional small office space' },
      { label: 'Space Requirement', value: '500-800 sq ft for office and storage, mobile operations' },
    ],
    trainingSupport: ['2-week certification program', 'Eco-friendly product training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with renewal options' },
      { label: 'Legal Agreement', value: 'Comprehensive green services franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Investment requirements vary by market size and operational model. Detailed financial analysis provided during application process.',
  },
  // Continue with more franchises...
  4: {
    name: 'TechTutor Education',
    status: 'Trending',
    badge: 'Education Leader',
    tagline: 'Technology-focused tutoring for the next generation.',
    banner:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$75K - $200K',
      space: '800 - 1200 sq ft',
      roi: '32%',
      payback: '18 months',
      outlets: '12+',
    },
    overview:
      'TechTutor Education provides specialized technology tutoring services including coding, robotics, and digital literacy for students of all ages.',
    businessModel:
      'Franchise model: FOFO with curriculum support. Central team provides educational materials, teacher training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Setup & Technology', value: '$40K' },
      { label: 'Curriculum & Materials', value: '$25K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'],
    faqs: [
      {
        q: 'Do I need teaching experience?',
        a: 'No. We provide comprehensive teacher training and curriculum support for all backgrounds.',
      },
      {
        q: 'What subjects are covered?',
        a: 'Coding, robotics, digital literacy, web development, and emerging technologies.',
      },
    ],
    reviews: [
      { name: 'Tech Parents', rating: 5, text: 'Excellent curriculum and teachers. Kids love learning technology here.' },
      { name: 'David K', rating: 5, text: 'Great business model with strong demand. Parents value tech education.' },
    ],
    aboutBrand: [
      'TechTutor Education is a **technology education franchise** built for the digital age.',
      'The brand combines **cutting-edge curriculum** with experienced instructors, preparing students for tech careers.',
      'With centralized curriculum development and training, partners gain **educational excellence** from day one.',
      'Its focus on practical skills and industry relevance helps investors build **future-proof education businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$75K - $200K',
      areaRequired: '800 - 1200 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Learning Center (800-1000 sq ft)', investmentCost: '$60K - $120K', royaltyFees: '6%', franchiseFees: '$18K' },
      { storeSize: 'Standard (1000-1200 sq ft)', investmentCost: '$75K - $200K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (1200+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for education entrepreneurs.' },
      { name: 'Multi-Unit', description: 'Multiple locations for experienced education operators.' },
      { name: 'Online + Physical', description: 'Hybrid model combining online and in-person instruction.' },
    ],
    whyChoose: [
      { title: 'Growing Tech Education', description: 'Increasing demand for technology skills across all age groups.' },
      { title: 'Proven Curriculum', description: 'Industry-tested curriculum with regular updates.' },
      { title: 'Multiple Revenue Streams', description: 'Group classes, private tutoring, and online programs.' },
      { title: 'Educational Impact', description: 'Make a positive impact on students\' futures.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development', 'Online License'],
    operationsReturns: {
      roi: '32% projected annual ROI',
      payback: '18-24 months payback window',
      hours: '20-30 hours per week',
      staff: '3-8 instructors per location',
    },
    expansionPlans: ['Metro Cities', 'Tier 2 Cities', 'Educational Hubs', 'Online Platforms'],
    requirements: [
      { label: 'Property Type', value: 'Educational centers / community spaces / retail locations' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with classroom setup and technology' },
    ],
    trainingSupport: ['4-week teacher certification', 'Curriculum training', 'Marketing support', 'Technology setup'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with educational compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive education franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, demographics, and educational demand. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 5-24 with similar detailed structure...
  // For brevity, I'll add a few more key ones and note that the pattern continues
  5: {
    name: 'QuickClean Services',
    status: 'High ROI',
    badge: 'Service Leader',
    tagline: 'Professional cleaning services for commercial and residential clients.',
    banner:
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$30K - $80K',
      space: '400 - 600 sq ft',
      roi: '45%',
      payback: '12 months',
      outlets: '20+',
    },
    overview:
      'QuickClean Services provides professional cleaning solutions with a focus on quality, reliability, and customer satisfaction across residential and commercial markets.',
    businessModel:
      'Franchise model: FICO with mobile operations. Central team provides cleaning supplies, training, scheduling software, and marketing support.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$10K' },
      { label: 'Equipment & Supplies', value: '$20K' },
      { label: 'Vehicle Setup', value: '$15K' },
      { label: 'Working Capital', value: '$8K - $20K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Is cleaning experience required?',
        a: 'No. We provide comprehensive training in professional cleaning techniques and business management.',
      },
      {
        q: 'What kind of clients can I expect?',
        a: 'Both residential and commercial clients, including offices, retail spaces, and homes.',
      },
    ],
    reviews: [
      { name: 'Office Manager', rating: 5, text: 'Reliable and professional service. Great attention to detail.' },
      { name: 'Maria G', rating: 5, text: 'Excellent business model with strong demand and good profit margins.' },
    ],
    aboutBrand: [
      'QuickClean Services is a **professional cleaning franchise** built for service-oriented entrepreneurs.',
      'The brand combines **quality standards** with efficient operations, ensuring consistent service delivery.',
      'With mobile operations and centralized support, partners gain **business flexibility** with low overhead.',
      'Its focus on customer satisfaction and reliability helps investors build **referral-based businesses** with steady growth.',
    ],
    financialHighlights: {
      investmentRange: '$30K - $80K',
      areaRequired: '400 - 600 sq ft',
      franchiseFee: '$10K',
    },
    financialTable: [
      { storeSize: 'Mobile Only', investmentCost: '$25K - $40K', royaltyFees: '5%', franchiseFees: '$8K' },
      { storeSize: 'Mobile + Small Office', investmentCost: '$30K - $60K', royaltyFees: '6%', franchiseFees: '$10K' },
      { storeSize: 'Mobile + Full Office', investmentCost: '$50K - $100K', royaltyFees: '7%', franchiseFees: '$15K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'FOFO', description: 'Full franchise ownership for hands-on service entrepreneurs.' },
      { name: 'Mobile Only', description: 'Low-cost mobile operations with maximum flexibility.' },
    ],
    whyChoose: [
      { title: 'High Demand Service', description: 'Consistent demand for professional cleaning services.' },
      { title: 'Low Startup Costs', description: 'Minimal investment required compared to other franchises.' },
      { title: 'Recurring Revenue', description: 'Regular cleaning contracts provide stable income.' },
      { title: 'Quick ROI', description: 'Fast payback period with high profit margins.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '45% projected annual ROI',
      payback: '12-18 months payback window',
      hours: '20-30 hours per week',
      staff: '2-8 staff members per location',
    },
    expansionPlans: ['North India', 'South India', 'East India', 'West India'],
    requirements: [
      { label: 'Property Type', value: 'Home-based operations with optional small office space' },
      { label: 'Space Requirement', value: '400-600 sq ft for office and storage, mobile operations' },
    ],
    trainingSupport: ['2-week certification program', 'Cleaning techniques training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with renewal options' },
      { label: 'Legal Agreement', value: 'Comprehensive service franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Investment requirements vary by market size and service area. Detailed financial analysis provided during application process.',
  },
  6: {
    name: 'TechRepair Pro',
    status: 'New',
    badge: 'Tech Services',
    tagline: 'Professional electronics repair and tech support services.',
    banner:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$40K - $120K',
      space: '600 - 1000 sq ft',
      roi: '38%',
      payback: '16 months',
      outlets: '10+',
    },
    overview:
      'TechRepair Pro specializes in smartphone, computer, and electronics repair with certified technicians and quality parts guarantee.',
    businessModel:
      'Franchise model: FOFO with technical support. Central team provides training, parts supply, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$12K' },
      { label: 'Equipment & Tools', value: '$30K' },
      { label: 'Inventory & Parts', value: '$25K' },
      { label: 'Working Capital', value: '$10K - $25K' },
    ],
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Noida'],
    faqs: [
      {
        q: 'Do I need technical experience?',
        a: 'No. We provide comprehensive technical training and certification programs.',
      },
      {
        q: 'What devices can I repair?',
        a: 'Smartphones, tablets, laptops, computers, and other consumer electronics.',
      },
    ],
    reviews: [
      { name: 'Tech Customer', rating: 5, text: 'Fast and reliable repair service. Great customer support.' },
      { name: 'Alex T', rating: 5, text: 'Excellent training program and strong technical support from corporate.' },
    ],
    aboutBrand: [
      'TechRepair Pro is a **professional electronics repair franchise** built for tech-savvy entrepreneurs.',
      'The brand combines **certified technicians** with quality parts, ensuring reliable repair services.',
      'With centralized training and parts supply, partners gain **technical excellence** from day one.',
      'Its focus on customer service and quality helps investors build **trust-based businesses** with repeat clients.',
    ],
    financialHighlights: {
      investmentRange: '$40K - $120K',
      areaRequired: '600 - 1000 sq ft',
      franchiseFee: '$12K',
    },
    financialTable: [
      { storeSize: 'Kiosk (400-600 sq ft)', investmentCost: '$35K - $60K', royaltyFees: '5%', franchiseFees: '$10K' },
      { storeSize: 'Standard (600-1000 sq ft)', investmentCost: '$40K - $120K', royaltyFees: '6%', franchiseFees: '$12K' },
      { storeSize: 'Flagship (1000+ sq ft)', investmentCost: '$80K - $180K', royaltyFees: '7%', franchiseFees: '$20K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on tech entrepreneurs.' },
      { name: 'Mobile + Shop', description: 'Combined mobile and shop-based repair services.' },
      { name: 'Multi-Unit', description: 'Multiple locations for experienced tech operators.' },
    ],
    whyChoose: [
      { title: 'Growing Tech Market', description: 'Increasing reliance on electronics drives repair demand.' },
      { title: 'Technical Training', description: 'Comprehensive certification and ongoing technical support.' },
      { title: 'Multiple Revenue Streams', description: 'Repair services, parts sales, and tech support.' },
      { title: 'Quality Parts Supply', description: 'Access to genuine parts and components at competitive prices.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '38% projected annual ROI',
      payback: '16-20 months payback window',
      hours: '30-40 hours per week',
      staff: '2-6 technicians per location',
    },
    expansionPlans: ['IT Cities', 'Educational Hubs', 'Shopping Malls', 'Business Centers'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / tech districts / retail locations' },
      { label: 'Space Requirement', value: 'Minimum 600 sq ft with workbenches and storage' },
    ],
    trainingSupport: ['6-week technical certification', 'Operations manual', 'Marketing support', 'Parts procurement'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with technical compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive tech services franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, tech demand, and service quality. Detailed projections provided during due diligence.',
  },
  7: {
    name: 'EduLearn Center',
    status: 'Growing',
    badge: 'Education Plus',
    tagline: 'Comprehensive education center for all age groups.',
    banner:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$60K - $150K',
      space: '1200 - 2000 sq ft',
      roi: '30%',
      payback: '24 months',
      outlets: '15+',
    },
    overview:
      'EduLearn Center provides comprehensive educational services including tutoring, test prep, and enrichment programs for students of all ages.',
    businessModel:
      'Franchise model: FOCO with educational support. Central team provides curriculum, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$18K' },
      { label: 'Setup & Furnishings', value: '$35K' },
      { label: 'Educational Materials', value: '$25K' },
      { label: 'Working Capital', value: '$12K - $35K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
    faqs: [
      {
        q: 'Do I need teaching experience?',
        a: 'No. We provide comprehensive training in educational methods and business operations.',
      },
      {
        q: 'What subjects are offered?',
        a: 'Math, science, English, test prep, and enrichment programs for all age groups.',
      },
    ],
    reviews: [
      { name: 'Parent Review', rating: 5, text: 'Excellent educational programs and caring instructors.' },
      { name: 'Robert M', rating: 5, text: 'Great business model with strong community impact and steady revenue.' },
    ],
    aboutBrand: [
      'EduLearn Center is a **comprehensive education franchise** built for passionate educators.',
      'The brand combines **proven curricula** with experienced instructors, creating effective learning environments.',
      'With centralized educational resources and training, partners gain **teaching excellence** from launch.',
      'Its focus on student success and community involvement helps investors build **reputable education businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$60K - $150K',
      areaRequired: '1200 - 2000 sq ft',
      franchiseFee: '$18K',
    },
    financialTable: [
      { storeSize: 'Learning Center (1000-1500 sq ft)', investmentCost: '$50K - $100K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Standard (1500-2000 sq ft)', investmentCost: '$60K - $150K', royaltyFees: '7%', franchiseFees: '$18K' },
      { storeSize: 'Flagship (2000+ sq ft)', investmentCost: '$120K - $250K', royaltyFees: '8%', franchiseFees: '$25K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'FOFO', description: 'Full franchise ownership for hands-on education entrepreneurs.' },
      { name: 'Multi-Subject', description: 'Multiple educational programs and services.' },
    ],
    whyChoose: [
      { title: 'Growing Education Market', description: 'Increasing demand for quality educational services.' },
      { title: 'Proven Curriculum', description: 'Tested educational programs with proven results.' },
      { title: 'Multiple Revenue Streams', description: 'Tutoring, test prep, and enrichment programs.' },
      { title: 'Community Impact', description: 'Make a positive impact on student achievement.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '30% projected annual ROI',
      payback: '24-30 months payback window',
      hours: '25-35 hours per week',
      staff: '4-10 instructors per location',
    },
    expansionPlans: ['North India', 'East India', 'South India', 'West India'],
    requirements: [
      { label: 'Property Type', value: 'Educational centers / community spaces / retail locations' },
      { label: 'Space Requirement', value: 'Minimum 1200 sq ft with classroom setup and technology' },
    ],
    trainingSupport: ['4-week teacher certification', 'Curriculum training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with educational compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive education franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, demographics, and educational demand. Detailed projections provided during due diligence.',
  },
  8: {
    name: 'StyleSalon',
    status: 'Popular',
    badge: 'Beauty Leader',
    tagline: 'Premium beauty salon and spa services.',
    banner:
      'https://images.unsplash.com/photo-1560066988-a4f3a1b1b4b8?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$45K - $120K',
      space: '800 - 1500 sq ft',
      roi: '33%',
      payback: '18 months',
      outlets: '20+',
    },
    overview:
      'StyleSalon offers premium beauty services including hair styling, nail care, and spa treatments in upscale locations.',
    businessModel:
      'Franchise model: FOFO with beauty support. Central team provides training, product supply, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$15K' },
      { label: 'Salon Equipment', value: '$35K' },
      { label: 'Products & Supplies', value: '$20K' },
      { label: 'Working Capital', value: '$10K - $30K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need beauty industry experience?',
        a: 'No. We provide comprehensive training in beauty services and salon management.',
      },
      {
        q: 'What services are offered?',
        a: 'Hair styling, coloring, nail care, skincare, and spa treatments.',
      },
    ],
    reviews: [
      { name: 'Beauty Client', rating: 5, text: 'Excellent services and beautiful salon atmosphere.' },
      { name: 'Lisa W', rating: 5, text: 'Great business model with strong repeat customer base and premium pricing.' },
    ],
    aboutBrand: [
      'StyleSalon is a **premium beauty franchise** built for beauty industry entrepreneurs.',
      'The brand combines **quality services** with upscale environments, creating luxury beauty experiences.',
      'With centralized training and product supply, partners gain **beauty excellence** from day one.',
      'Its focus on customer satisfaction and quality helps investors build **premium beauty businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$45K - $120K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$15K',
    },
    financialTable: [
      { storeSize: 'Express (600-800 sq ft)', investmentCost: '$35K - $60K', royaltyFees: '5%', franchiseFees: '$12K' },
      { storeSize: 'Standard (800-1500 sq ft)', investmentCost: '$45K - $120K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$100K - $200K', royaltyFees: '7%', franchiseFees: '$25K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on beauty entrepreneurs.' },
      { name: 'Express Salon', description: 'Focused services with smaller footprint and lower investment.' },
      { name: 'Full Service', description: 'Comprehensive beauty and spa services.' },
    ],
    whyChoose: [
      { title: 'Growing Beauty Market', description: 'Increasing demand for premium beauty services.' },
      { title: 'Premium Branding', description: 'Luxury brand positioning attracts quality clients.' },
      { title: 'Recurring Revenue', description: 'Regular clients provide stable monthly income.' },
      { title: 'Product Sales', description: 'Additional revenue from retail product sales.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '33% projected annual ROI',
      payback: '18-24 months payback window',
      hours: '35-45 hours per week',
      staff: '4-12 beauty professionals per location',
    },
    expansionPlans: ['Metro Cities', 'Tourist Areas', 'Urban Centers', 'Shopping Districts'],
    requirements: [
      { label: 'Property Type', value: 'Upscale shopping centers / luxury retail / downtown locations' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with salon setup and ventilation' },
    ],
    trainingSupport: ['6-week beauty certification', 'Product training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with beauty compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive beauty franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, demographics, and service quality. Detailed projections provided during due diligence.',
  },
  // Continue with franchises 9-24...
  9: {
    name: 'PetParadise',
    status: 'Trending',
    badge: 'Pet Services',
    tagline: 'Premium pet care and grooming services.',
    banner:
      'https://images.unsplash.com/photo-1601758228041-f3be275a173f?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$80K - $200K',
      space: '1000 - 2000 sq ft',
      roi: '36%',
      payback: '20 months',
      outlets: '12+',
    },
    overview:
      'PetParadise provides comprehensive pet services including grooming, boarding, daycare, and retail products for pet owners.',
    businessModel:
      'Franchise model: FICO with pet care support. Central team provides training, product supply, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Grooming Equipment', value: '$45K' },
      { label: 'Facility Setup', value: '$35K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need pet care experience?',
        a: 'No. We provide comprehensive training in pet care services and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Pet grooming, boarding, daycare, training, and retail products.',
      },
    ],
    reviews: [
      { name: 'Pet Owner', rating: 5, text: 'Excellent care and services. My pets love coming here.' },
      { name: 'Jessica R', rating: 5, text: 'Great business model with passionate pet lovers and strong demand.' },
    ],
    aboutBrand: [
      'PetParadise is a **premium pet care franchise** built for passionate pet entrepreneurs.',
      'The brand combines **quality pet services** with caring environments, creating trusted pet care experiences.',
      'With centralized training and product supply, partners gain **pet care excellence** from day one.',
      'Its focus on pet welfare and customer service helps investors build **trusted pet businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$80K - $200K',
      areaRequired: '1000 - 2000 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Grooming Only (800-1200 sq ft)', investmentCost: '$60K - $100K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Full Service (1200-2000 sq ft)', investmentCost: '$80K - $200K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (2000+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'FOFO', description: 'Full franchise ownership for hands-on pet entrepreneurs.' },
      { name: 'Grooming Focus', description: 'Specialized grooming services with lower investment.' },
    ],
    whyChoose: [
      { title: 'Growing Pet Market', description: 'Increasing pet ownership and spending on pet care.' },
      { title: 'Multiple Revenue Streams', description: 'Grooming, boarding, daycare, and retail sales.' },
      { title: 'Recurring Revenue', description: 'Regular clients provide stable monthly income.' },
      { title: 'Passion-Driven Business', description: 'Build a business around your love for animals.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '36% projected annual ROI',
      payback: '20-24 months payback window',
      hours: '40-50 hours per week',
      staff: '4-10 pet care professionals per location',
    },
    expansionPlans: ['Metro Cities', 'Tier 2 Cities', 'Urban Centers', 'Resort Areas'],
    requirements: [
      { label: 'Property Type', value: 'Pet-friendly retail centers / standalone locations' },
      { label: 'Space Requirement', value: 'Minimum 1000 sq ft with grooming setup and ventilation' },
    ],
    trainingSupport: ['6-week pet care certification', 'Grooming training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with pet care compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive pet care franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, pet demographics, and service quality. Detailed projections provided during due diligence.',
  },
  10: {
    name: 'AutoCare Express',
    status: 'New',
    badge: 'Auto Services',
    tagline: 'Professional automotive care and maintenance services.',
    banner:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$35K - $100K',
      space: '800 - 1500 sq ft',
      roi: '42%',
      payback: '18 months',
      outlets: '15+',
    },
    overview:
      'AutoCare Express provides comprehensive automotive services including oil changes, maintenance, and detailing for vehicle owners.',
    businessModel:
      'Franchise model: FOCO with automotive support. Central team provides equipment, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$15K' },
      { label: 'Equipment & Tools', value: '$40K' },
      { label: 'Facility Setup', value: '$25K' },
      { label: 'Working Capital', value: '$10K - $25K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need automotive experience?',
        a: 'No. We provide comprehensive training in automotive services and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Oil changes, maintenance, detailing, and basic automotive repairs.',
      },
    ],
    reviews: [
      { name: 'Car Owner', rating: 5, text: 'Excellent service and professional staff. Great value for money.' },
      { name: 'Raj K', rating: 5, text: 'Great business model with steady demand and good profit margins.' },
    ],
    aboutBrand: [
      'AutoCare Express is a **professional automotive franchise** built for car care entrepreneurs.',
      'The brand combines **quality services** with convenient locations, creating trusted automotive care experiences.',
      'With centralized training and equipment supply, partners gain **automotive excellence** from day one.',
      'Its focus on customer service and quality helps investors build **trusted automotive businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$35K - $100K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$15K',
    },
    financialTable: [
      { storeSize: 'Express (600-800 sq ft)', investmentCost: '$30K - $60K', royaltyFees: '5%', franchiseFees: '$12K' },
      { storeSize: 'Standard (800-1500 sq ft)', investmentCost: '$35K - $100K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Full Service (1500+ sq ft)', investmentCost: '$80K - $150K', royaltyFees: '7%', franchiseFees: '$25K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Express Service', description: 'Focused automotive services with smaller footprint.' },
      { name: 'Full Service', description: 'Comprehensive automotive care and maintenance services.' },
    ],
    whyChoose: [
      { title: 'Growing Auto Market', description: 'Increasing vehicle ownership drives service demand.' },
      { title: 'Recurring Revenue', description: 'Regular maintenance provides stable monthly income.' },
      { title: 'Technical Training', description: 'Comprehensive automotive service training programs.' },
      { title: 'Equipment Support', description: 'Access to professional automotive equipment and tools.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '42% projected annual ROI',
      payback: '18-24 months payback window',
      hours: '40-50 hours per week',
      staff: '3-8 technicians per location',
    },
    expansionPlans: ['North India', 'West India', 'South India', 'East India'],
    requirements: [
      { label: 'Property Type', value: 'Service centers / retail areas / automotive districts' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with service bays and equipment' },
    ],
    trainingSupport: ['6-week automotive certification', 'Operations manual', 'Marketing support', 'Equipment procurement'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with automotive compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive automotive franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, vehicle demographics, and service quality. Detailed projections provided during due diligence.',
  },
  11: {
    name: 'CoffeeHaven',
    status: 'Popular',
    badge: 'Beverage Leader',
    tagline: 'Premium coffee and beverage experience.',
    banner:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$120K - $300K',
      space: '800 - 1500 sq ft',
      roi: '25%',
      payback: '30 months',
      outlets: '20+',
    },
    overview:
      'CoffeeHaven offers premium coffee beverages and light food items in upscale locations with focus on quality and ambiance.',
    businessModel:
      'Franchise model: FOFO with beverage support. Central team provides training, supply chain, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$25K' },
      { label: 'Equipment & Setup', value: '$80K' },
      { label: 'Interior & Branding', value: '$40K' },
      { label: 'Working Capital', value: '$20K - $50K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    faqs: [
      {
        q: 'Do I need food & beverage experience?',
        a: 'No. We provide comprehensive training in coffee preparation and business operations.',
      },
      {
        q: 'What products are offered?',
        a: 'Premium coffee, specialty beverages, pastries, and light food items.',
      },
    ],
    reviews: [
      { name: 'Coffee Lover', rating: 5, text: 'Excellent coffee and great atmosphere. My daily stop!' },
      { name: 'Priya S', rating: 5, text: 'Great business model with strong brand recognition and loyal customers.' },
    ],
    aboutBrand: [
      'CoffeeHaven is a **premium coffee franchise** built for beverage entrepreneurs.',
      'The brand combines **quality coffee** with upscale environments, creating premium beverage experiences.',
      'With centralized training and supply chain, partners gain **coffee excellence** from day one.',
      'Its focus on quality and ambiance helps investors build **premium coffee businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$120K - $300K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$25K',
    },
    financialTable: [
      { storeSize: 'Kiosk (400-600 sq ft)', investmentCost: '$80K - $150K', royaltyFees: '5%', franchiseFees: '$20K' },
      { storeSize: 'Cafe (800-1500 sq ft)', investmentCost: '$120K - $300K', royaltyFees: '6%', franchiseFees: '$25K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$200K - $400K', royaltyFees: '7%', franchiseFees: '$35K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on coffee entrepreneurs.' },
      { name: 'Kiosk Model', description: 'Compact coffee service with lower investment.' },
      { name: 'Full Cafe', description: 'Complete coffee and food service experience.' },
    ],
    whyChoose: [
      { title: 'Growing Coffee Market', description: 'Increasing coffee consumption and premium demand.' },
      { title: 'Brand Recognition', description: 'Strong brand identity and customer loyalty.' },
      { title: 'Recurring Revenue', description: 'Regular customers provide stable daily income.' },
      { title: 'Supply Chain Support', description: 'Access to premium coffee beans and supplies.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '25% projected annual ROI',
      payback: '30-36 months payback window',
      hours: '50-60 hours per week',
      staff: '6-12 baristas per location',
    },
    expansionPlans: ['Metro Cities', 'Urban Centers', 'Shopping Districts', 'Business Areas'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / office complexes / downtown locations' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with coffee setup and seating' },
    ],
    trainingSupport: ['4-week barista certification', 'Operations manual', 'Marketing support', 'Supply chain'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with beverage compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive coffee franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, foot traffic, and service quality. Detailed projections provided during due diligence.',
  },
  12: {
    name: 'GreenThumb Garden',
    status: 'New',
    badge: 'Garden Services',
    tagline: 'Professional gardening and landscaping services.',
    banner:
      'https://images.unsplash.com/photo-1585859608211-45b8c5d3d4b6?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$25K - $75K',
      space: '500 - 1000 sq ft',
      roi: '40%',
      payback: '15 months',
      outlets: '10+',
    },
    overview:
      'GreenThumb Garden provides professional gardening, landscaping, and outdoor maintenance services for residential and commercial clients.',
    businessModel:
      'Franchise model: FICO with garden support. Central team provides equipment, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$10K' },
      { label: 'Equipment & Tools', value: '$20K' },
      { label: 'Vehicle Setup', value: '$15K' },
      { label: 'Working Capital', value: '$8K - $20K' },
    ],
    locations: ['Bangalore', 'Pune', 'Delhi', 'Mumbai', 'Chennai'],
    faqs: [
      {
        q: 'Do I need gardening experience?',
        a: 'No. We provide comprehensive training in landscaping techniques and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Garden design, maintenance, landscaping, and outdoor care services.',
      },
    ],
    reviews: [
      { name: 'Home Owner', rating: 5, text: 'Excellent gardening service. My garden looks amazing!' },
      { name: 'Anita M', rating: 5, text: 'Great business model with seasonal demand and good profit margins.' },
    ],
    aboutBrand: [
      'GreenThumb Garden is a **professional gardening franchise** built for outdoor service entrepreneurs.',
      'The brand combines **quality landscaping** with customer service, creating beautiful outdoor experiences.',
      'With centralized training and equipment supply, partners gain **gardening excellence** from day one.',
      'Its focus on quality and service helps investors build **trusted garden businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$25K - $75K',
      areaRequired: '500 - 1000 sq ft',
      franchiseFee: '$10K',
    },
    financialTable: [
      { storeSize: 'Mobile (0-500 sq ft)', investmentCost: '$20K - $40K', royaltyFees: '5%', franchiseFees: '$8K' },
      { storeSize: 'Standard (500-1000 sq ft)', investmentCost: '$25K - $75K', royaltyFees: '6%', franchiseFees: '$10K' },
      { storeSize: 'Full Service (1000+ sq ft)', investmentCost: '$50K - $120K', royaltyFees: '7%', franchiseFees: '$15K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Mobile Service', description: 'Mobile gardening with minimal office space.' },
      { name: 'Garden Center', description: 'Full service garden center with retail space.' },
    ],
    whyChoose: [
      { title: 'Growing Garden Market', description: 'Increasing demand for professional landscaping services.' },
      { title: 'Seasonal Revenue', description: 'Year-round gardening and maintenance services.' },
      { title: 'Low Overhead', description: 'Mobile operations with minimal fixed costs.' },
      { title: 'Customer Satisfaction', description: 'High customer retention and referral business.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '40% projected annual ROI',
      payback: '15-20 months payback window',
      hours: '30-40 hours per week',
      staff: '2-6 gardeners per location',
    },
    expansionPlans: ['Urban Areas', 'Suburban Zones', 'Residential Areas', 'Commercial Properties'],
    requirements: [
      { label: 'Property Type', value: 'Home-based operations with optional garden center' },
      { label: 'Space Requirement', value: '500-1000 sq ft for equipment storage and operations' },
    ],
    trainingSupport: ['4-week gardening certification', 'Operations manual', 'Marketing support', 'Equipment procurement'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with garden compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive garden franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, climate, and service demand. Detailed projections provided during due diligence.',
  },
  // Continue with franchises 13-24...
  13: {
    name: 'SmoothieKing',
    status: 'Growing',
    badge: 'Healthy Beverages',
    tagline: 'Nutritious smoothies and healthy beverages.',
    banner:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$90K - $220K',
      space: '600 - 1200 sq ft',
      roi: '31%',
      payback: '24 months',
      outlets: '18+',
    },
    overview:
      'SmoothieKing offers nutritious smoothies, healthy beverages, and light food options focused on health-conscious consumers.',
    businessModel:
      'Franchise model: FOCO with beverage support. Central team provides recipes, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Equipment & Setup', value: '$50K' },
      { label: 'Interior & Branding', value: '$30K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad'],
    faqs: [
      {
        q: 'Do I need food & beverage experience?',
        a: 'No. We provide comprehensive training in smoothie preparation and business operations.',
      },
      {
        q: 'What products are offered?',
        a: 'Nutritious smoothies, healthy juices, and light food options.',
      },
    ],
    reviews: [
      { name: 'Health Customer', rating: 5, text: 'Great smoothies and healthy options. Love the variety!' },
      { name: 'Vikram S', rating: 5, text: 'Excellent business model with growing health consciousness market.' },
    ],
    aboutBrand: [
      'SmoothieKing is a **healthy beverage franchise** built for health-conscious entrepreneurs.',
      'The brand combines **nutrition focus** with great taste, creating healthy beverage experiences.',
      'With centralized training and recipes, partners gain **beverage excellence** from launch.',
      'Its focus on health and quality helps investors build **trusted healthy businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$90K - $220K',
      areaRequired: '600 - 1200 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Kiosk (400-600 sq ft)', investmentCost: '$60K - $120K', royaltyFees: '5%', franchiseFees: '$15K' },
      { storeSize: 'Standard (600-1200 sq ft)', investmentCost: '$90K - $220K', royaltyFees: '6%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (1200+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '7%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Kiosk Model', description: 'Compact smoothie service with lower investment.' },
      { name: 'Full Service', description: 'Complete healthy beverage and food service.' },
    ],
    whyChoose: [
      { title: 'Growing Health Market', description: 'Increasing health consciousness and wellness trends.' },
      { title: 'Nutrition Focus', description: 'Meeting consumer demand for healthy options.' },
      { title: 'Recurring Revenue', description: 'Regular health-conscious customers.' },
      { title: 'Brand Recognition', description: 'Strong brand in healthy beverage segment.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '31% projected annual ROI',
      payback: '24-30 months payback window',
      hours: '40-50 hours per week',
      staff: '4-8 staff members per location',
    },
    expansionPlans: ['Metro Cities', 'Urban Centers', 'Shopping Malls', 'Gym Locations'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / gyms / health-focused locations' },
      { label: 'Space Requirement', value: 'Minimum 600 sq ft with beverage setup and equipment' },
    ],
    trainingSupport: ['4-week beverage certification', 'Recipe training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with beverage compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive beverage franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, health trends, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 14-24 with similar detailed structure...
  14: {
    name: 'YogaZen Studio',
    status: 'Trending',
    badge: 'Wellness Leader',
    tagline: 'Tranquil yoga and wellness center.',
    banner:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$55K - $150K',
      space: '800 - 1500 sq ft',
      roi: '37%',
      payback: '20 months',
      outlets: '12+',
    },
    overview:
      'YogaZen Studio offers yoga classes, meditation sessions, and wellness programs in peaceful environments.',
    businessModel:
      'Franchise model: FICO with wellness support. Central team provides training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$15K' },
      { label: 'Studio Setup', value: '$30K' },
      { label: 'Equipment & Supplies', value: '$25K' },
      { label: 'Working Capital', value: '$12K - $35K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'],
    faqs: [
      {
        q: 'Do I need yoga experience?',
        a: 'No. We provide comprehensive training in yoga instruction and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Yoga classes, meditation sessions, wellness programs, and workshops.',
      },
    ],
    reviews: [
      { name: 'Yoga Student', rating: 5, text: 'Peaceful environment and excellent instructors. Highly recommend!' },
      { name: 'Deepak R', rating: 5, text: 'Great business model with growing wellness market and loyal clients.' },
    ],
    aboutBrand: [
      'YogaZen Studio is a **wellness franchise** built for yoga and wellness entrepreneurs.',
      'The brand combines **tranquil environments** with quality instruction, creating peaceful wellness experiences.',
      'With centralized training and marketing, partners gain **wellness excellence** from day one.',
      'Its focus on health and tranquility helps investors build **trusted wellness businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$55K - $150K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$15K',
    },
    financialTable: [
      { storeSize: 'Studio (800-1200 sq ft)', investmentCost: '$55K - $120K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Full Studio (1200-1500 sq ft)', investmentCost: '$80K - $150K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$120K - $250K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Yoga Studio', description: 'Focused yoga instruction with wellness programs.' },
      { name: 'Full Wellness', description: 'Complete wellness center with multiple services.' },
    ],
    whyChoose: [
      { title: 'Growing Wellness Market', description: 'Increasing focus on health and wellness.' },
      { title: 'Recurring Revenue', description: 'Membership-based model with predictable income.' },
      { title: 'Low Competition', description: 'Growing market with room for quality providers.' },
      { title: 'Community Building', description: 'Strong customer relationships and loyalty.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '37% projected annual ROI',
      payback: '20-24 months payback window',
      hours: '25-35 hours per week',
      staff: '3-8 instructors per location',
    },
    expansionPlans: ['Urban Centers', 'Suburban Areas', 'Residential Communities', 'Corporate Locations'],
    requirements: [
      { label: 'Property Type', value: 'Wellness centers / community spaces / residential areas' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with yoga setup and changing rooms' },
    ],
    trainingSupport: ['6-week yoga certification', 'Operations manual', 'Marketing support', 'Wellness programs'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with wellness compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive wellness franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, wellness trends, and service quality. Detailed projections provided during due diligence.',
  },
  // Continue with franchises 15-24...
  15: {
    name: 'BookWorm Store',
    status: 'New',
    badge: 'Education Retail',
    tagline: 'Books and educational materials store.',
    banner:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228d39?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$70K - $180K',
      space: '800 - 1500 sq ft',
      roi: '29%',
      payback: '28 months',
      outlets: '8+',
    },
    overview:
      'BookWorm Store offers books, educational materials, and reading spaces for book lovers and students.',
    businessModel:
      'Franchise model: FOFO with retail support. Central team provides inventory, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$18K' },
      { label: 'Store Setup', value: '$40K' },
      { label: 'Initial Inventory', value: '$35K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
    faqs: [
      {
        q: 'Do I need retail experience?',
        a: 'No. We provide comprehensive training in book retail and business operations.',
      },
      {
        q: 'What products are offered?',
        a: 'Books, educational materials, stationery, and reading accessories.',
      },
    ],
    reviews: [
      { name: 'Book Lover', rating: 5, text: 'Great selection and cozy reading atmosphere. Love this store!' },
      { name: 'Sonia K', rating: 5, text: 'Excellent business model with steady demand and good margins.' },
    ],
    aboutBrand: [
      'BookWorm Store is a **book retail franchise** built for book and education entrepreneurs.',
      'The brand combines **quality inventory** with cozy environments, creating reading experiences.',
      'With centralized training and inventory, partners gain **retail excellence** from day one.',
      'Its focus on books and reading helps investors build **community-focused businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$70K - $180K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$18K',
    },
    financialTable: [
      { storeSize: 'Compact (600-800 sq ft)', investmentCost: '$50K - $100K', royaltyFees: '5%', franchiseFees: '$15K' },
      { storeSize: 'Standard (800-1500 sq ft)', investmentCost: '$70K - $180K', royaltyFees: '6%', franchiseFees: '$18K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '7%', franchiseFees: '$25K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on retail entrepreneurs.' },
      { name: 'Compact Store', description: 'Focused book retail with smaller footprint.' },
      { name: 'Full Service', description: 'Complete bookstore with reading spaces and events.' },
    ],
    whyChoose: [
      { title: 'Growing Education Market', description: 'Increasing demand for books and educational materials.' },
      { title: 'Community Building', description: 'Book stores as community gathering places.' },
      { title: 'Steady Demand', description: 'Consistent demand for books and reading materials.' },
      { title: 'Multiple Revenue Streams', description: 'Books, stationery, events, and cafe services.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '29% projected annual ROI',
      payback: '28-36 months payback window',
      hours: '40-50 hours per week',
      staff: '4-8 staff members per location',
    },
    expansionPlans: ['Educational Areas', 'Urban Centers', 'Shopping Districts', 'Community Locations'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / educational areas / community spaces' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with retail setup and reading areas' },
    ],
    trainingSupport: ['4-week retail certification', 'Inventory management', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with retail compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive retail franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, educational demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 16-24...
  16: {
    name: 'CleanSweep Pro',
    status: 'High ROI',
    badge: 'Cleaning Leader',
    tagline: 'Professional commercial cleaning services.',
    banner:
      'https://images.unsplash.com/photo-1584464491433-2240d6b7c57e?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$40K - $110K',
      space: '600 - 1200 sq ft',
      roi: '44%',
      payback: '16 months',
      outlets: '20+',
    },
    overview:
      'CleanSweep Pro provides professional cleaning services for commercial clients including offices, retail spaces, and facilities.',
    businessModel:
      'Franchise model: FOCO with cleaning support. Central team provides equipment, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$12K' },
      { label: 'Equipment & Supplies', value: '$30K' },
      { label: 'Vehicle Setup', value: '$20K' },
      { label: 'Working Capital', value: '$10K - $30K' },
    ],
    locations: ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need cleaning experience?',
        a: 'No. We provide comprehensive training in commercial cleaning and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Commercial cleaning, office maintenance, and facility management services.',
      },
    ],
    reviews: [
      { name: 'Business Client', rating: 5, text: 'Excellent cleaning service and professional staff. Highly reliable!' },
      { name: 'Amit P', rating: 5, text: 'Great business model with recurring revenue and high profit margins.' },
    ],
    aboutBrand: [
      'CleanSweep Pro is a **commercial cleaning franchise** built for cleaning service entrepreneurs.',
      'The brand combines **professional cleaning** with reliable service, creating trusted cleaning experiences.',
      'With centralized training and equipment, partners gain **cleaning excellence** from day one.',
      'Its focus on quality and reliability helps investors build **trusted cleaning businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$40K - $110K',
      areaRequired: '600 - 1200 sq ft',
      franchiseFee: '$12K',
    },
    financialTable: [
      { storeSize: 'Mobile (0-600 sq ft)', investmentCost: '$30K - $60K', royaltyFees: '5%', franchiseFees: '$10K' },
      { storeSize: 'Standard (600-1200 sq ft)', investmentCost: '$40K - $110K', royaltyFees: '6%', franchiseFees: '$12K' },
      { storeSize: 'Full Service (1200+ sq ft)', investmentCost: '$80K - $180K', royaltyFees: '7%', franchiseFees: '$20K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Mobile Service', description: 'Mobile cleaning operations with minimal office space.' },
      { name: 'Full Service', description: 'Complete commercial cleaning and facility management.' },
    ],
    whyChoose: [
      { title: 'Growing Cleaning Market', description: 'Increasing demand for professional cleaning services.' },
      { title: 'Recurring Revenue', description: 'Commercial contracts provide stable monthly income.' },
      { title: 'High Profit Margins', description: 'Commercial cleaning offers excellent profitability.' },
      { title: 'Business Growth', description: 'Scalable model with multiple revenue streams.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '44% projected annual ROI',
      payback: '16-20 months payback window',
      hours: '25-35 hours per week',
      staff: '3-10 cleaning staff per location',
    },
    expansionPlans: ['Business Districts', 'Commercial Areas', 'Office Parks', 'Retail Centers'],
    requirements: [
      { label: 'Property Type', value: 'Office spaces / commercial areas / business districts' },
      { label: 'Space Requirement', value: '600-1200 sq ft for operations and storage' },
    ],
    trainingSupport: ['4-week cleaning certification', 'Operations manual', 'Marketing support', 'Equipment procurement'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with cleaning compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive cleaning franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, commercial demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 17-24...
  17: {
    name: 'CodeAcademy',
    status: 'Popular',
    badge: 'Tech Education',
    tagline: 'Technology and coding education center.',
    banner:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$85K - $200K',
      space: '1000 - 2000 sq ft',
      roi: '34%',
      payback: '22 months',
      outlets: '15+',
    },
    overview:
      'CodeAcademy provides technology education including coding, programming, and digital skills training for students and professionals.',
    businessModel:
      'Franchise model: FICO with education support. Central team provides curriculum, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Setup & Technology', value: '$50K' },
      { label: 'Curriculum & Materials', value: '$30K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'],
    faqs: [
      {
        q: 'Do I need tech education experience?',
        a: 'No. We provide comprehensive training in technology education and business operations.',
      },
      {
        q: 'What courses are offered?',
        a: 'Coding, programming, web development, and digital skills training.',
      },
    ],
    reviews: [
      { name: 'Tech Student', rating: 5, text: 'Excellent coding education and great instructors. Very practical!' },
      { name: 'Rohit M', rating: 5, text: 'Great business model with growing tech education demand.' },
    ],
    aboutBrand: [
      'CodeAcademy is a **tech education franchise** built for technology education entrepreneurs.',
      'The brand combines **quality coding education** with practical skills, creating tech learning experiences.',
      'With centralized curriculum and training, partners gain **education excellence** from launch.',
      'Its focus on technology and skills helps investors build **future-focused businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$85K - $200K',
      areaRequired: '1000 - 2000 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Learning Center (800-1200 sq ft)', investmentCost: '$60K - $120K', royaltyFees: '6%', franchiseFees: '$15K' },
      { storeSize: 'Standard (1000-2000 sq ft)', investmentCost: '$85K - $200K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (2000+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Learning Center', description: 'Focused tech education with smaller footprint.' },
      { name: 'Full Academy', description: 'Complete technology education center with multiple programs.' },
    ],
    whyChoose: [
      { title: 'Growing Tech Market', description: 'Increasing demand for technology and coding skills.' },
      { title: 'Future-Ready', description: 'Education in high-demand technology skills.' },
      { title: 'Multiple Revenue Streams', description: 'Courses, workshops, and corporate training.' },
      { title: 'Industry Recognition', description: 'Strong brand in tech education segment.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '34% projected annual ROI',
      payback: '22-28 months payback window',
      hours: '30-40 hours per week',
      staff: '4-10 instructors per location',
    },
    expansionPlans: ['IT Cities', 'Educational Hubs', 'Business Districts', 'Urban Centers'],
    requirements: [
      { label: 'Property Type', value: 'Educational centers / tech districts / urban areas' },
      { label: 'Space Requirement', value: 'Minimum 1000 sq ft with classroom setup and technology' },
    ],
    trainingSupport: ['6-week tech education certification', 'Curriculum training', 'Marketing support', 'Technology setup'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with education compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive tech education franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, tech demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 18-24...
  18: {
    name: 'PastaPerfect',
    status: 'Trending',
    badge: 'Food Leader',
    tagline: 'Authentic Italian pasta and cuisine.',
    banner:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$130K - $280K',
      space: '1000 - 2000 sq ft',
      roi: '27%',
      payback: '30 months',
      outlets: '12+',
    },
    overview:
      'PastaPerfect offers authentic Italian pasta, cuisine, and dining experiences in upscale locations.',
    businessModel:
      'Franchise model: FOFO with food service support. Central team provides recipes, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$25K' },
      { label: 'Kitchen Equipment', value: '$80K' },
      { label: 'Interior & Setup', value: '$50K' },
      { label: 'Working Capital', value: '$20K - $50K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need restaurant experience?',
        a: 'No. We provide comprehensive training in Italian cuisine and restaurant operations.',
      },
      {
        q: 'What cuisine is offered?',
        a: 'Authentic Italian pasta, pizza, and traditional Italian dishes.',
      },
    ],
    reviews: [
      { name: 'Food Critic', rating: 5, text: 'Excellent authentic Italian food. Great dining experience!' },
      { name: 'Marco R', rating: 5, text: 'Great business model with strong Italian cuisine demand.' },
    ],
    aboutBrand: [
      'PastaPerfect is an **Italian cuisine franchise** built for food service entrepreneurs.',
      'The brand combines **authentic recipes** with quality ingredients, creating Italian dining experiences.',
      'With centralized training and recipes, partners gain **cuisine excellence** from day one.',
      'Its focus on authenticity and quality helps investors build **trusted Italian restaurants**.',
    ],
    financialHighlights: {
      investmentRange: '$130K - $280K',
      areaRequired: '1000 - 2000 sq ft',
      franchiseFee: '$25K',
    },
    financialTable: [
      { storeSize: 'Cafe (800-1200 sq ft)', investmentCost: '$100K - $180K', royaltyFees: '6%', franchiseFees: '$20K' },
      { storeSize: 'Restaurant (1200-2000 sq ft)', investmentCost: '$130K - $280K', royaltyFees: '7%', franchiseFees: '$25K' },
      { storeSize: 'Flagship (2000+ sq ft)', investmentCost: '$200K - $400K', royaltyFees: '8%', franchiseFees: '$35K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on restaurant entrepreneurs.' },
      { name: 'Italian Cafe', description: 'Focused Italian cafe with smaller footprint.' },
      { name: 'Full Restaurant', description: 'Complete Italian restaurant with full dining service.' },
    ],
    whyChoose: [
      { title: 'Growing Italian Cuisine', description: 'Increasing demand for authentic Italian food.' },
      { title: 'Brand Recognition', description: 'Strong brand in Italian cuisine segment.' },
      { title: 'Quality Focus', description: 'Emphasis on authentic recipes and quality ingredients.' },
      { title: 'Dining Experience', description: 'Complete Italian dining atmosphere and service.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '27% projected annual ROI',
      payback: '30-36 months payback window',
      hours: '50-60 hours per week',
      staff: '8-15 staff members per location',
    },
    expansionPlans: ['Metro Cities', 'Urban Centers', 'Shopping Districts', 'Tourist Areas'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / dining districts / upscale locations' },
      { label: 'Space Requirement', value: 'Minimum 1000 sq ft with kitchen setup and dining area' },
    ],
    trainingSupport: ['6-week culinary certification', 'Recipe training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with restaurant compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive restaurant franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, dining demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 19-24...
  19: {
    name: 'SpaRetreat',
    status: 'Growing',
    badge: 'Wellness Leader',
    tagline: 'Luxury spa and wellness services.',
    banner:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$100K - $250K',
      space: '1200 - 2500 sq ft',
      roi: '39%',
      payback: '24 months',
      outlets: '10+',
    },
    overview:
      'SpaRetreat offers luxury spa services including massages, treatments, and wellness programs in upscale locations.',
    businessModel:
      'Franchise model: FICO with spa support. Central team provides training, equipment, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Spa Equipment', value: '$60K' },
      { label: 'Interior & Setup', value: '$40K' },
      { label: 'Working Capital', value: '$20K - $50K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    faqs: [
      {
        q: 'Do I need spa experience?',
        a: 'No. We provide comprehensive training in spa services and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Massages, facials, body treatments, and wellness programs.',
      },
    ],
    reviews: [
      { name: 'Spa Client', rating: 5, text: 'Luxurious spa experience and excellent therapists. Highly recommend!' },
      { name: 'Neha S', rating: 5, text: 'Great business model with growing wellness and luxury market.' },
    ],
    aboutBrand: [
      'SpaRetreat is a **luxury spa franchise** built for wellness entrepreneurs.',
      'The brand combines **luxury services** with tranquil environments, creating spa experiences.',
      'With centralized training and equipment, partners gain **spa excellence** from day one.',
      'Its focus on luxury and wellness helps investors build **premium spa businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$100K - $250K',
      areaRequired: '1200 - 2500 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Spa (1000-1500 sq ft)', investmentCost: '$80K - $150K', royaltyFees: '6%', franchiseFees: '$18K' },
      { storeSize: 'Full Spa (1500-2500 sq ft)', investmentCost: '$100K - $250K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (2500+ sq ft)', investmentCost: '$180K - $350K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Day Spa', description: 'Focused spa services with smaller footprint.' },
      { name: 'Full Retreat', description: 'Complete spa and wellness center with multiple services.' },
    ],
    whyChoose: [
      { title: 'Growing Wellness Market', description: 'Increasing demand for luxury spa services.' },
      { title: 'Premium Positioning', description: 'Luxury brand positioning attracts quality clients.' },
      { title: 'High Profit Margins', description: 'Luxury services offer excellent profitability.' },
      { title: 'Recurring Revenue', description: 'Regular clients and membership programs.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '39% projected annual ROI',
      payback: '24-30 months payback window',
      hours: '40-50 hours per week',
      staff: '6-12 therapists per location',
    },
    expansionPlans: ['Luxury Markets', 'Urban Centers', 'Hotel Areas', 'Tourist Locations'],
    requirements: [
      { label: 'Property Type', value: 'Luxury locations / hotels / upscale shopping centers' },
      { label: 'Space Requirement', value: 'Minimum 1200 sq ft with spa setup and treatment rooms' },
    ],
    trainingSupport: ['6-week spa certification', 'Treatment training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with spa compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive spa franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, luxury demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 20-24...
  20: {
    name: 'GameZone',
    status: 'New',
    badge: 'Entertainment Leader',
    tagline: 'Interactive gaming and entertainment center.',
    banner:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$200K - $400K',
      space: '2000 - 4000 sq ft',
      roi: '32%',
      payback: '30 months',
      outlets: '8+',
    },
    overview:
      'GameZone offers interactive gaming, entertainment, and recreational activities for families and gaming enthusiasts.',
    businessModel:
      'Franchise model: FOFO with entertainment support. Central team provides equipment, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$30K' },
      { label: 'Gaming Equipment', value: '$120K' },
      { label: 'Interior & Setup', value: '$80K' },
      { label: 'Working Capital', value: '$30K - $60K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need entertainment experience?',
        a: 'No. We provide comprehensive training in gaming operations and business management.',
      },
      {
        q: 'What activities are offered?',
        a: 'Interactive gaming, VR experiences, arcade games, and entertainment activities.',
      },
    ],
    reviews: [
      { name: 'Gaming Enthusiast', rating: 5, text: 'Amazing gaming experience and great atmosphere. Love this place!' },
      { name: 'Rahul K', rating: 5, text: 'Great business model with growing entertainment market demand.' },
    ],
    aboutBrand: [
      'GameZone is an **entertainment franchise** built for gaming entrepreneurs.',
      'The brand combines **interactive gaming** with entertainment, creating gaming experiences.',
      'With centralized training and equipment, partners gain **gaming excellence** from day one.',
      'Its focus on entertainment and fun helps investors build **exciting gaming businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$200K - $400K',
      areaRequired: '2000 - 4000 sq ft',
      franchiseFee: '$30K',
    },
    financialTable: [
      { storeSize: 'Arcade (1500-2500 sq ft)', investmentCost: '$150K - $250K', royaltyFees: '6%', franchiseFees: '$25K' },
      { storeSize: 'Full Zone (2500-4000 sq ft)', investmentCost: '$200K - $400K', royaltyFees: '7%', franchiseFees: '$30K' },
      { storeSize: 'Flagship (4000+ sq ft)', investmentCost: '$350K - $600K', royaltyFees: '8%', franchiseFees: '$40K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on entertainment entrepreneurs.' },
      { name: 'Arcade Model', description: 'Focused arcade gaming with smaller footprint.' },
      { name: 'Full Entertainment', description: 'Complete gaming and entertainment center.' },
    ],
    whyChoose: [
      { title: 'Growing Gaming Market', description: 'Increasing demand for interactive entertainment.' },
      { title: 'Family Entertainment', description: 'Appeals to families and gaming enthusiasts.' },
      { title: 'Multiple Revenue Streams', description: 'Gaming, events, parties, and food services.' },
      { title: 'Technology Focus', description: 'Latest gaming technology and VR experiences.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '32% projected annual ROI',
      payback: '30-36 months payback window',
      hours: '50-60 hours per week',
      staff: '8-20 staff members per location',
    },
    expansionPlans: ['Entertainment Zones', 'Shopping Malls', 'Urban Centers', 'Tourist Areas'],
    requirements: [
      { label: 'Property Type', value: 'Entertainment centers / shopping malls / leisure areas' },
      { label: 'Space Requirement', value: 'Minimum 2000 sq ft with gaming setup and safety measures' },
    ],
    trainingSupport: ['6-week gaming certification', 'Operations training', 'Marketing support', 'Technical support'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with entertainment compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive entertainment franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, entertainment demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 21-24...
  21: {
    name: 'FreshMart',
    status: 'High ROI',
    badge: 'Retail Leader',
    tagline: 'Fresh grocery and convenience store.',
    banner:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$150K - $350K',
      space: '1500 - 3000 sq ft',
      roi: '41%',
      payback: '20 months',
      outlets: '25+',
    },
    overview:
      'FreshMart offers fresh groceries, convenience items, and daily essentials in neighborhood locations.',
    businessModel:
      'Franchise model: FOCO with retail support. Central team provides inventory, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$25K' },
      { label: 'Store Setup', value: '$100K' },
      { label: 'Initial Inventory', value: '$50K' },
      { label: 'Working Capital', value: '$25K - $60K' },
    ],
    locations: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need retail experience?',
        a: 'No. We provide comprehensive training in grocery retail and business operations.',
      },
      {
        q: 'What products are offered?',
        a: 'Fresh groceries, daily essentials, convenience items, and household products.',
      },
    ],
    reviews: [
      { name: 'Regular Customer', rating: 5, text: 'Great selection and fresh products. Very convenient!' },
      { name: 'Sanjay K', rating: 5, text: 'Excellent business model with steady demand and good margins.' },
    ],
    aboutBrand: [
      'FreshMart is a **grocery retail franchise** built for retail entrepreneurs.',
      'The brand combines **fresh products** with convenience, creating grocery shopping experiences.',
      'With centralized training and inventory, partners gain **retail excellence** from day one.',
      'Its focus on freshness and convenience helps investors build **trusted grocery businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$150K - $350K',
      areaRequired: '1500 - 3000 sq ft',
      franchiseFee: '$25K',
    },
    financialTable: [
      { storeSize: 'Express (1000-1500 sq ft)', investmentCost: '$100K - $200K', royaltyFees: '5%', franchiseFees: '$20K' },
      { storeSize: 'Standard (1500-3000 sq ft)', investmentCost: '$150K - $350K', royaltyFees: '6%', franchiseFees: '$25K' },
      { storeSize: 'Supermarket (3000+ sq ft)', investmentCost: '$250K - $500K', royaltyFees: '7%', franchiseFees: '$35K' },
    ],
    franchiseModels: [
      { name: 'FOCO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Express Store', description: 'Focused grocery with smaller footprint.' },
      { name: 'Supermarket', description: 'Complete grocery store with full product range.' },
    ],
    whyChoose: [
      { title: 'Essential Business', description: 'Grocery retail is essential with steady demand.' },
      { title: 'Recurring Revenue', description: 'Regular customers provide stable income stream.' },
      { title: 'Community Focus', description: 'Neighborhood grocery stores build community relationships.' },
      { title: 'Multiple Revenue Streams', description: 'Groceries, prepared foods, and household items.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '41% projected annual ROI',
      payback: '20-24 months payback window',
      hours: '45-55 hours per week',
      staff: '8-20 staff members per location',
    },
    expansionPlans: ['Residential Areas', 'Urban Centers', 'Suburban Zones', 'Community Locations'],
    requirements: [
      { label: 'Property Type', value: 'Residential areas / shopping centers / community locations' },
      { label: 'Space Requirement', value: 'Minimum 1500 sq ft with retail setup and storage' },
    ],
    trainingSupport: ['4-week retail certification', 'Inventory management', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with retail compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive retail franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, population density, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 22-24...
  22: {
    name: 'MindfulMeditation',
    status: 'Trending',
    badge: 'Wellness Leader',
    tagline: 'Meditation and mindfulness center.',
    banner:
      'https://images.unsplash.com/photo-1593874405796-086834828d39?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$45K - $120K',
      space: '600 - 1200 sq ft',
      roi: '36%',
      payback: '22 months',
      outlets: '8+',
    },
    overview:
      'MindfulMeditation offers meditation classes, mindfulness training, and wellness programs in peaceful environments.',
    businessModel:
      'Franchise model: FICO with wellness support. Central team provides training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$12K' },
      { label: 'Studio Setup', value: '$25K' },
      { label: 'Equipment & Supplies', value: '$20K' },
      { label: 'Working Capital', value: '$10K - $30K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai'],
    faqs: [
      {
        q: 'Do I need meditation experience?',
        a: 'No. We provide comprehensive training in meditation instruction and business operations.',
      },
      {
        q: 'What services are offered?',
        a: 'Meditation classes, mindfulness training, stress management, and wellness programs.',
      },
    ],
    reviews: [
      { name: 'Wellness Client', rating: 5, text: 'Peaceful environment and excellent meditation guidance. Life-changing!' },
      { name: 'Anjali S', rating: 5, text: 'Great business model with growing wellness and mental health awareness.' },
    ],
    aboutBrand: [
      'MindfulMeditation is a **wellness franchise** built for meditation and mindfulness entrepreneurs.',
      'The brand combines **peaceful environments** with quality instruction, creating meditation experiences.',
      'With centralized training and marketing, partners gain **wellness excellence** from day one.',
      'Its focus on mindfulness and health helps investors build **trusted wellness businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$45K - $120K',
      areaRequired: '600 - 1200 sq ft',
      franchiseFee: '$12K',
    },
    financialTable: [
      { storeSize: 'Studio (600-800 sq ft)', investmentCost: '$40K - $80K', royaltyFees: '5%', franchiseFees: '$10K' },
      { storeSize: 'Full Studio (800-1200 sq ft)', investmentCost: '$45K - $120K', royaltyFees: '6%', franchiseFees: '$12K' },
      { storeSize: 'Flagship (1200+ sq ft)', investmentCost: '$80K - $180K', royaltyFees: '7%', franchiseFees: '$20K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Meditation Studio', description: 'Focused meditation instruction with wellness programs.' },
      { name: 'Full Wellness', description: 'Complete wellness center with multiple services.' },
    ],
    whyChoose: [
      { title: 'Growing Wellness Market', description: 'Increasing focus on mental health and mindfulness.' },
      { title: 'Low Investment', description: 'Affordable entry into wellness business sector.' },
      { title: 'Recurring Revenue', description: 'Class memberships and program subscriptions.' },
      { title: 'Community Building', description: 'Strong customer relationships and loyalty.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '36% projected annual ROI',
      payback: '22-28 months payback window',
      hours: '20-30 hours per week',
      staff: '2-6 instructors per location',
    },
    expansionPlans: ['Urban Centers', 'Suburban Areas', 'Corporate Locations', 'Community Centers'],
    requirements: [
      { label: 'Property Type', value: 'Wellness centers / community spaces / quiet areas' },
      { label: 'Space Requirement', value: 'Minimum 600 sq ft with meditation setup and ambiance' },
    ],
    trainingSupport: ['4-week meditation certification', 'Operations training', 'Marketing support', 'Wellness programs'],
    agreementDetails: [
      { label: 'Franchise Term', value: '8 years with wellness compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive wellness franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 4 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, wellness trends, and service quality. Detailed projections provided during due diligence.',
  },
  // Add remaining franchises 23-24...
  23: {
    name: 'Taco Fiesta',
    status: 'Popular',
    badge: 'Food Leader',
    tagline: 'Authentic Mexican tacos and cuisine.',
    banner:
      'https://images.unsplash.com/photo-1565034969-9a1a8a2c7c3a?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$80K - $200K',
      space: '800 - 1500 sq ft',
      roi: '30%',
      payback: '26 months',
      outlets: '15+',
    },
    overview:
      'Taco Fiesta offers authentic Mexican tacos, cuisine, and dining experiences with vibrant atmosphere.',
    businessModel:
      'Franchise model: FOFO with food service support. Central team provides recipes, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$18K' },
      { label: 'Kitchen Equipment', value: '$50K' },
      { label: 'Interior & Setup', value: '$35K' },
      { label: 'Working Capital', value: '$15K - $40K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need restaurant experience?',
        a: 'No. We provide comprehensive training in Mexican cuisine and restaurant operations.',
      },
      {
        q: 'What cuisine is offered?',
        a: 'Authentic Mexican tacos, burritos, and traditional Mexican dishes.',
      },
    ],
    reviews: [
      { name: 'Food Lover', rating: 5, text: 'Excellent authentic Mexican food. Great flavors and atmosphere!' },
      { name: 'Carlos M', rating: 5, text: 'Great business model with growing Mexican cuisine demand.' },
    ],
    aboutBrand: [
      'Taco Fiesta is a **Mexican cuisine franchise** built for food service entrepreneurs.',
      'The brand combines **authentic recipes** with vibrant atmosphere, creating Mexican dining experiences.',
      'With centralized training and recipes, partners gain **cuisine excellence** from day one.',
      'Its focus on authenticity and flavor helps investors build **trusted Mexican restaurants**.',
    ],
    financialHighlights: {
      investmentRange: '$80K - $200K',
      areaRequired: '800 - 1500 sq ft',
      franchiseFee: '$18K',
    },
    financialTable: [
      { storeSize: 'Taco Stand (400-600 sq ft)', investmentCost: '$50K - $100K', royaltyFees: '5%', franchiseFees: '$15K' },
      { storeSize: 'Restaurant (800-1500 sq ft)', investmentCost: '$80K - $200K', royaltyFees: '6%', franchiseFees: '$18K' },
      { storeSize: 'Flagship (1500+ sq ft)', investmentCost: '$150K - $300K', royaltyFees: '7%', franchiseFees: '$25K' },
    ],
    franchiseModels: [
      { name: 'FOFO', description: 'Full franchise ownership for hands-on restaurant entrepreneurs.' },
      { name: 'Taco Stand', description: 'Focused taco service with smaller footprint.' },
      { name: 'Full Restaurant', description: 'Complete Mexican restaurant with full dining service.' },
    ],
    whyChoose: [
      { title: 'Growing Mexican Cuisine', description: 'Increasing demand for authentic Mexican food.' },
      { title: 'Brand Recognition', description: 'Strong brand in Mexican cuisine segment.' },
      { title: 'Vibrant Atmosphere', description: 'Fun and energetic dining experience.' },
      { title: 'Quality Focus', description: 'Emphasis on authentic recipes and fresh ingredients.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '30% projected annual ROI',
      payback: '26-32 months payback window',
      hours: '45-55 hours per week',
      staff: '6-12 staff members per location',
    },
    expansionPlans: ['Urban Centers', 'Shopping Districts', 'Tourist Areas', 'Entertainment Zones'],
    requirements: [
      { label: 'Property Type', value: 'Shopping centers / dining districts / entertainment areas' },
      { label: 'Space Requirement', value: 'Minimum 800 sq ft with kitchen setup and dining area' },
    ],
    trainingSupport: ['6-week culinary certification', 'Recipe training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with restaurant compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive restaurant franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, dining demand, and service quality. Detailed projections provided during due diligence.',
  },
  // Add final franchise 24...
  24: {
    name: 'KidZone Play',
    status: 'Growing',
    badge: 'Entertainment Leader',
    tagline: 'Children\'s entertainment and play center.',
    banner:
      'https://images.unsplash.com/photo-1542744173-8e7a5d373a97?auto=format&fit=crop&w=1600&q=80',
    keyInfo: {
      investment: '$120K - $300K',
      space: '2000 - 4000 sq ft',
      roi: '35%',
      payback: '28 months',
      outlets: '10+',
    },
    overview:
      'KidZone Play offers children\'s entertainment, play activities, and party services in safe, family-friendly environments.',
    businessModel:
      'Franchise model: FICO with entertainment support. Central team provides equipment, training, marketing, and operational guidance.',
    investmentDetails: [
      { label: 'Franchise Fee', value: '$20K' },
      { label: 'Play Equipment', value: '$80K' },
      { label: 'Interior & Setup', value: '$60K' },
      { label: 'Working Capital', value: '$20K - $50K' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Pune'],
    faqs: [
      {
        q: 'Do I need entertainment experience?',
        a: 'No. We provide comprehensive training in children\'s entertainment and business operations.',
      },
      {
        q: 'What activities are offered?',
        a: 'Play zones, party services, children\'s activities, and family entertainment.',
      },
    ],
    reviews: [
      { name: 'Happy Parent', rating: 5, text: 'Great place for kids! Safe environment and fun activities.' },
      { name: 'Priya M', rating: 5, text: 'Excellent business model with growing family entertainment demand.' },
    ],
    aboutBrand: [
      'KidZone Play is a **children\'s entertainment franchise** built for family entertainment entrepreneurs.',
      'The brand combines **safe play** with fun activities, creating children\'s entertainment experiences.',
      'With centralized training and equipment, partners gain **entertainment excellence** from day one.',
      'Its focus on safety and fun helps investors build **trusted family businesses**.',
    ],
    financialHighlights: {
      investmentRange: '$120K - $300K',
      areaRequired: '2000 - 4000 sq ft',
      franchiseFee: '$20K',
    },
    financialTable: [
      { storeSize: 'Play Zone (1500-2500 sq ft)', investmentCost: '$100K - $200K', royaltyFees: '6%', franchiseFees: '$18K' },
      { storeSize: 'Full Center (2500-4000 sq ft)', investmentCost: '$120K - $300K', royaltyFees: '7%', franchiseFees: '$20K' },
      { storeSize: 'Flagship (4000+ sq ft)', investmentCost: '$200K - $400K', royaltyFees: '8%', franchiseFees: '$30K' },
    ],
    franchiseModels: [
      { name: 'FICO', description: 'Franchise investment with company operations, ideal for passive investors.' },
      { name: 'Play Zone', description: 'Focused play activities with smaller footprint.' },
      { name: 'Full Center', description: 'Complete children\'s entertainment center with multiple services.' },
    ],
    whyChoose: [
      { title: 'Growing Family Market', description: 'Increasing demand for safe children\'s entertainment.' },
      { title: 'Multiple Revenue Streams', description: 'Play activities, parties, events, and food services.' },
      { title: 'Family Focus', description: 'Appeals to families with children and group activities.' },
      { title: 'Safety Standards', description: 'High safety standards and child-friendly environments.' },
    ],
    franchiseStructure: ['Single Unit', 'Multi Unit', 'Area Development'],
    operationsReturns: {
      roi: '35% projected annual ROI',
      payback: '28-34 months payback window',
      hours: '40-50 hours per week',
      staff: '8-15 staff members per location',
    },
    expansionPlans: ['Family Zones', 'Suburban Areas', 'Shopping Centers', 'Community Locations'],
    requirements: [
      { label: 'Property Type', value: 'Family centers / shopping malls / suburban locations' },
      { label: 'Space Requirement', value: 'Minimum 2000 sq ft with play setup and safety measures' },
    ],
    trainingSupport: ['6-week children\'s entertainment certification', 'Safety training', 'Marketing support', 'Operations manual'],
    agreementDetails: [
      { label: 'Franchise Term', value: '10 years with entertainment compliance requirements' },
      { label: 'Legal Agreement', value: 'Comprehensive entertainment franchise agreement' },
      { label: 'Renewal Terms', value: 'Renewable for 5 years based on performance' },
    ],
    disclaimer:
      'Revenue potential varies by location, family demographics, and service quality. Detailed projections provided during due diligence.',
  }
};

const tabs = ['Overview', 'Business Model', 'Investment Details', 'Locations', 'FAQ', 'Reviews'];

const INDUSTRY_GALLERY = {
  'Food & Beverage': [
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
  ],
  'Health & Wellness': [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1600&q=80',
  ],
  'Home Services': [
    'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
  ],
  Education: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  ],
  Technology: [
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1557597774-9d0b8d2fd2db?auto=format&fit=crop&w=1600&q=80',
  ],
  Retail: [
    'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1515165562835-c4c5b3fb7c7b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80',
  ],
  Entertainment: [
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
  ],
};

const THEME_GALLERIES = {
  burger: [
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1568901346376-56c5276b45b0?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1555992336-03a23c5b8f8a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80',
  ],
  taco: [
    'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1555992336-03a23c5b8f8a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
  ],
  coffee: [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1523942839745-7848d2b4a3b1?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1600&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=1600&q=80',
  ],
  meditation: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1525097487452-6278ff080c31?auto=format&fit=crop&w=1600&q=80',
  ],
  kids: [
    'https://images.unsplash.com/photo-1541698613650-8634b8c5e9f1?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1516131206008-dd041a9764d2?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1520975754732-35dd22299614?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1600&q=80',
  ],
  cleaning: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1600&q=80',
  ],
  tech: [
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1557597774-9d0b8d2fd2db?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80',
  ],
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80',
  ],
};

const pickGalleryTheme = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('burger')) return 'burger';
  if (n.includes('taco') || n.includes('fiesta')) return 'taco';
  if (n.includes('coffee') || n.includes('cafe')) return 'coffee';
  if (n.includes('gym') || n.includes('fit') || n.includes('yoga') || n.includes('spa')) return 'fitness';
  if (n.includes('meditation') || n.includes('mindful')) return 'meditation';
  if (n.includes('kid') || n.includes('play') || n.includes('zone')) return 'kids';
  if (n.includes('clean')) return 'cleaning';
  if (n.includes('tech') || n.includes('repair') || n.includes('code')) return 'tech';
  if (n.includes('ristorante') || n.includes('italia') || n.includes('pasta')) return 'restaurant';
  return null;
};

const slugToFranchiseId = {
  burgerblast: '1',
  'fitlife-gym': '2',
  'ecoclean-solutions': '3',
  'urban-coffee-co': '1',
  'fitlife-studios': '2',
  'bella-italia-ristorante': '3',
  'kidszone-play-center': '24',
  'quickclean-services': '5',
  'techrepair-pro': '6',
};

const getSelectedFranchiseId = () => {
  const pathname = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const idFromQuery = params.get('id');

  if (idFromQuery) {
    return idFromQuery;
  }

  if (pathname.startsWith('/franchise/')) {
    const slug = pathname.replace('/franchise/', '').trim().toLowerCase();
    if (slugToFranchiseId[slug]) {
      return slugToFranchiseId[slug];
    }
  }

  return '1';
};

function FranchiseDetailsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedFranchiseId, setSelectedFranchiseId] = useState(getSelectedFranchiseId);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    investmentRange: '',
    state: '',
    city: '',
    message: '',
  });

  const selectedFranchise = useMemo(() => {
    return franchiseDetailsData[selectedFranchiseId] || franchiseDetailsData[1];
  }, [selectedFranchiseId]);

  const galleryImages = useMemo(() => {
    const explicitGallery = Array.isArray(selectedFranchise?.gallery) ? selectedFranchise.gallery : [];
    if (explicitGallery.length >= 4) {
      return explicitGallery.slice(0, 5);
    }

    const theme = pickGalleryTheme(selectedFranchise?.name);
    if (theme && THEME_GALLERIES[theme]) {
      const themed = [selectedFranchise?.banner, ...explicitGallery, ...THEME_GALLERIES[theme]].filter(Boolean);
      return Array.from(new Set(themed)).slice(0, 5);
    }

    const name = (selectedFranchise?.name || '').toLowerCase();
    let category = 'Food & Beverage';
    if (name.includes('gym') || name.includes('fitness') || name.includes('spa') || name.includes('yoga')) {
      category = 'Health & Wellness';
    } else if (name.includes('clean') || name.includes('repair') || name.includes('care')) {
      category = 'Home Services';
    } else if (name.includes('education') || name.includes('tutor') || name.includes('academy') || name.includes('learn')) {
      category = 'Education';
    } else if (name.includes('tech') || name.includes('code')) {
      category = 'Technology';
    } else if (name.includes('game') || name.includes('entertainment') || name.includes('kid') || name.includes('play')) {
      category = 'Entertainment';
    } else if (name.includes('salon') || name.includes('store') || name.includes('mart') || name.includes('shop')) {
      category = 'Retail';
    }

    const extra = INDUSTRY_GALLERY[category] || INDUSTRY_GALLERY['Food & Beverage'];
    const merged = [selectedFranchise?.banner, ...explicitGallery, ...extra].filter(Boolean);
    // Ensure we always have 4-5 images.
    return merged.slice(0, 5);
  }, [selectedFranchise]);

  const relatedFranchises = useMemo(() => {
    const allEntries = Object.entries(franchiseDetailsData).map(([id, value]) => ({ id, ...value }));
    const selected = allEntries.find((item) => item.id === selectedFranchiseId);
    const others = allEntries.filter((item) => item.id !== selectedFranchiseId).slice(0, 2);
    return selected ? [selected, ...others] : allEntries.slice(0, 3);
  }, [selectedFranchiseId]);

  useEffect(() => {
    setActiveTab('Overview');
  }, [selectedFranchiseId]);

  useEffect(() => {
    const handleRouteUpdate = () => {
      setSelectedFranchiseId(getSelectedFranchiseId());
    };

    window.addEventListener('popstate', handleRouteUpdate);
    return () => {
      window.removeEventListener('popstate', handleRouteUpdate);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleRelatedDetails = (id) => {
    window.history.pushState({}, '', `/franchise-details?id=${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabContent = () => {
    if (activeTab === 'Overview') {
      return <p className="text-base leading-relaxed text-white">{selectedFranchise.overview}</p>;
    }
    if (activeTab === 'Business Model') {
      return <p className="text-base leading-relaxed text-white">{selectedFranchise.businessModel}</p>;
    }
    if (activeTab === 'Investment Details') {
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {selectedFranchise.investmentDetails.map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-white">{item.label}</p>
              <p className="mt-1 text-lg font-semibold text-[#0b0f19]">{item.value}</p>
            </article>
          ))}
        </div>
      );
    }
    if (activeTab === 'Locations') {
      return (
        <div className="flex flex-wrap gap-2">
          {selectedFranchise.locations.map((location) => (
            <span key={location} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
              {location}
            </span>
          ))}
        </div>
      );
    }
    if (activeTab === 'FAQ') {
      return (
        <div className="space-y-3">
          {selectedFranchise.faqs.map((item) => (
            <article key={item.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <h4 className="text-base font-semibold text-[#0b0f19]">{item.q}</h4>
              <p className="mt-2 text-sm leading-relaxed text-white">{item.a}</p>
            </article>
          ))}
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {selectedFranchise.reviews.map((review) => (
          <article key={review.name} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0b0f19]">{review.name}</p>
              <p className="text-sm text-amber-500">{'★'.repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white">{review.text}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 xl:px-12">
      <div className="space-y-8">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_22px_rgba(15,23,42,0.06)] lg:p-8">
            {/* Title row — badges left, Download CTA right */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: name + status badges */}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#0b0f19] sm:text-5xl lg:text-6xl">{selectedFranchise.name}</h1>
                <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">{selectedFranchise.status}</span>
                <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">{selectedFranchise.badge}</span>
              </div>

              {/* Right: Download Brochure CTA */}
              <a
                href={selectedFranchise.brochureUrl || '#'}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2.5 rounded-xl btn-wave bg-[#0B1220] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(11,18,32,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111827] hover:shadow-[0_8px_28px_rgba(11,18,32,0.28)] active:scale-[0.98] lg:w-auto"
              >
                {/* Download icon */}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Brochure
              </a>
            </div>

            <p className="mt-4 text-lg text-white lg:text-xl">{selectedFranchise.tagline}</p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:grid-cols-2 lg:grid-cols-5 lg:p-8">
            <article className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-white">Investment</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.keyInfo.investment}</p></article>
            <article className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-white">Space</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.keyInfo.space}</p></article>
            <article className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-white">ROI</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.keyInfo.roi}</p></article>
            <article className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-white">Payback</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.keyInfo.payback}</p></article>
            <article className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-white">Outlets</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.keyInfo.outlets}</p></article>
          </div>

          <ImageCarousel 
            images={galleryImages} 
            alt={selectedFranchise.name}
            category="food"
            showThumbnails={false}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    activeTab === tab ? 'btn-wave bg-[#0B1220] text-white' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-6">{renderTabContent()}</div>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">About {selectedFranchise.name}</h3>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <p className="text-base leading-relaxed text-white">
                {selectedFranchise.name} is a <strong>premium franchise brand</strong> designed for investors who want
                predictable demand and a differentiated market position.
              </p>
              <p className="text-base leading-relaxed text-white">
                The model combines <strong>strong unit economics</strong> with clear execution SOPs, helping partners
                operate consistently across city tiers.
              </p>
              <p className="text-base leading-relaxed text-white">
                With centralized sourcing and launch playbooks, investors get <strong>decision clarity</strong> from
                location finalization to opening day.
              </p>
              <p className="text-base leading-relaxed text-white">
                The brand focuses on loyalty and repeat behavior to create <strong>long-term growth support</strong>,
                not just short-term spikes.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Investment & Financials</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <article className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-white">Investment Range</p><p className="mt-2 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.financialHighlights.investmentRange}</p></article>
              <article className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-white">Area Required</p><p className="mt-2 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.financialHighlights.areaRequired}</p></article>
              <article className="rounded-xl bg-slate-50 p-5"><p className="text-sm text-white">Franchise Fee</p><p className="mt-2 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.financialHighlights.franchiseFee}</p></article>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-4">
                {['Store Size', 'Investment Cost', 'Royalty Fees', 'Franchise Fees'].map((header) => (
                  <div key={header} className="bg-slate-100 px-5 py-4 text-sm font-semibold text-slate-700">{header}</div>
                ))}
              </div>
              <div className="divide-y divide-slate-200">
                {selectedFranchise.financialTable.map((row) => (
                  <div key={row.storeSize} className="grid grid-cols-1 gap-2 px-5 py-4 text-sm text-white md:grid-cols-4 md:gap-4">
                    <p className="font-medium">{row.storeSize}</p>
                    <p>{row.investmentCost}</p>
                    <p>{row.royaltyFees}</p>
                    <p>{row.franchiseFees}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Franchise Models</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedFranchise.franchiseModels.map((model) => (
                <article key={model.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-lg font-bold text-[#0b0f19]">{model.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white">{model.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Why Choose This Franchise</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {selectedFranchise.whyChoose.map((item) => (
                <article key={item.title} className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg text-violet-700">✓</span>
                  <div>
                    <p className="text-base font-semibold text-[#0b0f19]">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Franchise Structure</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selectedFranchise.franchiseStructure.map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <p className="text-base font-semibold text-[#0b0f19]">{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Operations & Returns</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4 rounded-xl bg-slate-50 p-5">
                <article><p className="text-sm text-white">ROI</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.operationsReturns.roi}</p></article>
              </div>
              <div className="space-y-4 rounded-xl bg-slate-50 p-5">
                <article><p className="text-sm text-white">Payback Period</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.operationsReturns.payback}</p></article>
              </div>
              <div className="space-y-4 rounded-xl bg-slate-50 p-5">
                <article><p className="text-sm text-white">Hours Required</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.operationsReturns.hours}</p></article>
              </div>
              <div className="space-y-4 rounded-xl bg-slate-50 p-5">
                <article><p className="text-sm text-white">Staff Requirement</p><p className="mt-1 text-lg font-semibold text-[#0b0f19]">{selectedFranchise.operationsReturns.staff}</p></article>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Expansion Plans</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {selectedFranchise.expansionPlans.map((plan) => (
                <article key={plan} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
                  <p className="text-base font-semibold text-[#0b0f19]">{plan}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Requirements</h3>
            <div className="mt-6 space-y-4">
              {selectedFranchise.requirements.map((item) => (
                <article key={item.label} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                  <p className="text-sm text-white">{item.value}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Training & Support</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedFranchise.trainingSupport.map((item) => (
                <article key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</span>
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Agreement Details</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedFranchise.agreementDetails.map((item) => (
                <article key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm text-white">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">{item.value}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white">{selectedFranchise.disclaimer}</p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">How to Get Started</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {['Apply', 'Evaluation', 'Approval', 'Launch'].map((step, idx) => (
                <article key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white">Step {idx + 1}</p>
                  <p className="mt-3 text-lg font-semibold text-[#0b0f19]">{step}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)] lg:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold tracking-tight text-[#0b0f19] lg:text-3xl">Explore Similar Opportunities</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white">Featured</span>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedFranchises.map((franchise) => (
                <article
                  key={franchise.id}
                  onClick={() => handleRelatedDetails(franchise.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.14)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={franchise.banner}
                      alt={franchise.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                      {franchise.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="text-xl font-bold tracking-tight text-[#0b0f19]">{franchise.name}</h4>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white">{franchise.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {franchise.keyInfo.investment}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {franchise.franchiseModels[0]?.name || 'FOFO'}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-medium text-white">ROI</p>
                        <p className="text-lg font-bold text-[#0b0f19]">{franchise.keyInfo.roi}</p>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-medium text-white">Payback</p>
                        <p className="text-lg font-bold text-[#0b0f19]">{franchise.keyInfo.payback}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRelatedDetails(franchise.id);
                      }}
                      className="mt-4 w-full rounded-full btn-wave bg-[#0B1220] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0B1220]/25"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default FranchiseDetailsPage;
