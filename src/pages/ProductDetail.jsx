import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { getProductById } from "../api/products";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            setProduct(await getProductById(id));
        };
        fetch();
    }, [id]);

    if (!product)
        return <p className="text-center mt-40 text-gray-400 tracking-widest">LOADING</p>;

    return (
        <div className="min-h-screen bg-black text-white pt-24 md:pt-36 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div className="flex justify-center bg-white/5 rounded-3xl p-8 md:p-12">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-64 sm:h-80 md:h-[480px] object-contain"
                    />
                </div>

                <div className="flex flex-col justify-center space-y-6 md:space-y-8">
                    <h1 className="text-2xl md:text-4xl font-light tracking-wide leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-xl md:text-2xl tracking-wider text-gray-300">
                        ${product.price}
                    </p>

                    <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
                        {product.description}
                    </p>

                    <button
                        onClick={() => dispatch(addToCart(product))}
                        className="w-full md:w-max border border-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}