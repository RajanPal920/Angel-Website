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
  plates,
  circles,
  valves,
  pipes, // ← Add this import
  tubes, // ← Add this import
} from "./productsMaterials";
import { ProductMaterial } from "./productsMaterials";

// ── The Main Map Object ──
export const productCategoryMap: Record<string, ProductMaterial[]> = {
  // Match the slug from products.ts to the data array
  "anchor-fastener": anchorFastener,
  "angle-channels": anchorChannel,
  "buttweld-fittings": buttweldFitting,
  circles: circles,
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
  sheets: sheets,
  pipes: pipes,
  strips: strips,
  tubes: tubes,
  valves: valves,
  "wire-mesh": wireMesh,
  wires: wires,
  plates: plates,

  // Additional mappings for backward compatibility
  "steel-pipes": pipes,
  "steel-rods-bars": rodBars,
  "steel-angles-channels": anchorChannel,
  "steel-plates-sheets": plates,
  "steel-coils": coils,
  "steel-flanges": flanges,
  "buttweld-steel-tubes": buttweldFitting,
  "industrial-fasteners": fasteners,
  "stainless-steel-pipes": pipes,
};
