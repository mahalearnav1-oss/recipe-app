export const recipes = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    image: "/assets/stock-photo-pizza-margherita-656144104.webp",
    calories: 250,
    priceINR: 250,
    category: "Italian",
    description: "A classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Fresh basil", "Olive oil"],
    dietary: ["Vegetarian"],
    nutrition: { protein: 9, carbs: 30, fat: 8 }
  },
  {
    id: 2,
    name: "Chicken Biryani",
    image: "/assets/delicious-chicken-biryani-top-view-biryani-rice-dish-beautiful-indian-rice-dish-delicious-spicy-chicken-biryani-bowl-over-moody-195809549.webp",
    calories: 450,
    priceINR: 350,
    category: "Indian",
    description: "Fragrant basmati rice cooked with spiced chicken and herbs.",
    ingredients: ["Basmati rice", "Chicken", "Yogurt", "Spices", "Herbs"],
    dietary: ["Non-Vegetarian"],
    nutrition: { protein: 18, carbs: 55, fat: 15 }
  },
  {
    id: 3,
    name: "Chocolate Brownie",
    image: "/assets/dark-chocolate-stout-brownies-cut-in-squares.webp",
    calories: 320,
    priceINR: 120,
    category: "Dessert",
    description: "Rich, fudgy chocolate brownie with a crisp top.",
    ingredients: ["Dark chocolate", "Butter", "Sugar", "Eggs", "Flour"],
    dietary: ["Vegetarian"],
    nutrition: { protein: 4, carbs: 40, fat: 15 }
  },
  {
    id: 4,
    name: "Avocado Toast",
    image: "/assets/toasts-with-avocado-on-plate-healthy-nutrition-photo.webp",
    calories: 280,
    priceINR: 180,
    category: "Breakfast",
    description: "Toasted sourdough topped with smashed avocado, lemon, and chili flakes.",
    ingredients: ["Sourdough bread", "Avocado", "Lemon", "Chili flakes", "Olive oil"],
    dietary: ["Vegan", "Vegetarian"],
    nutrition: { protein: 5, carbs: 30, fat: 12 }
  },
  {
    id: 5,
    name: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHN1c2hpfGVufDB8fHx8MTY3MDY4MjQ0NQ..&ixlib=rb-1.2.1&q=80&w=400",
    calories: 350,
    priceINR: 500,
    category: "Japanese",
    description: "Assorted sushi rolls with fresh fish and vegetables.",
    ingredients: ["Sushi rice", "Nori", "Fresh fish", "Vegetables", "Soy sauce"],
    dietary: ["Non-Vegetarian", "Gluten-Free"],
    nutrition: { protein: 12, carbs: 45, fat: 8 }
  },
  {
    id: 6,
    name: "Vanilla Ice Cream",
    image: "/assets/360_F_1785052172_kgrD4sz5xuHacJA2RO98FkGlgdcXsHyr.webp",
    calories: 200,
    priceINR: 120,
    category: "Dessert",
    description: "Creamy vanilla ice cream made with real vanilla beans.",
    ingredients: ["Milk", "Sugar", "Cream", "Vanilla bean", "Egg yolks"],
    dietary: ["Vegetarian"],
    nutrition: { protein: 3, carbs: 25, fat: 10 }
  },
  {
    id: 7,
    name: "Strawberry Sorbet",
    image: "/assets/strawberry-mint-sorbet-tub-overhead.webp",
    calories: 130,
    priceINR: 100,
    category: "Dessert",
    description: "Refreshing strawberry sorbet, dairy-free and low in calories.",
    ingredients: ["Strawberries", "Water", "Sugar", "Lemon juice"],
    dietary: ["Vegan", "Gluten-Free"],
    nutrition: { protein: 1, carbs: 30, fat: 0 }
  }
];