// src/data/productIndex.ts
import {
  anchorChannel,
  buttweldFitting,
  coils,
  dairypharmaValves,
  fasteners,
  flanges,
  forgedfitting,
  perforatedsheet,
  rings,
  rodBars,
  sheets,
  wireMesh,
  wires,
  valves,
  pipes,
  circles,
} from "./productsMaterials";
import { ProductMaterial } from "./productsMaterials";
export type { ProductMaterial };

export const productCategoryMap: Record<string, ProductMaterial[]> = {
  "angle-channels": anchorChannel,
  "buttweld-fittings": buttweldFitting,
  circles: circles,
  coils: coils,
  "dairy-pharma-valves": dairypharmaValves,
  fasteners: fasteners,
  flanges: flanges,
  "forged-fittings": forgedfitting,
  "perforated-sheet": perforatedsheet,
  rings: rings,
  "round-bars": rodBars,
  "sheets-plates": sheets,
  "pipes-tubes": pipes,
  valves: valves,
  "wire-mesh": wireMesh,
  wires: wires,

  // Additional mappings for backward compatibility
  "steel-pipes": pipes,
  "steel-rods-bars": rodBars,
  "steel-angles-channels": anchorChannel,
  "steel-plates-sheets": sheets,
  "steel-coils": coils,
  "steel-flanges": flanges,
  "buttweld-steel-tubes": buttweldFitting,
  "industrial-fasteners": fasteners,
  "stainless-steel-pipes": pipes,
};
