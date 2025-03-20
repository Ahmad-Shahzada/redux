import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { addItem } from "../store/cartSlice";
import { setSearchQuery,setCurrentPage } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { filteredItems,currentPage, itemsPerPage, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleAdd = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="container mx-auto p-6">
      <input
        type="text"
        placeholder="Search Products..."
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="border p-2 rounded w-full"
      />
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        🔥 Trending Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentItems.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br shadow-xl rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-36 h-44 object-contain mb-5 rounded-md transition-transform transform hover:scale-110"
            />
            <h4 className="text-lg font-bold text-center text-gray-900">
              {product.title.length > 30
                ? `${product.title.substring(0, 30)}...`
                : product.title}
            </h4>
            <h3 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 my-3">
              ${product.price.toFixed(2)}
            </h3>
            <button
              onClick={() => handleAdd(product)}
              className="mt-4 bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-600 dark:hover:bg-blue-400 transition-all shadow-md hover:shadow-xl"
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setCurrentPage(i + 1))}
            className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
