import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CartTable from "../../components/Cart/CartTable";
import Loading from "../../components/Loading/Loading";
import RatingProgressBar from "../../components/Ratings/ProgressRating";
import { AuthContext } from "../../contexts/Auth";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setLoading: loadingOff } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  const handleRemoveCart = (id) => {
    try {
      setLoading(true);
      const updatedCartItems = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.success("Product removed from cart");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto pt-[24px] mb-3 bg-gray-100">
        <div className="flex items-center justify-center min-h-96">
          <h2 className="text-2xl text-center">
            No items in the cart <br />
            <Link to="/">
              <button className="bg-[#F85606] text-white px-6 py-2 rounded-md mt-2">
                Continue Shopping
              </button>
            </Link>
          </h2>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    try {
      return navigate("/checkout", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      loadingOff(false);
    }
  };

  // const handleLogin = () => {
  //   toast.success("Please login before checkout!")
  //   return navigate("/login", { replace: true });
  // };

  return (
    <div className="max-w-7xl mx-auto py-[50px] bg-gray-100">
      <div className="lg:flex gap-5">
        <div className="lg:w-8/12">
          <table className="min-w-full overflow-x-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartTable
                  key={item.id}
                  item={item}
                  handleRemoveCart={handleRemoveCart}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:w-4/12">
          <div className="min-w-full overflow-x-auto bg-gray-50 px-6 py-3">
            <RatingProgressBar />
            <div>
              <button
                onClick={() => handleCheckout()}
                className="w-full bg-[#F85606] hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-2"
              >
                Checkout
              </button>
              {/* ) : (
                <button
                  onClick={() => handleLogin()}
                  className="w-full bg-[#F85606] text-white px-6 py-2 rounded-md mt-2"
                >
                  Checkout
                </button>
              )} */}
            </div>
            <div>
              <Link to="/">
                <button className="w-full bg-[#F85606] hover:bg-blue-600 text-white px-6 py-2 rounded-md mt-2">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
