// src/utils/priceRangeUtils.ts

export interface NormalizedPriceItem {
  designation: string;
  od_mm: string;
  weight_kg_mtr: string;
  wall_thk_mm: string;
  price_inr_mtr: string;
  price_inr_kg: string;
  sch_10s?: string;
  [key: string]: any;
}

export const normalizePriceRange = (items: any[]): NormalizedPriceItem[] => {
  if (!items || !Array.isArray(items)) return [];

  return items.map((item) => {
    // Determine which fields exist and create a normalized object
    const normalized: NormalizedPriceItem = {
      designation: item.designation || item.diameter_in || item.size || item.nps || 'N/A',
      od_mm: item.od_mm || item.od || item.outside_diameter || '—',
      weight_kg_mtr: item.weight_kg_mtr || item.weight_kg || item.weight || '—',
      wall_thk_mm: item.wall_thk_mm || item.wall_thickness || item.wt_mm || '—',
      price_inr_mtr: item.price_inr_mtr || item.price_mtr || item.price_per_meter || '—',
      price_inr_kg: item.price_inr_kg || item.price_kg || item.price_per_kg || '—',
    };

    // Preserve any additional fields
    if (item.sch_10s) normalized.sch_10s = item.sch_10s;
    if (item.schedule) normalized.sch_10s = item.schedule;
    if (item.designation_a) normalized.designation_a = item.designation_a;
    if (item.diameter_in) normalized.diameter_in = item.diameter_in;
    
    // Copy any other fields that don't conflict
    Object.keys(item).forEach(key => {
      if (!(key in normalized)) {
        normalized[key] = item[key];
      }
    });

    return normalized;
  });
};

// Helper to check if data exists
export const hasPriceData = (priceRange: any[]): boolean => {
  return priceRange && Array.isArray(priceRange) && priceRange.length > 0;
};