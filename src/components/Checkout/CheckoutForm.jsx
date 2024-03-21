const CheckoutForm = ({
  handleSubmit,
  handleChange,
  formData,
  handleGiftFormToggle,
}) => {


  return (
    <>
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
            value={formData?.fullName}
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
            value={formData?.email}
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
            value={formData?.address}
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
              value={formData?.city}
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
            value={formData?.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="sendAsGift"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Send as a Gift
          </label>
          <input
            type="checkbox"
            id="sendAsGift"
            name="isGift"
            checked={formData?.isGift}
            onChange={handleGiftFormToggle}
            className="mr-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Gift form */}
        {formData?.isGift && <div>
          <h3 className="text-lg font-semibold mb-2">Gift Recipient Details</h3>
          <div className="mb-4">
            <label
              htmlFor="giftRecipientName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Recipient's Name
            </label>
            <input
              type="text"
              id="giftRecipientName"
              name="giftRecipientName"
              value={formData.giftRecipientName}
              onChange={handleChange}
              placeholder="Recipient's Name"
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow-sm focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>}
        {/* End of gift form */}
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
            value={formData?.paymentMethod}
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
          className="bg-[#F85606] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Place Order
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
