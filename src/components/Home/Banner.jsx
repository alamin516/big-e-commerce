import Carousel from "./Carousel";
import SideMenuCategory from "./SideMenuCategory";


const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto relative lg:flex justify-between lg:gap-[15px] lg:py-[15px] lg:px-0 md:px-10 sm:px-5 bg-gray-100">
      <div className="lg:w-1/5 hidden lg:block">
        <SideMenuCategory />
      </div>

      {/* Carousel */}
      <div className="lg:w-4/5 w-full">
        <Carousel />
      </div>
    </div>
  );
}

export default Banner;
