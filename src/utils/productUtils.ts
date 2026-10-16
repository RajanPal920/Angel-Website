// utils/productUtils.ts
import { productCategoryMap, ProductMaterial } from "../data/productIndex";
import { productSlugRedirectMap } from "../data/productSlugMap";

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
  const normalized = slug.trim().toLowerCase();

  // 1. Direct check in redirect map for canonical or old slug
  const mapped = productSlugRedirectMap[normalized];
  if (mapped && productCategoryMap[mapped.categorySlug]) {
    const found = productCategoryMap[mapped.categorySlug].find(
      (p) => p.slug === mapped.canonicalSlug || p.slug === normalized || p.oldSlug === normalized
    );
    if (found) return found;
  }

  // 2. Fallback search across all categories
  for (const categoryKey in productCategoryMap) {
    const products = productCategoryMap[categoryKey];
    const found = products.find(
      (product) => product.slug === normalized || product.oldSlug === normalized
    );
    if (found) return found;
  }
  return undefined;
};

export const getCategoryForProduct = (slug: string): string | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();

  const mapped = productSlugRedirectMap[normalized];
  if (mapped) return mapped.categorySlug;

  for (const categoryKey in productCategoryMap) {
    const products = productCategoryMap[categoryKey];
    const found = products.find(
      (product) => product.slug === normalized || product.oldSlug === normalized
    );
    if (found) return categoryKey;
  }
  return undefined;
};
