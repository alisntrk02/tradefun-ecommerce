import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sort") || "");

  const handleFilter = () => {
    if (sort) searchParams.set("sort", sort);
    else searchParams.delete("sort");

    setSearchParams(searchParams);
  };

  return (
    <div className="rounded-lg p-4 space-y-4 text-sm">
      <div className="space-y-1">
        <label className="font-medium block">Sort By</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-2 py-1 w-full text-sm"
        >
          <option value="">Select</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-createdAt">Newest</option>
          <option value="-rating">Highest Rating</option>
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2 text-sm cursor-pointer"
      >
        Filter
      </button>
    </div>
  );
}

export default FilterBar;
