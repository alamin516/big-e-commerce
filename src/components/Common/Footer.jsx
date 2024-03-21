const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8">
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Electronics</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Fashion</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Beauty & Health</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Home & Lifestyle</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Help Center</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">How to Buy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Returns & Refunds</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Company Profile</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="lg:col-span-1 md:col-span-2 sm:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Facebook</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Twitter</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">Instagram</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-500 transition duration-300">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-black">
          <p>&copy; 2024 Your Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
