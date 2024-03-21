import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem("Orders")) || [];
    setOrders(existingOrders);
  }, []);

  return <div>{orders.length}</div>;
};

export default Orders;
