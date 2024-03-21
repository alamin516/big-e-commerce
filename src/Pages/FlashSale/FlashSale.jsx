import FlashSaleTimer from "../../components/Home/FlashSaleTimer";

const FlashSale = () => {
  return (
    <div className="flash-sale-section">
      <div className="flash-sale-timer-nav h-[60px] leading-[60px] mb-[10px] overflow-hidden">
        <div className="max-w-7xl mx-auto mb-3 bg-gray-100">
          <FlashSaleTimer />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mb-3 bg-gray-100">
        
      </div>
    </div>
  );
};

export default FlashSale;
