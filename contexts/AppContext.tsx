import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, FoodLog, WorkoutLog, WatchStats, FinancialData, Expense } from '../types';

interface AppContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  foodLogs: FoodLog[];
  workoutLogs: WorkoutLog[];
  watchStats: WatchStats;
  financialData: FinancialData;
  login: (name: string, email: string) => void;
  completeOnboarding: (profileData: Partial<UserProfile>) => void;
  upgradeSubscription: (plan: 'monthly_2990' | 'semester_14990') => void;
  logout: () => void;
  addFoodLog: (log: FoodLog) => void;
  addWorkoutLog: (log: WorkoutLog) => void;
  updateWeight: (weight: number) => void;
  toggleWatchConnection: () => void;
  updateSalary: (salary: number) => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  resetData: () => void;
}

const defaultWatchStats: WatchStats = {
  connected: false,
  steps: 0,
  bpm: 0,
  fatBurnedGrams: 0
};

const defaultFinancialData: FinancialData = {
  salary: 0,
  expenses: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('olf_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [foodLogs, setFoodLogs] = useState<FoodLog[]>(() => {
    const saved = localStorage.getItem('olf_food');
    return saved ? JSON.parse(saved) : [];
  });

  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('olf_workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [watchStats, setWatchStats] = useState<WatchStats>(() => {
    const saved = localStorage.getItem('olf_watch');
    return saved ? JSON.parse(saved) : defaultWatchStats;
  });

  const [financialData, setFinancialData] = useState<FinancialData>(() => {
    const saved = localStorage.getItem('olf_finance');
    return saved ? JSON.parse(saved) : defaultFinancialData;
  });

  // Check Subscription Status on Load
  useEffect(() => {
    if (user) {
      const now = Date.now();
      let updatedUser = { ...user };
      let changed = false;

      // Check Trial Expiration
      if (user.subscriptionStatus === 'trial' && now > user.trialEndDate) {
        updatedUser.subscriptionStatus = 'expired';
        changed = true;
      }
      
      // Check Active Subscription Expiration
      if (user.subscriptionStatus === 'active' && user.subscriptionEndDate && now > user.subscriptionEndDate) {
        updatedUser.subscriptionStatus = 'expired';
        changed = true;
      }

      if (changed) {
        setUser(updatedUser);
      }
    }
  }, []); // Run once on mount (or could run on user change if we want real-time checks)

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('olf_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('olf_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('olf_food', JSON.stringify(foodLogs));
  }, [foodLogs]);

  useEffect(() => {
    localStorage.setItem('olf_workouts', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('olf_watch', JSON.stringify(watchStats));
  }, [watchStats]);

  useEffect(() => {
    localStorage.setItem('olf_finance', JSON.stringify(financialData));
  }, [financialData]);

  // Simulation of live data
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (watchStats.connected) {
      interval = setInterval(() => {
        setWatchStats(prev => ({
          ...prev,
          steps: prev.steps + Math.floor(Math.random() * 5),
          bpm: 70 + Math.floor(Math.random() * 20),
          fatBurnedGrams: prev.fatBurnedGrams + 0.1
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [watchStats.connected]);

  // --- ACTIONS ---

  const login = (name: string, email: string) => {
    // Placeholder logic
  };

  const calculateCalories = (data: Partial<UserProfile>): number => {
    const weight = data.currentWeight || 70;
    const height = data.height || 170;
    const age = data.age || 30;
    const gender = data.gender || 'male';
    const activity = data.activityLevel || 'sedentary';

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += gender === 'male' ? 5 : -161;

    let multiplier = 1.2;
    switch (activity) {
      case 'light': multiplier = 1.375; break;
      case 'moderate': multiplier = 1.55; break;
      case 'active': multiplier = 1.725; break;
      case 'very_active': multiplier = 1.9; break;
      default: multiplier = 1.2;
    }

    const tdee = bmr * multiplier;
    return Math.round(tdee - 500); 
  };

  const completeOnboarding = (profileData: Partial<UserProfile>) => {
    const dailyCalorieGoal = calculateCalories(profileData);
    const now = Date.now();
    
    // 7 Days Trial
    const trialDays = 7;
    const trialEndDate = now + (trialDays * 24 * 60 * 60 * 1000);

    const newUser: UserProfile = {
      name: profileData.name || 'User',
      email: profileData.email || '',
      startWeight: profileData.currentWeight || 0,
      currentWeight: profileData.currentWeight || 0,
      goalWeight: profileData.goalWeight || 0,
      height: profileData.height || 0,
      age: profileData.age || 0,
      gender: profileData.gender || 'male',
      activityLevel: profileData.activityLevel || 'sedentary',
      dailyCalorieGoal: dailyCalorieGoal,
      streak: 1,
      // Subscription Init
      subscriptionStatus: 'trial',
      subscriptionPlan: 'free',
      trialEndDate: trialEndDate,
      paymentMethodAttached: true // Assuming onboarding now includes card entry
    };
    setUser(newUser);
  };

  const upgradeSubscription = (plan: 'monthly_2990' | 'semester_14990') => {
    if (!user) return;

    const now = Date.now();
    const oneMonth = 30 * 24 * 60 * 60 * 1000;
    
    // Update user status
    setUser({
      ...user,
      subscriptionStatus: 'active',
      subscriptionPlan: plan,
      subscriptionEndDate: now + oneMonth // Simple logic: always adds 30 days from now
    });
  };

  const logout = () => {
    setUser(null);
    setFoodLogs([]);
    setWorkoutLogs([]);
    setWatchStats(defaultWatchStats);
    setFinancialData(defaultFinancialData);
    localStorage.clear();
  };

  const addFoodLog = (log: FoodLog) => {
    setFoodLogs(prev => [log, ...prev]);
  };

  const addWorkoutLog = (log: WorkoutLog) => {
    setWorkoutLogs(prev => [log, ...prev]);
    if (user) setUser({ ...user, streak: user.streak + 1 });
  };

  const updateWeight = (weight: number) => {
    if (user) setUser({ ...user, currentWeight: weight });
  };

  const toggleWatchConnection = () => {
    setWatchStats(prev => {
      if (!prev.connected) {
        return {
          connected: true,
          steps: 4320,
          bpm: 78,
          fatBurnedGrams: 12
        };
      }
      return { ...prev, connected: false, bpm: 0 };
    });
  };

  const updateSalary = (salary: number) => {
    setFinancialData(prev => ({ ...prev, salary }));
  };

  const addExpense = (expense: Expense) => {
    setFinancialData(prev => ({ ...prev, expenses: [expense, ...prev.expenses] }));
  };

  const removeExpense = (id: string) => {
    setFinancialData(prev => ({ ...prev, expenses: prev.expenses.filter(e => e.id !== id) }));
  };

  const resetData = () => {
    logout();
  };

  return (
    <AppContext.Provider value={{ 
      user, isAuthenticated, foodLogs, workoutLogs, watchStats, financialData, 
      login, completeOnboarding, upgradeSubscription, logout,
      addFoodLog, addWorkoutLog, updateWeight, toggleWatchConnection, 
      updateSalary, addExpense, removeExpense, resetData 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};