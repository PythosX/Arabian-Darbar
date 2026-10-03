// Replace or extend these entries with the exact readable items/prices from the supplied menu photographs.
// No price is invented here when a verified source is not available.
export const menu = [
  {
    category: "Mandi",
    items: [
      { name: "Chicken Saudi Mandi", price: "₹520", image: "/assets/food/chicken-mandi.jpg", vegetarian: false },
      { name: "Chicken Turkish Mandi", price: "₹590", image: "/assets/food/turkish-mandi.jpg", vegetarian: false },
      { name: "Mutton Saudi Arabian Mandi", price: "₹780", image: "/assets/food/mutton-mandi.jpg", vegetarian: false },
      { name: "Mutton Turkish Mandi", price: "₹850", image: "/assets/food/turkish-mandi.jpg", vegetarian: false }
    ]
  },
  {
    category: "Signature",
    items: [
      { name: "Mutton Korma", price: "Price unavailable", image: "/assets/food/mutton-korma.jpg", vegetarian: false },
      { name: "Lazeez Tandoori Chicken", price: "Price unavailable", image: "/assets/food/tandoori-chicken.jpg", vegetarian: false },
      { name: "Lebanese Roasted Chicken", price: "Price unavailable", image: "/assets/food/lebanese-chicken.jpg", vegetarian: false },
      { name: "Lazeez Butter Tossed Raan", price: "Price unavailable", image: "/assets/food/raan.jpg", vegetarian: false }
    ]
  },
  {
    category: "Desserts",
    items: [
      { name: "Kunafa / Kanafeh", price: "Price unavailable", image: "/assets/food/kunafa.jpg", vegetarian: true },
      { name: "Omali", price: "Price unavailable", image: "/assets/food/omali.jpg", vegetarian: true }
    ]
  },
  {
    category: "Breads",
    items: [
      { name: "Tabi Naan", price: "Price unavailable", image: "/assets/food/tabi-naan.jpg", vegetarian: true }
    ]
  }
];

export const categories = ["All", ...menu.map(section => section.category)];
