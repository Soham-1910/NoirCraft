import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../api/products";

export default function Accessories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const all = await getAllProducts();
            setProducts(all.filter((p) => p.category === "jewelery"));
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-36 px-6">
            <h2 className="text-5xl tracking-[0.3em] uppercase text-center mb-20">
                Accessories
            </h2>

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
