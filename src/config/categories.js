import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { CATEGORY_CONFIG } from "../config/categories";

function CategoryPage({ categoryName }) {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Example filtering logic using your config
  const filteredItems = items.filter((product) =>
    CATEGORY_CONFIG[categoryName].filters.All.includes(product.category)
  );

  if (status === "loading") return <div className="text-white">Loading Luxury...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {filteredItems.map((product) => (
        <div key={product.id} className="border border-white/10 p-4">
          <h2 className="font-montserrat uppercase text-sm">{product.title}</h2>
          <p className="text-gray-400">${product.price}</p>
        </div>
      ))}
    </div>
  );
}