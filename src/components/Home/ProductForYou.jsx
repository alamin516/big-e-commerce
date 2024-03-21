import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../Ratings/StartRating";
import ImageLoading from "../Loading/ImageLoading";

const ProductForYou = ({ show }) => {
  const [products, setProducts] = useState([]);
  const [displayCount, setDisplayCount] = useState(show);
  const productsToShow = products.slice(0, displayCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/products");
        const shuffledProducts = shuffleArray(res.data.payload.products);
        setProducts(shuffledProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleLoadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setDisplayCount(displayCount + 12);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="hop-products-section">
      <div className="max-w-7xl mx-auto pt-[24px] mb-3 bg-gray-100">
        <div className="title">
          <h3 className="text-[22px] text-[#424242] leading-[38px]">
            Just For You
          </h3>
        </div>
        <div>
          <div className="hop-products-container">
            <div className="hop-products-container-row grid lg:grid-cols-6 grid-cols-2 gap-[10px] mb-5">
              {productsToShow.map((product, idx) => {
                return (
                  <div key={idx} className="hop-product-card">
                    <Link to={`/product/${product._id}`}>
                      <div>
                        <div>
                          {/* <img
                            src={product.image}
                            alt={product.title}
                            className="w-full"
                          /> */}
                          <ImageLoading
                            classes={`w-full`}
                            src={product.image}
                            alt={product.title}
                          />
                        </div>
                        <div className="px-2 pt-1 pb-3">
                          <div className="text-[12px] min-h-[14px] my-[2px] leading-[14px]">
                            <img
                              src="https://img.alicdn.com/imgextra/i2/O1CN01m9OC6a1UK86X51Dcq_!!6000000002498-2-tps-108-54.png"
                              alt=""
                              className="h-[12px]"
                            />
                          </div>
                          <div className="hop-product-title text-sm h-[36px] leading-[18px] text-[#212121]">
                            <span>{product.title}</span>
                          </div>
                          <div className="hop-product-prices mt-1">
                            <div className="hop-price-first-line">
                              <span className="currency">৳</span>
                              <span className="price">
                                {product.prices.discounted
                                  ? product.prices.discounted
                                  : product.prices.original}
                              </span>
                            </div>
                            <div className="hop-price-second-line">
                              {!product.prices.discounted ? (
                                ""
                              ) : (
                                <span className="hop-price-text align-left">
                                  <span className="currency">৳</span>
                                  <span className="price">
                                    {product.prices.original}
                                  </span>
                                </span>
                              )}
                              {!product.prices.discountPercentage ? (
                                ""
                              ) : (
                                <span className="hop-discount align-left">
                                  {" "}
                                  {product.prices.discountPercentage}%
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="card-jfy-footer flex items-center">
                            <div className="card-jfy-ratings">
                              <div className="card-jfy-rating-layer">
                                <StarRating
                                  stars={product.ratings?.average}
                                  size={"12px"}
                                />
                              </div>
                            </div>
                            <div className="card-jfy-ratings-comment">
                              ({product?.ratings?.total})
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {products.length > displayCount && (
              <div className="hop-card-load-more lg:w-4/12 mx-auto">
                {loading ? (
                  <>
                    <div className="flex flex-col items-center justify-center">
                      <img
                        src="/bigecommerce.gif"
                        alt="Loading"
                        className="w-12 h-12 mb-4"
                      />
                    </div>
                  </>
                ) : (
                  <button
                    className="hop-load-more-button"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForYou;
