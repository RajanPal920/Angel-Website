// utils/productUtils.ts
import { productCategoryMap, ProductMaterial } from "../data/productIndex";

export const getProductsByCategory = (
  categoryKey: string,
): ProductMaterial[] => {
  if (!categoryKey) return [];
  const normalizedKey = categoryKey.trim().toLowerCase();
  if (productCategoryMap.hasOwnProperty(normalizedKey)) {
    return productCategoryMap[normalizedKey];
  }
  return [];
};

export const getProductBySlug = (slug: string): ProductMaterial | undefined => {
  if (!slug) return undefined;
  for (const categoryKey in productCategoryMap) {
    const products = productCategoryMap[categoryKey];
    const found = products.find((product) => product.slug === slug);
    if (found) return found;
  }
  return undefined;
};

export const getCategoryForProduct = (slug: string): string | undefined => {
  if (!slug) return undefined;
  for (const categoryKey in productCategoryMap) {
    const products = productCategoryMap[categoryKey];
    const found = products.find((product) => product.slug === slug);
    if (found) return categoryKey;
  }
  return undefined;
};
