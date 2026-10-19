// src/data/productIndex.ts
import {
  anchorChannel,
  buttweldFitting,
  coils,
  fasteners,
  flanges,
  forgedfitting,
  perforatedsheet,
  rings,
  rodBars,
  sheets,
  wireMesh,
  wires,
  pipes,
  circles,
} from "./productsMaterials";
import { ProductMaterial } from "./productsMaterials";
export type { ProductMaterial };

// Combined product lists
export const circlesAndRings: ProductMaterial[] = [...circles, ...rings];
export const sheetsPlatesAndCoils: ProductMaterial[] = [...sheets, ...coils];
export const flangesAndForgedFittings: ProductMaterial[] = [
  ...flanges,
  ...forgedfitting,
];
export const anglesChennelsAndFlat: ProductMaterial[] = anchorChannel;
export const anglesChannelsAndFlat: ProductMaterial[] = anglesChennelsAndFlat;
export const anglesChannelsAndFlatPlate: ProductMaterial[] = anglesChennelsAndFlat;

export const productCategoryMap: Record<string, ProductMaterial[]> = {
  // Canonical combined categories (exact requested slugs)
  "circles/rings": circlesAndRings,
  "sheets/plate/coil": sheetsPlatesAndCoils,
  "flanges/forged-fittings": flangesAndForgedFittings,
  "angle-chennels/flat": anglesChennelsAndFlat,
  "angle-channels/flat": anglesChennelsAndFlat,
  "angle-channels/flat-plate": anglesChennelsAndFlat,

  // Other active categories
  "buttweld-fittings": buttweldFitting,
  fasteners: fasteners,
  "perforated-sheet": perforatedsheet,
  "round-bars": rodBars,
  "pipes-tubes": pipes,
  "wire-mesh": wireMesh,
  wires: wires,

  // Backward compatibility mappings for legacy category slugs
  circles: circlesAndRings,
  rings: circlesAndRings,
  "sheets-plates": sheetsPlatesAndCoils,
  sheets: sheetsPlatesAndCoils,
  plates: sheetsPlatesAndCoils,
  coils: sheetsPlatesAndCoils,
  flanges: flangesAndForgedFittings,
  "forged-fittings": flangesAndForgedFittings,
  "angle-channels": anglesChannelsAndFlatPlate,

  // Additional mappings for backward compatibility
  "steel-pipes": pipes,
  "steel-rods-bars": rodBars,
  "steel-angles-channels": anglesChannelsAndFlatPlate,
  "steel-plates-sheets": sheetsPlatesAndCoils,
  "steel-coils": sheetsPlatesAndCoils,
  "steel-flanges": flangesAndForgedFittings,
  "buttweld-steel-tubes": buttweldFitting,
  "industrial-fasteners": fasteners,
  "stainless-steel-pipes": pipes,
};
