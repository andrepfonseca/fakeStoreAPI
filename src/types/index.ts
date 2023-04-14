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
  rating: string;
}

interface ProductForDB extends Product {
  category_id: number;
}

interface ProductToReturn extends Product {
  category: string;
}

export { Category, Product, ProductForDB, ProductToReturn };
