// materials.ts
import {
  ShieldCheck,
  Layers,
  FlaskConical,
  Waves,
  CircleDot,
  Settings,
  Sparkles,
  Box,
  Zap,
} from "lucide-react";

// Types
export interface MaterialItem {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  properties?: string[];
  applications?: string[];
  image?: string;
}

export interface Material {
  name: string;
  slug: string;
  image?: string;
  icon: any;
  description: string;
  overview?: string;
  highlight?: string[];
  items?: MaterialItem[];
}

// Helper function to ensure items have proper structure
const buildItemsWithImages = (items: any[]) => {
  return items.map((item) => {
    // If item already has an image, keep it
    if (item.image) {
      return { ...item };
    }

    // Only generate image if none exists
    let image = `/stock/${item.slug}.jpg`;

    // Check if it's a nickel alloy product
    if (
      item.slug.includes("nickel") ||
      item.slug.includes("alloy") ||
      item.slug.includes("monel") ||
      item.slug.includes("inconel") ||
      item.slug.includes("incoloy") ||
      item.slug.includes("hastelloy")
    ) {
      // Use generic nickel alloy images
      if (item.slug.includes("pipe") || item.slug.includes("tube")) {
        image = "/stock/nickel-alloy-pipes.jpg";
      } else if (item.slug.includes("bar") || item.slug.includes("rod")) {
        image = "/stock/nickel-alloy-rod.jpg";
      } else if (item.slug.includes("sheet")) {
        image = "/stock/nickel-alloy-sheet.jpg";
      } else if (item.slug.includes("plate")) {
        image = "/stock/nickel-alloy-plate.jpg";
      } else if (item.slug.includes("flange")) {
        image = "/stock/nickel-alloy-flanges.jpg";
      } else if (item.slug.includes("fastener")) {
        image = "/stock/nickel-alloy-fastener.jpg";
      } else if (item.slug.includes("wire")) {
        image = "/stock/nickel-alloy-wire.jpg";
      } else if (item.slug.includes("coil")) {
        image = "/stock/nickel-alloy-coil.jpg";
      } else if (item.slug.includes("fitting")) {
        image = "/stock/nickel-alloy-fitting.jpg";
      }
    }

    return { ...item, image };
  });
};

// Maps material to categories (used for filtering and display)
export const materialToCategoryMap: Record<string, string[]> = {
  "stainless-steel": [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  "duplex-steel": [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  "nickel-alloy": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  "copper-nickel": [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  hastelloy: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  incoloy: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  inconel: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  monel: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  titanium: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  nimonic: [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
  "other-materials": [
    "pipes-tubes",
    "sheets-plates",
    "round-bars",
    "wires",
    "flanges",
    "fasteners",
    "pipe-fittings",
    "forged-fittings",
  ],
};

// Maps product category keys to material slugs (reverse lookup)
export const categoryToMaterialMap: Record<string, string> = {
  // Stainless Steel
  "stainless-steel-pipes": "stainless-steel",
  "stainless-steel-tubes": "stainless-steel",
  "stainless-steel-sheets": "stainless-steel",
  "stainless-steel-plates": "stainless-steel",
  "stainless-steel-wires": "stainless-steel",
  "stainless-steel-coils": "stainless-steel",
  "stainless-steel-round-bars": "stainless-steel",
  "stainless-steel-flanges": "stainless-steel",
  "stainless-steel-fasteners": "stainless-steel",
  "stainless-steel-pipe-fittings": "stainless-steel",
  "stainless-duplex-steel-forged-fittings": "stainless-steel",

  // Duplex Steel
  "duplex-super-duplex-steel-pipes": "duplex-steel",
  "duplex-super-duplex-steel-tubes": "duplex-steel",
  "duplex-super-duplex-steel-sheets": "duplex-steel",
  "duplex-super-duplex-steel-plates": "duplex-steel",
  "duplex-super-duplex-steel-wires": "duplex-steel",
  "duplex-super-duplex-steel-coils": "duplex-steel",
  "duplex-super-duplex-steel-round-bars": "duplex-steel",
  "duplex-steel-flanges": "duplex-steel",
  "duplex-steel-fasteners": "duplex-steel",
  "duplex-steel-pipe-fittings": "duplex-steel",
  "duplex-steel-forged-fittings": "duplex-steel",

  // Nickel Alloy
  "nickel-alloy-pipes": "nickel-alloy",
  "nickel-alloy-tubes": "nickel-alloy",
  "nickel-alloy-sheets": "nickel-alloy",
  "nickel-alloy-plates": "nickel-alloy",
  "nickel-alloy-wires": "nickel-alloy",
  "nickel-alloy-coils": "nickel-alloy",
  "nickel-alloy-round-bars": "nickel-alloy",
  "nickel-alloy-flanges": "nickel-alloy",
  "nickel-alloy-fasteners": "nickel-alloy",
  "nickel-alloy-pipe-fittings": "nickel-alloy",
  "nickel-alloy-forged-fittings": "nickel-alloy",

  // Copper Nickel
  "copper-nickel-pipes": "copper-nickel",
  "copper-nickel-tubes": "copper-nickel",
  "copper-nickel-sheets": "copper-nickel",
  "copper-nickel-plates": "copper-nickel",
  "copper-nickel-round-bars": "copper-nickel",
  "copper-nickel-coils": "copper-nickel",
  "copper-nickel-flanges": "copper-nickel",
  "copper-nickel-pipe-fittings": "copper-nickel",
  "copper-nickel-forged-fittings": "copper-nickel",

  // Hastelloy
  "hastelloy-pipes": "hastelloy",
  "hastelloy-tubes": "hastelloy",
  "hastelloy-sheets": "hastelloy",
  "hastelloy-plates": "hastelloy",
  "hastelloy-wires": "hastelloy",
  "hastelloy-coils": "hastelloy",
  "hastelloy-round-bars": "hastelloy",
  "hastelloy-flanges": "hastelloy",
  "hastelloy-fasteners": "hastelloy",
  "hastelloy-pipe-fittings": "hastelloy",
  "hastelloy-forged-fittings": "hastelloy",

  // Incoloy
  "incoloy-pipes": "incoloy",
  "incoloy-tubes": "incoloy",
  "incoloy-sheets": "incoloy",
  "incoloy-plates": "incoloy",
  "incoloy-wires": "incoloy",
  "incoloy-coils": "incoloy",
  "incoloy-round-bars": "incoloy",
  "incoloy-flanges": "incoloy",
  "incoloy-fasteners": "incoloy",
  "incoloy-pipe-fittings": "incoloy",
  "incoloy-forged-fittings": "incoloy",

  // Inconel
  "inconel-pipes": "inconel",
  "inconel-tubes": "inconel",
  "inconel-sheets": "inconel",
  "inconel-plates": "inconel",
  "inconel-wires": "inconel",
  "inconel-coils": "inconel",
  "inconel-round-bars": "inconel",
  "inconel-flanges": "inconel",
  "inconel-fasteners": "inconel",
  "inconel-pipe-fittings": "inconel",
  "inconel-forged-fittings": "inconel",

  // Monel
  "monel-pipes": "monel",
  "monel-tubes": "monel",
  "monel-sheets": "monel",
  "monel-plates": "monel",
  "monel-wires": "monel",
  "monel-coils": "monel",
  "monel-round-bars": "monel",
  "monel-flanges": "monel",
  "monel-fasteners": "monel",
  "monel-pipe-fittings": "monel",
  "monel-forged-fittings": "monel",

  // Titanium
  "titanium-pipes": "titanium",
  "titanium-tubes": "titanium",
  "titanium-sheets": "titanium",
  "titanium-plates": "titanium",
  "titanium-wires": "titanium",
  "titanium-coils": "titanium",
  "titanium-round-bars": "titanium",
  "titanium-flanges": "titanium",
  "titanium-fasteners": "titanium",
  "titanium-pipe-fittings": "titanium",
  "titanium-forged-fittings": "titanium",

  // Sanicro
  "nimonic-pipes": "nimonic",
  "nimonic-tubes": "nimonic",
  "nimonic-sheets": "nimonic",
  "nimonic-plates": "nimonic",
  "nimonic-wires": "nimonic",
  "nimonic-coils": "nimonic",
  "nimonic-round-bars": "nimonic",
  "nimonic-flanges": "nimonic",
  "nimonic-fasteners": "nimonic",
  "nimonic-pipe-fittings": "nimonic",
  "nimonic-forged-fittings": "nimonic",

  // Other Materials
  "high-performance-alloy-pipes": "other-materials",
  "high-performance-alloy-tubes": "other-materials",
  "high-performance-alloy-round-bars": "other-materials",
  "high-performance-alloy-sheets": "other-materials",
  "high-performance-alloy-plates": "other-materials",
  "high-performance-alloy-wires": "other-materials",
  "high-performance-alloy-coils": "other-materials",
  "high-performance-alloy-flanges": "other-materials",
  "high-performance-alloy-pipe-fittings": "other-materials",
  "high-performance-alloy-forged-fittings": "other-materials",
};

const materials: Material[] = [
  {
    name: "Stainless Steel",
    slug: "stainless-steel",
    icon: "ShieldCheck",
    description:
      "Corrosion-resistant austenitic, ferritic, and martensitic grades for general industrial, food, and architectural use.",
    overview:
      "A versatile range of stainless grades suited to food processing, architecture, and general engineering.",
    highlight: [
      "Excellent corrosion resistance",
      "Clean finishing",
      "High weldability",
    ],
    items: [
      {
        slug: "stainless-steel-304-304l-pipes",
        title:
          "Stainless Steel 304 / 304L Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 304 and 304L pipes engineered to withstand extreme weather conditions and reactive compounds. Available in seamless, welded, ERW, and EFW forms. Manufactured to ASTM A312 and ASME SA312 standards.",
        image: "/stock/stainless-steel-304-304l-pipes.jpg",
      },
      {
        slug: "stainless-steel-316-316l-pipes",
        title:
          "Stainless Steel 316 / 316L Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 316 and 316L pipes engineered for superior performance in chloride-rich and acidic environments. Enhanced with 2% to 3% molybdenum for excellent resistance to pitting and crevice corrosion. Manufactured to ASTM A312 and ASME SA312 standards.",
        image: "/stock/stainless-steel-316-316l-pipes.jpg",
      },
      {
        slug: "stainless-steel-904l-pipes",
        title: "Stainless Steel 904L Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 904L (UNS N08904 / 1.4539) high-alloy austenitic pipes engineered for severe corrosive media, featuring exceptional resistance to strong reducing acids, particularly sulfuric acid. Manufactured to ASTM A312, A358 and ASME SA312, SA358 standards.",
        image: "/stock/stainless-steel-904l-pipes.jpg",
      },
      {
        slug: "stainless-steel-321-pipes",
        title: "Stainless Steel 321 Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 321 (UNS S32100 / 1.4541) titanium-stabilized austenitic pipes engineered for high-heat environments, offering remarkable resistance to intergranular corrosion and creep at temperatures from 800°F to 1500°F. Manufactured to ASTM A312, A358 and ASME SA312, SA358 standards.",
        image: "/stock/stainless-steel-321-pipes.jpg",
      },
      {
        slug: "stainless-steel-317l-pipes",
        title: "Stainless Steel 317L Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 317L (UNS S31703 / 1.4438) low-carbon, molybdenum-bearing austenitic pipes engineered for environments where standard 316L grades fall short, offering significantly enhanced resistance to chemical attack in acidic, chloride, and brine solutions. Manufactured to ASTM A312, A358 and ASME SA312, SA358 standards.",
        image: "/stock/stainless-steel-317l-pipes.jpg",
      },
      {
        slug: "stainless-steel-310s-pipes",
        title: "Stainless Steel 310S Pipes Supplier – ASTM A312 & ASME SA312",
        shortDescription:
          "Premium Stainless Steel 310S (UNS S31008 / 1.4845) heat-resistant austenitic pipes engineered for high-temperature and high-pressure environments, offering exceptional oxidation resistance up to 2000°F (1093°C). Manufactured to ASTM A312, A358 and ASME SA312, SA358 standards.",
        image: "/stock/stainless-steel-310s-pipes.jpg",
      },
      {
        slug: "stainless-steel-304-sheets-plates",
        title:
          "Stainless Steel 304 Sheets & Plates Supplier - UNS S30400 (1.4301)",
        shortDescription:
          "Premium Stainless Steel 304 (UNS S30400 / 1.4301) sheets and plates, the most versatile and widely used austenitic stainless steel offering excellent corrosion resistance, good formability, and outstanding weldability. Manufactured to ASTM A240 and ASME SA240 standards for food processing, chemical, and general industrial applications.",
        image: "/stock/stainless-steel-304-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-304l-sheets-plates",
        title:
          "Stainless Steel 304L Sheets & Plates Supplier - UNS S30403 (1.4306/1.4307)",
        shortDescription:
          "Premium Stainless Steel 304L (UNS S30403 / 1.4306/1.4307) sheets and plates, the low-carbon version of 304 offering excellent corrosion resistance and improved weldability. Manufactured to ASTM A240 and ASME SA240 standards for food processing, chemical, and welding-intensive applications.",
        image: "/stock/stainless-steel-304l-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-310-sheets-plates",
        title:
          "Stainless Steel 310 Sheets & Plates Supplier - UNS S31000 (1.4841)",
        shortDescription:
          "Premium Stainless Steel 310 (UNS S31000 / 1.4841) sheets and plates, the high-temperature austenitic alloy offering excellent resistance to oxidation, carburization, and sulfur environments. Manufactured to ASTM A240 and ASME SA240 standards for heat-resistant and high-temperature applications.",
        image: "/stock/stainless-steel-310-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-316-316l-sheets-plates",
        title:
          "Stainless Steel 316/316L Sheets & Plates Supplier - UNS S31600/S31603 (1.4401/1.4404)",
        shortDescription:
          "Premium Stainless Steel 316/316L (UNS S31600/S31603 / 1.4401/1.4404) sheets and plates, the molybdenum-bearing austenitic alloy offering enhanced corrosion resistance, particularly against chlorides and acids. Manufactured to ASTM A240 and ASME SA240 standards for chemical, pharmaceutical, and marine applications.",
        image: "/stock/stainless-steel-316-316l-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-317-317l-sheets-plates",
        title:
          "Stainless Steel 317/317L Sheets & Plates Supplier - UNS S31700/S31703 (1.4449/1.4438)",
        shortDescription:
          "Premium Stainless Steel 317/317L (UNS S31700/S31703 / 1.4449/1.4438) sheets and plates, the high-molybdenum austenitic alloy offering superior corrosion resistance in aggressive chemical environments. Manufactured to ASTM A240 and ASME SA240 standards for chemical processing, pulp and paper, and high-temperature applications.",
        image: "/stock/stainless-steel-317-317l-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-321-sheets-plates",
        title:
          "Stainless Steel 321 Sheets & Plates Supplier - UNS S32100 (1.4541)",
        shortDescription:
          "Premium Stainless Steel 321 (UNS S32100 / 1.4541) sheets and plates, the titanium-stabilized austenitic alloy offering excellent resistance to intergranular corrosion and high-temperature oxidation. Manufactured to ASTM A240 and ASME SA240 standards for high-temperature and welded applications.",
        image: "/stock/stainless-steel-321-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-347-sheets-plates",
        title:
          "Stainless Steel 347 Sheets & Plates Supplier - UNS S34700 (1.4550)",
        shortDescription:
          "Premium Stainless Steel 347 (UNS S34700 / 1.4550) sheets and plates, the columbium/tantalum-stabilized austenitic alloy offering excellent resistance to intergranular corrosion and high-temperature oxidation. Manufactured to ASTM A240 and ASME SA240 standards for high-temperature and corrosive applications.",
        image: "/stock/stainless-steel-347-sheets-plates.jpg",
      },
      {
        slug: "stainless-steel-wires",
        title:
          "Stainless Steel Wires Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        shortDescription:
          "Premium Stainless Steel wires in a comprehensive range of grades including 304/304L, 316/316L, 310S, 321, 317L, 904L, and 17-4 PH. Engineered for exceptional corrosion resistance, high-temperature performance, and high strength. Ideal for aerospace, medical, marine, chemical processing, and high-performance industrial applications. Manufactured to ASTM A313, A580, and ASME SA580 standards.",
        image: "/stock/stainless-steel-wires.jpg",
      },
      {
        slug: "stainless-steel-flanges",
        title:
          "Stainless Steel Flanges Manufacturer & Supplier - ASTM A182 / ASME SA-182",
        shortDescription:
          'Premium stainless steel flanges manufacturer and supplier based in Mumbai, India, stocking and exporting since 2013. Forged stainless steel flanges manufactured to ASTM A182 / ASME SA-182. Available grades include 304, 304L, 310, 316 & 316L, 317 & 317L, 321, 347 and 904L. Sizes range from NPS 1/2" to 48" with Classes 150 to 2500. Eleven flange types with five common facing options.',
        image: "/stock/stainless-steel-flanges.jpg",
      },
      {
        slug: "stainless-steel-fasteners",
        title:
          "Stainless Steel Fasteners Manufacturer & Supplier - ASTM F593 / F594 / ISO 3506",
        shortDescription:
          "Premium stainless steel fasteners manufacturer, stockist, supplier and exporter operating from Mumbai, India, since 2013. Available grades: Stainless Steel 310, 316 & 316L, 317 & 317L, 321, 347 and 904L. Bolts, screws and studs in 316, 316L, 321 and 347 supplied to ASTM F593, with matching nuts to ASTM F594. Metric diameters range from M3 to M56 and imperial diameters from 3/16 in to 2 in.",
        image: "/stock/stainless-duplex-steel-fasteners.jpg",
      },
      {
        slug: "stainless-steel-316-316l-forgings",
        title:
          "Stainless Steel 316 & 316L Forging Manufacturer & Supplier - ASTM A182 / ASME SA182",
        shortDescription:
          "Premium Stainless Steel 316 & 316L forgings manufacturer, supplier, stockist and exporter from Mumbai, India. Forged components to ASTM A182 F316/F316L and ASME SA182, with 16.0–18.0% chromium and 2.00–3.00% molybdenum addition for chloride pitting resistance. Available in F316 (UNS S31600) and F316L (UNS S31603) grades, offering solution-annealed forgings for pressure and general industrial service.",
        image: "/stock/stainless-steel-316-316l-forgings.jpg",
      },
      {
        slug: "stainless-steel-410-forgings",
        title:
          "Stainless Steel 410 Forging Manufacturer & Supplier - ASTM A182 F6a",
        shortDescription:
          "Premium Stainless Steel 410 forgings manufacturer, supplier, stockist and exporter from Mumbai, India. Martensitic stainless steel forgings with 11.50–13.50% chromium, supplied to ASTM A473 and ASTM A182 Grade F6a for pressure and general industrial service. Available in four heat-treatment classes (Class 1 to 4), offering tensile strength from 485 MPa to 895 MPa for pumps, valves, turbines and wellhead assemblies.",
        image: "/stock/stainless-steel-410-forgings.jpg",
      },
      {
        slug: "stainless-steel-17-4-ph-forgings",
        title:
          "Stainless Steel 17-4 PH Forging Manufacturer & Supplier - ASTM A705 / ASME SA-705",
        shortDescription:
          "Premium Stainless Steel 17-4 PH (UNS S17400 / AISI 630) forgings manufacturer, supplier, and exporter from Mumbai, India. Precipitation-hardening martensitic stainless steel with 15.00-17.50% Chromium, 3.00-5.00% Nickel, and Copper addition for age-hardening. Supplied in Condition A (solution annealed) or aged to H900 through H1150, offering tensile strength from 930 MPa to 1310 MPa for valve trim, pump shafts, aerospace fittings, and oilfield hardware.",
        image: "/stock/stainless-steel-17-4-ph-forgings.jpg",
      },
      // {
      //   slug: "stainless-duplex-steel-forged-fittings",
      //   title: "Stainless & Duplex Steel Forged Fittings",
      //   shortDescription:
      //     "ASTM A182 F304L, F316L, F321, F347, 904L / Duplex F51, F53, F60 / Super Duplex F55 Structural Branch Connections & Sockolets.",
      //   image: "/stock/carbon-alloy-steel-forged-fittings.jpg",
      // },
      {
        slug: "stainless-steel-304-bars-rods",
        title: "Stainless Steel 304 Bars & Rods Supplier - UNS S30400 (1.4301)",
        shortDescription:
          "Premium Stainless Steel 304 (UNS S30400 / 1.4301) bars and rods, the most versatile and widely used austenitic stainless steel. Manufactured to ASTM A276 and A479 standards for food processing, chemical, and general industrial applications.",
        image: "/stock/stainless-steel-304-bars.jpg",
      },
      {
        slug: "stainless-steel-304l-bars-rods",
        title:
          "Stainless Steel 304L Bars & Rods Supplier - UNS S30403 (1.4306/1.4307)",
        shortDescription:
          "Premium Stainless Steel 304L (UNS S30403 / 1.4306/1.4307) bars and rods, the low-carbon version of 304 offering excellent corrosion resistance and improved weldability. Manufactured to ASTM A276 and A479 standards for food processing, chemical, and welding-intensive applications.",
        image: "/stock/stainless-steel-304l-bars.jpg",
      },
      {
        slug: "stainless-steel-310-bars-rods",
        title: "Stainless Steel 310 Bars & Rods Supplier - UNS S31000 (1.4841)",
        shortDescription:
          "Premium Stainless Steel 310 (UNS S31000 / 1.4841) bars and rods, a high-temperature austenitic alloy offering excellent resistance to oxidation, carburization, and sulfur environments. Manufactured to ASTM A276 and A479 standards for heat-resistant and high-temperature applications.",
        image: "/stock/stainless-steel-310-bars.jpg",
      },
      {
        slug: "stainless-steel-316-316l-bars-rods",
        title:
          "Stainless Steel 316/316L Bars & Rods Supplier - UNS S31600/S31603 (1.4401/1.4404)",
        shortDescription:
          "Premium Stainless Steel 316/316L (UNS S31600/S31603 / 1.4401/1.4404) bars and rods, the molybdenum-bearing austenitic alloy offering enhanced corrosion resistance, particularly against chlorides and acids. Manufactured to ASTM A276 and A479 standards for chemical, pharmaceutical, and marine applications.",
        image: "/stock/stainless-steel-316-316l-bars.jpg",
      },
      {
        slug: "stainless-steel-317-317l-bars-rods",
        title:
          "Stainless Steel 317/317L Bars & Rods Supplier - UNS S31700/S31703 (1.4449/1.4438)",
        shortDescription:
          "Premium Stainless Steel 317/317L (UNS S31700/S31703 / 1.4449/1.4438) bars and rods, the high-molybdenum austenitic alloy offering superior corrosion resistance in aggressive chemical environments. Manufactured to ASTM A276 and A479 standards for chemical processing, pulp and paper, and high-temperature applications.",
        image: "/stock/stainless-steel-317-317l-bars.jpg",
      },
      {
        slug: "stainless-steel-321-bars-rods",
        title: "Stainless Steel 321 Bars & Rods Supplier - UNS S32100 (1.4541)",
        shortDescription:
          "Premium Stainless Steel 321 (UNS S32100 / 1.4541) bars and rods, the titanium-stabilized austenitic alloy offering excellent resistance to intergranular corrosion and high-temperature oxidation. Manufactured to ASTM A276 and A479 standards for high-temperature and welded applications.",
        image: "/stock/stainless-steel-304-bars.jpg",
      },
      {
        slug: "stainless-steel-347-bars-rods",
        title: "Stainless Steel 347 Bars & Rods Supplier - UNS S34700 (1.4550)",
        shortDescription:
          "Premium Stainless Steel 347 (UNS S34700 / 1.4550) bars and rods, the columbium/tantalum-stabilized austenitic alloy offering excellent resistance to intergranular corrosion and high-temperature oxidation. Manufactured to ASTM A276 and A479 standards for high-temperature and corrosive applications.",
        image: "/stock/stainless-steel-304l-bars.jpg",
      },
      {
        slug: "stainless-steel-904l-bars-rods",
        title:
          "Stainless Steel 904L Bars & Rods Supplier - UNS N08904 (1.4539)",
        shortDescription:
          "Premium Stainless Steel 904L (UNS N08904 / 1.4539) bars and rods, the high-alloy austenitic stainless steel with copper addition offering exceptional corrosion resistance in severe environments. Manufactured to ASTM B649 and ASME SB649 standards for chemical, marine, and high-corrosion applications.",
        image: "/stock/stainless-steel-310-bars.jpg",
      },
      {
        slug: "stainless-steel-410-bars-rods",
        title: "Stainless Steel 410 Bars & Rods Supplier - UNS S41000 (1.4006)",
        shortDescription:
          "Premium Stainless Steel 410 (UNS S41000 / 1.4006) bars and rods, the general-purpose martensitic stainless steel offering good corrosion resistance and high strength. Manufactured to ASTM A276 and A479 standards for heat-resistant and high-strength applications.",
        image: "/stock/stainless-steel-316-316l-bars.jpg",
      },
      {
        slug: "stainless-steel-420-bars-rods",
        title: "Stainless Steel 420 Bars & Rods Supplier - UNS S42000 (1.4021)",
        shortDescription:
          "Premium Stainless Steel 420 (UNS S42000 / 1.4021) bars and rods, the hardenable martensitic stainless steel offering good strength, wear resistance, and corrosion resistance. Manufactured to ASTM A276 and A479 standards for surgical, industrial, and high-strength applications.",
        image: "/stock/stainless-steel-304-bars.jpg",
      },
      {
        slug: "stainless-steel-422-bars-rods",
        title: "Stainless Steel 422 Bars & Rods Supplier - UNS S42200 (1.4935)",
        shortDescription:
          "Premium Stainless Steel 422 (UNS S42200 / 1.4935) bars and rods, a high-temperature hardenable martensitic alloy with excellent strength and oxidation resistance. Manufactured to ASTM A276 and A479 standards for high-temperature and high-strength applications.",
        image: "/stock/stainless-steel-317-317l-bars.jpg",
      },
      {
        slug: "stainless-steel-430-bars-rods",
        title: "Stainless Steel 430 Bars & Rods Supplier - UNS S43000 (1.4016)",
        shortDescription:
          "Premium Stainless Steel 430 (UNS S43000 / 1.4016) bars and rods, the ferritic stainless steel offering good corrosion resistance and excellent formability. Manufactured to ASTM A276 and A479 standards for general-purpose and decorative applications.",
        image: "/stock/stainless-steel-304l-bars.jpg",
      },
      {
        slug: "stainless-steel-440c-440b-bars-rods",
        title:
          "Stainless Steel 440C/440B Bars & Rods Supplier - UNS S44004/S44003 (1.4125/1.4112)",
        shortDescription:
          "Premium Stainless Steel 440C and 440B (UNS S44004/S44003 / 1.4125/1.4112) bars and rods, the high-carbon martensitic alloys offering excellent hardness, wear resistance, and corrosion resistance. Manufactured to ASTM A276 and A479 standards for industrial and high-strength applications.",
        image: "/stock/stainless-steel-310-bars.jpg",
      },
      {
        slug: "stainless-steel-15-5ph-bars-rods",
        title:
          "Stainless Steel 15-5PH Bars & Rods Supplier - UNS S15500 (1.4545)",
        shortDescription:
          "Premium Stainless Steel 15-5PH (UNS S15500 / 1.4545) bars and rods, the precipitation-hardening stainless steel offering excellent strength, corrosion resistance, and toughness. Manufactured to ASTM A564 and ASME SA564 standards for aerospace, chemical, and high-performance applications.",
        image: "/stock/stainless-steel-317-317l-bars.jpg",
      },
      {
        slug: "stainless-steel-17-4ph-bars-rods",
        title:
          "Stainless Steel 17-4PH Bars & Rods Supplier - UNS S17400 (1.4542)",
        shortDescription:
          "Premium Stainless Steel 17-4PH (UNS S17400 / 1.4542) bars and rods, the precipitation-hardening stainless steel offering high strength, excellent corrosion resistance, and good toughness. Manufactured to ASTM A564 and ASME SA564 standards for aerospace, chemical, and high-performance applications.",
        image: "/stock/titanium-grade-1-bars.jpg",
      },
      {
        slug: "stainless-steel-ph-13-8-mo-bars-rods",
        title:
          "Stainless Steel PH 13-8 MO Bars & Rods Supplier - UNS S13800 (1.4548)",
        shortDescription:
          "Premium Stainless Steel PH 13-8 MO (UNS S13800 / 1.4548) bars and rods, the precipitation-hardening stainless steel offering high strength, excellent corrosion resistance, and good toughness. Manufactured to AMS 5864 and AMS 5629 standards for aerospace, chemical, and high-performance applications.",
        image: "/stock/titanium-grade-5-bars.jpg",
      },
      {
        slug: "stainless-steel-17-7-ph-bars-rods",
        title: "Stainless Steel 17-7 PH Bars & Rods Supplier - UNS S17700",
        shortDescription:
          "Premium Stainless Steel 17-7 PH (UNS S17700) bars and rods, the precipitation-hardening stainless steel offering high strength, excellent corrosion resistance, and good formability. Manufactured to ASTM A564 and ASME SA564 standards for aerospace, chemical, and high-performance applications.",
        image: "/stock/titanium-grade-5-bars.jpg",
      },
    ],
  },

  {
    name: "Duplex Steel",
    slug: "duplex-steel",
    icon: "Layers",
    description:
      "High-strength duplex and super duplex grades combining austenitic and ferritic properties for demanding environments.",
    overview:
      "Balanced strength and corrosion resistance for offshore and process industry use.",
    highlight: [
      "Double strength of austenitic grades",
      "Excellent pitting resistance",
      "Good fatigue performance",
    ],
    items: [
      {
        slug: "duplex-steel-uns-s31803-f51-s32205-f60-pipes",
        title:
          "Duplex Steel UNS S31803 F51 / S32205 F60 Pipes Supplier – ASTM A790 & ASME SA790",
        shortDescription:
          "Premium Duplex Steel UNS S31803 (F51) and UNS S32205 (F60) pipes with a dual-phase ferritic-austenitic microstructure, offering high mechanical strength and superior corrosion resistance in chloride-rich environments. Manufactured to ASTM A790, A928 and ASME SA790, SA928 standards.",
        image: "/stock/duplex-steel-uns-s31803-f51-s32205-f60-pipes.jpg",
      },
      {
        slug: "super-duplex-uns-s32750-f53-pipes",
        title:
          "Super Duplex Steel UNS S32750 F53 Pipes Supplier – ASTM A790 & ASME SA790",
        shortDescription:
          "Premium Super Duplex UNS S32750 (F53) pipes engineered from a high-performance mixture of chromium and molybdenum for extreme resistance to pitting, stress corrosion cracking, and crevice corrosion. Manufactured to ASTM A790, A928 and ASME SA790, SA928 standards.",
        image: "/stock/super-duplex-uns-s32750-f53-pipes.jpg",
      },
      {
        slug: "super-duplex-uns-s32760-f55-pipes",
        title:
          "Super Duplex Steel UNS S32760 F55 Pipes Supplier – ASTM A790 & ASME SA790",
        shortDescription:
          "Premium Super Duplex UNS S32760 (F55) pipes engineered for the most demanding environments, offering exceptional resistance to localized corrosion in aggressive chloride-containing surroundings. Manufactured to ASTM A790, A928 and ASME SA790, SA928 standards.",
        image: "/stock/super-duplex-uns-s32760-f55-pipes.jpg",
      },
      {
        slug: "duplex-super-duplex-steel-pipes",
        title:
          "Duplex / Super Duplex Steel Pipes Supplier – ASTM A790 & ASME SA790",
        shortDescription:
          "Premium Duplex and Super Duplex Steel pipes in seamless, welded, ERW, square, and rectangular profiles. Offering high strength, excellent corrosion resistance, and reliability in high-pressure and high-temperature systems. Manufactured to ASTM A790, A928 and ASME SA790, SA928 standards.",
        image: "/stock/duplex-super-duplex-steel-pipes.jpg",
      },
      {
        slug: "duplex-steel-s31803-bars-rods",
        title: "Duplex Steel S31803 Bars & Rods Supplier - UNS S31803 (1.4462)",
        shortDescription:
          "Premium Duplex Steel S31803 (UNS S31803 / 1.4462) bars and rods, the high-strength duplex stainless steel offering excellent corrosion resistance and good weldability. Manufactured to ASTM A276 and A479 standards for marine, chemical, and oil and gas applications.",
        image: "/stock/duplex-super-duplex-steel-round-bars.jpg",
      },
      {
        slug: "super-duplex-steel-s32750-bars-rods",
        title:
          "Super Duplex Steel S32750 Bars & Rods Supplier - UNS S32750 (1.4410)",
        shortDescription:
          "Premium Super Duplex Steel S32750 (UNS S32750 / 1.4410) bars and rods, the super duplex stainless steel offering exceptional strength, excellent corrosion resistance, and good weldability. Manufactured to ASTM A276 and A479 standards for high-pressure, marine, and chemical applications.",
        image: "/stock/super-duplex-steel-s32750-bars.jpg",
      },
      {
        slug: "super-duplex-steel-s32760-bars-rods",
        title:
          "Super Duplex Steel S32760 Bars & Rods Supplier - UNS S32760 (1.4410)",
        shortDescription:
          "Premium Super Duplex Steel S32760 (UNS S32760 / 1.4410) bars and rods, the high-alloyed super duplex stainless steel offering exceptional corrosion resistance, high strength, and good weldability. Manufactured to ASTM A276 and A479 standards for subsea, oil and gas, and marine applications.",
        image: "/stock/super-duplex-steel-s32760-bars.jpg",
      },
      {
        slug: "lean-duplex-s32304-bars-rods",
        title: "Lean Duplex S32304 Bars & Rods Supplier - UNS S32304 (1.4362)",
        shortDescription:
          "Premium Lean Duplex S32304 (UNS S32304 / 1.4362) bars and rods, the lean duplex stainless steel offering excellent corrosion resistance, high yielding strength, and good weldability. Manufactured to ASTM A276 and A479 standards for chemical, oil and gas, and marine applications.",
        image: "/stock/lean-duplex-s32304-bars.jpg",
      },
      {
        slug: "super-duplex-zeron-100-bars-rods",
        title:
          "Super Duplex Zeron 100 Bars & Rods Supplier - UNS S32760 (1.4501)",
        shortDescription:
          "Premium Super Duplex Zeron 100 (UNS S32760 / 1.4501) bars and rods, the high-performance super duplex stainless steel offering exceptional corrosion resistance, high strength, and excellent toughness. Manufactured to ASTM A276 and A479 standards for marine, oil and gas, and chemical applications.",
        image: "/stock/super-duplex-zeron-100-bars.jpg",
      },
      {
        slug: "ferralium-255-bars-rods",
        title: "Ferralium 255 Bars & Rods Supplier - UNS S32550 (1.4507)",
        shortDescription:
          "Premium Ferralium 255 (UNS S32550 / 1.4507) bars and rods, the super duplex stainless steel offering high strength, excellent corrosion resistance, and good ductility. Manufactured to ASTM A479 and ASME A479 standards for chemical, oil and gas, and marine applications.",
        image: "/stock/ferralium-255-bars.jpg",
      },
      {
        slug: "duplex-steel-pipe-fittings",
        title:
          "Duplex Steel Pipe Fittings Manufacturer & Supplier - ASTM A815 / ASME SA-815",
        shortDescription:
          "Premium duplex steel pipe fittings manufacturer, stockist and exporter in Mumbai, India, supplying duplex piping components since 2013. Buttweld range certified to ASTM A815 / ASME SA-815 in classes WP-S, WP-W and WP-WX, dimensioned under ASME B16.9. Forged socket weld and threaded items follow ASTM A182 F53 and F55 under ASME B16.11. Available in UNS S32750 and UNS S32760 grades. Elbows, tees, reducers, caps and stub ends run from 1/2 inch to 12 inch NB, with wider bores produced to drawing.",
        image: "/stock/duplex-steel-pipe-fittings.jpg",
      },
      {
        slug: "super-duplex-steel-pipe-fittings",
        title:
          "Super Duplex Steel Pipe Fittings Manufacturer & Supplier - ASTM A815 / ASME SA-815",
        shortDescription:
          "Premium super duplex steel pipe fittings manufacturer, stockist and exporter in Mumbai, India, supplying duplex piping components since 2013. Buttweld range certified to ASTM A815 / ASME SA-815 in classes WP-S, WP-W and WP-WX, dimensioned under ASME B16.9. Forged socket weld and threaded items follow ASTM A182 F53 and F55 under ASME B16.11. Available in UNS S32750 and UNS S32760 grades. Elbows, tees, reducers, caps and stub ends run from 1/2 inch to 12 inch NB, with wider bores produced to drawing.",
        image: "/stock/super-duplex-steel-pipe-fittings.jpg",
      },
      {
        slug: "duplex-steel-fasteners",
        title:
          "Duplex Steel Fasteners Manufacturer & Supplier - ASTM A1082 / ISO 3506",
        shortDescription:
          "Premium duplex steel fasteners manufacturer, supplier and exporter operating from Mumbai, India, since 2013. Duplex stainless steel fasteners are bolting components made of austenitic-ferritic stainless steel with a two-phase microstructure containing austenite and ferrite. Available grades: Duplex 2205 (UNS S31803/S32205) and Lean Duplex S32304 (2304). Diameters range from M3 to M56 in metric sizes and from 3/16 in to 2 in in imperial sizes.",
        image: "/stock/duplex-steel-fasteners.jpg",
      },
      {
        slug: "super-duplex-steel-fasteners",
        title:
          "Super Duplex Steel Fasteners Manufacturer & Supplier - ASTM A1082 / ISO 3506",
        shortDescription:
          "Premium super duplex steel fasteners manufacturer, stockist, supplier and exporter in Mumbai, India. Super duplex stainless steel fasteners are 25% chromium dual-phase bolting components with PREN above 40. Available in Super Duplex S32750 (2507 / F53) and Super Duplex S32760 (F55) grades. Diameters span M3 to M56 and 3/16 in to 2 in. Bolt and stud lengths reach 200 mm off the shelf, threaded rod runs to 1 m and 3 m stock lengths.",
        image: "/stock/super-duplex-steel-fasteners.jpg",
      },

      {
        slug: "duplex-steel-sheets-plates",
        title:
          "Duplex Steel Sheets & Plates Supplier - UNS S31803/S32205/S32304",
        shortDescription:
          "Premium Duplex Steel (UNS S31803/S32205/S32304) sheets and plates, the ferritic-austenitic stainless steel offering excellent strength, corrosion resistance, and resistance to chloride stress corrosion cracking. Manufactured to ASTM A240 and ASME SA240 standards for chemical, oil and gas, and marine applications.",
        image: "/stock/duplex-steel-sheets-plates.jpg",
      },
      {
        slug: "super-duplex-steel-sheets-plates",
        title:
          "Super Duplex Steel Sheets & Plates Supplier - UNS S32750/S32760 (2507)",
        shortDescription:
          "Premium Super Duplex Steel (UNS S32750/S32760) sheets and plates, the 25% chromium super duplex stainless steel offering exceptional strength, corrosion resistance, and resistance to chloride stress corrosion cracking. Manufactured to ASTM A240 and ASME SA240 standards for offshore, marine, and high-performance applications.",
        image: "/stock/super-duplex-steel-sheets-plates.jpg",
      },
      {
        slug: "duplex-super-duplex-steel-wires",
        title:
          "Duplex & Super Duplex Steel Wires Supplier – S31803, S32205, S32750, S32760",
        shortDescription:
          "Premium Duplex and Super Duplex steel wires in grades S31803 (F51), S32205 (F60), S32750 (F53), and S32760 (F55). These high-performance stainless steel alloys feature a dual-phase microstructure combining the stress corrosion cracking resistance of ferritic steels with the fabrication ease of austenitic steels. Offering significantly higher yield strength, they enable thinner, lighter engineering designs without compromising integrity. Ideal for subsea equipment, chemical processing, marine infrastructure, desalination plants, and offshore firewater systems.",
        image: "/stock/duplex-super-duplex-steel-wires.jpg",
      },
      {
        slug: "duplex-steel-flanges",
        title:
          "Duplex Steel Flanges Manufacturer & Supplier - ASTM A182 / ASME SA-182",
        shortDescription:
          'Premium duplex steel flanges manufacturer, stockist, supplier and exporter based in Mumbai, India, supplying since 2013. Forged flanges manufactured to ASTM A182 / ASME SA-182, with F51 and F60 covering duplex 2205 and F68 covering lean duplex 2304 (UNS S32304). Duplex stainless steel flanges combine high strength with good resistance to chloride-induced corrosion. Sizes range from 1/2" to 24" NB under ASME B16.5 and 26" to 60" under ASME B16.47.',
        image: "/stock/duplex-steel-flanges.jpg",
      },
      {
        slug: "super-duplex-steel-flanges",
        title:
          "Super Duplex Steel Flanges Manufacturer & Supplier - ASTM A182 / ASME SA-182",
        shortDescription:
          'Premium super duplex steel flange manufacturer, stockist and exporter based in Mumbai, India, supplying since 2013. We supply Super Duplex S32750 (UNS S32750 / 2507 / F53) and Super Duplex S32760 (UNS S32760 / F55) flanges to ASTM A182 / ASME SA-182. Super duplex stainless steel flanges combine high strength with strong resistance to chloride corrosion. Sizes range from NPS 1/2" to 24" under ASME B16.5 and from NPS 26" to 60" under ASME B16.47.',
        image: "/stock/super-duplex-steel-flanges.jpg",
      },
    ],
  },

  {
    name: "Nickel Alloy",
    slug: "nickel-alloy",
    icon: FlaskConical,
    description:
      "High-performance nickel alloys offering exceptional corrosion and heat resistance for extreme chemical and aerospace applications.",
    overview:
      "Superior heat and corrosion resistance for chemical processing, aerospace, and power generation.",
    highlight: [
      "Excellent heat resistance",
      "Corrosion resistance to aggressive media",
      "High mechanical strength",
    ],
    items: buildItemsWithImages([
      {
        slug: "alloy-28-pipes",
        title: "Alloy 28 Pipes Supplier – UNS N08028 / 1.4563",
        shortDescription:
          "High-alloy austenitic stainless steel pipes specifically developed for service in highly corrosive conditions. Features high chromium (27%) and nickel (31%) with molybdenum (3.5%) and copper (1.0%) additions. Manufactured to ASTM B668 and ASME SB668 standards.",
        image: "/stock/alloy-28-pipes.jpg",
      },
      {
        slug: "alloy-20-pipes",
        title: "Alloy 20 Pipes Supplier – UNS N08020 / Carpenter 20",
        shortDescription:
          "Austenitic nickel-iron-chromium-based alloy pipes developed specifically for maximum resistance to acid attack. Features nickel (32-38%), chromium (19-21%), with niobium stabilization and copper additions. Manufactured to ASTM B167, B464 and ASME B729, SB464 standards.",
        image: "/stock/alloy-20-pipes.jpg",
      },
      {
        slug: "nickel-200-sheets-plates",
        title: "Nickel Alloy 200 / 201 Sheets & Plates Supplier – UNS N02200 & N02201",
        shortDescription:
          "Commercially pure wrought nickel alloy sheets and plates offering excellent corrosion resistance and high thermal and electrical conductivity. Available in Nickel 200 (UNS N02200) and Nickel 201 (UNS N02201). Manufactured to ASTM B161, B725 and ASME SB161, SB725 standards.",
        image: "/stock/nickel-200-sheets-plates.jpg",
      },
      {
        slug: "nickel-201-sheets-plates",
        title: "Nickel Alloy 200 / 201 Sheets & Plates Supplier – UNS N02200 & N02201",
        shortDescription:
          "Commercially pure wrought nickel alloy sheets and plates offering excellent corrosion resistance and high thermal and electrical conductivity. Available in Nickel 200 (UNS N02200) and Nickel 201 (UNS N02201). Manufactured to ASTM B161, B725 and ASME SB161, SB725 standards.",
        image: "/stock/nickel-201-sheets-plates.jpg",
      },
      {
        slug: "nickel-alloy-pipes",
        title:
          "Nickel Alloy Pipes Supplier – High-Performance Industrial Piping",
        shortDescription:
          "High-performance nickel alloy pipes engineered to withstand the most demanding industrial environments. Available in various grades including Inconel, Monel, Hastelloy, and Incoloy series. Manufactured to ASTM B161, B725 and ASME SB161, SB725 standards.",
        image: "/stock/nickel-alloy-pipes.jpg",
      },

      {
        slug: "nickel-200-bars-rods",
        title: "Nickel 200 Bars & Rods Supplier - UNS N02200 (2.4066)",
        shortDescription:
          "Premium Nickel 200 (UNS N02200 / 2.4066) bars and rods, the commercially pure nickel alloy offering excellent corrosion resistance, high thermal and electrical conductivity. Manufactured to ASTM B160 and ASME SB160 standards for chemical processing, marine, and high-performance applications.",
        image: "/stock/nickel-alloy-200-201-round-bars.jpg",
      },
      {
        slug: "nickel-201-bars-rods",
        title: "Nickel 201 Bars & Rods Supplier - UNS N02201 (2.4068)",
        shortDescription:
          "Premium Nickel 201 (UNS N02201 / 2.4068) bars and rods, the low-carbon commercially pure nickel alloy offering excellent corrosion resistance, high thermal and electrical conductivity. Manufactured to ASTM B160 and ASME SB160 standards for chemical processing, marine, and high-performance applications.",
        image: "/stock/nickel-alloy-200-201-round-bars.jpg",
      },

      {
        slug: "nickel-alloy-200-201-wires",
        title: "Nickel Alloy 200 / 201 Wires Supplier – UNS N02200 & N02201",
        shortDescription:
          "Premium Nickel Alloy 200 (UNS N02200) and Nickel Alloy 201 (UNS N02201) commercially pure wrought nickel wires. Valued for their high electrical and thermal conductivity, excellent mechanical properties, and extraordinary resistance to caustic alkalis and many corrosive environments. Ideal for electronics, chemical processing, food & healthcare, and aerospace applications.",
        image: "/stock/nickel-alloy-200-201-wires.jpg",
      },

      {
        slug: "nickel-flanges",
        title:
          "Nickel Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
        shortDescription:
          'Premium Nickel Flanges manufacturer, stockist and exporter based in Mumbai, India, supplying since 2013. Nickel 200 forged blanks conform to ASTM B564 / ASME SB-564. Nickel 201 supplied from ASTM B160 bar or ASTM B162 plate. Nickel 200 (UNS N02200) permits up to 0.15% carbon, while low-carbon Nickel 201 (UNS N02201) limits carbon to 0.02%. Supply spans NPS 1/2" to 48" (DN 15 to DN 1200) with Classes 150 to 2500.',
        image: "/stock/copper-nickel-flange-500x500.jpg",
      },

      {
        slug: "nickel-fasteners",
        title:
          "Nickel Fasteners Manufacturer & Supplier - ASTM B160 / ASME SB-160",
        shortDescription:
          "Premium nickel fasteners manufacturer, supplier and exporter based in Mumbai, India, operating since 2013. Nickel fasteners are bolting components machined from commercially pure nickel bar supplied to ASTM B160 / ASME SB-160, with nickel at a minimum of 99.0%. Available in Nickel 200 (UNS N02200) for general corrosive service and Nickel 201 (UNS N02201) for elevated-temperature applications. Diameters range from M6 to M24 in metric sizes and from 1/4 in to 1-1/2 in in imperial sizes.",
        image: "/stock/nickel-copper-alloy-fasteners.jpg",
      },

      {
        slug: "nickel-pipe-fittings",
        title:
          "Nickel Pipe Fittings Manufacturer & Supplier - ASTM B366 / ASME SB-366",
        shortDescription:
          "Premium nickel alloy pipe fittings manufacturer, stockist and exporter established in Mumbai, India, in 2013. Wrought fittings certified to ASTM B366 / ASME SB-366, with buttweld dimensions held to ASME B16.9 and MSS SP-43 for light-wall pieces. Available in Nickel 200 (UNS N02200) for service at or below 315 °C and Nickel 201 (UNS N02201) for high-temperature applications. Seamless elbows, tees, reducers, caps and stub ends span 1/2 inch to 10 inch NB; welded and fabricated construction extends the bore to 48 inch NB.",
        image: "/stock/Nickel-Alloy-Buttweld-Fittings.jpg",
      },

      {
        slug: "nickel-copper-alloy-forged-fittings",
        title: "Nickel Copper Alloy Forged Fittings",
        shortDescription:
          "Copper-Nickel 70/30, 90/10 Forged Lateral Tees, Weldolets, and Threaded Elbows for Offshore Marine Platforms.",
        image: "/stock/nicke-alloy-forged-fittings.jpg",
      },
    ]),
  },

  {
    name: "Copper Nickel",
    slug: "copper-nickel",
    icon: Waves,
    description:
      "Copper-nickel alloys offering outstanding seawater corrosion resistance for marine and offshore applications.",
    overview:
      "Marine-grade materials with excellent resistance to seawater corrosion and biofouling.",
    highlight: [
      "Excellent seawater resistance",
      "Good thermal conductivity",
      "Biofouling resistance",
    ],
    items: buildItemsWithImages([
      {
        slug: "cu-ni-90-10-bars-rods",
        title: "Cu-Ni 90/10 Bars & Rods Supplier - UNS C70600 (2.0872)",
        shortDescription:
          "Premium Cu-Ni 90/10 (UNS C70600 / 2.0872) bars and rods, the copper-nickel alloy offering excellent corrosion resistance in marine and seawater environments. Manufactured to ASTM B151 and ASME SB151 standards for marine, offshore, and chemical applications.",
        image: "/stock/copper-nickel-round-bars.jpg",
      },
      {
        slug: "cu-ni-70-30-bars-rods",
        title: "Cu-Ni 70/30 Bars & Rods Supplier - UNS C71500 (2.0882)",
        shortDescription:
          "Premium Cu-Ni 70/30 (UNS C71500 / 2.0882) bars and rods, the copper-nickel alloy offering excellent corrosion resistance in marine and seawater environments. Manufactured to ASTM B151 and ASME SB151 standards for marine, offshore, and high-performance applications.",
        image: "/stock/cu-ni-70-30-bars.jpg",
      },
      {
        slug: "cu-ni-90-10-sheets-plates",
        title: "Cu-Ni 90/10 Sheets & Plates Supplier - UNS C70600 (2.0872)",
        shortDescription:
          "Premium Cu-Ni 90/10 (UNS C70600 / 2.0872) sheets and plates, the copper-nickel alloy offering excellent corrosion resistance in marine and seawater environments. Manufactured to ASTM B122 and B171 standards for marine, offshore, and chemical applications.",
        image: "/stock/cu-ni-90-10-sheets-plates.jpg",
      },
      {
        slug: "cu-ni-70-30-sheets-plates",
        title: "Cu-Ni 70/30 Sheets & Plates Supplier - UNS C71500 (2.0882)",
        shortDescription:
          "Premium Cu-Ni 70/30 (UNS C71500 / 2.0882) sheets and plates, the copper-nickel alloy offering excellent corrosion resistance in marine and seawater environments. Manufactured to ASTM B122 and B171 standards for marine, offshore, and high-performance applications.",
        image: "/stock/cu-ni-70-30-sheets-plates.jpg",
      },

      {
        slug: "copper-nickel-wires",
        title: "Copper Nickel Wires Supplier – 90/10 (C70600) & 70/30 (C71500)",
        shortDescription:
          "Premium Copper Nickel (Cupro-Nickel) wires in 90/10 (C70600) and 70/30 (C71500) grades, engineered for high-performance electrical, marine, and industrial applications. Offering a unique combination of electrical resistivity, thermal stability, and extraordinary resistance to seawater corrosion. Ideal for marine engineering, offshore platforms, desalination plants, and specialized electrical applications.",
        image: "/stock/copper-nickel-wires.jpg",
      },
      {
        slug: "copper-nickel-90-10-pipes",
        title: "Copper Nickel 90/10 Pipes Supplier – ASTM B466 & ASME SB466",
        shortDescription:
          "Premium Copper Nickel 90/10 (UNS C70600 / 2.0872) pipes engineered with 9% to 11% nickel and controlled iron additions for superior corrosion resistance and biofouling protection in marine environments. Manufactured to ASTM B466, B467 and ASME SB466, SB467 standards.",
        image: "/stock/copper-nickel-90-10-pipes.jpg",
      },
      {
        slug: "copper-nickel-70-30-pipes",
        title: "Copper Nickel 70/30 Pipes Supplier – ASTM B466 & ASME SB466",
        shortDescription:
          "Premium Copper Nickel 70/30 (UNS C71500 / 2.0882) pipes engineered with 70% copper and 30% nickel for high performance in marine environments, offering superior strength and resistance to thermal stress. Manufactured to ASTM B466, B467 and ASME SB466, SB467 standards.",
        image: "/stock/copper-nickel-70-30-pipes.jpg",
      },
      {
        slug: "copper-nickel-pipes",
        title: "Copper Nickel Pipes Supplier – ASTM B466 & ASME SB466",
        shortDescription:
          "Premium Copper Nickel (Cu-Ni / Cupro-Nickel) pipes containing 10% to 30% nickel, engineered for superior corrosion resistance in marine and saltwater environments. Manufactured to ASTM B466, B467 and ASME SB466, SB467 standards.",
        image: "/stock/copper-nickel-pipes.jpg",
      },
    ]),
  },

  {
    name: "Hastelloy",
    slug: "hastelloy",
    icon: CircleDot,
    description:
      "Premium nickel-chromium-molybdenum alloys for extreme corrosion resistance in chemical and industrial environments.",
    overview:
      "Exceptional resistance to aggressive chemicals and high temperatures.",
    highlight: [
      "Superior corrosion resistance",
      "High temperature stability",
      "Resistance to pitting and crevice corrosion",
    ],
    items: buildItemsWithImages([
      {
        slug: "hastelloy-c2000-c59-c4-h-n-pipes",
        title:
          "Hastelloy C2000 / C59 / C4 / H - N Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy C2000 (UNS N06200), C59, C4, and H-N nickel-chromium-molybdenum alloy pipes engineered for superior resistance to both oxidizing and reducing environments. Manufactured to ASTM B622, B619 and ASME SB622, SB619 standards.",
        image: "/stock/hastelloy-c2000-c59-c4-h-n-pipes.jpg",
      },
      {
        slug: "hastelloy-b3-pipes",
        title: "Hastelloy B3 Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy B3 (UNS N10675 / 2.4600) nickel-molybdenum alloy pipes engineered for exceptional resistance to hydrochloric acid and improved thermal stability. Manufactured to ASTM B622, B619 and ASME SB622, SB619 standards.",
        image: "/stock/hastelloy-b3-pipes.jpg",
      },
      {
        slug: "hastelloy-b2-pipes",
        title: "Hastelloy B2 Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy B2 (UNS N10665 / 2.4617) nickel-molybdenum alloy pipes engineered for superior resistance to reducing environments, particularly hydrochloric acid. Manufactured to ASTM B622, B619 and ASME SB622, SB619 standards.",
        image: "/stock/hastelloy-b2-pipes.jpg",
      },
      {
        slug: "hastelloy-c22-pipes",
        title: "Hastelloy C22 Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy C22 (UNS N06022 / 2.4602) nickel-chromium-molybdenum-tungsten alloy pipes engineered for superior resistance to a wide range of corrosive chemicals, including oxidizing acid chlorides and wet chlorine. Manufactured to ASTM B622 and ASME SB622 standards.",
        image: "/stock/hastelloy-c22-pipes.jpg",
      },
      {
        slug: "hastelloy-c276-pipes",
        title: "Hastelloy C276 Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy C276 (UNS N10276 / 2.4819) nickel-chromium-molybdenum-tungsten alloy pipes engineered for exceptional resistance to a wide range of aggressive chemical environments, including wet chlorine gas and strong oxidizing agents. Manufactured to ASTM B622 and ASME SB622 standards.",
        image: "/stock/hastelloy-c276-pipes.jpg",
      },
      {
        slug: "hastelloy-pipes",
        title: "Hastelloy Pipes Supplier – ASTM B622 & ASME SB622",
        shortDescription:
          "Premium Hastelloy nickel-based alloy pipes engineered for extreme resistance to corrosion and high-temperature environments. Available in C276 and C22 grades, manufactured in seamless, welded, ERW, and EFW configurations to ASTM B622, B619 and ASME SB622, SB619 standards.",
        image: "/stock/hastelloy-pipes.jpg",
      },
      {
        slug: "hastelloy-c22-sheets-plates",
        title: "Hastelloy C22 Sheets & Plates Supplier - UNS N06022 (2.4602)",
        shortDescription:
          "Premium Hastelloy C22 (UNS N06022 / 2.4602) sheets and plates, the highly versatile austenitic superalloy offering exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking. Manufactured to ASTM B575 and ASME SB575 standards for chemical processing, marine, and high-performance applications.",
        image: "/stock/hastelloy-c22-sheets-plates.jpg",
      },
      {
        slug: "hastelloy-c276-sheets-plates",
        title: "Hastelloy C276 Sheets & Plates Supplier - UNS N10276 (2.4819)",
        shortDescription:
          "Premium Hastelloy C276 (UNS N10276 / 2.4819) sheets and plates, the nickel-molybdenum-chromium alloy offering exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking. Manufactured to ASTM B575 and ASME SB575 standards for chemical processing, aerospace, and high-performance applications.",
        image: "/stock/hastelloy-c276-sheets-plates.jpg",
      },
      {
        slug: "hastelloy-x-sheets-plates",
        title: "Hastelloy X Sheets & Plates Supplier - UNS N06002 (2.4665)",
        shortDescription:
          "Premium Hastelloy X (UNS N06002 / 2.4665) sheets and plates, the nickel-chromium-iron-molybdenum alloy offering excellent high-temperature strength, oxidation resistance, and fabricability. Manufactured to ASTM B435 and ASME SB435 standards for aerospace, furnace components, and high-temperature applications.",
        image: "/stock/hastelloy-x-sheets-plates.jpg",
      },
      {
        slug: "hastelloy-b2-sheets-plates",
        title: "Hastelloy B-2 Sheets & Plates Supplier - UNS N06022 (2.4602)",
        shortDescription:
          "Premium Hastelloy B-2 (UNS N06022 / 2.4602) sheets and plates, the nickel-molybdenum alloy offering exceptional resistance to reducing environments, pitting, and stress corrosion cracking. Manufactured to ASTM B575 and ASME SB575 standards for chemical processing, petrochemical, and high-temperature applications.",
        image: "/stock/hastelloy-b2-sheets-plates.jpg",
      },
      {
        slug: "hastelloy-wires",
        title:
          "Hastelloy Wires Supplier – C22, C276, B2, B3, C2000, C59, C4 & HN",
        shortDescription:
          "Premium Hastelloy wires in grades C22, C276, B2, B3, C2000, C59, C4, and HN. These high-performance nickel-molybdenum-chromium superalloys are engineered for the most demanding chemical environments, maintaining exceptional mechanical integrity and corrosion resistance where standard stainless steels fail. Ideal for chemical processing, pollution control, pharmaceutical, oil & gas, and aerospace applications.",
        image: "/stock/hastelloy-wires.jpg",
      },
      {
        slug: "hastelloy-c22-bars-rods",
        title: "Hastelloy C22 Bars & Rods Supplier - UNS N06022 (2.4602)",
        shortDescription:
          "Premium Hastelloy C22 (UNS N06022 / 2.4602) bars and rods, the highly versatile austenitic superalloy offering exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking. Manufactured to ASTM B574 and ASME SB574 standards for chemical processing, marine, and high-performance applications.",
        image: "/stock/hastelloy-round-bars.jpg",
      },
      {
        slug: "hastelloy-c276-bars-rods",
        title: "Hastelloy C276 Bars & Rods Supplier - UNS N10276 (2.4819)",
        shortDescription:
          "Premium Hastelloy C276 (UNS N10276 / 2.4819) bars and rods, the nickel-molybdenum-chromium alloy offering exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking. Manufactured to ASTM B574 and ASME SB574 standards for chemical processing, aerospace, oil and gas, and high-performance applications.",
        image: "/stock/hastelloy-c276-bars.jpg",
      },
      {
        slug: "hastelloy-x-bars-rods",
        title: "Hastelloy X Bars & Rods Supplier - UNS N06002 (2.4665)",
        shortDescription:
          "Premium Hastelloy X (UNS N06002 / 2.4665) bars and rods, the nickel-chromium-iron-molybdenum alloy offering excellent high-temperature strength, oxidation resistance, and fabricability. Manufactured to ASTM B572 and ASME SB572 standards for aerospace, furnace components, and high-temperature applications.",
        image: "/stock/hastelloy-x-bars.jpg",
      },
      {
        slug: "hastelloy-b2-bars-rods",
        title: "Hastelloy B-2 Bars & Rods Supplier - UNS N10665 (2.4617)",
        shortDescription:
          "Premium Hastelloy B-2 (UNS N10665 / 2.4617) bars and rods, the nickel-molybdenum alloy offering exceptional resistance to reducing environments, pitting, and stress corrosion cracking. Manufactured to ASTM B335 and ASME SB335 standards for chemical processing, petrochemical, and high-temperature applications.",
        image: "/stock/hastelloy-b2-bars.jpg",
      },
      // {
      //   slug: "hastelloy-forged-fittings",
      //   title: "Hastelloy Forged Fittings",
      //   shortDescription:
      //     "Hastelloy C276, C22, B2, B3, Alloy X Forged Crosses, Tees, and Full Couplings for Harsh Chemical Corrosive Streams.",
      //   image: "/stock/hastelloy-forged-fittings.jpg",
      // },
      {
        slug: "hastelloy-c276-flanges",
        title:
          "Hastelloy C276 Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
        shortDescription:
          'Premium Hastelloy C276 flanges manufacturer, supplier, stockist and exporter based in Mumbai, India since 2013. Forged to ASTM B564 and ASME SB-564 under UNS N10276. Hastelloy C276 is a nickel-molybdenum-chromium alloy with tungsten addition, specified where hydrochloric acid, sulphuric acid, wet chlorine and seawater destroy ordinary flange materials. Ten forged constructions from NPS 1/2" to 48" standard (60" on request), Classes 150 to 2500.',
        image: "/stock/hastelloy-c276-flanges.jpg",
      },
      {
        slug: "hastelloy-fasteners",
        title:
          "Hastelloy Fasteners Manufacturer & Supplier - ASTM F468 / F467 / B574",
        shortDescription:
          "Premium Hastelloy fasteners manufacturer, stockist and exporter based in Mumbai, India, operating since 2013. Hastelloy fasteners are corrosion-resistant bolting components machined from nickel-alloy bar supplied to ASTM B574 / ASME SB-574, covering grade C276 (UNS N10276) and grade C22 (UNS N06022). Molybdenum improves resistance to reducing acids and pitting, while chromium contributes to resistance in oxidising environments. Standard range includes Hastelloy C276 in ready stock and Hastelloy C22 for production against order. Imperial sizes from 1/4 in to 1-1/2 in, metric sizes M6 to M36.",
        image: "/stock/hastelloy-fasteners.jpg",
      },
      {
        slug: "hastelloy-pipe-fittings",
        title:
          "Hastelloy Pipe Fittings Manufacturer & Supplier - ASTM B366 / ASME SB-366",
        shortDescription:
          "Premium Hastelloy pipe fittings manufacturer, stockist, supplier and exporter operating from Mumbai, India since 2013. Butt-weld elbows, tees, reducers, end caps and stub ends certified to ASTM B366 / ASME SB-366 with dimensions to ASME B16.9, while forged socket weld and threaded fittings follow ASTM B564 / ASME SB-564 under ASME B16.11. Available in Hastelloy C276 (UNS N10276) and Hastelloy C22 (UNS N06022) grades. Sizes open at 1/2 inch NB with walls to SCH 10S, 40S, 80S, 160 and XXS.",
        image: "/stock/hastelloy-pipe-fittings.jpg",
      },
    ]),
  },

  {
    name: "Incoloy",
    slug: "incoloy",
    icon: Settings,
    description:
      "Nickel-iron-chromium alloys with exceptional strength and oxidation resistance at high temperatures.",
    overview:
      "Reliable heat and corrosion resistance for demanding applications.",
    highlight: [
      "Excellent oxidation resistance",
      "High temperature strength",
      "Good fabrication characteristics",
    ],
    items: buildItemsWithImages([
      {
        slug: "incoloy-pipe-fittings",
        title:
          "Incoloy Pipe Fittings Manufacturer & Supplier - ASTM B366 / ASME SB-366",
        shortDescription:
          "Premium Incoloy pipe fittings manufacturer, stockist, supplier and exporter operating from Mumbai, India since 2013. Wrought nickel-iron-chromium alloy fittings certified to ASTM B366 / ASME SB-366, with butt-weld geometry controlled to ASME B16.9 and MSS SP-43 for light-wall CR grades. Available in Incoloy 800HT (UNS N08811) and Incoloy 825 (UNS N08825) grades. Seamless elbows, tees, reducers, end caps, stub ends, and crosses span 1/2 inch to 10 inch NB with schedules SCH 10S, SCH 40S, SCH 80S, SCH 160, and XXS.",
        image: "/stock/buttweld-fittings.jpg",
      },
      {
        slug: "incoloy-fasteners",
        title:
          "Incoloy Fasteners Manufacturer & Supplier - ASTM B408 / B425 / B805",
        shortDescription:
          "Premium Incoloy fasteners manufacturer and supplier based in Mumbai, India, operating since 2013. Incoloy fasteners are nickel-iron-chromium alloy fasteners designed for applications requiring corrosion resistance and elevated-temperature performance. Fasteners are machined from bar certified to ASTM B408 for alloy 800HT, ASTM B425 for alloy 825 and ASTM B805 for alloy 925. Standard range includes Incoloy 800HT for high-temperature service, Incoloy 825 for corrosive chemical applications and Incoloy 925 for strength-critical sour-service applications. Fasteners machined to order from M3 to M56 and 1/4 in to 2 in.",
        image: "/stock/incoloy-fasteners.jpg",
      },
      {
        slug: "incoloy-825-flanges",
        title:
          "Incoloy 825 Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
        shortDescription:
          'Premium Incoloy 825 flanges manufacturer, supplier, stockist and exporter based in Mumbai, India since 2013. Forged to ASTM B564 and ASME SB-564 under UNS N08825. Incoloy 825 flanges are specified where sulphuric acid, phosphoric acid, sour gas and seawater attack ordinary flange materials. Nine flange constructions cover the range from NPS 1/2" to 48", Classes 150# to 2500#.',
        image: "/stock/incoloy-800-flanges.jpg",
      },
      // {
      //   slug: "incoloy-forged-fittings",
      //   title: "Incoloy Forged Fittings",
      //   shortDescription:
      //     "Incoloy 800, 800H, 800HT, 825 Forged Swage Nipples, Street Elbows, and Hex Plugs for High-Stress Processing Lines.",
      //   image: "/productImage/forged-fittings.jpg",
      // },
      {
        slug: "incoloy-wires",
        title:
          "Incoloy Wires Supplier – 800, 800H, 800HT, 825, 925 & 330 (DS 330)",
        shortDescription:
          "Premium Incoloy wires in grades 800, 800H, 800HT, 825, 925, and 330 (DS 330). These nickel-iron-chromium superalloys provide a high-performance, cost-effective solution for environments requiring high-temperature strength and resistance to various forms of corrosion. Ideal for industrial furnaces, heat-treating equipment, petrochemical processing, oil & gas downhole components, and marine applications.",
        image: "/stock/incoloy-wires.jpg",
      },
      {
        slug: "inconel-800ht-sheets-plates",
        title:
          "Incoloy 800HT Sheets & Plates Supplier - UNS N08810/N08811 (1.4859/1.4958/1.4876)",
        shortDescription:
          "Premium Incoloy 800HT (UNS N08810/N08811 / 1.4859/1.4958/1.4876) sheets and plates, the high-temperature nickel-iron-chromium alloy offering excellent creep and stress rupture properties. Manufactured to ASTM B424 and ASME SB424 standards for high-temperature and corrosive applications.",
        image: "/stock/inconel-800ht-sheets-plates.jpg",
      },
      {
        slug: "inconel-825-sheets-plates",
        title: "Incoloy 825 Sheets & Plates Supplier - UNS N08825 (2.4858)",
        shortDescription:
          "Premium Incoloy 825 (UNS N08825 / 2.4858) sheets and plates, the nickel-iron-chromium alloy with molybdenum, copper, and titanium additions offering excellent corrosion resistance in both oxidizing and reducing environments. Manufactured to ASTM B168 and ASME SB168 standards for chemical processing, oil and gas, and marine applications.",
        image: "/stock/inconel-825-sheets-plates.jpg",
      },
      {
        slug: "inconel-925-sheets-plates",
        title: "Incoloy 925 Sheets & Plates Supplier - UNS N09925",
        shortDescription:
          "Premium Incoloy 925 (UNS N09925) sheets and plates, the age-hardenable nickel-iron-chromium alloy offering exceptional corrosion resistance, high strength, and excellent performance in extreme environments. Manufactured to ASTM B168 and ASME SB168 standards for oil and gas, aerospace, and marine applications.",
        image: "/stock/inconel-925-sheets-plates.jpg",
      },
      {
        slug: "incoloy-825-pipes",
        title: "Incoloy 825 Pipes Supplier – UNS N08825 / 2.4858",
        shortDescription:
          "Nickel-iron-chromium alloy pipes supplemented with molybdenum, copper, and titanium for exceptional resistance to many corrosive environments. Titanium-stabilized against intergranular corrosion. Manufactured to ASTM B423, B705 and ASME SB423, SB705 standards.",
        image: "/stock/incoloy-825-pipes.jpg",
      },
      {
        slug: "incoloy-800h-800ht-pipes",
        title: "Incoloy 800H / 800HT Pipes Supplier – ASTM B407 & ASME SB407",
        shortDescription:
          "Premium Incoloy 800H (UNS N08810) and 800HT (UNS N08811) nickel-iron-chromium alloy pipes engineered for exceptional resistance to oxidation, sulfidation, and carburization at extreme temperatures. Manufactured to ASTM B407, B514, B515 and ASME SB407, SB514, SB515 standards.",
        image: "/stock/incoloy-800h-800ht-pipes.jpg",
      },
      {
        slug: "incoloy-800-ds-330-pipes",
        title: "Incoloy 800 (DS 330) Pipes Supplier – ASTM B407 & ASME SB407",
        shortDescription:
          "Premium Incoloy 800 (UNS N08800 / DS 330) nickel-iron-chromium alloy pipes engineered for structural applications requiring high strength and resistance to oxidation and carburization at elevated temperatures. Manufactured to ASTM B407, B514, B515 and ASME SB407, SB514, SB515 standards.",
        image: "/stock/incoloy-800-ds-330-pipes.jpg",
      },
      {
        slug: "incoloy-pipes",
        title: "Incoloy Pipes Supplier – ASTM B167 & ASME SB167",
        shortDescription:
          "Premium Incoloy (UNS N08825) nickel-iron-chromium alloy pipes engineered with molybdenum, copper, and titanium for exceptional resistance to corrosive environments, particularly oxidizing and reducing acids. Manufactured to ASTM B167, B705 and ASME SB167, SB705 standards.",
        image: "/stock/incoloy-pipes.jpg",
      },
    ]),
  },

  {
    name: "Inconel",
    slug: "inconel",
    icon: Sparkles,
    description:
      "Nickel-chromium superalloys renowned for high strength, corrosion resistance, and thermal stability.",
    overview:
      "Extreme performance materials for the most demanding environments.",
    highlight: [
      "High strength at elevated temperatures",
      "Excellent oxidation resistance",
      "Corrosion resistance",
    ],
    items: buildItemsWithImages([
      {
        slug: "inconel-x-750-pipes",
        title: "Inconel X-750 Pipes Supplier – UNS N07750 / 2.4669",
        shortDescription:
          "Precipitation-hardenable nickel-chromium alloy pipes prized for corrosion and oxidation resistance combined with high strength at temperatures up to 1300°F (704°C). Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-x-750-pipes.jpg",
      },
      {
        slug: "inconel-718-pipes",
        title: "Inconel 718 Pipes Supplier – UNS N07718 / 2.4668",
        shortDescription:
          "High-strength, corrosion-resistant nickel-chromium alloy pipes used for service at temperatures from cryogenic levels up to 1300°F (704°C). Features excellent weldability and resistance to post-weld age cracking. Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-718-pipes.jpg",
      },
      {
        slug: "inconel-690-pipes",
        title: "Inconel 690 Pipes Supplier – UNS N06690 / 2.4642",
        shortDescription:
          "High-chromium nickel alloy pipes engineered specifically for outstanding resistance to oxidizing chemicals and high-temperature corrosive gases. Features 27-31% Chromium content. Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-690-pipes.jpg",
      },
      {
        slug: "inconel-625-pipes",
        title: "Inconel 625 Pipes Supplier – UNS N06625 / 2.4856",
        shortDescription:
          "Nickel-chromium-molybdenum alloy pipes with critical addition of niobium for solid-solution strengthening. Offers high strength and toughness from cryogenic temperatures up to 1800°F (982°C). Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-625-pipes.jpg",
      },
      {
        slug: "inconel-601-pipes",
        title: "Inconel 601 Pipes Supplier – UNS N06601 / 2.4851",
        shortDescription:
          "Nickel-chromium alloy pipes with significant addition of aluminum for extreme resistance to high-temperature oxidation up to 2300°F (1260°C). Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-601-pipes.jpg",
      },
      {
        slug: "inconel-600-pipes",
        title: "Inconel 600 Pipes Supplier – UNS N06600 / 2.4816",
        shortDescription:
          "Classic nickel-chromium alloy pipes designed for use from cryogenic temperatures up to elevated levels of 2000°F (1093°C). Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-600-pipes.jpg",
      },
      {
        slug: "inconel-pipes",
        title:
          "Inconel Pipes Supplier – High-Performance Nickel-Chromium Superalloys",
        shortDescription:
          "Nickel-chromium-based superalloy pipes engineered for extreme service environments. Available in grades including Inconel 600, 625, and 718. Manufactured to ASTM B167, B517 and ASME SB167, SB517 standards.",
        image: "/stock/inconel-pipes.jpg",
      },
      {
        slug: "inconel-wires",
        title: "Inconel Wires Supplier – 600, 601, 625, 690, 718, 725 & X-750",
        shortDescription:
          "Premium Inconel wires in grades 600, 601, 625, 690, 718, 725, and X-750. These high-performance nickel-chromium superalloys are engineered for extreme thermal and corrosive environments, maintaining exceptional tensile strength and structural integrity at temperatures where standard stainless steels fail. Ideal for aerospace, nuclear, marine, chemical processing, and high-pressure vacuum systems.",
        image: "/stock/inconel-wires.jpg",
      },
      {
        slug: "inconel-600-sheets-plates",
        title: "Inconel 600 Sheets & Plates Supplier - UNS N06600 (2.4816)",
        shortDescription:
          "Premium Inconel 600 (UNS N06600 / 2.4816) sheets and plates, the nickel-chromium alloy offering exceptional corrosion resistance, high temperature strength, and excellent oxidation resistance. Manufactured to ASTM B168 and ASME SB168 standards for aerospace, chemical, and nuclear applications.",
        image: "/stock/inconel-600-sheets.jpg",
      },
      {
        slug: "inconel-601-sheets-plates",
        title: "Inconel 601 Sheets & Plates Supplier - UNS N06601 (2.4851)",
        shortDescription:
          "Premium Inconel 601 (UNS N06601 / 2.4851) sheets and plates, the nickel-chromium alloy offering exceptional high-temperature oxidation resistance up to 2200°F and excellent corrosion resistance. Manufactured to ASTM B168 and ASME SB168 standards for heat-treating, power generation, and high-temperature applications.",
        image: "/stock/inconel-601-sheets.jpg",
      },
      {
        slug: "inconel-625-sheets-plates",
        title: "Inconel 625 Sheets & Plates Supplier - UNS N06625 (2.4856)",
        shortDescription:
          "Premium Inconel 625 (UNS N06625 / 2.4856) sheets and plates, the nickel-chromium-molybdenum alloy offering exceptional strength, excellent corrosion resistance, and outstanding fatigue strength. Manufactured to ASTM B168 and ASME SB168 standards for aerospace, marine, and high-performance applications.",
        image: "/stock/inconel-625-sheets-plates.jpg",
      },
      {
        slug: "inconel-660a-sheets-plates",
        title: "Inconel 660A Sheets & Plates Supplier - UNS S66286 (2.4851)",
        shortDescription:
          "Premium Inconel 660A (UNS S66286 / 2.4851) sheets and plates, the precipitation-hardenable nickel-iron-chromium alloy offering excellent high-temperature strength, good corrosion resistance, and outstanding intergranular corrosion resistance. Manufactured to ASTM B168 and ASME SB168 standards for aerospace, chemical, and high-performance applications.",
        image: "/stock/inconel-660a-sheets-plates.jpg",
      },
      {
        slug: "inconel-718-sheets-plates",
        title: "Inconel 718 Sheets & Plates Supplier - UNS N07718 (2.4668)",
        shortDescription:
          "Premium Inconel 718 (UNS N07718 / 2.4668) sheets and plates, the age-hardenable nickel-chromium alloy offering exceptional high-temperature strength, excellent creep-rupture properties, and outstanding corrosion resistance. Manufactured to ASTM B168 and ASME SB168 standards for aerospace, nuclear, and high-performance applications.",
        image: "/stock/inconel-718-sheets-plates.jpg",
      },
      {
        slug: "inconel-x750-sheets-plates",
        title: "Inconel X-750 Sheets & Plates Supplier - UNS N07750 (2.4669)",
        shortDescription:
          "Premium Inconel X-750 (UNS N07750 / 2.4669) sheets and plates, the precipitation-hardenable nickel-chromium alloy offering excellent high-temperature strength, good corrosion resistance, and outstanding stress corrosion resistance. Manufactured to ASTM B168 and ASME SB168 standards for aerospace, nuclear, and high-performance applications.",
        image: "/stock/inconel-x750-sheets-plates.jpg",
      },
      {
        slug: "inconel-800ht-sheets-plates",
        title:
          "Incoloy 800HT Sheets & Plates Supplier - UNS N08810/N08811 (1.4859/1.4958/1.4876)",
        shortDescription:
          "Premium Incoloy 800HT (UNS N08810/N08811 / 1.4859/1.4958/1.4876) sheets and plates, the high-temperature nickel-iron-chromium alloy offering excellent creep and stress rupture properties. Manufactured to ASTM B424 and ASME SB424 standards for high-temperature and corrosive applications.",
        image: "/stock/inconel-800ht-sheets-plates.jpg",
      },
      {
        slug: "inconel-825-sheets-plates",
        title: "Incoloy 825 Sheets & Plates Supplier - UNS N08825 (2.4858)",
        shortDescription:
          "Premium Incoloy 825 (UNS N08825 / 2.4858) sheets and plates, the nickel-iron-chromium alloy with molybdenum, copper, and titanium additions offering excellent corrosion resistance in both oxidizing and reducing environments. Manufactured to ASTM B168 and ASME SB168 standards for chemical processing, oil and gas, and marine applications.",
        image: "/stock/inconel-825-sheets-plates.jpg",
      },
      {
        slug: "inconel-925-sheets-plates",
        title: "Incoloy 925 Sheets & Plates Supplier - UNS N09925",
        shortDescription:
          "Premium Incoloy 925 (UNS N09925) sheets and plates, the age-hardenable nickel-iron-chromium alloy offering exceptional corrosion resistance, high strength, and excellent performance in extreme environments. Manufactured to ASTM B168 and ASME SB168 standards for oil and gas, aerospace, and marine applications.",
        image: "/stock/inconel-925-sheets-plates.jpg",
      },
      {
        slug: "inconel-600-round-bar",
        title: "Inconel 600 Bars & Rods Supplier - UNS N06600 (2.4816)",
        shortDescription:
          "Premium Inconel 600 (UNS N06600 / 2.4816) bars and rods, the nickel-chromium alloy offering exceptional corrosion resistance, high temperature strength, and excellent oxidation resistance. Manufactured to ASTM B166 and ASME SB166 standards for aerospace, chemical, and nuclear applications.",
        image: "/stock/inconel-600-round-bar.jpg",
      },
      {
        slug: "inconel-601-bars-rods",
        title: "Inconel 601 Bars & Rods Supplier - UNS N06601 (2.4851)",
        shortDescription:
          "Premium Inconel 601 (UNS N06601 / 2.4851) bars and rods, the nickel-chromium-iron alloy offering exceptional oxidation resistance up to 2200°F and excellent carburization resistance. Manufactured to ASTM B166 and ASME SB166 standards for high-temperature and demanding industrial applications.",
        image: "/stock/inconel-601-bars.jpg",
      },
      {
        slug: "inconel-625-bars-rods",
        title: "Inconel 625 Bars & Rods Supplier - UNS N06625 (2.4856)",
        shortDescription:
          "Premium Inconel 625 (UNS N06625 / 2.4856) bars and rods, the nickel-chromium-molybdenum alloy offering exceptional strength, excellent corrosion resistance, and outstanding weldability. Manufactured to ASTM B446 and ASME SB446 standards for aerospace, marine, and high-performance applications.",
        image: "/stock/inconel-625-bars.jpg",
      },
      {
        slug: "inconel-660a-bars-rods",
        title: "Inconel 660A Bars & Rods Supplier - UNS S66286 (1.4980)",
        shortDescription:
          "Premium Inconel 660A (UNS S66286 / 1.4980) bars and rods, the precipitation-hardenable nickel-iron-chromium alloy offering excellent high-temperature strength and corrosion resistance. Manufactured to AMS 5731 and AMS 5732 standards for aerospace, gas turbine, and high-performance applications.",
        image: "/stock/inconel-660a-bars.jpg",
      },
      {
        slug: "inconel-718-bars-rods",
        title: "Inconel 718 Bars & Rods Supplier - UNS N07718 (2.4668)",
        shortDescription:
          "Premium Inconel 718 (UNS N07718 / 2.4668) bars and rods, the age-hardenable nickel-chromium alloy offering exceptional high-temperature strength, excellent corrosion resistance, and outstanding mechanical properties. Manufactured to ASTM B637 and ASME SB637 standards for aerospace, nuclear, and high-performance applications.",
        image: "/stock/inconel-718-bars.jpg",
      },
      {
        slug: "inconel-x750-bars-rods",
        title: "Inconel X-750 Bars & Rods Supplier - UNS N07750 (2.4669)",
        shortDescription:
          "Premium Inconel X-750 (UNS N07750 / 2.4669) bars and rods, the precipitation-hardenable nickel-chromium alloy offering excellent high-temperature strength, corrosion resistance, and oxidation resistance. Manufactured to ASTM B637 and ASME SB637 standards for aerospace, nuclear, and high-performance applications.",
        image: "/stock/inconel-x750-bars.jpg",
      },
      {
        slug: "inconel-800-800h-800ht-bars-rods",
        title:
          "Incoloy 800 / 800H / 800HT Bars & Rods Supplier - UNS N08800/N08810/N08811 (1.4876/1.4958/1.4859)",
        shortDescription:
          "Premium Incoloy 800, 800H, and 800HT (UNS N08800/N08810/N08811 / 1.4876/1.4958/1.4859) bars and rods, the high-temperature nickel-iron-chromium alloys offering excellent creep and stress rupture properties. Manufactured to ASTM B408 and ASME SB408 standards for high-temperature and corrosive applications.",
        image: "/stock/inconel-800-800h-800ht-bars.jpg",
      },
      {
        slug: "inconel-825-bars-rods",
        title: "Incoloy 825 Bars & Rods Supplier - UNS N08825 (2.4858)",
        shortDescription:
          "Premium Incoloy 825 (UNS N08825 / 2.4858) bars and rods, the nickel-iron-chromium alloy with molybdenum, copper, and titanium addition offering exceptional corrosion resistance in both oxidizing and reducing environments. Manufactured to ASTM B425 and ASME SB425 standards for chemical processing, oil and gas, and marine applications.",
        image: "/stock/inconel-825-bars.jpg",
      },
      {
        slug: "inconel-925-bars-rods",
        title: "Incoloy 925 Bars & Rods Supplier - UNS N09925",
        shortDescription:
          "Premium Incoloy 925 (UNS N09925) bars and rods, the age-hardenable nickel-iron-chromium alloy offering exceptional corrosion resistance, high strength, and excellent performance in extreme environments. Manufactured to ASTM B805 and ASME SB805 standards for oil and gas, aerospace, and marine applications.",
        image: "/stock/inconel-925-bars.jpg",
      },
      // {
      //   slug: "inconel-forged-fittings",
      //   title: "Inconel Forged Fittings",
      //   shortDescription:
      //     "Inconel 600, 625, 718, X-750 Oxidation-Resistant Half Couplings and Socket Weld Reducing Tees for Nuclear & Aerospace Engineering.",
      //   image: "/stock/incoloy-forged-fittings.jpg",
      // },
      {
        slug: "inconel-600-flanges",
        title:
          "Inconel 600 Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
        shortDescription:
          'Premium Inconel 600 flanges manufacturer, supplier, stockist and exporter operating from Mumbai, India since 2013. Forged UNS N06600 flanges to ASTM B564 and ASME SB-564. Inconel 600 is a nickel-chromium-iron alloy carrying 72.0% minimum nickel with 14.0 to 17.0% chromium, resistant to chloride-ion stress corrosion cracking and stable oxide film in hot service. Ten forged constructions available from 1/2" to 48" NB, Class 150 to 2500.',
        image: "/stock/inconel-600-flange.jpg",
      },
      {
        slug: "inconel-625-flanges",
        title:
          "Inconel 625 Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
        shortDescription:
          'Premium Inconel 625 flanges manufacturer, supplier, stockist and exporter based in Mumbai, India since 2013. Produced to ASTM B564 and ASME SB-564 under UNS N06625. Inconel 625 gains its strength from molybdenum and niobium dissolved in a nickel-chromium matrix, with 58.0% minimum nickel and 20.0-23.0% chromium. Standard flange sizes from NPS 1/2" to 24" in ASME B16.5 Classes 150 to 2500.',
        image: "/stock/hastelloy-alloy-flanges.jpg",
      },
      {
        slug: "inconel-660a-fasteners",
        title:
          "Inconel 660A Fasteners Manufacturer & Supplier - ASTM A453 Grade 660 Class A",
        shortDescription:
          "Premium Inconel 660A fasteners manufacturer, supplier and exporter based in Mumbai, India since 2013. Inconel 660A is a market name used in the fastener trade for A-286, the iron-nickel-chromium precipitation-hardening alloy registered as UNS S66286 and supplied to ASTM A453 Grade 660 Class A. We stock hex bolts, hex nuts, stud bolts, washers, screws, threaded rods, anchor bolts, socket head cap screws, U-bolts and eyebolts from M3 to M56 and 3/16 in to 2 1/4 in, with lengths from 3 mm to 200 mm.",
        image: "/stock/inconel-fasteners.jpg",
      },
    ]),
  },

  {
    name: "Monel",
    slug: "monel",
    icon: Box,
    description:
      "Nickel-copper alloys with exceptional corrosion resistance in marine, chemical, and acidic environments.",
    overview:
      "Reliable performance in seawater, acids, and high-stress applications.",
    highlight: [
      "Excellent seawater resistance",
      "Corrosion resistance to acids",
      "Good mechanical properties",
    ],
    items: buildItemsWithImages([
     {
    "slug": "monel-pipe-fittings",
    "title": "Monel Pipe Fittings Manufacturer & Supplier - ASTM B366 / ASME SB-366",
    "shortDescription": "Premium Monel pipe fittings manufacturer, stockist, supplier and exporter based in Mumbai, active in nickel alloy piping since 2013. Production covers butt-weld elbows, tees, reducers, caps and stub ends to ASTM B366 / ASME SB-366 in grade WPNC, dimensioned under ASME B16.9, with MSS SP-43 for lightweight walls, plus forged socket-weld and threaded pieces to ASME B16.11 from ASTM B564 forgings. Available in Monel 400 (UNS N04400) grade. Seamless fittings span 1/2 inch to 10 inch NB, welded construction extends coverage to 48 inch NB, and schedules run SCH 5 through SCH XXS.",
    "image": "/stock/titanium-buttweld-fittings.jpg"
    },
  {
    "slug": "monel-fasteners",
    "title": "Monel Fasteners Manufacturer & Supplier - ASTM F468 / F467 / B164 / B865",
    "shortDescription": "Premium Monel fasteners manufacturer, stockist and exporter based in Mumbai, India, operating since 2013. Monel fasteners are nickel-copper alloy fasteners machined from bar. Monel 400 bar supplied to ASTM B164 / ASME SB-164, and Monel K500 bar supplied to ASTM B865. The range includes Monel 400, which contains a minimum of 63% nickel and 28 to 34% copper, and Monel K500, which contains aluminium and titanium and can be age-hardened for higher-strength applications. Certified sizes run from 1/4 in to 1-1/2 in under ASTM F468/F467 and M6 to M36 under metric companions.",
    "image": "/stock/monel-fasteners.jpg"
  },
   {
    "slug": "monel-flanges",
    "title": "Monel Flanges Manufacturer & Supplier - ASTM B564 / ASME SB-564",
    "shortDescription": "Premium Monel flanges manufacturer, stockist and exporter operating from Mumbai, India since 2013. Alloy 400 forgings certified to ASTM B564 / ASME SB-564, while K500 orders supplied to ASTM B865 / ASME SB-865. Monel flanges are nickel-copper alloy flanges containing roughly 67% nickel, providing strong resistance to corrosion in rapidly flowing seawater, brine, hydrofluoric acid and alkaline service. Available in Monel 400 (UNS N04400) and Monel K500 (UNS N05500) grades. Supply spans NPS 1/2\" to 48\" (DN 15 to DN 1200) with Classes 150 to 2500.",
    "image": "/stock/steel-flanges-types.jpg"
  },
  // {
  //   "slug": "monel-forged-fittings",
  //   "title": "Monel Forged Fittings",
  //   "shortDescription": "Monel 400, Monel K500 Forged Threaded Caps, Bosses, and Reducing Inserts Built for High-Salinity Marine Piping.",
  //   "image": "/stock/monel-forged-fittings.jpg"
  // },
   {
    "slug": "monel-400-bars-rods",
    "title": "Monel 400 Bars & Rods Supplier - UNS N04400 (2.4360)",
    "shortDescription": "Premium Monel 400 (UNS N04400 / 2.4360) bars and rods, the nickel-copper alloy offering exceptional corrosion resistance in marine, chemical, and acid environments. Manufactured to ASTM B164 and ASME SB164 standards for marine engineering, chemical processing, and high-performance applications.",
    "image": "/stock/monel-400-bars.jpg"
  },
  {
    "slug": "monel-k500-bars-rods",
    "title": "Monel K500 Bars & Rods Supplier - UNS N05500 (2.4375)",
    "shortDescription": "Premium Monel K500 (UNS N05500 / 2.4375) bars and rods, the precipitation-hardenable nickel-copper alloy offering high strength, excellent corrosion resistance, and good ductility. Manufactured to ASTM B865 and ASME SB865 standards for marine engineering, chemical processing, and high-performance applications.",
    "image": "/stock/monel-k500-bars.jpg"
  },
  {
    "slug": "monel-400-sheets-plates",
    "title": "Monel 400 Sheets & Plates Supplier - UNS N04400 (2.4360)",
    "shortDescription": "Premium Monel 400 (UNS N04400 / 2.4360) sheets and plates, the nickel-copper alloy offering exceptional corrosion resistance in marine, chemical, and acid environments. Manufactured to ASTM B127 and ASME SB127 standards for marine engineering, chemical processing, and high-performance applications.",
    "image": "/stock/monel-400-sheets-plates.jpg"
  },
  {
    "slug": "monel-k500-sheets-plates",
    "title": "Monel K500 Sheets & Plates Supplier - UNS N05500 (2.4375)",
    "shortDescription": "Premium Monel K500 (UNS N05500 / 2.4375) sheets and plates, the precipitation-hardenable nickel-copper alloy offering high strength, excellent corrosion resistance, and good ductility. Manufactured to ASTM B127 and ASME SB127 standards for marine engineering, chemical processing, and high-performance applications.",
    "image": "/stock/monel-k500-sheets-plates.jpg"
  },
   {
    "slug": "monel-400-pipes",
    "title": "Monel 400 Pipes Supplier – UNS N04400 / 2.4360",
    "shortDescription": "Solid-solution nickel-copper alloy pipes offering high strength and toughness over a wide temperature range. Features minimum 63% Nickel and 28-34% Copper. Manufactured to ASTM B165, B725 and ASME SB165, SB725 standards.",
    "image": "/stock/monel-400-pipes.jpg"
  },
  {
    "slug": "monel-pipes",
    "title": "Monel Pipes Supplier – Monel 400 & Monel K500",
    "shortDescription": "Nickel-copper-based solid-solution alloy pipes renowned for high strength and excellent resistance to a wide range of corrosive environments. Available in Monel 400 (UNS N04400) and Monel K500 (UNS N05500). Manufactured to ASTM B165, B725 and ASME SB165, SB725 standards.",
    "image": "/stock/monel-pipes.jpg"
  }
    ]),
  },

  {
    name: "Titanium",
    slug: "titanium",
    icon: Zap,
    description:
      "Lightweight, high-strength titanium alloys for aerospace, medical, and highly corrosive environments.",
    overview:
      "The ideal combination of strength, low weight, and corrosion resistance.",
    highlight: [
      "Exceptional strength-to-weight ratio",
      "Outstanding corrosion resistance",
      "Biocompatibility",
    ],
    items: buildItemsWithImages([
  {
  "slug": "titanium-pipes",
  "image": "/stock/titanium-pipes.jpg",
  "title": "Titanium Pipes Supplier – Grade 2 & Grade 5",
  "shortDescription": "Premium titanium pipes offering exceptional strength-to-weight ratio with extraordinary corrosion resistance. Available in Grade 2 (Commercially Pure) and Grade 5 (Ti-6Al-4V) alloys. Manufactured to ASTM B861, B862, B338 and ASME SB861, SB862, SB338 standards."
   },
   {
  "slug": "titanium-wires",
  "image": "/stock/titanium-wires.jpg",
  "title": "Titanium Wires Supplier – Grade 2 & Grade 5",
  "shortDescription": "Premium Titanium wires in Grade 2 (Commercially Pure) and Grade 5 (Ti-6Al-4V) alloys, engineered for exceptional strength-to-weight ratio, extraordinary corrosion resistance, and biocompatibility. Ideal for aerospace, medical, marine, and high-performance industrial applications. Manufactured to ASTM B863 and AWS A5.16 standards."
   },
   {
  "slug": "titanium-gr-1-sheets-plates",
  "image": "/stock/titanium-gr-1-sheets-plates.jpg",
  "title": "Titanium Grade 1 Sheets & Plates Supplier - UNS R50250 (3.7025)",
  "shortDescription": "Premium Titanium Grade 1 (UNS R50250 / 3.7025) sheets and plates, the softest and most ductile commercially pure titanium grade offering exceptional corrosion resistance and outstanding formability. Manufactured to ASTM B265 and ASME SB265 standards for aerospace, chemical processing, and marine applications."
}, 
{
  "slug": "titanium-gr-2-sheets-plates",
  "image": "/stock/titanium-gr-2-sheets-plates.jpg",
  "title": "Titanium Grade 2 Sheets & Plates Supplier - UNS R50400 (3.7035)",
  "shortDescription": "Premium Titanium Grade 2 (UNS R50400 / 3.7035) sheets and plates, the most widely used commercially pure titanium grade offering an optimal balance of strength, ductility, and exceptional corrosion resistance. Manufactured to ASTM B265 and ASME SB265 standards for chemical processing, marine, and industrial applications."
},
{
  "slug": "titanium-gr-4-sheets-plates",
  "image": "/stock/titanium-gr-4-sheets-plates.jpg",
  "title": "Titanium Grade 4 Sheets & Plates Supplier - UNS R50700 (3.7065)",
  "shortDescription": "Premium Titanium Grade 4 (UNS R50700 / 3.7065) sheets and plates, the strongest commercially pure titanium grade offering superior strength, good ductility, and excellent corrosion resistance. Manufactured to ASTM B265 and ASME SB265 standards for aerospace, medical, and high-performance applications."
},
{
  "slug": "titanium-gr-5-eli-ti6al4v-sheets-plates",
  "image": "/stock/titanium-gr-5-eli-ti6al4v-sheets-plates.jpg",
  "title": "Titanium Grade 5 (Ti-6Al-4V / ELI) Sheets & Plates Supplier - UNS R56400 (3.7165)",
  "shortDescription": "Premium Titanium Grade 5 (Ti-6Al-4V / ELI) (UNS R56400 / 3.7165) sheets and plates, the most widely used titanium alloy offering exceptional strength-to-weight ratio, excellent fatigue resistance, and superior corrosion resistance. Manufactured to ASTM B265 and ASME SB265 standards for aerospace, medical, and high-performance applications."
},
{
  "slug": "titanium-gr-7-sheets-plates",
  "image": "/stock/titanium-gr-7-sheets-plates.jpg",
  "title": "Titanium Grade 7 Sheets & Plates Supplier - UNS R52400 (3.7235)",
  "shortDescription": "Premium Titanium Grade 7 (UNS R52400 / 3.7235) sheets and plates, a palladium-stabilized commercially pure titanium grade offering exceptional corrosion resistance in reducing acid environments. Manufactured to ASTM B265 and ASME SB265 standards for chemical processing, marine, and high-corrosion applications."
},
{
  "slug": "titanium-grade-1-bars-rods",
  "image": "/stock/titanium-grade-1-bars.jpg",
  "title": "Titanium Grade 1 Bars & Rods Supplier - UNS R50250 (3.7025)",
  "shortDescription": "Premium Titanium Grade 1 (UNS R50250 / 3.7025) bars and rods engineered for exceptional corrosion resistance and superior ductility. Manufactured to ASTM B348 and ASME SB348 standards, ideal for chemical processing, marine, and aerospace applications."
},
{
  "slug": "titanium-grade-2-bars-rods",
  "image": "/stock/titanium-grade-2-bars.jpg",
  "title": "Titanium Grade 2 Bars & Rods Supplier - UNS R50400 (3.7035)",
  "shortDescription": "Premium Titanium Grade 2 (UNS R50400 / 3.7035) bars and rods, the most widely used commercially pure titanium grade. Manufactured to ASTM B348 and ASME SB348 standards, offering an optimal balance of strength, ductility, and exceptional corrosion resistance for industrial, marine, and chemical applications."
},
{
  "slug": "titanium-grade-4-bars-rods",
  "image": "/stock/titanium-grade-4-bars.jpg",
  "title": "Titanium Grade 4 Bars & Rods Supplier - UNS R50700 (3.7065)",
  "shortDescription": "High-strength Titanium Grade 4 (UNS R50700 / 3.7065) bars and rods, the strongest of the commercially pure titanium grades. Manufactured to ASTM B348 and ASME SB348 standards, offering superior strength, excellent corrosion resistance, and good formability for demanding industrial, marine, and aerospace applications."
},
{
  "slug": "titanium-grade-5-eli-ti6al4v-bars-rods",
  "image": "/stock/titanium-grade-5-bars.jpg",
  "title": "Titanium Grade 5 (Ti-6Al-4V / ELI) Bars & Rods Supplier - UNS R56400 (3.7165)",
  "shortDescription": "Premium Titanium Grade 5 (UNS R56400 / 3.7165 / Ti-6Al-4V) bars and rods, the most widely used titanium alloy offering exceptional strength-to-weight ratio, excellent fatigue resistance, and superior corrosion resistance. Manufactured to ASTM B348, ASME SB348, and AMS 4928 standards for aerospace, medical, and high-performance industrial applications."
},
{
  "slug": "titanium-grade-7-bars-rods",
  "image": "/stock/titanium-grade-7-bars.jpg",
  "title": "Titanium Grade 7 Bars & Rods Supplier - UNS R52400 (3.7235)",
  "shortDescription": "Premium Titanium Grade 7 (UNS R52400 / 3.7235) bars and rods with palladium content for enhanced corrosion resistance. Manufactured to ASTM B348 and ASME SB348 standards for chemical, marine, and industrial applications."
},
// {
//   "slug": "titanium-forged-fittings",
//   "image": "/stock/hastelloy-forged-fittings.jpg",
//   "title": "Titanium Forged Fittings",
//   "shortDescription": "ASTM B381 Gr. 1, Gr. 2, Gr. 5 (Ti-6Al-4V), Gr. 7 High Strength-to-Weight Threadolets and Socket Weld Fittings."
// },
{
  "slug": "titanium-flanges",
  "image": "/stock/titanium-flanges.jpg",
  "title": "Titanium Flanges Manufacturer & Supplier - ASTM B381 / ASME SB-381",
  "shortDescription": "Premium titanium flange manufacturer, stockist and exporter based in Mumbai, India, trading in industrial metals since 2013. Flange bodies forged to ASTM B381 / ASME SB-381, or machined from ASTM B265 / ASME SB-265 plate. Titanium flanges provide strong corrosion resistance through a stable, self-healing oxide film against seawater, chlorides and oxidising environments. Available in Titanium Grade 2 (UNS R50400) and Titanium Grade 4 (UNS R50700). Sizes range from NPS 1/2\" to 24\" in Class 150 and Class 300."
},
{
  "slug": "titanium-fasteners",
  "image": "/stock/titanium-fasteners.jpg",
  "title": "Titanium Fasteners Manufacturer & Supplier - ASTM F468 / F467 / B348",
  "shortDescription": "Premium titanium fasteners manufacturer, stockist and exporter based in Mumbai, India, operating since 2013. Titanium fasteners are corrosion-resistant, lightweight, and non-magnetic components supplied in commercially pure Grades 2 and 4, or alloyed Grades 5 and 7. They form a stable oxide layer providing strong resistance to seawater and chlorides. Imperial and metric bolts, screws, and studs certified to ASTM F468/F468M and F467/F467M. Diameters range from M3 to M14 in metric sizes and from #4 to 9/16 in imperial sizes."
},
{
  "slug": "titanium-buttweld-fittings",
  "image": "/stock/titanium-buttweld-fittings.jpg",
  "title": "Titanium Pipe Fittings Manufacturer & Supplier - ASTM B363 / ASME SB-363",
  "shortDescription": "Premium titanium pipe fittings manufacturer, stockist and exporter working out of Mumbai, India, trading titanium pipe and fittings since 2013. Certified to ASTM B363 / ASME SB-363, grade WPT1 for Titanium Grade 1 and grade WPT2 for Titanium Grade 2, with couplings machined from ASTM B348 bar. Buttweld dimensions follow ASME B16.9 and ASME B16.28. Elbows, tees and caps available from 1/2 inch to 24 inch NPS, stub ends from 1 inch to 24 inch, and reducers from 1 inch × 1/2 inch to 12 inch × 10 inch, in Schedule 10 and Schedule 40."
}
    ]),
  },

  {
    name: "Nimonic",
    slug: "nimonic",
    icon: Layers,
    description:
      "High-performance austenitic stainless steels for demanding applications in heat exchangers and high-temperature environments.",
    overview:
      "Superior heat and corrosion resistance for critical industrial applications.",
    highlight: [
      "Excellent heat resistance",
      "Superior corrosion resistance",
      "High mechanical strength",
    ],
    items: buildItemsWithImages([
      {
  "slug": "nimonic-alloys-75-bars-rods",
  "image": "/stock/high-performance-alloy-round-bars.jpg",
  "title": "Nimonic 75 Bars & Rods Supplier - UNS N06075",
  "shortDescription": "Premium Nimonic 75 (UNS N06075) bars and rods, the nickel-chromium alloy offering excellent high-temperature strength, good corrosion resistance, and outstanding oxidation resistance. Manufactured for aerospace, gas turbine, and high-temperature applications."
},
{
  "slug": "nimonic-alloys-80a-bars-rods",
  "image": "/stock/nimonic-80a-bars.jpg",
  "title": "Nimonic 80A Bars & Rods Supplier - UNS N07080 (2.4631)",
  "shortDescription": "Premium Nimonic 80A (UNS N07080 / 2.4631) bars and rods, the age-hardenable nickel-chromium alloy offering excellent high-temperature strength, good corrosion resistance, and outstanding oxidation resistance. Manufactured for aerospace, gas turbine, and high-performance applications."
},
{
  "slug": "nimonic-263-bars-rods",
  "image": "/stock/nimonic-263-bars.jpg",
  "title": "Nimonic 263 Bars & Rods Supplier - UNS N07263 (2.4650)",
  "shortDescription": "Premium Nimonic 263 (UNS N07263 / 2.4650) bars and rods, the age-hardenable nickel-cobalt-chromium alloy offering excellent high-temperature strength, good ductility, and outstanding oxidation resistance. Manufactured for aerospace, gas turbine, and high-temperature applications."
},
{
  "slug": "nimonic-90-bars-rods",
  "image": "/stock/nimonic-90-bars.jpg",
  "title": "Nimonic 90 Bars & Rods Supplier - UNS N07090 (2.4632)",
  "shortDescription": "Premium Nimonic 90 (UNS N07090 / 2.4632) bars and rods, the age-hardenable nickel-chromium-cobalt alloy offering excellent high-temperature strength, good creep resistance, and outstanding oxidation resistance. Manufactured for aerospace, gas turbine, and high-temperature applications."
},
{
    "slug": "nitronic-50-xm-19-bars-rods",
    "title": "Nitronic 50 / XM 19 Bars & Rods Supplier - UNS S20910 (1.3964)",
    "shortDescription": "Premium Nitronic 50 / XM 19 (UNS S20910 / 1.3964) bars and rods, the high-performance nitrogen-strengthened austenitic stainless steel offering exceptional corrosion resistance, high strength, and excellent durability. Manufactured to ASTM A276 and A479 standards for marine, chemical, and high-performance applications.",
    "image": "/stock/nitronic-50-bars.jpg"
  },
  {
    "slug": "nitronic-60-bars-rods",
    "title": "Nitronic 60 Bars & Rods Supplier - UNS S21800",
    "shortDescription": "Premium Nitronic 60 (UNS S21800) bars and rods, the high-performance nitrogen-strengthened austenitic stainless steel offering exceptional corrosion resistance, high strength, and excellent galling resistance. Manufactured to ASTM A276 and A479 standards for chemical, petrochemical, and high-performance applications.",
    "image": "/stock/nitronic-60-bars.jpg"
  },
{
  "slug": "nimonic-alloys-80a-fasteners",
  "image": "/stock/nimonic-80a-fasteners.jpg",
  "title": "Nimonic Alloys 80A Fasteners Manufacturer & Supplier - ASTM B637 / ASME SB-637",
  "shortDescription": "Premium Nimonic 80A fastener manufacturer and supplier based in Mumbai, India. Nimonic 80A is a precipitation-hardenable nickel-chromium alloy with chromium at 18.0 to 21.0%, while titanium and aluminium additions harden the material on ageing. Fasteners in the age-hardened condition retain tensile and creep-rupture strength to 815 °C (1500 °F). Produced from #00 to 4 inches and M1.2 to M48, with rolled or cut threads. Hex bolts, hex nuts, stud bolts, threaded rods, screws and washers available."
},
    ]),
  },

  {
    name: "Other Materials",
    slug: "other-materials",
    icon: Box,
    description:
      "Additional specialized materials and high-performance alloys for diverse and specialized industrial requirements.",
    overview: "Comprehensive solutions for diverse industrial applications.",
    highlight: [
      "Versatile applications",
      "Diverse material options",
      "Performance-focused solutions",
    ],
    items: buildItemsWithImages([
     {
  "slug": "high-performance-alloy-pipes",
  "title": "High-Performance Alloy Pipes Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
  "shortDescription": "Specialized alloy pipes engineered for mission-critical applications where standard stainless steels fail due to thermal fatigue, mechanical stress, or aggressive chemical attack. Available in Nimonic, Nichrome, Nitronic, Nilo, Alloy 286, and Alloy 926 grades. Manufactured to ASTM B163, B167, B407, B517, A312 and ASME SB163, SB167, SB407, SB517 standards.",
  "image": "/stock/high-performance-alloy-pipes.jpg"
},
{
  "slug": "smo-254-pipes",
  "title": "SMO 254 Pipes Supplier – UNS S31254 / 1.4547 (6% Moly)",
  "shortDescription": "High-alloy austenitic stainless steel pipes designed for maximum resistance to pitting and crevice corrosion. Features 6% Molybdenum content with a PREN of ≥42.5. Manufactured to ASTM A312, A358 and ASME SA312, SA358 standards.",
  "image": "/stock/smo-254-pipes.jpg"
},

  {
    "slug": "special-alloy-wires",
    "title": "Special Alloy Wires Supplier – SMO 254 (F44) & Alloy 20",
    "shortDescription": "Premium special alloy wires including SMO 254 (UNS S31254 / F44) and Alloy 20 (UNS N08020 / Carpenter 20). Engineered for exceptional resistance to pitting, crevice corrosion, and acid attack in aggressive chemical processing and marine environments. Ideal for desalination, offshore oil & gas, chemical production, and pharmaceutical applications.",
    "image": "/stock/special-alloy-wires.jpg"
  },
   {
    "slug": "high-performance-alloy-wires",
    "title": "High-Performance Alloy Wires Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
    "shortDescription": "Premium high-performance alloy wires including Nimonic 75/80A, Nichrome 80/20, Nitronic 50 (XM-19), Nilo 42/48, Alloy 286 (660), and Alloy 926 (1.4529). Engineered for mission-critical applications requiring extreme temperature resistance, high strength, controlled thermal expansion, and superior corrosion resistance. Ideal for aerospace, electrical heating, marine, and chemical processing industries.",
    "image": "/stock/high-performance-alloy-wires.jpg"
  },
  {
    "slug": "alloy-20-carpenter-20-sheets-plates",
    "title": "Alloy 20 / Carpenter 20 Sheets & Plates Supplier - UNS N08020 (2.4660)",
    "shortDescription": "Premium Alloy 20 / Carpenter 20 (UNS N08020 / 2.4660) sheets and plates, the nickel-iron-chromium superalloy offering excellent corrosion resistance in sulfuric acid environments. Manufactured to ASTM B473 and ASME SB473 standards for chemical processing, pharmaceutical, and high-performance applications.",
    "image": "/stock/alloy-20-carpenter-20-sheets-plates.jpg"
  },
  {
    "slug": "alloy-a286-bars-rods",
    "title": "Alloy A286 Bars & Rods Supplier - UNS S66286 (1.4980)",
    "shortDescription": "Premium Alloy A286 (UNS S66286 / 1.4980) bars and rods, the age-hardenable iron-nickel-chromium superalloy offering excellent high-temperature strength, good corrosion resistance, and outstanding oxidation resistance. Manufactured to ASTM A286 and ASME SA286 standards for aerospace, gas turbine, and high-performance applications.",
    "image": "/stock/alloy-a286-bars.jpg"
  },
  {
    "slug": "6-moly-s31254-smo-254-bars-rods",
    "title": "6 Moly S31254 / SMO 254 Bars & Rods Supplier - UNS S31254 (1.4547)",
    "shortDescription": "Premium 6 Moly S31254 / SMO 254 (UNS S31254 / 1.4547) bars and rods, the high-performance austenitic stainless steel offering exceptional resistance to pitting, crevice corrosion, and stress corrosion cracking. Manufactured to ASTM A276 and A479 standards for aggressive chloride and seawater applications.",
    "image": "/stock/smo-254-bars.jpg"
  },
  




    ]),
  },
];

export default materials;
