export interface Product {
  product_id: number;
  name: string;
  img: Array<string>;
  tag: Array<string>;
  price: number;
  comparative: number;
  sku: string;
  description: string;
}
export interface DraftProduct {
  product_id: number;
  name: string;
  img: Array<string | File>;
  tag: Array<string>;
  price: number;
  comparative: number;
  sku: string;
  description: string;
}
export interface CartItem {
  product_id: number;
  name: string;
  img: Array<string>;
  tag: Array<string>;
  price: number;
  comparative: number;
  sku: string;
  description: string;
  quantity: number;
}

export interface ProductState {
  sort: number;
  priceFrom: number | null;
  searchFilter: string;
  products: Product[];
}
