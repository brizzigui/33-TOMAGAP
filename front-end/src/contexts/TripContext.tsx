'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TripData {
  destination: string;
  history: string[];
  itinerary: string[];
  culinary: string[];
  transportation: string[];
  visa: string[];
  warnings: string[];
  climate: string[];
  emergency: string[];
  bag: string[];
  quick: string[];
}

interface TripContextType {
  tripData: TripData | null;
  setTripData: (data: TripData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  formData: any;
  setFormData: (data: any) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  return (
    <TripContext.Provider
      value={{
        tripData,
        setTripData,
        isLoading,
        setIsLoading,
        formData,
        setFormData,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
