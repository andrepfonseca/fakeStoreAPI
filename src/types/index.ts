type Category = {
  id?: number;
  name: string;
};

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: {
    rate?: number;
    count?: number;
  };
  rate?: number;
  count?: number;
  category_id?: number;
  category?: string;
}

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export { Category, Product, User, ErrorType };
