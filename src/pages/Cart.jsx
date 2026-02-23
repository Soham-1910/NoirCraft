import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
                <h2 className="text-2xl md:text-3xl tracking-[0.3em] uppercase mb-4">Cart</h2>
                <p className="text-gray-400 tracking-widest text-sm">Your cart is empty</p>
            </div>
        );
    }

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-black text-white pt-24 md:pt-36 px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase mb-4">Cart</h2>
                <p className="text-gray-400 text-xs md:text-sm tracking-widest">Review your selected pieces</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-12 md:mb-20 gap-6 border-y border-white/10 py-8">
                <button
                    onClick={() => dispatch(clearCart())}
                    className="w-full sm:w-auto border border-white/40 px-8 py-3 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition"
                >
                    Clear Cart
                </button>

                <p className="text-lg md:text-xl tracking-widest uppercase">
                    Total — <span className="text-white">${totalPrice.toFixed(2)}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {cartItems.map((product) => (
                    <div key={product.id} className="relative bg-black border border-white/10 rounded-2xl p-4 md:p-6 transition hover:border-white/30">
                        <button
                            onClick={() => dispatch(removeFromCart(product.id))}
                            className="absolute top-4 right-4 text-[10px] tracking-widest text-gray-500 hover:text-white transition"
                        >
                            REMOVE
                        </button>

                        <div className="h-48 md:h-64 flex items-center justify-center mb-6">
                            <img
                                src={product.image || product.images?.[0]}
                                alt={product.title}
                                className="max-h-full object-contain"
                            />
                        </div>

                        <h3 className="text-[10px] uppercase tracking-widest mb-2 line-clamp-2 min-h-[32px]">
                            {product.title}
                        </h3>
                        <p className="text-white text-sm tracking-wider mb-1">${product.price}</p>
                        <p className="text-gray-500 text-[10px] tracking-widest uppercase">Qty — {product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}