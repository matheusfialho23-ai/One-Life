import React, { useState, useRef } from 'react';
import { Camera, Check, Loader2, X, Wallet, ChefHat, ChevronDown, ChevronUp, Leaf, ShoppingBag, List, Search, ArrowRight } from 'lucide-react';
import { analyzeFoodImage } from '../services/geminiService';
import { useApp } from '../contexts/AppContext';
import { AIAnalysisResult } from '../types';
import { BUDGET_PLANS, MEAL_PREP_KITS, CALORIE_REF_TABLE, WEEKLY_MARKET_LIST } from '../constants';
import { useNavigate } from 'react-router-dom';

const FoodLog: React.FC = () => {
  const navigate = useNavigate();
  const { addFoodLog } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tab State: 'camera' or 'guide'
  const [activeTab, setActiveTab] = useState<'camera' | 'guide'>('camera');
  const [guideSection, setGuideSection] = useState<'marmitas' | 'calorias' | 'planos'>('marmitas');
  
  // Camera/AI State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Accordion States
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [expandedKit, setExpandedKit] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFoods = CALORIE_REF_TABLE.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    
    setIsAnalyzing(true);
    setError(null);
    try {
      const result = await analyzeFoodImage(imagePreview);
      setAnalysis(result);
    } catch (err) {
      setError("Falha ao analisar imagem. Tente novamente ou digite manualmente.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!analysis) return;

    addFoodLog({
      id: Date.now().toString(),
      timestamp: Date.now(),
      name: analysis.foodName,
      calories: analysis.calories,
      protein: analysis.macros.protein,
      carbs: analysis.macros.carbs,
      fat: analysis.macros.fat,
      imageUrl: imagePreview || undefined
    });

    navigate('/');
  };

  const reset = () => {
    setImagePreview(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const togglePlan = (id: string) => setExpandedPlan(expandedPlan === id ? null : id);
  const toggleKit = (id: string) => setExpandedKit(expandedKit === id ? null : id);

  return (
    <div className="pb-24 pt-6 px-4 min-h-screen bg-gray-50">
      {/* Header & Main Tabs */}
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alimentação</h1>
        
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex">
          <button 
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'camera' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Camera size={16} />
            <span>Registrar</span>
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'guide' 
                ? 'bg-brand-500 text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Wallet size={16} />
            <span>Guia & Economia</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'camera' ? (
        // --- CAMERA VIEW ---
        <>
          {imagePreview && (
             <div className="flex justify-end mb-2">
               <button onClick={reset} className="text-gray-500 hover:text-red-500 bg-white p-2 rounded-full shadow-sm">
                 <X size={20} />
               </button>
             </div>
          )}

          {!imagePreview ? (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-6 animate-fade-in">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xs aspect-square rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-gray-50 transition-colors group"
              >
                <div className="bg-brand-50 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Camera size={40} className="text-brand-600" />
                </div>
                <p className="font-medium text-gray-600">Tirar foto da refeição</p>
                <p className="text-xs text-gray-400 mt-1">IA calcula as calorias</p>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md">
                <img src={imagePreview} alt="Meal" className="w-full h-full object-cover" />
              </div>

              {!analysis && !isAnalyzing && (
                <button 
                  onClick={handleAnalyze}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-200 transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                  <span>Analisar Prato</span>
                  <div className="bg-white/20 px-2 py-0.5 rounded text-xs">AI Beta</div>
                </button>
              )}

              {isAnalyzing && (
                <div className="bg-white p-6 rounded-2xl shadow-sm text-center space-y-4 border border-gray-100">
                  <Loader2 className="animate-spin text-brand-500 mx-auto" size={40} />
                  <p className="text-gray-600 font-medium">Analisando sua comida...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-100">
                  {error}
                </div>
              )}

              {analysis && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-brand-50 p-4 border-b border-brand-100">
                    <h3 className="font-bold text-xl text-brand-900">{analysis.foodName}</h3>
                    <p className="text-brand-600 text-sm">{analysis.calories} calorias detectadas</p>
                  </div>
                  
                  <div className="p-4 grid grid-cols-3 gap-4 text-center divide-x divide-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Proteína</p>
                      <p className="font-bold text-lg text-gray-800">{analysis.macros.protein}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Carb</p>
                      <p className="font-bold text-lg text-gray-800">{analysis.macros.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Gordura</p>
                      <p className="font-bold text-lg text-gray-800">{analysis.macros.fat}g</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button onClick={handleSave} className="w-full bg-black text-white py-3 rounded-xl font-bold mt-2 flex items-center justify-center space-x-2">
                      <Check size={20} />
                      <span>Registrar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        // --- GUIDE VIEW ---
        <div className="animate-fade-in pb-10">
          {/* Sub-navigation for Guide */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar mb-6">
            {[
              { id: 'marmitas', label: 'Kits Marmita' },
              { id: 'calorias', label: 'Tabela Calorias' },
              { id: 'planos', label: 'Cardápios' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGuideSection(item.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                  guideSection === item.id 
                    ? 'bg-gray-800 text-white border-gray-800' 
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* SECTION: MARMITAS & COMPRAS */}
          {guideSection === 'marmitas' && (
            <div className="space-y-6">
              {/* Market List Card */}
              <div className="bg-green-50 rounded-2xl p-5 border border-green-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg text-green-700">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-900">Lista Base da Semana</h3>
                    <p className="text-xs text-green-700">Estimativa: R$ 140,00 - R$ 160,00</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 space-y-2 border border-green-100">
                  {WEEKLY_MARKET_LIST.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm border-b border-gray-50 last:border-0 pb-1 last:pb-0">
                      <span className="text-gray-700 font-medium">{item.item}</span>
                      <div className="text-right">
                        <span className="text-gray-400 text-xs block">{item.quantity}</span>
                        <span className="text-green-600 font-bold text-xs">~R$ {item.avgPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Prep Kits */}
              <h3 className="font-bold text-gray-800 text-lg px-2">Kits de Marmita (5 Dias)</h3>
              {MEAL_PREP_KITS.map(kit => (
                <div key={kit.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div 
                    onClick={() => toggleKit(kit.id)}
                    className="p-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-gray-900 text-lg">{kit.title}</h4>
                       <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-bold">R$ {kit.costPerMeal.toFixed(2)} /un</span>
                    </div>
                    <div className="flex text-xs text-gray-500 space-x-3">
                      <span>🍽 {kit.yields} refeições</span>
                      <span>🔥 ~{kit.caloriesPerMeal} kcal</span>
                      <span>💰 Custo total: R$ {kit.totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  {expandedKit === kit.id && (
                    <div className="bg-gray-50 p-4 border-t border-gray-100 space-y-4">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Ingredientes</p>
                        <ul className="grid grid-cols-2 gap-2">
                          {kit.ingredients.map((ing, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-400"></div>
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-400 uppercase mb-2">Como Preparar</p>
                         <ol className="space-y-2">
                           {kit.steps.map((step, i) => (
                             <li key={i} className="text-sm text-gray-600 flex space-x-2">
                               <span className="font-bold text-brand-600">{i+1}.</span>
                               <span>{step}</span>
                             </li>
                           ))}
                         </ol>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SECTION: TABELA CALORIAS */}
          {guideSection === 'calorias' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[50vh]">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar alimento (ex: arroz, ovo)..." 
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {filteredFoods.length > 0 ? filteredFoods.map((food, idx) => (
                  <div key={idx} className="p-4 flex justify-between items-center hover:bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-800">{food.name}</p>
                      <p className="text-xs text-gray-400">{food.portion}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-600">{food.calories} kcal</p>
                      <p className="text-xs text-gray-400">{food.protein}g prot</p>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center text-gray-400 text-sm">Nenhum alimento encontrado.</div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: PLANOS (OLD BUDGET PLANS) */}
          {guideSection === 'planos' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <List size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 text-sm">Cardápios Completos</h3>
                  <p className="text-xs text-blue-700 mt-1">Sugestões diárias de baixo custo.</p>
                </div>
              </div>

              {BUDGET_PLANS.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div 
                    onClick={() => togglePlan(plan.id)}
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900">{plan.title}</h3>
                      <p className="text-xs text-gray-500">{plan.avgCost}/dia • {plan.calories} kcal</p>
                    </div>
                    {expandedPlan === plan.id ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
                  </div>
                  {expandedPlan === plan.id && (
                    <div className="bg-gray-50 p-4 border-t border-gray-100">
                      <div className="space-y-4">
                         {Object.entries(plan.meals).map(([mealName, items]) => (
                           <div key={mealName}>
                             <h4 className="text-xs font-bold text-brand-600 uppercase mb-1 capitalize">{mealName === 'breakfast' ? 'Café' : mealName === 'lunch' ? 'Almoço' : mealName === 'snack' ? 'Lanche' : 'Jantar'}</h4>
                             <ul className="text-sm text-gray-700 pl-2 border-l-2 border-brand-200">
                               {(items as any[]).map((item, idx) => (
                                 <li key={idx} className="flex justify-between">
                                   <span>{item.name}</span>
                                   <span className="text-gray-400 text-xs">{item.quantity}</span>
                                 </li>
                               ))}
                             </ul>
                           </div>
                         ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodLog;