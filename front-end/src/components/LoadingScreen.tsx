'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Plane, 
  Calendar, 
  Users, 
  Compass, 
  CheckCircle,
  Loader2
} from 'lucide-react';

interface LoadingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: number; // in seconds
}

const loadingSteps: LoadingStep[] = [
  {
    id: 1,
    title: "🌍 Explorando Destinos",
    description: "Analisando suas preferências e encontrando o local perfeito para sua aventura",
    icon: MapPin,
    duration: 10
  },
  {
    id: 2,
    title: "✈️ Planejando Sua Jornada",
    description: "Mapeando as melhores rotas e opções de transporte para sua viagem",
    icon: Plane,
    duration: 10
  },
  {
    id: 3,
    title: "📅 Criando Seu Roteiro",
    description: "Criando um cronograma personalizado dia a dia adaptado aos seus interesses",
    icon: Calendar,
    duration: 10
  },{
    id: 4,
    title: "👥 Personalizando Experiência em Grupo",
    description: "Adaptando atividades e recomendações para seu grupo de viagem",
    icon: Users,
    duration: 10
  },
  {
    id: 5,
    title: "🧭 Descobrindo Joias Escondidas",
    description: "Encontrando experiências locais únicas e atrações fora do roteiro tradicional",
    icon: Compass,
    duration: 10
  },
  {
    id: 6,
    title: "✨ Finalizando Sua Viagem dos Sonhos",
    description: "Dando os toques finais no seu plano de viagem perfeito",
    icon: CheckCircle,
    duration: 10
  }
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 10000; // 2 segundos por etapa
    
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 100; // Atualizar a cada 100ms
      
      const currentStepIndex = Math.floor(elapsedTime / stepDuration);
      const stepElapsed = elapsedTime % stepDuration;
      const stepProgressValue = Math.min((stepElapsed / stepDuration) * 100, 100);
      
      // Keep cycling through steps indefinitely
      const cycleIndex = currentStepIndex % loadingSteps.length;
      setCurrentStep(cycleIndex);
      setStepProgress(stepProgressValue);
      
      // Progress increases slowly but never reaches 100% automatically
      const baseProgress = Math.min((elapsedTime / (stepDuration * loadingSteps.length)) * 80, 80);
      setProgress(baseProgress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const currentStepData = loadingSteps[currentStep] || loadingSteps[loadingSteps.length - 1];
  const IconComponent = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Criando Sua Viagem Perfeita</h1>
          <p className="text-lg text-gray-600">
            Nosso assistente de viagem com IA está trabalhando para criar seu roteiro personalizado
          </p>
        </div>

        {/* Current Step Display */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <IconComponent className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            </div>
          </div>
            <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Etapa {currentStep + 1} de {loadingSteps.length}</span>
              <span>{Math.round(stepProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300 ease-out bg-indigo-600"
                style={{ width: `${stepProgress}%` }}
              />
            </div>
          </div>
        </div>        {/* Overall Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Progresso Geral</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-300 ease-out bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>        {/* Steps Overview */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {loadingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < currentStep || (index === currentStep && stepProgress === 100);
            const isCurrent = index === currentStep && stepProgress < 100;
            
            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-50 border-green-200'
                    : isCurrent
                    ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  <StepIcon 
                    className={`w-6 h-6 ${
                      isCompleted
                        ? 'text-green-600'
                        : isCurrent
                        ? 'text-indigo-600'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
                <p className={`text-xs text-center font-medium ${
                  isCompleted
                    ? 'text-green-700'
                    : isCurrent
                    ? 'text-indigo-700'
                    : 'text-gray-500'
                }`}>
                  {step.title.replace(/^[^\s]+\s/, '')} {/* Remove emoji for compact view */}
                </p>
              </div>
            );
          })}        </div>
      </div>
    </div>
  );
};
