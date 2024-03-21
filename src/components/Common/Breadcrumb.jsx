import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ title }) => {
  return (
    <div className="bg-white py-2 ">
      <div className="max-w-7xl mx-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-gray-700">
                Products
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-900">{title}</span>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
