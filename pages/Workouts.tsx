import React, { useState } from 'react';
import { WORKOUTS } from '../constants';
import { Play, Clock, Flame, CheckCircle, ChevronDown, ChevronUp, Info, ArrowLeft, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Workout } from '../types';

const Workouts: React.FC = () => {
  const { addWorkoutLog } = useApp();
  
  // States
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const [completedId, setCompletedId] = useState<string | null>(null);

  const handleComplete = (e: React.MouseEvent, workoutId: string, calories: number) => {
    e.stopPropagation();
    addWorkoutLog({
      id: Date.now().toString(),
      workoutId,
      timestamp: Date.now(),
      caloriesBurned: calories
    });
    setCompletedId(workoutId);
    setTimeout(() => setCompletedId(null), 3000);
  };

  const toggleExercise = (index: number) => {
    if (expandedExercise === index) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(index);
    }
  };

  // --- DETAIL VIEW (When a workout is selected) ---
  if (selectedWorkout) {
    return (
      <div className="pb-24 pt-4 px-0 min-h-screen bg-white animate-fade-in">
        {/* Navigation Header */}
        <div className="px-4 flex items-center space-x-3 mb-4 sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10 border-b border-gray-50">
          <button 
            onClick={() => setSelectedWorkout(null)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg text-gray-900 truncate">{selectedWorkout.title}</h2>
        </div>

        {/* Hero Section */}
        <div className="px-4 mb-6">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-md mb-4">
             <img src={selectedWorkout.imageUrl} alt={selectedWorkout.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <div className="flex space-x-3 text-white text-sm font-medium">
                  <div className="flex items-center space-x-1 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Clock size={14} />
                    <span>{selectedWorkout.durationMin} min</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-orange-500/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    <Flame size={14} />
                    <span>{selectedWorkout.caloriesBurned} kcal</span>
                  </div>
                </div>
             </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{selectedWorkout.description}</p>
        </div>

        {/* Exercise List */}
        <div className="px-4 space-y-4">
          <h3 className="font-bold text-gray-900 text-lg flex items-center">
            Exercícios
            <span className="ml-2 text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{selectedWorkout.exercises.length} movimentos</span>
          </h3>
          
          <div className="space-y-3">
            {selectedWorkout.exercises.map((exercise, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all bg-white">
                {/* Header (Always Visible) */}
                <div 
                  onClick={() => toggleExercise(index)}
                  className="flex items-center p-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                >
                  {/* Thumbnail / Number */}
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 text-gray-400 font-bold overflow-hidden">
                    <span className="text-sm">#{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm">{exercise.name}</h4>
                    <p className="text-xs text-brand-600 font-medium">{exercise.reps}</p>
                  </div>

                  <div className="text-gray-400">
                    {expandedExercise === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expanded Content (Instructions ONLY) */}
                {expandedExercise === index && (
                  <div className="bg-gray-50 p-4 border-t border-gray-100 animate-fade-in">
                    <div className="flex items-start space-x-2">
                       <Info size={16} className="text-brand-500 mt-0.5 flex-shrink-0" />
                       <p className="text-sm text-gray-700 leading-snug">{exercise.instructions}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="h-6"></div> {/* Spacer */}
          
          <button 
             onClick={(e) => handleComplete(e, selectedWorkout.id, selectedWorkout.caloriesBurned)}
             disabled={completedId === selectedWorkout.id}
             className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 transition-all mb-6 ${
                completedId === selectedWorkout.id 
                ? 'bg-green-100 text-green-700 shadow-none'
                : 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-200'
             }`}
          >
             {completedId === selectedWorkout.id ? (
               <>
                 <CheckCircle size={24} />
                 <span>Treino Concluído!</span>
               </>
             ) : (
               <>
                 <Play size={24} fill="currentColor" />
                 <span>Iniciar Treino</span>
               </>
             )}
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW (List of workouts) ---
  return (
    <div className="pb-24 pt-6 px-4 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Treinos em Casa</h1>
        <div className="bg-brand-50 p-2 rounded-full text-brand-600">
           <Calendar size={20} />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Siga o cronograma semanal para obter os melhores resultados sem precisar de academia.
      </p>

      {/* Workout List */}
      <div className="space-y-4">
        {WORKOUTS.map((workout) => (
            <div 
              key={workout.id} 
              onClick={() => setSelectedWorkout(workout)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group active:scale-[0.98] transition-transform"
            >
              <div className="h-40 bg-gray-200 relative overflow-hidden">
                 <img src={workout.imageUrl} alt={workout.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                 
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                   <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-white font-bold text-xl leading-tight">{workout.title}</h3>
                      </div>
                   </div>
                 </div>
              </div>
              
              <div className="p-4 flex justify-between items-center">
                 <div className="flex space-x-4 text-sm text-gray-500">
                   <div className="flex items-center space-x-1">
                     <Clock size={16} />
                     <span>{workout.durationMin} min</span>
                   </div>
                   <div className="flex items-center space-x-1 text-orange-500">
                     <Flame size={16} />
                     <span>{workout.caloriesBurned} kcal</span>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-2 rounded-full text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                   <Play size={20} fill="currentColor" />
                 </div>
              </div>
            </div>
          ))}
      </div>

      {/* Info Tip */}
      <div className="bg-brand-50 p-4 rounded-xl flex items-start space-x-3 border border-brand-100">
         <Info size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
         <p className="text-xs text-brand-800 leading-relaxed">
           <strong>Dica:</strong> Se perder um dia, não desanime! Apenas continue de onde parou ou pule para o treino do dia atual.
         </p>
      </div>
    </div>
  );
};

export default Workouts;