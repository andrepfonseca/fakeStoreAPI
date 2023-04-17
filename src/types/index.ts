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

export { Category, Product };
