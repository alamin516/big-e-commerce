import React from "react";

const PaymentMethod = ({formData, handleChange}) => {
  return (
    <>
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
    </>
  );
};

export default PaymentMethod;
