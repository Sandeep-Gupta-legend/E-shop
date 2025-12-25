import api from './api';

export const fetchProducts = async () => {
  return [
    {
      _id: "1",
      name: "iPhone 15",
      price: 79999,
      image: "https://picsum.photos/400/300?random=1",
      category: "mobile",
      

    },
    {
      _id: "2",
      name: "MacBook Pro",
      price: 199999,
      image: "https://picsum.photos/400/300?random=2",
      category: "laptop",
    },
  ];
};
