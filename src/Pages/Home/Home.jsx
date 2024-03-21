import Banner from "../../components/Home/Banner";
import Category from "../../components/Home/Category";
import FlashSale from "../../components/Home/FlashSale";
import ProductForYou from "../../components/Home/ProductForYou";
import UspsCard from "../../components/Home/UspsCard";

const Home = () => {
  return (
    <>
      <Banner />
      <UspsCard/>
      <FlashSale/>
      <Category/>
      <ProductForYou show={12}/>
    </>
  );
};

export default Home;
