import FranchiseInquiryModal from './FranchiseInquiryModal';

/** Inline sticky enquiry card for franchise detail desktop layout (form logic unchanged). */
export default function FranchiseInquiryStickyPanel({ franchise, franchiseStructure }) {
  if (!franchise?.id || !franchise?.name) return null;

  return (
    <div id="fd-sticky-inquiry-form" className="fd-sticky-inquiry-form">
      <FranchiseInquiryModal
        franchise={franchise}
        franchiseStructure={franchiseStructure}
        variant="panel"
        lockScroll={false}
        onClose={() => {}}
      />
    </div>
  );
}
