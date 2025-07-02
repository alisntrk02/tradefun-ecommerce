import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryBar() {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/categorys")
      .then((res) => {
        setCategory(res.data.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center  w-full bg-[#19253a]">
        <ul className="flex space-x-2 text-white">
          {categories?.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="px-3 py-2 "
            >
              {category.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoryBar;
