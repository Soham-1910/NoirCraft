import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <p className="text-gray-400 text-sm">
                No products found.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductGrid;
