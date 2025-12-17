import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ChevronRight, Check, Ruler, Weight, User, ChevronLeft, CreditCard, Lock, ShieldCheck, Calendar } from 'lucide-react';
import { UserProfile } from '../types';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeOnboarding } = useApp();
  const nameFromLogin = location.state?.name || 'Visitante';

  const [step, setStep] = useState(1);
  const totalSteps = 5; // Increased to 5 for Payment

  // Form Data
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: nameFromLogin,
    gender: 'male',
    age: 25,
    height: 170,
    currentWeight: 70,
    goalWeight: 60,
    activityLevel: 'moderate'
  });

  // Credit Card Data (Mock)
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const updateData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const finishOnboarding = () => {
    // Validate Card
    if (cardNumber.length < 16 || cardCvc.length < 3 || !cardExpiry) {
      alert("Por favor, preencha os dados do cartão corretamente.");
      return;
    }

    // Save to AppContext
    completeOnboarding(formData);
    // Redirect to Dashboard
    navigate('/', { replace: true });
  };

  // Input Mask Helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardExpiry(value);
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
      <div 
        className="bg-brand-500 h-full transition-all duration-300 ease-out" 
        style={{ width: `${(step / totalSteps) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        {step > 1 ? (
          <button onClick={prevStep} className="p-2 bg-gray-50 rounded-full text-gray-600">
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        <span className="font-bold text-gray-400 text-sm">Passo {step} de {totalSteps}</span>
        <div className="w-10"></div>
      </div>

      <ProgressBar />

      {/* STEP 1: GENDER & AGE */}
      {step === 1 && (
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sobre você</h2>
          <p className="text-gray-500 mb-8">Para calcularmos suas calorias, precisamos saber um pouco mais.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Gênero Biológico</label>
              <div className="flex space-x-4">
                <button 
                  onClick={() => updateData('gender', 'male')}
                  className={`flex-1 py-4 rounded-xl border-2 font-bold flex flex-col items-center space-y-2 transition-all ${
                    formData.gender === 'male' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <User size={24} />
                  <span>Masculino</span>
                </button>
                <button 
                  onClick={() => updateData('gender', 'female')}
                  className={`flex-1 py-4 rounded-xl border-2 font-bold flex flex-col items-center space-y-2 transition-all ${
                    formData.gender === 'female' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-100 text-gray-400'
                  }`}
                >
                  <User size={24} />
                  <span>Feminino</span>
                </button>
              </div>
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-3">Sua Idade</label>
               <input 
                 type="number" 
                 value={formData.age}
                 onChange={(e) => updateData('age', parseInt(e.target.value))}
                 className="w-full text-center p-4 text-2xl font-bold bg-gray-50 rounded-xl border border-gray-100 focus:border-brand-500 focus:outline-none"
               />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: MEASUREMENTS */}
      {step === 2 && (
        <div className="flex-1 flex flex-col">
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Suas Medidas</h2>
           <p className="text-gray-500 mb-8">Vamos usar isso para calcular seu IMC e TMB.</p>

           <div className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Ruler size={18} className="mr-2 text-brand-500" /> Altura (cm)
                </label>
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 px-4">
                  <input 
                    type="number" 
                    value={formData.height}
                    onChange={(e) => updateData('height', parseInt(e.target.value))}
                    className="flex-1 p-4 bg-transparent text-xl font-bold text-gray-900 focus:outline-none"
                  />
                  <span className="text-gray-400 font-medium">cm</span>
                </div>
             </div>

             <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                  <Weight size={18} className="mr-2 text-brand-500" /> Peso Atual (kg)
                </label>
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 px-4">
                  <input 
                    type="number" 
                    value={formData.currentWeight}
                    onChange={(e) => updateData('currentWeight', parseFloat(e.target.value))}
                    className="flex-1 p-4 bg-transparent text-xl font-bold text-gray-900 focus:outline-none"
                  />
                  <span className="text-gray-400 font-medium">kg</span>
                </div>
             </div>
           </div>
        </div>
      )}

      {/* STEP 3: GOALS */}
      {step === 3 && (
        <div className="flex-1 flex flex-col">
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu Objetivo</h2>
           <p className="text-gray-500 mb-8">Aonde você quer chegar?</p>

           <div className="space-y-6">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                   🎯 Meta de Peso (kg)
                </label>
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 px-4">
                  <input 
                    type="number" 
                    value={formData.goalWeight}
                    onChange={(e) => updateData('goalWeight', parseFloat(e.target.value))}
                    className="flex-1 p-4 bg-transparent text-xl font-bold text-gray-900 focus:outline-none"
                  />
                  <span className="text-gray-400 font-medium">kg</span>
                </div>
                {formData.currentWeight && formData.goalWeight && (
                  <p className="text-xs mt-2 text-right font-medium text-brand-600">
                    {formData.goalWeight < formData.currentWeight 
                      ? `Perder ${(formData.currentWeight - formData.goalWeight).toFixed(1)} kg` 
                      : formData.goalWeight > formData.currentWeight 
                        ? `Ganhar ${(formData.goalWeight - formData.currentWeight).toFixed(1)} kg`
                        : 'Manter peso'}
                  </p>
                )}
             </div>
           </div>
        </div>
      )}

      {/* STEP 4: ACTIVITY LEVEL */}
      {step === 4 && (
        <div className="flex-1 flex flex-col">
           <h2 className="text-2xl font-bold text-gray-900 mb-2">Nível de Atividade</h2>
           <p className="text-gray-500 mb-6">Quanto você se movimenta no dia a dia?</p>

           <div className="space-y-3">
             {[
               { id: 'sedentary', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
               { id: 'light', label: 'Levemente Ativo', desc: 'Exercício leve 1-3 dias/semana' },
               { id: 'moderate', label: 'Moderado', desc: 'Esportes 3-5 dias/semana' },
               { id: 'active', label: 'Muito Ativo', desc: 'Esportes pesados 6-7 dias' },
             ].map((level) => (
               <button 
                 key={level.id}
                 onClick={() => updateData('activityLevel', level.id)}
                 className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                   formData.activityLevel === level.id 
                     ? 'border-brand-500 bg-brand-50 shadow-md ring-1 ring-brand-500' 
                     : 'border-gray-200 bg-white hover:bg-gray-50'
                 }`}
               >
                 <div>
                   <p className={`font-bold ${formData.activityLevel === level.id ? 'text-brand-800' : 'text-gray-800'}`}>{level.label}</p>
                   <p className="text-xs text-gray-500">{level.desc}</p>
                 </div>
                 {formData.activityLevel === level.id && <Check size={20} className="text-brand-600" />}
               </button>
             ))}
           </div>
        </div>
      )}

      {/* STEP 5: PAYMENT (MANDATORY CARD) */}
      {step === 5 && (
        <div className="flex-1 flex flex-col animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">7 Dias Grátis</h2>
            <p className="text-brand-600 font-bold">Cobrança de R$ 0,00 hoje</p>
            <p className="text-gray-400 text-xs mt-1">Após o teste, R$ 29,90/mês. Cancele quando quiser.</p>
          </div>

          {/* Card Mockup */}
          <div className="mb-6 relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-8 bg-yellow-500/80 rounded-md flex items-center justify-center">
                <div className="w-8 h-5 border border-yellow-300/50 rounded-sm"></div>
              </div>
              <p className="font-bold italic opacity-50">OneLife</p>
            </div>
            
            <p className="text-xl font-mono tracking-widest mb-4">
              {cardNumber || '•••• •••• •••• ••••'}
            </p>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Nome</p>
                <p className="font-medium tracking-wide uppercase text-sm truncate max-w-[150px]">{cardName || 'SEU NOME'}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Validade</p>
                <p className="font-medium tracking-wide text-sm">{cardExpiry || 'MM/AA'}</p>
              </div>
            </div>
          </div>

          {/* Secure Form */}
          <div className="space-y-4">
             <div className="relative">
               <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Nome no Cartão"
                 value={cardName}
                 onChange={(e) => setCardName(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 transition-colors uppercase"
               />
             </div>

             <div className="relative">
               <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Número do Cartão"
                 value={cardNumber}
                 onChange={handleCardNumberChange}
                 maxLength={19}
                 className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 transition-colors font-mono"
               />
               <Lock size={14} className="absolute right-3 top-4 text-green-500" />
             </div>

             <div className="flex space-x-3">
               <div className="flex-1 relative">
                 <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="MM/AA"
                   value={cardExpiry}
                   onChange={handleExpiryChange}
                   maxLength={5}
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 transition-colors text-center"
                 />
               </div>
               <div className="w-1/3 relative">
                 <ShieldCheck className="absolute left-3 top-3.5 text-gray-400" size={18} />
                 <input 
                   type="tel" 
                   placeholder="CVC"
                   value={cardCvc}
                   onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').substring(0,3))}
                   maxLength={3}
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand-500 transition-colors text-center"
                 />
               </div>
             </div>
          </div>

          <div className="flex items-center justify-center mt-4 text-xs text-gray-400 space-x-1">
             <Lock size={10} />
             <span>Ambiente seguro. Seus dados são criptografados.</span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6">
        <button 
          onClick={nextStep}
          className={`w-full text-white p-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 ${
            step === 5 
              ? 'bg-green-600 hover:bg-green-700 shadow-green-200' 
              : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'
          }`}
        >
          {step === totalSteps ? (
            <div className="flex flex-col items-center leading-tight">
               <span>Ativar Teste & Cadastrar</span>
            </div>
          ) : (
            <>
               <span>Próximo</span>
               <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;