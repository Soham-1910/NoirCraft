const BASE_URL = "https://fakestoreapi.com/products";


export const getAllProducts = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("API Error (getAllProducts):", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product with ID: ${id}`);
    return await res.json();
  } catch (error) {
    console.error("API Error (getProductById):", error);
    return null;
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const res = await fetch(`${BASE_URL}/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    return await res.json();
  } catch (error) {
    console.error("API Error (getProductsByCategory):", error);
    return [];
  }
};