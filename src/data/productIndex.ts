// src/data/productIndex.ts
import {
  anchorChannel,
  anchorFastener,
  buttweldFitting,
  coils,
  dairypharmaValves,
  fasteners,
  flanges,
  forgedfitting,
  hosepipe,
  pattapatti,
  perforatedsheet,
  rings,
  rodBars,
  sheets,
  strips,
  wireMesh,
  wires,
  valves,
  pipes,
  circles, // ← Add this import
 // ← Add this import
} from "./productsMaterials";
import { ProductMaterial } from "./productsMaterials";

// ── The Main Map Object ──
export const productCategoryMap: Record<string, ProductMaterial[]> = {
  // Match the slug from products.ts to the data array
  "anchor-fastener": anchorFastener,
  "angle-channels": anchorChannel,
  "buttweld-fittings": buttweldFitting,
  circles: circles, // ← Add this mapping
  coils: coils,
  "dairy-pharma-valves": dairypharmaValves,
  fasteners: fasteners,
  flanges: flanges,
  "forged-fittings": forgedfitting,
  "hose-pipe": hosepipe,
  "patta-patti": pattapatti,
  "perforated-sheet": perforatedsheet,
  rings: rings,
  "round-bars": rodBars,
  "sheets-plates": sheets,
  "pipes-tubes": pipes,
  strips: strips,
  valves: valves,
  "wire-mesh": wireMesh,
  wires: wires,
  // plates: plates,

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
