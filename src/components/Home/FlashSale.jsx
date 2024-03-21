import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageLoading from "../Loading/ImageLoading";
import FlashSaleTimer from "./FlashSaleTimer";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/products?limit=6"
        );
        setProducts(res.data.payload.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flash-sale-section">
      <div className="max-w-7xl mx-auto pt-[24px] mb-3 bg-gray-100">
        <div className="title">
          <h3 className="text-[22px] text-[#424242] leading-[38px]">
            Flash Sale
          </h3>
        </div>
        <div className="h-[372px] bg-white mb-[10px]">
          <div
            className="flex justify-between items-center h-[60px] border-b-[1px] border-[#d5d5d5] leading-[60px] mb-[10px] overflow-hidden"
            data-count-down-bg-color="#ff6801"
          >
            <FlashSaleTimer />
            <Link
              className="text-sm text-[#f57224] font-medium border-[1px] border-[#f57224] rounded-[2px] h-[35px] leading-[35px] bg-transparent text-center px-[10px] mr-[11px]"
              title="FlashSale"
              to="/flash-sale"
            >
              SHOP MORE
            </Link>
          </div>
          <div>
            <div>
              <div className="hop-products-container-row grid lg:grid-cols-6 grid-cols-2 gap-[10px]">
                {products.map((product) => {
                  return (
                    <div key={product._id} className="hop-product-card">
                      <Link to={`/product/${product._id}`}>
                        <div>
                          <div>
                            {loading ? (
                              <>
                                <div className="flex flex-col items-center justify-center">
                                  <img
                                    src="/loading-image.png"
                                    alt="Loading"
                                    className="w-full"
                                  />
                                </div>
                              </>
                            ) : (
                              <ImageLoading
                                classes={`w-full`}
                                src={product.image}
                                alt={product.title}
                              />
                            )}
                          </div>
                          <div className="px-2 pt-1 pb-3">
                            {!loading ? (
                              <div className="hop-product-title text-sm leading-[18px] text-[#212121] mb-1">
                                <span>{product.title}</span>
                              </div>
                            ) : (
                              <div className="hop-product-title text-sm leading-[18px] h-[18px] bg-gray-200 mb-1">
                                <span></span>
                              </div>
                            )}
                            {loading ? (
                              <div className="h-[40px] bg-gray-200 overflow-hidden mb-1"></div>
                            ) : (
                              <div>
                                <div className="text-lg text-[#f85606] h-[22px] leading-[22px] overflow-hidden mb-1">
                                  <span className="currency">৳</span>
                                  <span className="price">
                                    {product.prices.discounted
                                      ? product.prices.discounted
                                      : product.prices.original}
                                  </span>
                                </div>
                                <div className="">
                                  {!product.prices.discounted ? (
                                    ""
                                  ) : (
                                    <span className="text-[12px] leading-[12px] text-[#9e9e9e] mb-1 align-left">
                                      <span className="currency">৳</span>
                                      <span className="price">
                                        {product.prices.original}
                                      </span>
                                    </span>
                                  )}
                                  {!product.prices.discountPercentage ? (
                                    ""
                                  ) : (
                                    <span className="text-[12px] align-left">
                                      {" "}
                                      {product.prices.discountPercentage}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
