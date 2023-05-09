import { Category, Product, User } from "../src/types";

export const params: Product = {
  title: "Aula de teste",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your  everyday",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

export const paramsPartial = {
  title: "Aula de teste",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your  everyday",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

export const paramsWithoutRating: Product = {
  id: 1,
  title: "Aula de teste",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your  everyday",
  category: "electronics",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rate: 3.9,
  count: 120,
};

export const categoriesParams: Category = {
  name: "electronics",
};

export const userWithoutId: User = {
  name: "Andre",
  email: "andre@email.com",
  password: "aisdmasidoia",
};
