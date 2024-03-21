import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/category.json");
        const shuffledCategories = shuffleArray(res.data);
        setCategories(shuffledCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <div className="category-section">
      <div className="max-w-7xl mx-auto pt-[24px] mb-3 bg-gray-100">
        <div className="title">
          <h3 className="text-[22px] text-[#424242] leading-[38px] w-[22px]">
            Categories
          </h3>
        </div>
        <div className="hop-categories-items bg-white min-h-[297px] grid lg:grid-cols-8 grid-cols-2 w-full">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="hop-category-item w-full h-[148.5px] bg-white border-[#e2e2e2]"
              >
                <Link to="" className="pt-4 text-black block">
                  <div className="w-20 h-20 mx-auto">
                    <img
                      className="w-full"
                      src={category.image}
                      alt={category.title}
                    />
                  </div>
                  <div className="hop-categories-name text-center mt-[10px]">
                    <span className="mt-2 mx-3 text-sm h-9 leading-[18px]">
                      {category["title"]}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
