import ProductForYou from "../../components/Home/ProductForYou";

const NotFound = () => {
  return (
    <>
    <div className="flex justify-center items-center min-h-[500px]">
      <div>
        <h1 className="text-3xl text-shadow-sm text-gray-400 text-center">
          404 <br /> Page Not Found!
        </h1>
      </div>
    </div>
    <ProductForYou/>
    </>
  );
};

export default NotFound;
