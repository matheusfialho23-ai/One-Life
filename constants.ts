import { Workout, MealPlan, MealPrepKit, FoodReference, MarketItem, AdminUserStats } from './types';

export const WORKOUTS: Workout[] = [
  // --- WEEKLY SCHEDULE (HOME ONLY) ---
  {
    id: 'w_mon',
    title: 'Segunda: Pernas & Glúteos',
    category: 'home',
    level: 'Iniciante', // Mantendo tipo compatível
    durationMin: 25,
    caloriesBurned: 220,
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    description: 'Comece a semana fortalecendo a base. Foco total em quadríceps, posteriores e glúteos.',
    exercises: [
      {
        name: 'Agachamento Livre',
        reps: '3x 15 repetições',
        instructions: 'Pés na largura dos ombros. Desça o quadril para trás como se sentasse numa cadeira. Mantenha o peito estufado.'
      },
      {
        name: 'Afundo (Passada)',
        reps: '3x 12 (cada perna)',
        instructions: 'Dê um passo largo à frente. Flexione os dois joelhos até quase tocarem o chão (90 graus). Volte e alterne.'
      },
      {
        name: 'Elevação Pélvica (Ponte)',
        reps: '3x 20 repetições',
        instructions: 'Deitado de costas, joelhos dobrados. Suba o quadril contraindo forte os glúteos no topo. Desça devagar.'
      },
      {
        name: 'Agachamento Sumô',
        reps: '3x 15 repetições',
        instructions: 'Pés bem afastados, pontas para fora. Desça o quadril mantendo os joelhos na direção da ponta dos pés.'
      }
    ]
  },
  {
    id: 'w_tue',
    title: 'Terça: Superiores & Braços',
    category: 'home',
    level: 'Intermediário',
    durationMin: 20,
    caloriesBurned: 180,
    imageUrl: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80',
    description: 'Trabalho de peito, costas e braços usando apenas o peso do corpo e móveis.',
    exercises: [
      {
        name: 'Flexão de Braço (ou com Joelhos)',
        reps: '3x 10 a 12 reps',
        instructions: 'Mãos na largura dos ombros. Desça o peito até o chão mantendo o corpo reto. Use os joelhos se precisar.'
      },
      {
        name: 'Tríceps no Banco/Cadeira',
        reps: '3x 12 repetições',
        instructions: 'Apoie as mãos numa cadeira firme atrás de você. Desça o quadril flexionando os cotovelos e suba empurrando.'
      },
      {
        name: 'Superman (Lombar e Costas)',
        reps: '3x 15 repetições',
        instructions: 'Deitado de barriga para baixo, estenda braços e pernas. Levante ambos do chão simultaneamente e segure 1s.'
      },
      {
        name: 'Toque no Ombro (Posição Prancha)',
        reps: '3x 20 toques (total)',
        instructions: 'Em posição de flexão alta, toque a mão direita no ombro esquerdo e vice-versa, sem balançar o quadril.'
      }
    ]
  },
  {
    id: 'w_wed',
    title: 'Quarta: Cardio & Suor (HIIT)',
    category: 'home',
    level: 'Avançado',
    durationMin: 20,
    caloriesBurned: 300,
    imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80',
    description: 'Metade da semana! Treino rápido e intenso para acelerar o metabolismo e queimar gordura.',
    exercises: [
      {
        name: 'Polichinelos',
        reps: '45 segundos',
        instructions: 'Movimento clássico e contínuo. Abra e feche braços e pernas em ritmo acelerado.'
      },
      {
        name: 'Corrida Estacionária Alta',
        reps: '45 segundos',
        instructions: 'Corra no lugar elevando os joelhos na altura da cintura. Use os braços para ganhar impulso.'
      },
      {
        name: 'Sprawl (Meio Burpee)',
        reps: '12 repetições',
        instructions: 'Coloque as mãos no chão, jogue os pés para trás em prancha, volte os pés e fique em pé (sem o salto do burpee).'
      },
      {
        name: 'Mountain Climbers',
        reps: '45 segundos',
        instructions: 'Em posição de prancha, traga os joelhos alternadamente em direção ao peito como se estivesse escalando.'
      }
    ]
  },
  {
    id: 'w_thu',
    title: 'Quinta: Abdômen & Core',
    category: 'home',
    level: 'Intermediário',
    durationMin: 15,
    caloriesBurned: 150,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    description: 'Fortalecimento da região central do corpo para melhorar postura e definir.',
    exercises: [
      {
        name: 'Abdominal Supra (Curto)',
        reps: '3x 20 repetições',
        instructions: 'Deitado, joelhos flexionados. Suba o tronco soltando o ar, contraindo o abdômen. Não force o pescoço.'
      },
      {
        name: 'Prancha Isométrica',
        reps: '3x 30 a 45 seg',
        instructions: 'Apoie antebraços e ponta dos pés. Mantenha o corpo reto como uma tábua, contraindo abdômen e glúteos.'
      },
      {
        name: 'Abdominal Infra (Tesoura)',
        reps: '3x 15 cada perna',
        instructions: 'Deitado, mãos embaixo do quadril. Eleve as pernas esticadas alternadamente sem tocar o chão.'
      },
      {
        name: 'Abdominal Russo (Twist)',
        reps: '3x 20 toques',
        instructions: 'Sentado, incline o tronco levemente para trás. Gire o tronco tocando as mãos no chão de um lado e do outro.'
      }
    ]
  },
  {
    id: 'w_fri',
    title: 'Sexta: Desafio Full Body',
    category: 'home',
    level: 'Avançado',
    durationMin: 30,
    caloriesBurned: 350,
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Para fechar a semana: uma mistura de todos os grupos musculares com intensidade.',
    exercises: [
      {
        name: 'Agachamento com Salto',
        reps: '3x 12 repetições',
        instructions: 'Faça um agachamento e, na subida, dê um salto explosivo. Amorteça a queda voltando ao agachamento.'
      },
      {
        name: 'Flexão com Toque no Ombro',
        reps: '3x 10 repetições',
        instructions: 'Faça uma flexão, suba e toque a mão no ombro oposto. Alterne os lados.'
      },
      {
        name: 'Abdominal Remador',
        reps: '3x 15 repetições',
        instructions: 'Deitado totalmente esticado. Suba o tronco e dobre os joelhos abraçando-os. Volte a esticar.'
      },
      {
        name: 'Burpees Completos',
        reps: '10 repetições (Desafio)',
        instructions: 'Peito no chão, suba, traga os pés e salte batendo palma acima da cabeça.'
      }
    ]
  }
];

export const BUDGET_PLANS: MealPlan[] = [
  {
    id: 'p1',
    title: 'Clássico Econômico',
    description: 'O básico que funciona. Foco em arroz, feijão, ovos e frango.',
    avgCost: 'R$ 15,00',
    calories: 1800,
    meals: {
      breakfast: [
        { name: 'Ovos mexidos', quantity: '2 unidades' },
        { name: 'Pão francês (sem miolo)', quantity: '1 unidade' },
        { name: 'Café preto', quantity: '200ml' }
      ],
      lunch: [
        { name: 'Arroz branco', quantity: '100g' },
        { name: 'Feijão carioca', quantity: '1 concha' },
        { name: 'Filé de frango grelhado', quantity: '120g' },
        { name: 'Salada de repolho', quantity: 'À vontade' }
      ],
      snack: [
        { name: 'Banana', quantity: '1 unidade' },
        { name: 'Aveia', quantity: '1 colher de sopa' }
      ],
      dinner: [
        { name: 'Omelete (cebola/tomate)', quantity: '2 ovos' },
        { name: 'Salada de alface', quantity: 'À vontade' }
      ]
    }
  },
  {
    id: 'p2',
    title: 'Low Carb Barato',
    description: 'Redução de carboidratos gastando pouco. Foco em ovos e legumes da estação.',
    avgCost: 'R$ 18,00',
    calories: 1600,
    meals: {
      breakfast: [
        { name: 'Ovos cozidos', quantity: '3 unidades' },
        { name: 'Café com canela', quantity: '200ml' }
      ],
      lunch: [
        { name: 'Sobrecoxa de frango assada', quantity: '1 unidade' },
        { name: 'Abobrinha refogada', quantity: '1 xícara' },
        { name: 'Salada de folhas', quantity: 'À vontade' }
      ],
      snack: [
        { name: 'Amendoim torrado', quantity: '30g' }
      ],
      dinner: [
        { name: 'Carne moída (acém)', quantity: '150g' },
        { name: 'Chuchu refogado', quantity: '1 xícara' }
      ]
    }
  }
];

export const MEAL_PREP_KITS: MealPrepKit[] = [
  {
    id: 'kit1',
    title: 'Kit Maromba Básico',
    yields: 5,
    totalCost: 45.00,
    costPerMeal: 9.00,
    caloriesPerMeal: 450,
    ingredients: [
      '1kg Peito de Frango (R$ 22)',
      '1kg Batata Doce (R$ 6)',
      '500g Brócolis/Cenoura (R$ 10)',
      'Temperos (R$ 7)'
    ],
    steps: [
      'Cozinhe a batata doce e faça purê ou asse em cubos.',
      'Grelhe o frango em cubos ou desfiado com açafrão.',
      'Refogue os legumes rapidamente.',
      'Monte 5 potes: 150g frango, 150g batata, legumes à vontade.'
    ]
  },
  {
    id: 'kit2',
    title: 'Kit Carne Moída Econômica',
    yields: 5,
    totalCost: 55.00,
    costPerMeal: 11.00,
    caloriesPerMeal: 500,
    ingredients: [
      '1kg Carne Moída - Acém (R$ 30)',
      '1kg Arroz Branco (R$ 5)',
      '500g Feijão (R$ 8)',
      'Abobrinha/Couve (R$ 12)'
    ],
    steps: [
      'Refogue a carne com bastante tomate e cebola para render.',
      'Cozinhe o feijão para a semana (congele metade).',
      'Faça o arroz soltinho.',
      'Monte: 4 colheres arroz, 1 concha feijão, 4 colheres carne.'
    ]
  }
];

export const CALORIE_REF_TABLE: FoodReference[] = [
  { name: 'Arroz Branco Cozido', portion: '100g (4 colheres)', calories: 130, protein: 2.7 },
  { name: 'Feijão Carioca', portion: '100g (1 concha)', calories: 76, protein: 4.8 },
  { name: 'Peito de Frango', portion: '100g (1 filé)', calories: 165, protein: 31 },
  { name: 'Ovo Cozido', portion: '1 unidade', calories: 70, protein: 6 },
  { name: 'Banana Prata', portion: '1 unidade', calories: 98, protein: 1.3 },
  { name: 'Pão Francês', portion: '1 unidade', calories: 135, protein: 4 },
  { name: 'Tapioca', portion: '100g', calories: 330, protein: 0 },
  { name: 'Batata Doce', portion: '100g', calories: 86, protein: 1.6 },
  { name: 'Aveia em Flocos', portion: '30g (2 colheres)', calories: 110, protein: 4.3 },
];

export const WEEKLY_MARKET_LIST: MarketItem[] = [
  { item: 'Ovos (Cartela)', quantity: '30 unid', avgPrice: 22.00 },
  { item: 'Peito de Frango', quantity: '2 kg', avgPrice: 44.00 },
  { item: 'Arroz', quantity: '5 kg', avgPrice: 25.00 },
  { item: 'Feijão', quantity: '1 kg', avgPrice: 8.00 },
  { item: 'Banana', quantity: '1 dúzia', avgPrice: 12.00 },
  { item: 'Aveia', quantity: '500g', avgPrice: 8.00 },
  { item: 'Legumes da estação', quantity: 'Diversos', avgPrice: 20.00 },
];

// DADOS MOCKADOS PARA O DASHBOARD ADMINISTRATIVO
export const MOCK_USERS: AdminUserStats[] = [
  { 
    id: '1', 
    name: 'Ana Silva', 
    email: 'ana.silva@email.com',
    joinDate: '2023-10-15', 
    status: 'active', 
    lastLogin: 'Hoje 10:30', 
    goal: 'Perder Peso',
    age: 29,
    gender: 'female',
    startWeight: 72,
    currentWeight: 68,
    height: 165
  },
  { 
    id: '2', 
    name: 'Carlos Oliveira', 
    email: 'carlos.oli@email.com',
    joinDate: '2023-10-18', 
    status: 'premium', 
    lastLogin: 'Ontem 22:15', 
    goal: 'Ganhar Massa',
    age: 34,
    gender: 'male',
    startWeight: 78,
    currentWeight: 81,
    height: 180
  },
  { 
    id: '3', 
    name: 'Beatriz Costa', 
    email: 'bia.costa@email.com',
    joinDate: '2023-11-01', 
    status: 'active', 
    lastLogin: 'Hoje 08:00', 
    goal: 'Saúde',
    age: 25,
    gender: 'female',
    startWeight: 60,
    currentWeight: 59,
    height: 162
  },
  { 
    id: '4', 
    name: 'João Mendes', 
    email: 'joao.mendes@email.com',
    joinDate: '2023-11-05', 
    status: 'inactive', 
    lastLogin: '3 dias atrás', 
    goal: 'Perder Peso',
    age: 42,
    gender: 'male',
    startWeight: 95,
    currentWeight: 94,
    height: 175
  },
  { 
    id: '5', 
    name: 'Fernanda Lima', 
    email: 'fer.lima@email.com',
    joinDate: '2023-11-12', 
    status: 'premium', 
    lastLogin: 'Hoje 14:45', 
    goal: 'Definição',
    age: 30,
    gender: 'female',
    startWeight: 65,
    currentWeight: 62,
    height: 170
  },
  { 
    id: '6', 
    name: 'Ricardo Santos', 
    email: 'rick.santos@email.com',
    joinDate: '2023-11-20', 
    status: 'active', 
    lastLogin: 'Hoje 09:20', 
    goal: 'Hipertrofia',
    age: 27,
    gender: 'male',
    startWeight: 70,
    currentWeight: 74,
    height: 178
  },
];