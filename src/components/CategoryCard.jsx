function CategoryCard({ title, onClick }) {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-gray-900 hover:bg-gray-800 transition p-10 text-center rounded-2xl"
        >
            <h3 className="text-xl tracking-widest mb-2">{title}</h3>
            <p className="text-sm text-gray-400">Explore</p>
        </div>
    );
}

export default CategoryCard;
