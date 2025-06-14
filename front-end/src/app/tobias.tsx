"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Tobias(props: any) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            {/* Container principal */}
            <div className="max-w-7xl mx-auto">
                
                {/* Seção superior com conteúdo principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-8">
                    
                    {/* Lado esquerdo - Informações principais */}
                    <div className="space-y-6">
                        {/* Logo do Trilo */}
                        <div className="flex items-center justify-start">
                            <Image
                                src="/Images/triloLogo3.png"
                                alt="Trilo Logo"
                                width={200}
                                height={100}
                                className="object-contain"
                            />
                        </div>
                        
                        {/* Subtítulo */}
                        <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                            Vamos te ajudar a planejar sua viagem
                        </p>
                        
                        {/* Texto explicativo */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">
                                No <span className="font-semibold text-indigo-600">Trilo</span>, você responde algumas perguntas rápidas e pronto: a gente monta um roteiro de viagem personalizado do jeitinho que você gosta — com passeios, sugestões, tempo livre e até dicas locais.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-3">
                                Seja um passeio curto ou uma aventura completa, o Trilo te ajuda a aproveitar cada dia sem se preocupar com o que fazer depois do café da manhã.
                            </p>
                        </div>
                        
                        {/* Botão Começar */}
                        <Link href="/questionnaire">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105 duration-200">
                                Começar
                            </button>
                        </Link>
                    </div>
                    
                    {/* Lado direito - Imagem de família */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="w-80 h-96 rounded-2xl shadow-lg overflow-hidden">
                            <Image
                                src="/Images/imagemFamilia.jpg"
                                alt="Família viajando"
                                width={320}
                                height={384}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Seção inferior - 4 imagens de viagens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Primeira imagem - Cristo Redentor (Ponto Turístico) */}
                    <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-64 rounded-xl shadow-lg overflow-hidden">
                            <Image
                                src="/Images/CristoRedentor-4.jpeg"
                                alt="Cristo Redentor"
                                width={300}
                                height={256}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <p className="text-white font-semibold">Pontos Turísticos</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Segunda imagem - Praia do Rio de Janeiro */}
                    <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-64 rounded-xl shadow-lg overflow-hidden">
                            <Image
                                src="/Images/praiaRioJaneiro.jpg"
                                alt="Praia do Rio de Janeiro"
                                width={300}
                                height={256}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <p className="text-white font-semibold">Praias</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Terceira imagem - Família na neve */}
                    <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-64 rounded-xl shadow-lg overflow-hidden">
                            <Image
                                src="/Images/familiaNeve.jpg"
                                alt="Família na neve"
                                width={300}
                                height={256}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <p className="text-white font-semibold">Aventura</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Quarta imagem - Família na neve 2 */}
                    <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-64 rounded-xl shadow-lg overflow-hidden">
                            <Image
                                src="/Images/familiaNeve2.jpg"
                                alt="Família na neve"
                                width={300}
                                height={256}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <p className="text-white font-semibold">Família</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}