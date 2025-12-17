export interface UserProfile {
  name: string;
  email?: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  dailyCalorieGoal: number;
  streak: number;
  // Biometrics
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  // Subscription Control
  subscriptionStatus: 'trial' | 'active' | 'expired';
  subscriptionPlan: 'free' | 'monthly_2990' | 'semester_14990'; // semester option for context
  trialEndDate: number; // Timestamp
  subscriptionEndDate?: number; // Timestamp
  paymentMethodAttached: boolean; // New field to track card requirement
}

export interface FoodLog {
  id: string;
  timestamp: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}

export interface ExerciseDetail {
  name: string;
  reps: string; // e.g., "3x12" or "45 seg"
  instructions: string;
}

export interface Workout {
  id: string;
  title: string;
  category: 'home' | 'gym';
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  durationMin: number;
  caloriesBurned: number;
  exercises: ExerciseDetail[];
  imageUrl: string;
  description?: string;
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  timestamp: number;
  caloriesBurned: number;
}

export interface WatchStats {
  connected: boolean;
  steps: number;
  bpm: number;
  fatBurnedGrams: number;
}

export interface MealItem {
  name: string;
  quantity: string;
}

export interface MealPlan {
  id: string;
  title: string;
  description: string;
  avgCost: string; // e.g., "R$ 15/dia"
  calories: number;
  meals: {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
    snack: MealItem[];
  };
}

// New Types for Meal Prep and Market
export interface MarketItem {
  item: string;
  quantity: string;
  avgPrice: number; // In Reais
}

export interface MealPrepKit {
  id: string;
  title: string;
  yields: number; // How many meals
  totalCost: number;
  costPerMeal: number;
  ingredients: string[];
  steps: string[];
  caloriesPerMeal: number;
}

export interface FoodReference {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs?: number; // Optional for table
  fat?: number; // Optional for table
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'essencial' | 'lazer' | 'investimento';
  date: number;
}

export interface FinancialData {
  salary: number;
  expenses: Expense[];
}

export enum Tab {
  DASHBOARD = 'dashboard',
  FOOD = 'food',
  WORKOUT = 'workout',
  PROFILE = 'profile',
}

export interface AIAnalysisResult {
  foodName: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  confidence: string;
}

// Admin Types
export interface AdminUserStats {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'premium';
  lastLogin: string;
  goal: string;
  // Biometrics
  age: number;
  gender: 'male' | 'female';
  startWeight: number;
  currentWeight: number;
  height: number;
}