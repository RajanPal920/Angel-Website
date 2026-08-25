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
    // Default image path based on product slug
    let image = `/productImage/${item.slug}.jpg`;

    // You can add specific overrides if needed
    if (item.slug === "stainless-steel-tubes") {
      image = "/productImage/tubes.jpg";
    } else if (item.slug === "stainless-steel-round-bars") {
      image = "/productImage/rod.jpg";
    } else if (item.slug === "stainless-steel-sheets") {
      image = "/productImage/sheets.jpg";
    } else if (item.slug === "stainless-steel-plates") {
      image = "/productImage/plates.jpg";
    } else if (item.slug === "stainless-steel-wires") {
      image = "/productImage/wires.jpg";
    } else if (item.slug === "stainless-steel-coils") {
      image = "/productImage/coil.jpg";
    } else if (item.slug === "stainless-steel-pipes") {
      image = "/productImage/steel-pipes.jpg";
    } else if (item.slug.includes("duplex")) {
      // Use generic images for duplex products
      image = `/productImage/${item.slug.replace("duplex-steel-", "")}.jpg`;
    }

    return { ...item, image };
  });
};

// ✅ UPDATED: Maps material to MULTIPLE categories
export const materialToCategoryMap: Record<string, string[]> = {
  "stainless-steel": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  "duplex-steel": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  "nickel-alloy": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  "copper-nickel": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
  ],
  hastelloy: [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  incoloy: [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  inconel: [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  monel: ["pipes", "tubes", "coils", "plates", "round-bars", "sheets", "wires"],
  titanium: [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  sanicro: [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  "special-materials": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
    "wires",
  ],
  "other-materials": [
    "pipes",
    "tubes",
    "coils",
    "plates",
    "round-bars",
    "sheets",
  ],
};

// This maps product category keys to material slugs (reverse lookup)
export const categoryToMaterialMap: Record<string, string> = {
  "stainless-steel-pipes": "stainless-steel",
  "stainless-steel-tubes": "stainless-steel",
  "stainless-steel-sheets": "stainless-steel",
  "stainless-steel-plates": "stainless-steel",
  "stainless-steel-wires": "stainless-steel",
  "stainless-steel-coils": "stainless-steel",
  "stainless-steel-round-bars": "stainless-steel",

  "duplex-steel-pipes": "duplex-steel",
  "duplex-steel-tubes": "duplex-steel",
  "duplex-steel-sheets": "duplex-steel",
  "duplex-steel-plates": "duplex-steel",
  "duplex-steel-wires": "duplex-steel",
  "duplex-steel-coils": "duplex-steel",
  "duplex-steel-round-bars": "duplex-steel",

  "nickel-alloy-pipes": "nickel-alloy",
  "nickel-alloy-tubes": "nickel-alloy",
  "nickel-alloy-sheets": "nickel-alloy",
  "nickel-alloy-plates": "nickel-alloy",
  "nickel-alloy-wires": "nickel-alloy",
  "nickel-alloy-coils": "nickel-alloy",
  "nickel-alloy-round-bars": "nickel-alloy",

  "copper-nickel-pipes": "copper-nickel",
  "copper-nickel-tubes": "copper-nickel",
  "copper-nickel-sheets": "copper-nickel",
  "copper-nickel-plates": "copper-nickel",
  "copper-nickel-round-bars": "copper-nickel",
  "copper-nickel-coils": "copper-nickel",

  "hastelloy-pipes": "hastelloy",
  "hastelloy-tubes": "hastelloy",
  "hastelloy-sheets": "hastelloy",
  "hastelloy-plates": "hastelloy",
  "hastelloy-wires": "hastelloy",
  "hastelloy-coils": "hastelloy",
  "hastelloy-round-bars": "hastelloy",

  "incoloy-pipes": "incoloy",
  "incoloy-tubes": "incoloy",
  "incoloy-sheets": "incoloy",
  "incoloy-plates": "incoloy",
  "incoloy-wires": "incoloy",
  "incoloy-coils": "incoloy",
  "incoloy-round-bars": "incoloy",

  "inconel-pipes": "inconel",
  "inconel-tubes": "inconel",
  "inconel-sheets": "inconel",
  "inconel-plates": "inconel",
  "inconel-wires": "inconel",
  "inconel-coils": "inconel",
  "inconel-round-bars": "inconel",

  "monel-pipes": "monel",
  "monel-tubes": "monel",
  "monel-sheets": "monel",
  "monel-plates": "monel",
  "monel-wires": "monel",
  "monel-coils": "monel",
  "monel-round-bars": "monel",

  "titanium-pipes": "titanium",
  "titanium-tubes": "titanium",
  "titanium-sheets": "titanium",
  "titanium-plates": "titanium",
  "titanium-wires": "titanium",
  "titanium-coils": "titanium",
  "titanium-round-bars": "titanium",

  "sanicro-pipes": "sanicro",
  "sanicro-tubes": "sanicro",
  "sanicro-sheets": "sanicro",
  "sanicro-plates": "sanicro",
  "sanicro-wires": "sanicro",
  "sanicro-coils": "sanicro",
  "sanicro-round-bars": "sanicro",

  "high-performance-alloy-pipes": "other-materials",
  "high-performance-alloy-tubes": "other-materials",
  "high-performance-alloy-round-bars": "other-materials",
  "high-performance-alloy-sheets": "other-materials",
  "high-performance-alloy-plates": "other-materials",
  "high-performance-alloy-wires": "other-materials",
  "high-performance-alloy-coils": "other-materials",

  "special-alloy-pipes": "special-materials",
  "special-alloy-tubes": "special-materials",
  "special-alloy-round-bars": "special-materials",
  "special-alloy-sheets": "special-materials",
  "special-alloy-plates": "special-materials",
  "special-alloy-wires": "special-materials",
  "special-alloy-coils": "special-materials",
};

const materials: Material[] = [
  {
    name: "Stainless Steel",
    slug: "stainless-steel",

    icon: ShieldCheck,
    description:
      "Corrosion-resistant austenitic, ferritic, and martensitic grades for general industrial, food, and architectural use.",
    overview:
      "A versatile range of stainless grades suited to food processing, architecture, and general engineering.",
    highlight: [
      "Excellent corrosion resistance",
      "Clean finishing",
      "High weldability",
    ],
    items: buildItemsWithImages([
      {
        title: "Stainless Steel Tubes",
        slug: "stainless-steel-tubes",
        shortDescription:
          "Stainless Steel Tubes Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "Premium stainless steel tubes available in grades 304, 304L, 316, 316L, 310S, 904L for heat exchangers, instrumentation, and high-temperature applications.",
        properties: [
          "Excellent corrosion resistance",
          "High strength-to-weight ratio",
          "Good weldability",
          "Temperature resistance",
        ],
        applications: [
          "Heat exchangers",
          "Instrumentation",
          "High-temperature applications",
          "Chemical processing",
        ],
      },
      {
        title: "Stainless Steel Round Bars",
        slug: "stainless-steel-round-bars",
        shortDescription:
          "Stainless Steel Round Bars Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "Precision-engineered stainless steel round bars in grades 304, 304L, 316, 316L, 310S, 904L for machining, fabrication, and structural applications.",
        properties: [
          "High tensile strength",
          "Excellent machinability",
          "Corrosion resistance",
          "Dimensional accuracy",
        ],
        applications: [
          "Machining",
          "Fabrication",
          "Structural applications",
          "Shafts and fasteners",
        ],
      },
      {
        title: "Stainless Steel Sheets",
        slug: "stainless-steel-sheets",
        shortDescription:
          "Stainless Steel Sheets Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "High-quality stainless steel sheets available in grades 304, 304L, 316, 316L, 310S, 904L for industrial fabrication, architectural, and food processing applications.",
        properties: [
          "Excellent formability",
          "Superior surface finish",
          "Corrosion resistance",
          "Wide size range",
        ],
        applications: [
          "Industrial fabrication",
          "Architectural cladding",
          "Food processing equipment",
          "Tanks and vessels",
        ],
      },
      {
        title: "Stainless Steel Plates",
        slug: "stainless-steel-plates",
        shortDescription:
          "Stainless Steel Plates Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "Heavy-duty stainless steel plates in grades 304, 304L, 316, 316L, 310S, 904L for pressure vessels, structural fabrication, and heavy engineering.",
        properties: [
          "High strength",
          "Excellent impact resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Structural fabrication",
          "Heavy engineering",
          "Offshore platforms",
        ],
      },
      {
        title: "Stainless Steel Wires",
        slug: "stainless-steel-wires",
        shortDescription:
          "Stainless Steel Wires Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "Premium stainless steel wires in grades 304, 304L, 316, 316L, 310S, 904L for welding, fasteners, springs, and industrial applications.",
        properties: [
          "High tensile strength",
          "Good ductility",
          "Corrosion resistance",
          "Consistent quality",
        ],
        applications: [
          "Welding electrodes",
          "Fasteners",
          "Springs",
          "Wire mesh",
        ],
      },
      {
        title: "Stainless Steel Coils",
        slug: "stainless-steel-coils",
        shortDescription:
          "Stainless Steel Coils Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "High-quality stainless steel coils available in grades 304, 304L, 316, 316L, 310S, 904L for stamping, forming, and continuous processing applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Consistent quality",
        ],
        applications: [
          "Stamping",
          "Forming",
          "Continuous processing",
          "Automotive components",
        ],
      },
      {
        title: "Stainless Steel Pipes",
        slug: "stainless-steel-pipes",
        shortDescription:
          "Stainless Steel Pipes Supplier – 304, 304L, 316, 316L, 310S, 904L & More",
        description:
          "Seamless and welded stainless steel pipes in grades 304, 304L, 316, 316L, 310S, 904L for fluid transport, structural, and industrial applications.",
        properties: [
          "High pressure resistance",
          "Excellent corrosion resistance",
          "Good weldability",
          "Temperature resistance",
        ],
        applications: [
          "Fluid transport",
          "Structural applications",
          "Industrial processing",
          "Oil and gas",
        ],
      },
    ]),
  },
  {
    name: "Duplex Steel",
    slug: "duplex-steel",

    icon: Layers,
    description:
      "High-strength duplex and super duplex grades combining austenitic and ferritic properties for demanding environments.",
    overview:
      "Balanced strength and corrosion resistance for offshore and process industry use.",
    highlight: [
      "Double strength of austenitic grades",
      "Excellent pitting resistance",
      "Good fatigue performance",
    ],
    items: buildItemsWithImages([
      {
        title: "Duplex Steel Tubes",
        slug: "duplex-super-duplex-steel-tubes",
        shortDescription:
          "Duplex Steel Tubes Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "High-strength duplex steel tubes for offshore, chemical, and pressure applications with excellent corrosion resistance.",
        properties: [
          "High strength",
          "Excellent chloride resistance",
          "Good weldability",
          "Corrosion resistance",
        ],
        applications: [
          "Offshore piping",
          "Heat exchangers",
          "Pressure vessels",
        ],
      },
      {
        title: "Duplex Steel Round Bars",
        slug: "duplex-super-duplex-steel-round-bars",
        shortDescription:
          "Duplex Steel Round Bars Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "Precision duplex steel round bars for high-strength applications in marine, chemical, and oil & gas industries.",
        properties: [
          "High mechanical strength",
          "Excellent corrosion resistance",
          "Good machinability",
          "Dimensional accuracy",
        ],
        applications: [
          "Fasteners",
          "Shafts",
          "Marine components",
          "Valve stems",
        ],
      },
      {
        title: "Duplex Steel Sheets",
        slug: "duplex-super-duplex-steel-sheets",
        shortDescription:
          "Duplex Steel Sheets Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "High-quality duplex steel sheets for structural and corrosion-resistant applications in demanding environments.",
        properties: [
          "Excellent strength",
          "Corrosion resistance",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Structural fabrication",
          "Chemical tanks",
          "Marine structures",
        ],
      },
      {
        title: "Duplex Steel Plates",
        slug: "duplex-super-duplex-steel-plates",
        shortDescription:
          "Duplex Steel Plates Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "Heavy-duty duplex steel plates for pressure vessels, structural fabrication, and heavy engineering applications.",
        properties: [
          "High strength",
          "Excellent corrosion resistance",
          "Impact resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Offshore platforms",
          "Structural steel",
        ],
      },
      {
        title: "Duplex Steel Wires",
        slug: "duplex-super-duplex-steel-wires",
        shortDescription:
          "Duplex Steel Wires Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "Premium duplex steel wires for welding, fasteners, and specialized industrial applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Springs"],
      },
      {
        title: "Duplex Steel Coils",
        slug: "duplex-super-duplex-steel-coils",
        shortDescription:
          "Duplex Steel Coils Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "High-quality duplex steel coils for continuous processing, forming, and structural applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Strength",
        ],
        applications: ["Stamping", "Forming", "Structural components"],
      },
      {
        title: "Duplex Steel Pipes",
        slug: "duplex-super-duplex-steel-pipes",
        shortDescription:
          "Duplex Steel Pipes Supplier – 2205, 2507, S31803, S32205 & More",
        description:
          "Seamless and welded duplex steel pipes for fluid transport, structural, and industrial applications.",
        properties: [
          "High pressure resistance",
          "Excellent corrosion resistance",
          "Good weldability",
          "Strength",
        ],
        applications: ["Oil and gas", "Chemical processing", "Fluid transport"],
      },
    ]),
  },
  {
    name: "Nickel Alloy",
    slug: "nickel-alloy",

    icon: FlaskConical,
    description:
      "High-performance nickel-based alloys for extreme temperature and corrosive service.",
    overview:
      "Engineered for thermal stability and resistance to harsh reducing and oxidizing chemistries.",
    highlight: [
      "High temperature strength",
      "Excellent chemical resistance",
      "Stable under thermal cycling",
    ],
    items: buildItemsWithImages([
      {
        title: "Nickel Alloy Tubes",
        slug: "nickel-alloy-200-201-tubes",
        shortDescription:
          "Nickel Alloy Tubes Supplier – 200, 201, 600, 625 & More",
        description:
          "Premium nickel alloy tubes for heat exchangers, instrumentation, and high-temperature applications.",
        properties: [
          "Excellent corrosion resistance",
          "High temperature strength",
          "Good weldability",
          "Thermal stability",
        ],
        applications: ["Heat exchangers", "Instrumentation", "Chemical plants"],
      },
      {
        title: "Nickel Alloy Round Bars",
        slug: "nickel-alloy-200-201-round-bars",
        shortDescription:
          "Nickel Alloy Round Bars Supplier – 200, 201, 600, 625 & More",
        description:
          "Precision nickel alloy round bars for high-strength applications in demanding environments.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good machinability",
          "Temperature resistance",
        ],
        applications: ["Fasteners", "Shafts", "Valve components"],
      },
      {
        title: "Nickel Alloy Sheets",
        slug: "nickel-alloy-200-201-sheets",
        shortDescription:
          "Nickel Alloy Sheets Supplier – 200, 201, 600, 625 & More",
        description:
          "High-quality nickel alloy sheets for chemical processing, aerospace, and industrial applications.",
        properties: [
          "Excellent corrosion resistance",
          "High temperature stability",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Chemical processing",
          "Aerospace components",
          "Industrial fabrication",
        ],
      },
      {
        title: "Nickel Alloy Plates",
        slug: "nickel-alloy-200-201-plates",
        shortDescription:
          "Nickel Alloy Plates Supplier – 200, 201, 600, 625 & More",
        description:
          "Heavy-duty nickel alloy plates for pressure vessels, heat exchangers, and structural applications.",
        properties: [
          "High strength",
          "Corrosion resistance",
          "Temperature resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Heat exchangers",
          "Structural steel",
        ],
      },
      {
        title: "Nickel Alloy Wires",
        slug: "nickel-alloy-200-201-wires",
        shortDescription:
          "Nickel Alloy Wires Supplier – 200, 201, 600, 625 & More",
        description:
          "Premium nickel alloy wires for welding, fasteners, and specialized industrial applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Springs"],
      },
      {
        title: "Nickel Alloy Coils",
        slug: "nickel-alloy-200-201-coils",
        shortDescription:
          "Nickel Alloy Coils Supplier – 200, 201, 600, 625 & More",
        description:
          "High-quality nickel alloy coils for continuous processing and forming applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Strength",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
      {
        title: "Nickel Alloy Pipes",
        slug: "nickel-alloy-200-201-pipes",
        shortDescription:
          "Nickel Alloy Pipes Supplier – 200, 201, 600, 625 & More",
        description:
          "Seamless and welded nickel alloy pipes for fluid transport, structural, and industrial applications.",
        properties: [
          "High pressure resistance",
          "Corrosion resistance",
          "Temperature resistance",
          "Weldability",
        ],
        applications: ["Chemical processing", "Fluid transport", "Oil and gas"],
      },
    ]),
  },
  {
    name: "Copper Nickel",
    slug: "copper-nickel",

    icon: Waves,
    description:
      "Copper-nickel alloys prized for seawater corrosion resistance in marine and offshore applications.",
    overview:
      "Preferred for marine service where saltwater resistance and ease of fabrication matter.",
    highlight: [
      "Seawater compatibility",
      "Low marine growth",
      "Good thermal transfer",
    ],
    items: buildItemsWithImages([
      {
        title: "Copper Nickel Tubes",
        slug: "copper-nickel-tubes",
        shortDescription: "Copper Nickel Tubes Supplier – 90/10, 70/30 & More",
        description:
          "Premium copper nickel tubes for marine heat exchangers, condensers, and seawater applications.",
        properties: [
          "Excellent seawater resistance",
          "Good thermal conductivity",
          "Anti-fouling properties",
          "Durability",
        ],
        applications: [
          "Marine heat exchangers",
          "Condensers",
          "Seawater piping",
        ],
      },
      {
        title: "Copper Nickel Pipes",
        slug: "copper-nickel-pipes",
        shortDescription: "Copper Nickel Pipes Supplier – 90/10, 70/30 & More",
        description:
          "Seamless and welded copper nickel pipes for marine and offshore applications.",
        properties: [
          "Seawater resistance",
          "Good mechanical properties",
          "Weldability",
          "Corrosion resistance",
        ],
        applications: ["Marine piping", "Offshore platforms", "Shipbuilding"],
      },
      {
        title: "Copper Nickel Sheets",
        slug: "copper-nickel-sheets",
        shortDescription: "Copper Nickel Sheets Supplier – 90/10, 70/30 & More",
        description:
          "High-quality copper nickel sheets for marine and industrial applications.",
        properties: [
          "Corrosion resistance",
          "Good formability",
          "Thermal conductivity",
          "Durability",
        ],
        applications: [
          "Marine fabrication",
          "Heat exchangers",
          "Industrial equipment",
        ],
      },
      {
        title: "Copper Nickel Plates",
        slug: "copper-nickel-plates",
        shortDescription: "Copper Nickel Plates Supplier – 90/10, 70/30 & More",
        description:
          "Heavy-duty copper nickel plates for marine and offshore applications.",
        properties: [
          "Seawater resistance",
          "High strength",
          "Good weldability",
          "Thermal conductivity",
        ],
        applications: [
          "Offshore platforms",
          "Marine equipment",
          "Shipbuilding",
        ],
      },
      {
        title: "Copper Nickel Round Bars",
        slug: "copper-nickel-round-bars",
        shortDescription:
          "Copper Nickel Round Bars Supplier – 90/10, 70/30 & More",
        description:
          "Precision copper nickel round bars for marine and industrial applications.",
        properties: [
          "Corrosion resistance",
          "Good machinability",
          "Strength",
          "Durability",
        ],
        applications: ["Shafts", "Fasteners", "Marine components"],
      },
      {
        title: "Copper Nickel Coils",
        slug: "copper-nickel-coils",
        shortDescription: "Copper Nickel Coils Supplier – 90/10, 70/30 & More",
        description:
          "High-quality copper nickel coils for continuous processing and forming.",
        properties: [
          "Corrosion resistance",
          "Good formability",
          "Uniform thickness",
          "Thermal conductivity",
        ],
        applications: ["Stamping", "Forming", "Marine components"],
      },
    ]),
  },
  {
    name: "Hastelloy",
    slug: "hastelloy",

    icon: Settings,
    description:
      "Nickel-molybdenum-chromium alloys engineered for severe chemical processing environments.",
    overview:
      "Built for aggressive chemical processes where conventional alloys fail.",
    highlight: [
      "Superior chloride resistance",
      "Excellent resistance to oxidizers",
      "Long service life",
    ],
    items: buildItemsWithImages([
      {
        title: "Hastelloy Tubes",
        slug: "hastelloy-tubes",
        shortDescription: "Hastelloy Tubes Supplier – C276, C22, B2, B3 & More",
        description:
          "Premium Hastelloy tubes for chemical processing, pollution control, and high-temperature applications.",
        properties: [
          "Outstanding corrosion resistance",
          "High temperature strength",
          "Good weldability",
          "Chemical resistance",
        ],
        applications: [
          "Chemical processing",
          "Pollution control",
          "Heat exchangers",
        ],
      },
      {
        title: "Hastelloy Pipes",
        slug: "hastelloy-pipes",
        shortDescription: "Hastelloy Pipes Supplier – C276, C22, B2, B3 & More",
        description:
          "Seamless and welded Hastelloy pipes for aggressive chemical and high-temperature service.",
        properties: [
          "Corrosion resistance",
          "High temperature strength",
          "Pressure resistance",
          "Weldability",
        ],
        applications: ["Chemical plants", "Petrochemical", "Pollution control"],
      },
      {
        title: "Hastelloy Round Bars",
        slug: "hastelloy-round-bars",
        shortDescription:
          "Hastelloy Round Bars Supplier – C276, C22, B2, B3 & More",
        description:
          "Precision Hastelloy round bars for high-performance applications in corrosive environments.",
        properties: [
          "High strength",
          "Corrosion resistance",
          "Good machinability",
          "Temperature resistance",
        ],
        applications: ["Fasteners", "Shafts", "Valve components"],
      },
      {
        title: "Hastelloy Sheets",
        slug: "hastelloy-sheets",
        shortDescription:
          "Hastelloy Sheets Supplier – C276, C22, B2, B3 & More",
        description:
          "High-quality Hastelloy sheets for chemical processing and corrosion-resistant applications.",
        properties: [
          "Excellent corrosion resistance",
          "High temperature stability",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Chemical tanks",
          "Process equipment",
          "Industrial fabrication",
        ],
      },
      {
        title: "Hastelloy Plates",
        slug: "hastelloy-plates",
        shortDescription:
          "Hastelloy Plates Supplier – C276, C22, B2, B3 & More",
        description:
          "Heavy-duty Hastelloy plates for pressure vessels, heat exchangers, and structural applications.",
        properties: [
          "High strength",
          "Corrosion resistance",
          "Temperature resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Heat exchangers",
          "Chemical reactors",
        ],
      },
      {
        title: "Hastelloy Wires",
        slug: "hastelloy-wires",
        shortDescription: "Hastelloy Wires Supplier – C276, C22, B2, B3 & More",
        description:
          "Premium Hastelloy wires for welding and specialized industrial applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: [
          "Welding electrodes",
          "Fasteners",
          "Specialized hardware",
        ],
      },
      {
        title: "Hastelloy Coils",
        slug: "hastelloy-coils",
        shortDescription: "Hastelloy Coils Supplier – C276, C22, B2, B3 & More",
        description:
          "High-quality Hastelloy coils for continuous processing and forming applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Strength",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
    ]),
  },
  {
    name: "Incoloy",
    slug: "incoloy",
    icon: Layers,

    description:
      "Iron-nickel-chromium alloys offering strong resistance to oxidation and carburization at high temperatures.",
    overview:
      "A dependable choice for high-temperature service and thermal processing equipment.",
    highlight: [
      "Oxidation resistance",
      "Carburization resistance",
      "Thermal stability",
    ],
    items: buildItemsWithImages([
      {
        title: "Incoloy Tubes",
        slug: "incoloy-tubes",
        shortDescription:
          "Incoloy Tubes Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "Premium Incoloy tubes for heat exchangers, furnace components, and high-temperature applications.",
        properties: [
          "High temperature strength",
          "Oxidation resistance",
          "Good weldability",
          "Creep strength",
        ],
        applications: [
          "Heat exchangers",
          "Furnace components",
          "Petrochemical",
        ],
      },
      {
        title: "Incoloy Pipes",
        slug: "incoloy-pipes",
        shortDescription:
          "Incoloy Pipes Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "Seamless and welded Incoloy pipes for high-temperature and corrosive service.",
        properties: [
          "Temperature resistance",
          "Corrosion resistance",
          "Pressure resistance",
          "Weldability",
        ],
        applications: ["Petrochemical", "Power plants", "Process piping"],
      },
      {
        title: "Incoloy Round Bars",
        slug: "incoloy-round-bars",
        shortDescription:
          "Incoloy Round Bars Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "Precision Incoloy round bars for high-temperature and corrosion-resistant applications.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good machinability",
          "Corrosion resistance",
        ],
        applications: ["Fasteners", "Shafts", "Valve components"],
      },
      {
        title: "Incoloy Sheets",
        slug: "incoloy-sheets",
        shortDescription:
          "Incoloy Sheets Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "High-quality Incoloy sheets for thermal processing and high-temperature applications.",
        properties: [
          "Oxidation resistance",
          "High temperature stability",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Furnace components",
          "Thermal processing",
          "Industrial fabrication",
        ],
      },
      {
        title: "Incoloy Plates",
        slug: "incoloy-plates",
        shortDescription:
          "Incoloy Plates Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "Heavy-duty Incoloy plates for pressure vessels, heat exchangers, and high-temperature applications.",
        properties: [
          "High strength",
          "Temperature resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Heat exchangers",
          "Furnace components",
        ],
      },
      {
        title: "Incoloy Wires",
        slug: "incoloy-wires",
        shortDescription:
          "Incoloy Wires Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "Premium Incoloy wires for welding and specialized high-temperature applications.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Springs"],
      },
      {
        title: "Incoloy Coils",
        slug: "incoloy-coils",
        shortDescription:
          "Incoloy Coils Supplier – 800, 800H, 800HT, 825 & More",
        description:
          "High-quality Incoloy coils for continuous processing and forming.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Temperature resistance",
          "Corrosion resistance",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
    ]),
  },
  {
    name: "Inconel",
    slug: "inconel",

    icon: CircleDot,
    description:
      "Nickel-chromium superalloys built for extreme heat, pressure, and corrosive service in aerospace and energy.",
    overview:
      "Ideal for turbine, exhaust, and high-stress industrial applications.",
    highlight: [
      "Exceptional heat resistance",
      "Excellent creep strength",
      "Reliable under pressure",
    ],
    items: buildItemsWithImages([
      {
        title: "Inconel Tubes",
        slug: "inconel-tubes",
        shortDescription:
          "Inconel Tubes Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "Premium Inconel tubes for aerospace, chemical processing, and high-temperature applications.",
        properties: [
          "High temperature strength",
          "Oxidation resistance",
          "Good weldability",
          "Creep strength",
        ],
        applications: [
          "Aerospace",
          "Chemical processing",
          "Furnace components",
        ],
      },
      {
        title: "Inconel Pipes",
        slug: "inconel-pipes",
        shortDescription:
          "Inconel Pipes Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "Seamless and welded Inconel pipes for extreme temperature and pressure applications.",
        properties: [
          "Temperature resistance",
          "Pressure resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: ["Aerospace", "Power generation", "Chemical processing"],
      },
      {
        title: "Inconel Round Bars",
        slug: "inconel-round-bars",
        shortDescription:
          "Inconel Round Bars Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "Precision Inconel round bars for high-performance applications in extreme environments.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good machinability",
          "Corrosion resistance",
        ],
        applications: ["Fasteners", "Shafts", "Aerospace components"],
      },
      {
        title: "Inconel Sheets",
        slug: "inconel-sheets",
        shortDescription:
          "Inconel Sheets Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "High-quality Inconel sheets for extreme temperature and corrosive applications.",
        properties: [
          "High temperature stability",
          "Oxidation resistance",
          "Good formability",
          "Weldability",
        ],
        applications: ["Aerospace", "Heat treatment", "Industrial fabrication"],
      },
      {
        title: "Inconel Plates",
        slug: "inconel-plates",
        shortDescription:
          "Inconel Plates Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "Heavy-duty Inconel plates for pressure vessels, turbines, and high-temperature applications.",
        properties: [
          "High strength",
          "Temperature resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: ["Pressure vessels", "Turbines", "Heat exchangers"],
      },
      {
        title: "Inconel Wires",
        slug: "inconel-wires",
        shortDescription:
          "Inconel Wires Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "Premium Inconel wires for welding and specialized high-temperature applications.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Springs"],
      },
      {
        title: "Inconel Coils",
        slug: "inconel-coils",
        shortDescription:
          "Inconel Coils Supplier – 600, 601, 625, 718, X-750 & More",
        description:
          "High-quality Inconel coils for continuous processing and forming.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Temperature resistance",
          "Corrosion resistance",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
    ]),
  },
  {
    name: "Monel",
    slug: "monel",

    icon: Box,
    description:
      "Nickel-copper alloys with excellent resistance to seawater and hydrofluoric acid environments.",
    overview:
      "A dependable nickel-copper solution for marine and acid handling applications.",
    highlight: [
      "Excellent seawater resistance",
      "Good ductility",
      "Strong acid resistance",
    ],
    items: buildItemsWithImages([
      {
        title: "Monel Tubes",
        slug: "monel-400-tubes",
        shortDescription: "Monel Tubes Supplier – 400, K500 & More",
        description:
          "Premium Monel tubes for marine, chemical, and heat exchanger applications.",
        properties: [
          "Seawater resistance",
          "Corrosion resistance",
          "Good weldability",
          "Strength",
        ],
        applications: [
          "Marine heat exchangers",
          "Condensers",
          "Chemical plants",
        ],
      },
      {
        title: "Monel Pipes",
        slug: "monel-400-pipes",
        shortDescription: "Monel Pipes Supplier – 400, K500 & More",
        description:
          "Seamless and welded Monel pipes for marine and chemical applications.",
        properties: [
          "Seawater resistance",
          "Pressure resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: ["Marine piping", "Chemical processing", "Oil and gas"],
      },
      {
        title: "Monel Round Bars",
        slug: "monel-round-bars",
        shortDescription: "Monel Round Bars Supplier – 400, K500 & More",
        description:
          "Precision Monel round bars for marine and chemical applications.",
        properties: [
          "High strength",
          "Corrosion resistance",
          "Good machinability",
          "Seawater resistance",
        ],
        applications: ["Shafts", "Fasteners", "Pump components"],
      },
      {
        title: "Monel Sheets",
        slug: "monel-400-sheets",
        shortDescription: "Monel Sheets Supplier – 400, K500 & More",
        description:
          "High-quality Monel sheets for marine and chemical applications.",
        properties: [
          "Corrosion resistance",
          "Seawater resistance",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Marine fabrication",
          "Chemical tanks",
          "Industrial equipment",
        ],
      },
      {
        title: "Monel Plates",
        slug: "monel-400-plates",
        shortDescription: "Monel Plates Supplier – 400, K500 & More",
        description:
          "Heavy-duty Monel plates for marine, offshore, and chemical applications.",
        properties: [
          "Seawater resistance",
          "High strength",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: [
          "Offshore platforms",
          "Marine equipment",
          "Chemical plants",
        ],
      },
      {
        title: "Monel Wires",
        slug: "monel-wires",
        shortDescription: "Monel Wires Supplier – 400, K500 & More",
        description:
          "Premium Monel wires for welding and specialized marine applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Marine hardware"],
      },
      {
        title: "Monel Coils",
        slug: "monel-400-coils",
        shortDescription: "Monel Coils Supplier – 400, K500 & More",
        description:
          "High-quality Monel coils for continuous processing and forming.",
        properties: [
          "Corrosion resistance",
          "Good formability",
          "Uniform thickness",
          "Strength",
        ],
        applications: ["Stamping", "Forming", "Marine components"],
      },
    ]),
  },
  {
    name: "Titanium",
    slug: "titanium",

    icon: Sparkles,
    description:
      "Lightweight, high-strength titanium grades with outstanding corrosion resistance for aerospace and marine use.",
    overview:
      "Strong, lightweight, and highly corrosion resistant for critical performance needs.",
    highlight: [
      "High strength-to-weight ratio",
      "Excellent corrosion resistance",
      "Biocompatible",
    ],
    items: buildItemsWithImages([
      {
        title: "Titanium Tubes",
        slug: "titanium-tubes-grade-2-grade-5",
        shortDescription: "Titanium Tubes Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "Premium titanium tubes for aerospace, marine, and heat exchanger applications.",
        properties: [
          "Lightweight",
          "Corrosion resistance",
          "High strength-to-weight ratio",
          "Good weldability",
        ],
        applications: ["Aerospace", "Marine equipment", "Heat exchangers"],
      },
      {
        title: "Titanium Pipes",
        slug: "titanium-pipes",
        shortDescription: "Titanium Pipes Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "Seamless and welded titanium pipes for aerospace, marine, and chemical applications.",
        properties: [
          "High strength-to-weight ratio",
          "Corrosion resistance",
          "Pressure resistance",
          "Weldability",
        ],
        applications: ["Aerospace", "Marine piping", "Chemical processing"],
      },
      {
        title: "Titanium Round Bars",
        slug: "titanium-round-bars",
        shortDescription:
          "Titanium Round Bars Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "Precision titanium round bars for aerospace, marine, and medical applications.",
        properties: [
          "High strength",
          "Lightweight",
          "Corrosion resistance",
          "Good machinability",
        ],
        applications: ["Aerospace components", "Medical devices", "Fasteners"],
      },
      {
        title: "Titanium Sheets",
        slug: "titanium-sheets",
        shortDescription: "Titanium Sheets Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "High-quality titanium sheets for aerospace, marine, and industrial applications.",
        properties: [
          "Lightweight",
          "Corrosion resistance",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Aerospace",
          "Marine fabrication",
          "Industrial equipment",
        ],
      },
      {
        title: "Titanium Plates",
        slug: "titanium-plates-grade-2-grade-5",
        shortDescription: "Titanium Plates Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "Heavy-duty titanium plates for aerospace, marine, and structural applications.",
        properties: [
          "High strength-to-weight ratio",
          "Corrosion resistance",
          "Temperature resistance",
          "Weldability",
        ],
        applications: ["Aerospace", "Offshore platforms", "Marine equipment"],
      },
      {
        title: "Titanium Wires",
        slug: "titanium-wires",
        shortDescription: "Titanium Wires Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "Premium titanium wires for welding and specialized aerospace applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Lightweight",
          "Good ductility",
        ],
        applications: [
          "Welding electrodes",
          "Aerospace hardware",
          "Medical devices",
        ],
      },
      {
        title: "Titanium Coils",
        slug: "titanium-coils",
        shortDescription: "Titanium Coils Supplier – Grade 1, 2, 5, 7 & More",
        description:
          "High-quality titanium coils for continuous processing and forming.",
        properties: [
          "Lightweight",
          "Corrosion resistance",
          "Good formability",
          "Uniform thickness",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
    ]),
  },
  {
    name: "Sanicro",
    slug: "sanicro",

    icon: ShieldCheck,
    description:
      "Specialty austenitic stainless steels engineered for demanding sulfuric and phosphoric acid service.",
    overview:
      "A premium stainless option for demanding acid service and process equipment.",
    highlight: [
      "Excellent acid resistance",
      "High process reliability",
      "Strong weldability",
    ],
    items: buildItemsWithImages([
      {
        title: "Alloy 28 Tubes",
        slug: "alloy-28-tubes",
        shortDescription: "Alloy 28 Tubes Supplier – High-Alloy Stainless",
        description:
          "Premium Alloy 28 (Sanicro 28) tubes for heat exchangers, condensers, and high-temperature acid service applications.",
        properties: [
          "Excellent acid resistance",
          "High strength",
          "Good weldability",
          "Corrosion resistance",
        ],
        applications: ["Heat exchangers", "Condensers", "Chemical processing"],
      },
      {
        title: "Alloy 28 Round Bars",
        slug: "alloy-28-round-bars",
        shortDescription: "Alloy 28 Round Bars Supplier – High-Alloy Stainless",
        description:
          "High-quality Alloy 28 (Sanicro 28) round bars for fasteners, shafts, and structural components in corrosive environments.",
        properties: [
          "High tensile strength",
          "Excellent corrosion resistance",
          "Good machinability",
          "Dimensional accuracy",
        ],
        applications: ["Fasteners", "Shafts", "Valve components"],
      },
      {
        title: "Alloy 28 Sheets",
        slug: "alloy-28-sheets",
        shortDescription: "Alloy 28 Sheets Supplier – High-Alloy Stainless",
        description:
          "Premium Alloy 28 (Sanicro 28) sheets for industrial fabrication, acid plants, and chemical processing equipment.",
        properties: [
          "Excellent acid resistance",
          "Good formability",
          "Superior surface finish",
          "Weldability",
        ],
        applications: [
          "Industrial fabrication",
          "Acid plants",
          "Chemical equipment",
        ],
      },
      {
        title: "Alloy 28 Plates",
        slug: "alloy-28-plates",
        shortDescription: "Alloy 28 Plates Supplier – High-Alloy Stainless",
        description:
          "Heavy-duty Alloy 28 (Sanicro 28) plates for pressure vessels, chemical reactors, and structural applications.",
        properties: [
          "High strength",
          "Excellent acid resistance",
          "Impact resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Chemical reactors",
          "Structural fabrication",
        ],
      },
      {
        title: "Alloy 28 Wires",
        slug: "alloy-28-wires",
        shortDescription: "Alloy 28 Wires Supplier – High-Alloy Stainless",
        description:
          "Premium Alloy 28 (Sanicro 28) wires for welding, fasteners, and specialized industrial applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: ["Welding electrodes", "Fasteners", "Springs"],
      },
      {
        title: "Alloy 28 Coils",
        slug: "alloy-28-coils",
        shortDescription: "Alloy 28 Coils Supplier – High-Alloy Stainless",
        description:
          "High-quality Alloy 28 (Sanicro 28) coils for continuous processing, forming, and industrial applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Strength",
        ],
        applications: ["Stamping", "Forming", "Industrial components"],
      },
      {
        title: "Alloy 28 Pipes",
        slug: "alloy-28-pipes",
        shortDescription: "Alloy 28 Pipes Supplier – High-Alloy Stainless",
        description:
          "Seamless and welded Alloy 28 (Sanicro 28) pipes for fluid transport, structural, and industrial applications.",
        properties: [
          "High pressure resistance",
          "Excellent corrosion resistance",
          "Good weldability",
          "Temperature resistance",
        ],
        applications: ["Acid plants", "Chemical processing", "Fluid transport"],
      },
    ]),
  },
  {
    name: "Special Materials",
    slug: "special-materials",

    icon: Settings,
    description:
      "Custom and specialty alloy grades sourced for unique project specifications and critical applications.",
    overview:
      "Tailored solutions for niche industrial and engineering challenges.",
    highlight: [
      "Custom sourcing",
      "Application-specific grades",
      "Project engineering support",
    ],
     items: buildItemsWithImages([
      {
        title: "Special Alloy Tubes",
        slug: "special-alloy-tubes-smo-254-alloy-20",
        shortDescription:
          "Special Alloy Tubes Supplier – SMO 254 (F44) & Alloy 20",
        description:
          "Premium special alloy tubes in SMO 254 (F44) and Alloy 20 grades for heat exchangers, instrumentation, and high-temperature applications.",
        properties: [
          "Excellent corrosion resistance",
          "High strength",
          "Good weldability",
          "Temperature resistance",
        ],
        applications: [
          "Heat exchangers",
          "Instrumentation",
          "Chemical processing",
          "High-temperature applications",
        ],
      },
      {
        title: "Special Alloy Round Bars",
        slug: "special-alloy-round-bars-smo-254-alloy-20",
        shortDescription:
          "Special Alloy Round Bars Supplier – SMO 254 & Alloy 20",
        description:
          "Precision-engineered special alloy round bars in SMO 254 (F44) and Alloy 20 grades for machining, fabrication, and structural applications.",
        properties: [
          "High tensile strength",
          "Excellent corrosion resistance",
          "Good machinability",
          "Dimensional accuracy",
        ],
        applications: ["Machining", "Fabrication", "Fasteners", "Shafts"],
      },
      {
        title: "Special Alloy Sheets",
        slug: "special-alloy-sheets-smo-254-alloy-20",
        shortDescription:
          "Special Alloy Sheets Supplier – SMO 254 (F44) & Alloy 20",
        description:
          "High-quality special alloy sheets in SMO 254 (F44) and Alloy 20 grades for industrial fabrication, chemical processing, and corrosion-resistant applications.",
        properties: [
          "Excellent corrosion resistance",
          "Good formability",
          "Superior surface finish",
          "Weldability",
        ],
        applications: [
          "Industrial fabrication",
          "Chemical processing",
          "Food processing equipment",
          "Tanks and vessels",
        ],
      },
      {
        title: "Special Alloy Plates",
        slug: "special-alloy-plates-smo-254-alloy-20",
        shortDescription:
          "Special Alloy Plates Supplier – SMO 254 (F44) & Alloy 20",
        description:
          "Heavy-duty special alloy plates in SMO 254 (F44) and Alloy 20 grades for pressure vessels, structural fabrication, and heavy engineering.",
        properties: [
          "High strength",
          "Excellent impact resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Structural fabrication",
          "Heavy engineering",
          "Chemical plants",
        ],
      },
      {
        title: "Special Alloy Wires",
        slug: "special-alloy-wires",
        shortDescription:
          "Special Alloy Wires Supplier – SMO 254 (F44) & Alloy 20",
        description:
          "Premium special alloy wires in SMO 254 (F44) and Alloy 20 grades for welding, fasteners, springs, and industrial applications.",
        properties: [
          "High tensile strength",
          "Corrosion resistance",
          "Good ductility",
          "Consistent quality",
        ],
        applications: [
          "Welding electrodes",
          "Fasteners",
          "Springs",
          "Wire mesh",
        ],
      },
      {
        title: "Special Alloy Coils",
        slug: "special-alloy-coils",
        shortDescription: "Special Alloy Coils Supplier – SMO 254 & Alloy 20",
        description:
          "High-quality special alloy coils in SMO 254 (F44) and Alloy 20 grades for stamping, forming, and continuous processing applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Corrosion resistance",
          "Consistent quality",
        ],
        applications: [
          "Stamping",
          "Forming",
          "Continuous processing",
          "Automotive components",
        ],
      },
      {
        title: "SMO 254 Pipes",
        slug: "smo-254-pipes",
        shortDescription: "SMO 254 Pipes Supplier – High-Alloy Stainless",
        description:
          "Specialized SMO 254 (F44) pipes designed for high corrosion resistance, particularly in chloride-containing environments, and sulfuric acid service.",
        properties: [
          "High corrosion resistance",
          "Excellent chloride resistance",
          "Good weldability",
          "Temperature resistance",
        ],
        applications: [
          "Chemical processing",
          "Desalination plants",
          "Heat exchangers",
          "Sulfuric acid service",
        ],
      },
    ]),
  },
  {
    name: "Other Materials",
    slug: "other-materials",

    icon: Box,
    description:
      "Additional carbon steel, alloy steel, and engineering material grades available on request.",
    overview:
      "Supporting broader industrial requirements with carbon and engineering steel options.",
    highlight: [
      "Wide grade availability",
      "Cost-effective options",
      "Fast sourcing",
    ],
    items: buildItemsWithImages([
      {
        title: "High-Performance Alloy Pipes",
        slug: "high-performance-alloy-pipes",
        shortDescription:
          "High-Performance Alloy Pipes Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "Premium high-performance alloy pipes in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for extreme temperature, corrosion-resistant, and high-stress applications.",
        properties: [
          "High temperature resistance",
          "Excellent corrosion resistance",
          "High strength",
          "Good weldability",
        ],
        applications: [
          "Aerospace",
          "Power generation",
          "Chemical processing",
          "High-temperature systems",
        ],
      },
      {
        title: "High-Performance Alloy Tubes",
        slug: "high-performance-alloy-tubes",
        shortDescription:
          "High-Performance Alloy Tubes Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "Premium high-performance alloy tubes in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for heat exchangers, instrumentation, and high-temperature applications.",
        properties: [
          "High temperature strength",
          "Excellent oxidation resistance",
          "Good weldability",
          "Corrosion resistance",
        ],
        applications: [
          "Heat exchangers",
          "Instrumentation",
          "Aerospace components",
          "Chemical processing",
        ],
      },
      {
        title: "High-Performance Alloy Round Bars",
        slug: "high-performance-alloy-round-bars",
        shortDescription:
          "High-Performance Alloy Round Bars Supplier – Nimonic, Nichrome, Nitronic & Alloy",
        description:
          "Precision-engineered high-performance alloy round bars in grades including Nimonic, Nichrome, and Nitronic alloys for machining, fabrication, and structural applications.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good machinability",
          "Corrosion resistance",
        ],
        applications: [
          "Fasteners",
          "Shafts",
          "Aerospace components",
          "Valve stems",
        ],
      },
      {
        title: "High-Performance Alloy Sheets",
        slug: "high-performance-alloy-sheets",
        shortDescription:
          "High-Performance Alloy Sheets – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "High-quality high-performance alloy sheets in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for industrial fabrication, aerospace, and high-temperature applications.",
        properties: [
          "High temperature stability",
          "Excellent oxidation resistance",
          "Good formability",
          "Weldability",
        ],
        applications: [
          "Aerospace",
          "Heat treatment",
          "Industrial fabrication",
          "Chemical processing",
        ],
      },
      {
        title: "High-Performance Alloy Plates",
        slug: "high-performance-alloy-plates",
        shortDescription:
          "High-Performance Alloy Plates – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "Heavy-duty high-performance alloy plates in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for pressure vessels, structural applications, and high-temperature environments.",
        properties: [
          "High strength",
          "Temperature resistance",
          "Corrosion resistance",
          "Weldability",
        ],
        applications: [
          "Pressure vessels",
          "Turbines",
          "Heat exchangers",
          "Structural steel",
        ],
      },
      {
        title: "High-Performance Alloy Wires",
        slug: "high-performance-alloy-wires",
        shortDescription:
          "High-Performance Alloy Wires Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "Premium high-performance alloy wires in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for welding, fasteners, and specialized high-temperature applications.",
        properties: [
          "High tensile strength",
          "Temperature resistance",
          "Good ductility",
          "Corrosion resistance",
        ],
        applications: [
          "Welding electrodes",
          "Fasteners",
          "Springs",
          "Heating elements",
        ],
      },
      {
        title: "High-Performance Alloy Coils",
        slug: "high-performance-alloy-coils",
        shortDescription:
          "High-Performance Alloy Coils Supplier – Nimonic, Nichrome, Nitronic, Nilo & Alloy",
        description:
          "High-quality high-performance alloy coils in grades including Nimonic, Nichrome, Nitronic, and Nilo alloys for continuous processing, forming, and industrial applications.",
        properties: [
          "Excellent formability",
          "Uniform thickness",
          "Temperature resistance",
          "Corrosion resistance",
        ],
        applications: [
          "Stamping",
          "Forming",
          "Industrial components",
          "Automotive",
        ],
      },
    ]),
  },
];

export default materials;

