export const fetchProducts = async () => {
  return Promise.resolve([
    {
      _id: "1",
      name: "iPhone 15",
      price: 79999,
      image: "https://picsum.photos/400/300?random=1",
      category: "mobile",
      description: "Latest Apple iPhone with powerful performance",
    },
    {
      _id: "2",
      name: "MacBook Pro",
      price: 199999,
      image: "https://picsum.photos/400/300?random=2",
      category: "laptop",
      description: "High performance laptop for professionals",
    },
    {
      _id: "3",
      name: "AirPods Pro",
      price: 24999,
      image: "https://picsum.photos/400/300?random=3",
      category: "accessories",
      description: "Noise cancelling wireless earbuds",
    },
  ]);
};

export const fetchProductById = async (id) => {
  const products = await fetchProducts();
  return products.find((p) => p._id === id);
};
