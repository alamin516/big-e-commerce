
const UspsCard = () => {
  return (
    <div className="max-w-7xl mx-auto relative lg:flex justify-between lg:gap-[15px] lg:py-[15px] lg:px-0 md:px-10 sm:px-5 bg-gray-100">
      <ul className="w-full lg:flex lg:justify-between lg:items-center grid grid-cols-2 gap-5 py-3 pl-[17px] pr-[12px] usps-items lg:h-[42px] bg-[#fff1eb] hover:bg-[#FFE8DE] rounded-[12px]">
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/55c642f0-250b-4515-9c8a-42cce3327098.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">Safe Payments</a>
        </li><span className="hidden lg:block">{"|"}</span>
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/1b7e5ccb-89fc-4383-bc27-4586e82195be.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">Nationwide Delivery</a>
        </li><span className="hidden lg:block">{"|"}</span>
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/f2a7f550-3a25-478d-9879-e6aa419c7ebf.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">Free & Easy Return</a>
        </li><span className="hidden lg:block">{"|"}</span>
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/05352646-9b19-4283-a7b1-dcb16736663e.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">Best Price Guaranteed</a>
        </li><span className="hidden lg:block">{"|"}</span>
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/781b5194-65f0-4ae5-b7a6-003bc717054f.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">100% Authentic Products</a>
        </li><span className="hidden lg:block">{"|"}</span>
        <li className="flex items-center">
          <img src="//icms-image.slatic.net/images/ims-web/8faa565d-b52d-4e05-90e4-38466e764e84.png" alt="" className="h-8 w-8 mr-2" />
          <a href="#" className="lg:text-[15px] text-[12px] text-gray-700 hover:text-gray-900">Daraz Verified</a>
        </li>
      </ul>
    </div>
  );
}

export default UspsCard;
