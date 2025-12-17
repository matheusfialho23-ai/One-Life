import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Flame, TrendingDown, Plus, Watch, Footprints, Heart, Activity, Bluetooth, RefreshCw, DollarSign, PieChart, Trash2, ArrowRight, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, foodLogs, workoutLogs, watchStats, toggleWatchConnection, financialData, updateSalary, addExpense, removeExpense } = useApp();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Financial Local State
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [salaryInput, setSalaryInput] = useState('');
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<'essencial' | 'lazer' | 'investimento'>('essencial');

  // Calculate today's stats
  const today = new Date().setHours(0,0,0,0);
  const todaysFood = foodLogs.filter(f => f.timestamp >= today);
  const caloriesConsumed = todaysFood.reduce((acc, curr) => acc + curr.calories, 0);
  
  const remainingCalories = Math.max(0, user.dailyCalorieGoal - caloriesConsumed);
  const progressPercent = Math.min(100, (caloriesConsumed / user.dailyCalorieGoal) * 100);

  // Financial Math
  const totalExpenses = financialData.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = financialData.salary - totalExpenses;
  const balancePercent = financialData.salary > 0 ? (totalExpenses / financialData.salary) * 100 : 0;
  
  // 50-30-20 Rule
  const goalEssencial = financialData.salary * 0.5;
  const goalLazer = financialData.salary * 0.3;
  const goalInvest = financialData.salary * 0.2;

  const currentEssencial = financialData.expenses.filter(e => e.category === 'essencial').reduce((acc, c) => acc + c.amount, 0);
  const currentLazer = financialData.expenses.filter(e => e.category === 'lazer').reduce((acc, c) => acc + c.amount, 0);
  const currentInvest = financialData.expenses.filter(e => e.category === 'investimento').reduce((acc, c) => acc + c.amount, 0);

  // SVG Chart Math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleWatchToggle = () => {
    if (!watchStats.connected) {
      setIsConnecting(true);
      setTimeout(() => {
        toggleWatchConnection();
        setIsConnecting(false);
      }, 1500); // Fake connection delay
    } else {
      toggleWatchConnection();
    }
  };

  const handleSaveSalary = () => {
    const val = parseFloat(salaryInput);
    if (!isNaN(val) && val > 0) {
      updateSalary(val);
    }
  };

  const handleAddExpense = () => {
    if (newExpenseName && newExpenseAmount) {
      addExpense({
        id: Date.now().toString(),
        name: newExpenseName,
        amount: parseFloat(newExpenseAmount),
        category: newExpenseCategory,
        date: Date.now()
      });
      setNewExpenseName('');
      setNewExpenseAmount('');
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Olá, {user.name.split(' ')[0]}!</h1>
          <p className="text-sm text-gray-500">Vamos bater suas metas hoje.</p>
        </div>
        <div className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full shadow-sm">
          <Flame size={16} fill="currentColor" />
          <span className="font-bold text-sm">{user.streak} dias</span>
        </div>
      </div>

      {/* Main Stats Card with Donut Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
        <h2 className="font-bold text-gray-800 text-lg mb-4">Resumo do Dia</h2>
        
        <div className="flex items-center justify-between">
          {/* Chart Section */}
          <div className="relative flex flex-col items-center justify-center">
            {/* SVG Ring */}
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-100"
                />
                {/* Progress Ring */}
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-brand-500 transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-400 font-medium uppercase">Restam</span>
                <span className="text-xl font-bold text-gray-900">{remainingCalories}</span>
                <span className="text-[10px] text-gray-400">kcal</span>
              </div>
            </div>
          </div>

          {/* Stats Legend & Steps */}
          <div className="flex-1 pl-6 space-y-4">
            {/* Calories Legend */}
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="flex items-center text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mr-2"></div>
                  Ingeridas
                </span>
                <span className="font-bold text-gray-900">{caloriesConsumed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-gray-200 mr-2"></div>
                  Meta
                </span>
                <span className="font-bold text-gray-900">{user.dailyCalorieGoal}</span>
              </div>
            </div>

            {/* Daily Steps Highlight */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                <Footprints size={12} />
                <span>Passos Hoje</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                  {watchStats.connected ? watchStats.steps.toLocaleString() : '0'}
                </span>
                <span className="text-xs text-gray-400 pb-0.5">/ 6.000</span>
              </div>
              {!watchStats.connected && (
                <p className="text-[10px] text-blue-500 mt-1 flex items-center">
                   Conecte o relógio abaixo
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- FINANCIAL GUIDE SECTION --- */}
      <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden transition-all">
        {/* Header Toggle */}
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setIsFinanceOpen(!isFinanceOpen)}>
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-white">
              <Wallet size={20} />
            </div>
            <div>
               <h3 className="font-bold text-gray-900">Guia Financeiro</h3>
               <p className="text-xs text-emerald-700">Controle para uma vida saudável</p>
            </div>
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm text-gray-400">
            {isFinanceOpen ? <TrendingDown size={16}/> : <ArrowRight size={16}/>}
          </div>
        </div>

        {/* Closed State Summary */}
        {!isFinanceOpen && (
           <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm" onClick={() => setIsFinanceOpen(true)}>
             <div>
               <p className="text-xs text-gray-400 uppercase">Disponível no Mês</p>
               <p className="text-lg font-bold text-gray-800">
                 {financialData.salary > 0 ? `R$ ${balance.toFixed(2)}` : 'Toque para configurar'}
               </p>
             </div>
             {financialData.salary > 0 && (
               <div className="text-right">
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full rounded-full ${balancePercent > 90 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(100, balancePercent)}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{Math.round(balancePercent)}% gasto</p>
               </div>
             )}
           </div>
        )}

        {/* Expanded State */}
        {isFinanceOpen && (
          <div className="space-y-4 animate-fade-in">
            {financialData.salary === 0 ? (
              // Salary Setup
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-3">Qual sua renda mensal líquida?</p>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="number" 
                      placeholder="Ex: 2500.00" 
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      value={salaryInput}
                      onChange={(e) => setSalaryInput(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleSaveSalary}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm"
                  >
                    Salvar
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Usaremos isso para calcular a regra 50/30/20.</p>
              </div>
            ) : (
              // Main Financial Dashboard
              <>
                {/* Guidelines */}
                <div className="grid grid-cols-3 gap-2 text-center">
                   <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase">Essencial (50%)</p>
                      <p className="font-bold text-emerald-800 text-sm">R$ {goalEssencial.toFixed(0)}</p>
                      <div className="w-full h-1 bg-gray-100 mt-1 rounded-full overflow-hidden">
                        <div className={`h-full ${currentEssencial > goalEssencial ? 'bg-red-400' : 'bg-emerald-400'}`} style={{width: `${Math.min(100, (currentEssencial/goalEssencial)*100)}%`}}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Gasto: {currentEssencial}</p>
                   </div>
                   <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase">Lazer (30%)</p>
                      <p className="font-bold text-emerald-800 text-sm">R$ {goalLazer.toFixed(0)}</p>
                      <div className="w-full h-1 bg-gray-100 mt-1 rounded-full overflow-hidden">
                         <div className={`h-full ${currentLazer > goalLazer ? 'bg-red-400' : 'bg-blue-400'}`} style={{width: `${Math.min(100, (currentLazer/goalLazer)*100)}%`}}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Gasto: {currentLazer}</p>
                   </div>
                   <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase">Futuro (20%)</p>
                      <p className="font-bold text-emerald-800 text-sm">R$ {goalInvest.toFixed(0)}</p>
                      <div className="w-full h-1 bg-gray-100 mt-1 rounded-full overflow-hidden">
                         <div className={`h-full ${currentInvest > goalInvest ? 'bg-green-600' : 'bg-purple-400'}`} style={{width: `${Math.min(100, (currentInvest/goalInvest)*100)}%`}}></div>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Gasto: {currentInvest}</p>
                   </div>
                </div>

                {/* Add Expense */}
                <div className="bg-white p-3 rounded-xl shadow-sm">
                   <p className="text-xs font-bold text-gray-700 mb-2 flex items-center"><Plus size={14} className="mr-1"/> Adicionar Gasto</p>
                   <div className="space-y-2">
                     <input 
                       className="w-full text-sm p-2 bg-gray-50 rounded-lg border border-gray-100" 
                       placeholder="Nome (ex: Mercado)" 
                       value={newExpenseName}
                       onChange={e => setNewExpenseName(e.target.value)}
                     />
                     <div className="flex space-x-2">
                       <input 
                         type="number" 
                         className="w-1/3 text-sm p-2 bg-gray-50 rounded-lg border border-gray-100" 
                         placeholder="R$ Value" 
                         value={newExpenseAmount}
                         onChange={e => setNewExpenseAmount(e.target.value)}
                       />
                       <select 
                         className="flex-1 text-sm p-2 bg-gray-50 rounded-lg border border-gray-100"
                         value={newExpenseCategory}
                         onChange={(e) => setNewExpenseCategory(e.target.value as any)}
                       >
                         <option value="essencial">Essencial (Casa/Comida)</option>
                         <option value="lazer">Lazer (Assinaturas/Sair)</option>
                         <option value="investimento">Futuro (Reserva/Dívida)</option>
                       </select>
                     </div>
                     <button onClick={handleAddExpense} className="w-full bg-emerald-600 text-white py-2 rounded-lg text-sm font-bold mt-1">
                       Registrar
                     </button>
                   </div>
                </div>

                {/* Recent Expenses List */}
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Últimos Gastos</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {financialData.expenses.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-2">Nenhum gasto registrado.</p>
                    ) : (
                      financialData.expenses.slice(0, 5).map(exp => (
                        <div key={exp.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
                           <div>
                             <p className="text-xs font-bold text-gray-800">{exp.name}</p>
                             <span className={`text-[9px] px-1.5 py-0.5 rounded text-white ${
                               exp.category === 'essencial' ? 'bg-emerald-400' : exp.category === 'lazer' ? 'bg-blue-400' : 'bg-purple-400'
                             }`}>
                               {exp.category}
                             </span>
                           </div>
                           <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-gray-700">R$ {exp.amount.toFixed(2)}</span>
                              <button onClick={() => removeExpense(exp.id)} className="text-gray-300 hover:text-red-500">
                                <Trash2 size={12} />
                              </button>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="pt-2 text-center">
                   <button onClick={() => updateSalary(0)} className="text-[10px] text-gray-400 underline">Redefinir Salário</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Smart Watch Section */}
      <div className="bg-gray-900 rounded-3xl p-5 shadow-lg text-white relative overflow-hidden">
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 blur-3xl opacity-20 rounded-full pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center space-x-2">
            <Watch className="text-blue-400" size={20} />
            <h3 className="font-bold text-lg">Smart Watch</h3>
          </div>
          <button 
            onClick={handleWatchToggle}
            disabled={isConnecting}
            className={`text-xs px-3 py-1.5 rounded-full flex items-center space-x-1 transition-all ${
              watchStats.connected 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50' 
                : 'bg-white/10 hover:bg-white/20 text-gray-300'
            }`}
          >
             {isConnecting ? (
               <RefreshCw size={12} className="animate-spin" />
             ) : watchStats.connected ? (
               <Bluetooth size={12} className="text-blue-400" />
             ) : (
               <Bluetooth size={12} />
             )}
             <span>{isConnecting ? 'Conectando...' : watchStats.connected ? 'Conectado' : 'Conectar'}</span>
          </button>
        </div>

        {!watchStats.connected ? (
          <div className="text-center py-4 text-gray-400 text-sm relative z-10">
            <p>Conecte seu dispositivo para sincronizar seus passos e batimentos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 relative z-10">
            {/* Steps (Duplicated for detail view inside card) */}
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center border border-white/5">
              <Footprints className="text-green-400 mb-2" size={20} />
              <span className="text-xl font-bold">{watchStats.steps}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Passos</span>
            </div>
            
            {/* BPM */}
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center border border-white/5">
              <Heart className="text-red-400 mb-2 animate-pulse" size={20} fill="currentColor" />
              <span className="text-xl font-bold">{watchStats.bpm}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">BPM</span>
            </div>

            {/* Fat Loss */}
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center border border-white/5">
              <Activity className="text-orange-400 mb-2" size={20} />
              <span className="text-xl font-bold">{watchStats.fatBurnedGrams.toFixed(1)}</span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide">Gordura (g)</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/food')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform flex flex-col items-center justify-center space-y-2 group"
        >
          <div className="bg-blue-50 group-hover:bg-blue-100 transition-colors p-3 rounded-full text-blue-600">
            <Plus size={24} />
          </div>
          <span className="font-semibold text-gray-700">Registrar Comida</span>
        </button>
        <button 
           onClick={() => navigate('/workout')}
           className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform flex flex-col items-center justify-center space-y-2 group"
        >
          <div className="bg-orange-50 group-hover:bg-orange-100 transition-colors p-3 rounded-full text-orange-600">
            <Flame size={24} />
          </div>
          <span className="font-semibold text-gray-700">Iniciar Treino</span>
        </button>
      </div>

      {/* Weight Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Seu Peso</h3>
          <button onClick={() => navigate('/profile')} className="text-brand-600 text-sm font-medium">Atualizar</button>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Atual</p>
            <p className="text-2xl font-bold text-gray-900">{user.currentWeight} <span className="text-sm font-normal text-gray-500">kg</span></p>
          </div>
          <div className="flex-1">
             <p className="text-gray-400 text-xs uppercase tracking-wider">Meta</p>
             <p className="text-2xl font-bold text-gray-900">{user.goalWeight} <span className="text-sm font-normal text-gray-500">kg</span></p>
          </div>
          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium flex items-center">
            <TrendingDown size={16} className="mr-1" />
            {(user.startWeight - user.currentWeight).toFixed(1)}kg
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-lg text-gray-800">Registros de Hoje</h3>
        </div>
        <div className="space-y-3">
          {todaysFood.length === 0 && workoutLogs.filter(w => w.timestamp >= today).length === 0 ? (
             <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
               Nenhuma atividade hoje ainda.
             </div>
          ) : (
            <>
              {todaysFood.slice(0, 3).map(food => (
                <div key={food.id} className="bg-white p-3 rounded-xl flex items-center space-x-3 shadow-sm">
                  {food.imageUrl ? (
                    <img src={food.imageUrl} alt={food.name} className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🍎</div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{food.name}</h4>
                    <p className="text-xs text-gray-500">{new Date(food.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                  <span className="font-bold text-gray-700">{food.calories} kcal</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;