export type RecipeStep = {
  title: string;
  text: string;
};

export type Recipe = {
  id: string;
  title: string;
  subtitle: string;
  mins: number;
  cals: number;
  protein: number;
  carbs: number;
  fibre: number;
  fat: number;
  accentColor: string;
  lightAccent: string;
  emoji: string;
  ingredients: string[];
  steps: RecipeStep[];
  tip: string;
};

export type ShoppingItem = {
  name: string;
  size: string;
  meals: string[];
};

export type ShoppingList = {
  SHOPPING_FRESH: ShoppingItem[];
  SHOPPING_PANTRY: ShoppingItem[];
};

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Harissa Chicken & Smoky Chickpeas',
    subtitle: 'One pan · 35 min · Spicy',
    mins: 35,
    cals: 530,
    protein: 48,
    carbs: 24,
    fibre: 12,
    fat: 22,
    accentColor: '#D94F2E',
    lightAccent: '#FF6B4A',
    emoji: '🍗',
    ingredients: [
      '4 boneless skinless chicken thighs',
      '400g tin chickpeas, drained',
      '125g cherry tomatoes',
      '2 tbsp harissa paste',
      '100g baby spinach',
    ],
    steps: [
      { title: 'Marinate', text: 'Season chicken thighs with salt, pepper and 1 tbsp harissa.' },
      {
        title: 'Sear the chicken',
        text: 'Heat oil in a large frying pan over medium-high. Cook chicken 6-7 mins until deeply golden. Remove.',
      },
      {
        title: 'Simmer',
        text: 'Add chickpeas and tomatoes to the pan. Return chicken, cover and simmer for 15 mins.',
      },
    ],
    tip: 'Swap the chicken for halloumi if you want a vegetarian option.',
  },
  {
    id: '2',
    title: 'Green Goddess Pasta',
    subtitle: 'Quick · 20 min · High Fibre',
    mins: 20,
    cals: 450,
    protein: 18,
    carbs: 65,
    fibre: 14,
    fat: 15,
    accentColor: '#2E8B57',
    lightAccent: '#3CB371',
    emoji: '🍝',
    ingredients: [
      '200g wholewheat pasta',
      '100g baby spinach',
      '1 courgette, grated',
      '2 cloves garlic',
      '50g parmesan',
    ],
    steps: [
      { title: 'Boil Pasta', text: 'Cook pasta in heavily salted boiling water until al dente.' },
      {
        title: 'Blend Sauce',
        text: 'Blend spinach, garlic, parmesan, and a splash of pasta water until smooth.',
      },
      {
        title: 'Combine',
        text: 'Toss pasta and grated courgette in the green sauce over low heat.',
      },
    ],
    tip: 'Save a mug of pasta water before draining to adjust the sauce thickness.',
  },
];

export const SHOPPING_LIST: ShoppingList = {
  SHOPPING_FRESH: [
    { name: 'Chicken Thighs', size: '500g', meals: ['1'] },
    { name: 'Cherry Tomatoes', size: '125g', meals: ['1'] },
    { name: 'Baby Spinach', size: '200g', meals: ['1', '2'] },
    { name: 'Courgette', size: '1 loose', meals: ['2'] },
  ],
  SHOPPING_PANTRY: [
    { name: 'Chickpeas', size: '1 tin', meals: ['1'] },
    { name: 'Harissa Paste', size: '1 jar', meals: ['1'] },
    { name: 'Wholewheat Pasta', size: '500g', meals: ['2'] },
  ],
};

export const THEME_TAGS = ['High Protein', 'Quick', 'One Pot', 'Air Fryer', 'Budget', 'Family Friendly'];
export const DEFAULT_SELECTED_THEME_TAGS = THEME_TAGS.slice(0, 2);
