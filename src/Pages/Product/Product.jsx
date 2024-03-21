import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import SizeButton from "../../components/Buttons/SizeButton";
import Breadcrumb from "../../components/Common/Breadcrumb";
import Loading from "../../components/Loading/Loading";
import Description from "../../components/Product/Description";
import RatingProgressBar from "../../components/Ratings/ProgressRating";
import StarRating from "../../components/Ratings/StartRating";
import ImageLoading from "../../components/Loading/ImageLoading";

function Product() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/v1/products");
        const products = res.data.payload.products;
        const findProduct = products.find((product) => product._id === id);

        if (!findProduct) {
          console.log("Product does not exist with this id!");
        } else {
          setProduct(findProduct);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const colors = product.colors;
  const sizes = product.sizes;

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return <Loading />;
  }

  const handleAddToCart = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(true);
      let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Check if the product already exists in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item._id === product._id
      );

      if (product.colors.length > 0 || product.sizes.length > 0) {
        if (!selectedColor) {
          setLoading(false); // Set loading to false here
          toast.error("Select a color");
          return;
        }
        if (!selectedSize) {
          setLoading(false); // Set loading to false here
          toast.error("Select a size");
          return;
        }
      }

      if (existingProductIndex !== -1) {
        // If the product exists
        if (product.colors.length === 0 && product.sizes.length === 0) {
          // If the product doesn't have colors or sizes, just increase its quantity
          cart[existingProductIndex].quantity += selectedQuantity;
        } else {
          // If the product has colors or sizes
          const existingVariantIndex = cart[
            existingProductIndex
          ].variants.findIndex(
            (variant) =>
              variant.color === selectedColor && variant.size === selectedSize
          );

          if (existingVariantIndex !== -1) {
            // If the variant exists, update its quantity
            cart[existingProductIndex].variants[
              existingVariantIndex
            ].quantity += selectedQuantity;
            cart[existingProductIndex].quantity += selectedQuantity;
          } else {
            // If the variant doesn't exist, add it to the variants array
            cart[existingProductIndex].variants.push({
              color: selectedColor,
              size: selectedSize,
              quantity: selectedQuantity,
            });
            cart[existingProductIndex].quantity += selectedQuantity;
          }
        }
      } else {
        // If the product doesn't exist, add it to the cart with the selected variant
        const productCart = {
          ...product,
          quantity: selectedQuantity,
          variants:
            product.colors.length === 0 && product.sizes.length === 0
              ? []
              : [
                  {
                    color: selectedColor,
                    size: selectedSize,
                    quantity: selectedQuantity,
                  },
                ],
        };
        cart.push(productCart);
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(cart));

      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spp-section">
      <Breadcrumb title={product.title} />
      <div className="max-w-7xl mx-auto pt-[24px] mb-3 bg-[#EFF0F5]">
        <div className="flex flex-wrap p-4 bg-white">
          <div className="lg:w-4/12 md:w-1/2  mb-4 md:mb-0">
            <ImageLoading
              classes={`w-full object-cover h-full`}
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="lg:w-8/12 md:w-1/2 px-4">
            <div className="product-details">
              <div>
                <h1 className="text-[22px] mb-2">{product["title"]}</h1>
                <div className="my-2 flex gap-2">
                  <StarRating stars={product.ratings?.average} size={"12px"} />{" "}
                  <span className="text-[12px] text-[#1a9cb7]">
                    {product.ratings?.total} Ratings
                  </span>
                </div>
                <p className="mb-4 text-[12px]">
                  <span className="text-[#9e9e9e]">Brand:</span> {' '}
                  {product.brand ? (
                    <span className="text-[#1a9cb7]">
                      {product.brand.map((item) => item)}
                    </span>
                  ) : (
                    <span className="text-[#1a9cb7]">No brand</span>
                  )}
                </p>
              </div>
              <div
                className="pdp-mod-product-price"
                data-spm-anchor-id="a2a0e.pdp.0.i19.5db140efKHkAPB"
              >
                {/* <img
                  src="https://gcp-img.slatic.net/lazada/id0089912-480-72.png#width=480&amp;height=72"
                  className="pdp-mod-product-price-topbanner"
                  data-spm-anchor-id="a2a0e.pdp.0.i10.5db140efKHkAPB"
                /> */}
                <div className="pdp-product-price">
                  <span
                    className=" pdp-price pdp-price_type_normal pdp-price_color_orange pdp-price_size_xl"
                    data-spm-anchor-id="a2a0e.pdp.0.i25.5db140efKHkAPB"
                  >
                    ৳{" "}
                    {product?.prices?.discounted
                      ? product.prices?.discounted
                      : product.prices?.original}
                  </span>
                  {!product?.prices?.discounted ? (
                    ""
                  ) : (
                    <div className="origin-block">
                      <span className=" pdp-price pdp-price_type_deleted pdp-price_color_lightgray pdp-price_size_xs">
                        ৳ 199
                      </span>
                      <span className="pdp-product-price__discount">
                        -{product.prices?.discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {/* Product Colors */}
              {product?.colors?.length > 0 && (
                <div className="color-options mb-4 flex items-center">
                  <span className="mr-2 text-[#757575] text-sm">Colors:</span>
                  {colors?.map((color, index) => (
                    <button
                      key={index}
                      style={{ backgroundColor: color }}
                      className={`color-option w-6 h-6 text-center rounded-full mr-2 ${
                        selectedColor === color ? "active" : ""
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      {selectedColor === color && (
                        <svg
                          className="w-4 h-4 text-white fill-current mx-auto"
                          viewBox="0 0 20 20"
                        >
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
              {/* Product Sizes */}
              {product?.sizes?.length > 0 && (
                <div className="size-options mb-4 flex items-center">
                  <label className="mr-2 text-[#757575] text-sm">Sizes:</label>
                  <div className="flex gap-2">
                    {sizes?.map((size, index) => (
                      <SizeButton
                        key={index}
                        size={size}
                        isSelected={selectedSize === size}
                        onClick={() => handleSizeChange(size)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* <div className="quantity mb-4">
                <span className="mr-2">Quantity:</span>
                <input
                  type="number"
                  value={selectedQuantity}
                  min={1}
                  onChange={handleQuantityChange}
                  className="w-16 border border-gray-400 rounded px-2 py-1"
                />
              </div> */}
              <div className="quantity mb-4 flex items-center gap-3">
                <h6 className="section-title mb-2 text-[#757575] text-sm">
                  Quantity
                </h6>
                <div className="section-content">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (selectedQuantity > 1) {
                          setSelectedQuantity(selectedQuantity - 1);
                        }
                      }}
                      className="focus:outline-none bg-[#eff0f5] w-8 h-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mx-auto text-[#9e9e9e]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {/* <input
                      className="w-10 text-center border-0 focus:outline-none"
                      type="text"
                      value={selectedQuantity}
                      min={1}
                      onChange={(e) => selectedQuantity(e)}
                    /> */}
                    <input
                      className="w-10 text-center border-0 focus:outline-none"
                      type="number"
                      value={selectedQuantity}
                      min={1}
                      onChange={(e) =>
                        setSelectedQuantity(parseInt(e.target.value))
                      }
                      style={{
                        appearance: "textfield",
                        "-moz-appearance": "textfield",
                        "-webkit-appearance": "textfield",
                        maxWidth: "40px",
                      }}
                    />
                    <button
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                      className="focus:outline-none bg-[#eff0f5] w-8 h-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 mx-auto text-[#9e9e9e]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {
                <button
                  onClick={handleAddToCart}
                  className="bg-[#F85606] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="loader w-6 h-6 border-t-4 border-[#36f806] border-solid rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-5 max-w-7xl mx-auto mb-3">
        <div className="lg:w-9/12 md:w-9/12 w-full">
          <div className=" bg-white mb-3">
            <h2 className="bg-[#f5f5f5] px-5 py-3 text-sm font-medium">
              Ratings & Reviews
            </h2>
            {product.ratings?.average || product.ratings?.total ? (
              <div className="px-5 py-4">
                <div className="pdp-reviews lg:flex gap-2">
                  <div className="lg:w-3/12 w-full review-info-left lg:border-r-[1px] lg:border-gray-200">
                    <div className="rating-info-rate flex items-center">
                      <span className="score text-[32px] font-medium mr-2">
                        {product.ratings?.average}
                      </span>
                      {product.ratings?.average <= 3.6 ? (
                        ""
                      ) : (
                        <span className="rating-tag-text relative pl-1 pr-3 text-sm flex items-center bg-[#ffc700] text-white h-5">
                          <img
                            className="white-star w-3 h-3 mr-1"
                            src="//img.alicdn.com/imgextra/i3/O1CN01AvJLRr1gxlvS02Jss_!!6000000004209-2-tps-24-24.png"
                            alt=""
                          />
                          {product.ratings?.average >= 4
                            ? "Very Good"
                            : product.ratings?.average >= 3.5
                            ? "Good"
                            : ""}
                        </span>
                      )}
                    </div>
                    <div className="star-box mt-2 mb-3">
                      <StarRating
                        stars={product.ratings?.average}
                        size={"22px"}
                      />
                    </div>
                    <div className="rate-num text-sm">
                      {product.ratings?.total} ratings
                    </div>
                  </div>
                  <div className="lg:w-9/12 w-full review-info-right lg:pl-10">
                    <RatingProgressBar />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center text-[12px] text-[rgba(0,0,0,.5)]">
                This product has no reviews.
              </div>
            )}
          </div>
          <div className="bg-white mb-3">
            <Description />
          </div>
        </div>
        <div className="lg:w-3/12 md:w-3/12 w-full bg-white">
          Related products
        </div>
      </div>
    </div>
  );
}

export default Product;
