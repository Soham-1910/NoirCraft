import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";
import { RevealOnScroll } from "../components/RevealOnScroll";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { title: "Clothing", type: "clothing" },
    { title: "Accessories", type: "accessories" },
    { title: "Shoes", type: "shoes" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 md:pt-32 px-4 md:px-6">
      <RevealOnScroll onLoad delay={0}>
        <h1 className="text-3xl md:text-5xl font-lavish text-center mb-12 md:mb-16">
          Shop by Category
        </h1>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <RevealOnScroll key={index} onLoad delay={index * 150}>
            <CategoryCard
              title={item.title}
              onClick={() => navigate(`/category/${item.type}`)}
            />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}

export default Categories;