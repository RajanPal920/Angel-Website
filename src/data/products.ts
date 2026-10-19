import {
  Settings,
  Circle,
  Cable,
  Grid2X2,
  Square,
  GitBranch,
  Nut,
  Disc3,
  Cylinder,
  Columns3,
  Network,
} from "lucide-react";

export const products = [
  {
    id: 1,
    name: "Angles, Chennels & Flat",
    slug: "angle-chennels/flat",
    image: "/productImage/angle-channels.jpg",
    icon: Columns3,
    category: "Structural Steel",
    shortDescription:
      "Structural angles, chennels, and flat products engineered for heavy-duty industrial applications.",
  },
  {
    id: 2,
    name: "Buttweld Fittings",
    slug: "buttweld-fittings",
    image: "/productImage/buttweld.jpg",
    icon: GitBranch,
    category: "Pipe Fittings",
    shortDescription:
      "Premium buttweld fittings manufactured to ASTM standards.",
  },
  {
    id: 3,
    name: "Circles & Rings",
    slug: "circles/rings",
    image: "/productImage/circles.jpg",
    icon: Disc3,
    category: "Flat & Forged Products",
    shortDescription:
      "High precision stainless steel circles and precision forged rings.",
  },
  {
    id: 4,
    name: "Fastener",
    slug: "fasteners",
    image: "/productImage/fastener.jpg",
    icon: Nut,
    category: "Industrial Fasteners",
    shortDescription: "Complete range of industrial fasteners.",
  },
  {
    id: 5,
    name: "Flanges & Forged Fittings",
    slug: "flanges/forged-fittings",
    image: "/productImage/Flanges.jpg",
    icon: Settings,
    category: "Pipe Fittings & Forged",
    shortDescription:
      "Premium quality industrial flanges and high-pressure forged fittings manufactured to international standards.",
  },
  {
    id: 6,
    name: "Perforated Sheet",
    slug: "perforated-sheet",
    image: "/productImage/perforated-sheet.jpg",
    icon: Grid2X2,
    category: "Sheets",
    shortDescription:
      "High precision perforated sheets in various hole patterns.",
  },
  {
    id: 7,
    name: "Rod",
    slug: "round-bars",
    image: "/productImage/rod.jpg",
    icon: Circle,
    category: "Bars & Rods",
    shortDescription:
      "Precision engineered stainless steel and alloy round bars.",
  },
  {
    id: 8,
    name: "Sheets, Plates & Coils",
    slug: "sheets/plate/coil",
    image: "/productImage/sheets.jpg",
    icon: Square,
    category: "Flat Products",
    shortDescription:
      "High-performance stainless steel sheets, plates, and industrial coils available in various thicknesses.",
  },
  {
    id: 9,
    name: "Steel Pipes & Tubes",
    slug: "pipes-tubes",
    image: "/productImage/steel-pipes.jpg",
    icon: Cylinder,
    category: "Pipes & Tubes",
    shortDescription:
      "Seamless and welded pipes available in multiple grades.",
  },
  {
    id: 10,
    name: "Wire Mesh",
    slug: "wire-mesh",
    image: "/productImage/wire-mesh.jpg",
    icon: Network,
    category: "Wire Products",
    shortDescription: "Industrial wire mesh for filtration and screening.",
  },
  {
    id: 11,
    name: "Wires",
    slug: "wires",
    image: "/productImage/wires.jpg",
    icon: Cable,
    category: "Wire Products",
    shortDescription: "Industrial wires suitable for fabrication and welding.",
  },
];
