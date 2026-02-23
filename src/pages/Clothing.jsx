import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategories } from "../api/products";

const MEN = ["mens-shirts", "mens-shoes"];
const WOMEN = ["womens-dresses", "tops", "womens-shoes"];

export default function Clothing() {
    const [gender, setGender] = useState("men");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const categories = gender === "men" ? MEN : WOMEN;
            const data = await getProductsByCategories(categories);
            setProducts(data.slice(0, 12));
            setLoading(false);
        };
        fetch();
    }, [gender]);

    return (
        <div className="min-h-screen bg-black text-white pt-36 px-6">
            <h2 className="text-5xl tracking-[0.3em] uppercase text-center mb-16">
                Clothing
            </h2>

            <div className="flex justify-center gap-10 mb-20">
                {["men", "women"].map((g) => (
                    <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`text-xs uppercase tracking-widest pb-2 border-b transition ${gender === g
                                ? "border-white text-white"
                                : "border-transparent text-gray-500 hover:text-white"
                            }`}
                    >
                        {g}
                    </button>
                ))}
            </div>

            {loading ? (
                <p className="text-center text-gray-400 tracking-widest">LOADING</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
