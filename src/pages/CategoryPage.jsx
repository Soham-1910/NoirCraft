import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { type } = useParams();

  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        let filteredProducts = [];

        if (type === "clothing") {
          filteredProducts = data.filter(
            (p) =>
              p.category === "men's clothing" ||
              p.category === "women's clothing"
          );
        } else if (type === "electronics") {
          filteredProducts = data.filter((p) => p.category === "electronics");
        } else if (type === "accessories") {
          filteredProducts = data.filter((p) => p.category === "jewelery");
        } else {
          filteredProducts = data;
        }
        setProducts(filteredProducts);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [type]);

  const genderFiltered =
    type === "clothing" && gender !== "all"
      ? products.filter((p) =>
        gender === "men"
          ? p.category === "men's clothing"
          : p.category === "women's clothing"
      )
      : products;

  const sortedProducts = [...genderFiltered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="pt-24 md:pt-32 max-w-7xl mx-auto px-4 md:px-6 text-white">
      {/* The collection/breadcrumb part has been removed for a cleaner look */}

      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-10">

        {/* SIDEBAR - Stays at top on mobile */}
        <aside className="md:col-span-3">
          <FilterBar
            category={type}
            gender={gender}
            setGender={setGender}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </aside>

        {/* PRODUCTS SECTION */}
        <section className="md:col-span-9">
          {sortedProducts.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">
                No pieces found.
              </p>
            </div>
          ) : (
            /* grid-cols-2 ensures responsiveness as requested */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CategoryPage;