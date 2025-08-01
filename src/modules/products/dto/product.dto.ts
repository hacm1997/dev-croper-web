export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  __v: number;
}

export interface ProductsResponse {
  data: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}