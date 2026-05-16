import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const FranchiseOpportunityNavbarFiltersContext = createContext(null);

export function FranchiseOpportunityNavbarFiltersProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [investmentBucketKeys, setInvestmentBucketKeys] = useState([]);
  const [locations, setLocations] = useState([]);
  const [franchiseModels, setFranchiseModels] = useState([]);

  const toggleBrand = useCallback((name) => {
    setBrands((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  }, []);

  const toggleInvestmentBucket = useCallback((key) => {
    setInvestmentBucketKeys((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  }, []);

  const toggleLocation = useCallback((loc) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc]
    );
  }, []);

  const toggleFranchiseModel = useCallback((model) => {
    setFranchiseModels((prev) =>
      prev.includes(model) ? prev.filter((x) => x !== model) : [...prev, model]
    );
  }, []);

  const clearNavbarFilters = useCallback(() => {
    setBrands([]);
    setInvestmentBucketKeys([]);
    setLocations([]);
    setFranchiseModels([]);
  }, []);

  const value = useMemo(
    () => ({
      brands,
      investmentBucketKeys,
      locations,
      franchiseModels,
      toggleBrand,
      toggleInvestmentBucket,
      toggleLocation,
      toggleFranchiseModel,
      clearNavbarFilters,
      hasActiveNavbarFilters:
        brands.length +
          investmentBucketKeys.length +
          locations.length +
          franchiseModels.length >
        0,
    }),
    [
      brands,
      investmentBucketKeys,
      locations,
      franchiseModels,
      toggleBrand,
      toggleInvestmentBucket,
      toggleLocation,
      toggleFranchiseModel,
      clearNavbarFilters,
    ]
  );

  return (
    <FranchiseOpportunityNavbarFiltersContext.Provider value={value}>
      {children}
    </FranchiseOpportunityNavbarFiltersContext.Provider>
  );
}

export function useFranchiseOpportunityNavbarFilters() {
  const ctx = useContext(FranchiseOpportunityNavbarFiltersContext);
  if (!ctx) {
    throw new Error(
      'useFranchiseOpportunityNavbarFilters must be used within FranchiseOpportunityNavbarFiltersProvider'
    );
  }
  return ctx;
}
