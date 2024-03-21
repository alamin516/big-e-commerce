import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import toast from "react-hot-toast";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    address: "",
    city: "",
    zipCode: "",
    country: "",
    paymentMethod: "",
    isGift: false, 
    giftRecipientName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox differently
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const {
        fullName,
        email,
        address,
        city,
        zipCode,
        country,
        paymentMethod,
      } = formData;

      const order = {
        fullName,
        email,
        address,
        city,
        zipCode,
        country,
        paymentMethod,
        Items: cartItems,
      };

      const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];

      const updatedOrders = existingOrders.concat(order);

      localStorage.setItem("Orders", JSON.stringify(updatedOrders));

      toast.success("Order Success");

      localStorage.removeItem("cartItems");
      setCartItems([]);

      setFormData({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        paymentMethod: "",
        isGift: false,
        giftRecipientName: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate("/cart", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        console.log(latitude, longitude)

        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            const { address } = data;
            setFormData((prevData) => ({
              ...prevData,
              city: address.state_district,
              zipCode: address.postcode,
              country: address.country,
            }));
          })
          .catch((error) =>
            console.error("Error fetching location:", error)
          );
      });
    }
  }, []);

  const handleGiftFormToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      isGift: !prevData.isGift,
    }));
  };

  if (cartItems?.length === 0) {
    return navigate("/cart", { replace: true });
  }

  return (
    <div className="max-w-7xl mx-auto py-[50px] bg-gray-100">
      <div className="lg:flex gap-5">
        <div className="lg:w-6/12">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <CheckoutForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} handleGiftFormToggle={handleGiftFormToggle}/>
        </div>
        <div className="lg:w-6/12 bg-white">
          {formData.fullName}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
