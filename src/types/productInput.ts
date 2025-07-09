// src/types/productInput.ts
export interface ProductInput {
  title: string;
  slug: string;
  description?: string;
  price: number;
  images: string[];
  status?: string;
  stock?: number;
  categoryId: string;
  createdById: string;
}
