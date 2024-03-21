import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import toast from "react-hot-toast";

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
  });
  const [orders, setOrders] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        Items: cartItems
      };
  
      const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];
  
      const updatedOrders = existingOrders.concat(order);
      
  
      localStorage.setItem("Orders", JSON.stringify(updatedOrders));

      toast.success("Order Success");

      localStorage.removeItem("cartItems");
      setCartItems([])
      
  
      setFormData({
        fullName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        paymentMethod: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(() => {
    if (!user) {
      return navigate("/cart", { replace: true });
    }
  }, [user, navigate,]);

  

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];
    setOrders(existingOrders)
  }, []);

  useEffect(() => {
    // Fetch current location and update form data
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Fetch address details based on latitude and longitude
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            const { address } = data;
            console.log(address)
            setFormData(prevData => ({
              ...prevData,
              city: address.state_district,
              zipCode: address.postcode,
              country: address.country,
            }));
          })
          .catch(error => console.error('Error fetching location:', error));
      });
    }
  }, []);

  if(cartItems?.length === 0){
    return navigate("/cart", { replace: true });
  }

  return (
    <div className="max-w-7xl mx-auto py-[50px] bg-gray-100">
      <div className="lg:flex gap-5">
        <div className="lg:w-6/12">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline disabled:bg-white"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="w-1/2 mb-4">
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Zip Code"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className="lg:w-6/12 bg-white">
          {orders?.length} <br />
          {formData.fullName}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
