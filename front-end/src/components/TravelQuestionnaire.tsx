'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Users, 
  Baby, 
  UserCheck,
  DollarSign,
  Coins,
  Banknote,
  Coffee,
  Zap,
  Flame,
  Palette,
  Music,
  Waves,
  Moon,
  Gamepad2,
  ShoppingBag,
  TreePine,
  Mountain,
  MapPin,
  Loader2
} from 'lucide-react';
import { SelectableCard } from './ui/SelectableCard';
import { FormSection } from './ui/FormSection';
import { TextInput } from './ui/TextInput';
import { SelectDropdown } from './ui/SelectDropdown';
import { LoadingScreen } from './LoadingScreen';
import { useTripContext } from '@/contexts/TripContext';
import { ApiService, type TravelFormData } from '@/lib/services/apiService';
import { FORM_VALIDATION } from '@/lib/constants/api';

const groupOptions = [
  { id: 'Sozinho', title: 'Solo', description: 'Viajar sozinho', icon: User },
  { id: 'Em Casal', title: 'Casal', description: 'Viajar com seu parceiro(a)', icon: UserCheck },
  { id: 'Em Família', title: 'Família', description: 'Viajar com familiares', icon: Baby },
  { id: 'Com Amigos', title: 'Amigos', description: 'Viajar com amigos', icon: Users },
];

const budgetOptions = [
  { id: 'Baixo', title: 'Baixo', description: 'Opções econômicas', icon: Coins },
  { id: 'Médio', title: 'Médio', description: 'Gastos moderados', icon: DollarSign },
  { id: 'Alto', title: 'Alto', description: 'Experiências premium', icon: Banknote },
];

const rhythmOptions = [
  { id: 'Calmo', title: 'Calmo', description: 'Relaxante e tranquilo', icon: Coffee },
  { id: 'Moderado', title: 'Moderado', description: 'Atividades equilibradas', icon: Zap },
  { id: 'Intenso', title: 'Intenso', description: 'Aventura cheia de ação', icon: Flame },
];

const interestOptions = [
  { id: 'Cultura', title: 'Cultura', description: 'Museus, história, arte', icon: Palette },
  { id: 'Praia', title: 'Praia', description: 'Atividades costeiras e aquáticas', icon: Waves },
  { id: 'Vida Noturna', title: 'Vida Noturna', description: 'Bares, baladas, entretenimento', icon: Moon },
  { id: 'Esportes', title: 'Esportes', description: 'Atividades esportivas', icon: Gamepad2 },
  { id: 'Compras', title: 'Compras', description: 'Mercados e lojas', icon: ShoppingBag },
  { id: 'Natureza', title: 'Natureza', description: 'Parques e locais naturais', icon: TreePine },
  { id: 'Aventura', title: 'Aventuras Radicais', description: 'Esportes extremos e emoções', icon: Mountain },
];

const monthOptions = [
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
];

interface DestinationOption {
  place_id: string;
  display_name: string;
  name: string;
  country: string;
  state?: string;
  type: string;
}

interface DestinationInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TravelQuestionnaire: React.FC = () => {
  const router = useRouter();
  const { setTripData, setIsLoading, isLoading } = useTripContext();
  const [showLoading, setShowLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    group: '',
    month: '',
    days: '',
    budget: '',
    nationality: '',
    rhythm: '',
    activities: [],
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const updateField = (field: keyof TravelFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(interestId)
        ? prev.activities.filter(id => id !== interestId)
        : [...prev.activities, interestId]
    }));
    
    // Clear activities error when user selects an activity
    if (errors.activities) {
      setErrors(prev => ({
        ...prev,
        activities: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Check required fields
    FORM_VALIDATION.REQUIRED_FIELDS.forEach(field => {
      const value = formData[field as keyof TravelFormData];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[field] = 'Esse campo e obrigatório.';
      }
    });

    // Additional validations
    if (formData.activities.length < FORM_VALIDATION.MIN_ACTIVITIES) {
      newErrors.activities = 'Selecio ne pelo menos uma atividade.';
    }

    const daysNum = parseInt(formData.days);
    if (isNaN(daysNum) || daysNum < FORM_VALIDATION.MIN_DAYS || daysNum > FORM_VALIDATION.MAX_DAYS) {
      newErrors.days = `Os dias devem estar entre ${FORM_VALIDATION.MIN_DAYS} e ${FORM_VALIDATION.MAX_DAYS}.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setShowLoading(true);    try {
      const tripData = await ApiService.generateTrip(formData);
      setTripData(tripData);
      setIsNavigating(true);
      
      // Navigate to principal page immediately
      router.push('/principal');
    } catch (error) {
      console.error('Error generating trip:', error);

      if (error instanceof Error) {
        alert(`Erro ao gerar a viagem. Tente novamente mais tarde.`);
        setIsSubmitting(false);
        setShowLoading(false);
        setIsNavigating(false);
        return;
      }
      
      setIsNavigating(true);
      // Navigate to principal page mesmo com erro
      router.push('/principal');
    }
  };

  const handleLoadingComplete = () => {
    // This function will be called when the API response is received
    // No longer used for automatic completion
  };
  // Show loading screen during trip generation
  if (showLoading || isNavigating) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Planeje Sua Viagem Perfeita</h1>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
          <p className="text-gray-700 leading-relaxed">Conte-nos sobre suas preferências de viagem e nós ajudaremos você a criar um roteiro incrível.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">        {/* Destination */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Para onde você gostaria de ir?" 
            description="Digite o seu destino dos sonhos"
            required
          >
            <DestinationInput
              id="destination"
              value={formData.destination}
              onChange={(value: string) => updateField('destination', value)}
              placeholder="ex: Paris, Tóquio, Nova York..."
            />
            {errors.destination && (
              <p className="mt-2 text-sm text-red-600">{errors.destination}</p>
            )}
          </FormSection>
        </div>

        {/* Tipo de Grupo */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Com quem você está viajando?" 
            description="Selecione o tipo do seu grupo de viagem"
            required
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">              {groupOptions.map((option) => (
                <SelectableCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={formData.group === option.id}
                  onClick={() => updateField('group', option.id)}
                />
              ))}
            </div>
            {errors.group && (
              <p className="mt-2 text-sm text-red-600">{errors.group}</p>
            )}
          </FormSection>
        </div>

        {/* Mês */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Quando você quer viajar?" 
            description="Escolha o mês de sua preferência"
            required
          >            <SelectDropdown
              id="month"
              value={formData.month}
              onChange={(value: string) => updateField('month', value)}
              options={monthOptions}
              placeholder="Selecione um mês"
            />
            {errors.month && (
              <p className="mt-2 text-sm text-red-600">{errors.month}</p>
            )}
          </FormSection>
        </div>

        {/* Duração */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Quantos dias você vai viajar?" 
            description="Digite a duração da sua viagem"
            required
          >            <TextInput
              id="duration"
              type="number"
              value={formData.days}
              onChange={(value: string) => updateField('days', value)}
              placeholder="e.g., 7"
              min={1}
              max={365}
            />
            {errors.days && (
              <p className="mt-2 text-sm text-red-600">{errors.days}</p>
            )}
          </FormSection>
        </div>

        {/* Orçamento */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Qual é a sua faixa de orçamento?" 
            description="Selecione o seu nível de gastos preferido"
            required
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">              {budgetOptions.map((option) => (
                <SelectableCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={formData.budget === option.id}
                  onClick={() => updateField('budget', option.id)}
                />
              ))}
            </div>
            {errors.budget && (
              <p className="mt-2 text-sm text-red-600">{errors.budget}</p>
            )}
          </FormSection>
        </div>

        {/* Nacionalidade */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Qual é a sua nacionalidade?" 
            description="Isso nos ajuda a fornecer informações de viagem relevantes"
            required
          >            <TextInput
              id="nationality"
              value={formData.nationality}
              onChange={(value: string) => updateField('nationality', value)}
              placeholder="ex: Brasileiro, Americano, Alemão..."
            />
            {errors.nationality && (
              <p className="mt-2 text-sm text-red-600">{errors.nationality}</p>
            )}
          </FormSection>
        </div>

        {/* Ritmo de Viagem */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="Qual é o seu ritmo de viagem preferido?" 
            description="Quão intensa você quer que seja sua viagem?"
            required
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">              {rhythmOptions.map((option) => (
                <SelectableCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={formData.rhythm === option.id}
                  onClick={() => updateField('rhythm', option.id)}
                />
              ))}
            </div>
            {errors.rhythm && (
              <p className="mt-2 text-sm text-red-600">{errors.rhythm}</p>
            )}
          </FormSection>
        </div>

        {/* Interesses */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <FormSection 
            title="No que você está interessado?" 
            description="Selecione todos que se aplicam (você pode escolher múltiplos)"
            required
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">              {interestOptions.map((option) => (
                <SelectableCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={formData.activities.includes(option.id)}
                  onClick={() => toggleInterest(option.id)}
                />
              ))}
            </div>
            {errors.activities && (
              <p className="mt-2 text-sm text-red-600">{errors.activities}</p>
            )}
          </FormSection>
        </div>

        {/* Botão de Envio */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm ${
              isSubmitting
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Criando seu Plano de Viagem...' : 'Criar meu Plano de Viagem'}
          </button>
        </div>
      </form>
    </div>
  );
};

export const DestinationInput: React.FC<DestinationInputProps> = ({
  id,
  value,
  onChange,
  placeholder = "Digite um destino..."
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DestinationOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce para evitar muitas requisições
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue.trim().length >= 3) {
        searchDestinations(inputValue.trim());
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const searchDestinations = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1&accept-language=pt-BR,pt,en`
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedSuggestions: DestinationOption[] = data.map((item: any) => ({
          place_id: item.place_id,
          display_name: item.display_name,
          name: item.name || item.display_name.split(',')[0],
          country: item.address?.country || '',
          state: item.address?.state || item.address?.region || '',
          type: item.type || 'place'
        }));
        
        setSuggestions(formattedSuggestions);
        setShowDropdown(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Erro ao buscar destinos:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSuggestionClick = (suggestion: DestinationOption) => {
    const formattedValue = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
    setInputValue(formattedValue);
    onChange(formattedValue);
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayName = (suggestion: DestinationOption) => {
    const parts = [];
    if (suggestion.name) parts.push(suggestion.name);
    if (suggestion.state) parts.push(suggestion.state);
    if (suggestion.country) parts.push(suggestion.country);
    return parts.join(', ');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city':
      case 'town':
      case 'village':
        return '🏙️';
      case 'country':
        return '🌍';
      case 'state':
        return '📍';
      default:
        return '📌';
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <MapPin className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-indigo-50 border-indigo-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg mt-0.5 flex-shrink-0">
                  {getTypeIcon(suggestion.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {suggestion.state && `${suggestion.state}, `}
                    {suggestion.country}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
