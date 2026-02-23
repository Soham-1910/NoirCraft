import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity || 0;

  return (
    <div className="h-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-white/30 transition">

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-[260px] w-full flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-6"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">

        {/* Title */}
        <h3 className="text-sm text-white leading-snug line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        <div className="flex-1" />

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-white text-sm font-medium">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="relative p-2 rounded-full border border-white/20 hover:border-white transition"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />

            {quantity > 0 && (
              <span
                className="
                  absolute -top-2 -right-2
                  min-w-[16px] h-[16px]
                  px-1
                  text-[10px]
                  rounded-full
                  bg-white text-black
                  flex items-center justify-center
                "
              >
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
