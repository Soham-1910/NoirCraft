import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../redux/uiSlice";
import { addToCart, decreaseQuantity, clearCart } from "../redux/cartSlice";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.cartOpen);
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 z-[70] bg-black cursor-pointer"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 z-[80] h-full w-full sm:w-[380px] bg-black text-white border-l border-white/10 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="tracking-widest text-sm uppercase">Your Cart</h2>
              <button
                onClick={() => dispatch(closeCart())}
                className="text-white hover:text-gray-300 transition p-2 rounded-full bg-white/10"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-500 text-sm tracking-widest uppercase">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartItem key={item.id} item={item} dispatch={dispatch} />
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6 bg-black">
                <div className="flex justify-between text-sm mb-4 tracking-widest uppercase">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full border border-white py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition">
                  Checkout
                </button>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full text-[10px] uppercase tracking-widest text-gray-500 mt-4 hover:text-white transition"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

const CartItem = React.memo(({ item, dispatch }) => (
  <div className="flex gap-4 items-center">
    <div className="w-20 h-24 bg-white/5 rounded p-2 flex items-center justify-center">
      <img
        src={item.image}
        alt={item.title}
        className="max-w-full max-h-full object-contain"
      />
    </div>
    <div className="flex-1">
      <p className="text-[10px] uppercase tracking-wider line-clamp-1 text-gray-300">{item.title}</p>
      <p className="text-white text-sm mt-1 font-medium">${item.price.toFixed(2)}</p>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center border border-white/10">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            className="px-3 py-1 hover:bg-white/10 transition"
          >
            −
          </button>
          <span className="text-[11px] px-2 w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => dispatch(addToCart(item))}
            className="px-3 py-1 hover:bg-white/10 transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
));