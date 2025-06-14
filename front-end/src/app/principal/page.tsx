"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MapPin, Clock, Users, Info, Utensils, Calendar, Star, AlertTriangle, Plane, Globe, Thermometer, ShoppingBag, ArrowLeft } from "lucide-react";
import { useTripContext } from "@/contexts/TripContext";

// Estrutura de dados JSON adaptada ao formato do backend
const tripData = {
  destination: "hello",
  history: [
    ""
  ],
  itinerary: [
    "**Dia 1: Cultura e Relaxamento no Rio de Janeiro**\n\n- **Manhã:**\n  - Visita ao Museu de Arte Moderna (MAM) no Parque do Flamengo, onde você pode apreciar obras de artistas renomados em um ambiente tranquilo.\n  - Caminhada ao redor do parque, aproveitando o ar livre e as vistas da Baía de Guanabara.\n\n- **Tarde:**\n  - Almoço no restaurante do MAM ou em um dos muitos quiosques na praia do Flamengo.\n  - Após o almoço, visita ao Jardim Botânico do Rio de Janeiro. Um espaço verde que oferece uma experiência de imersão na natureza, com trilhas e diversas espécies de plantas.\n\n- **Noite:**\n  - Jantar em Ipanema, em um restaurante de alta gastronomia que oferece uma vista maravilhosa do pôr do sol.\n  - Passeio pela Praia de Ipanema, onde você pode relaxar e também aproveitar o ambiente vibrante da praia."
  ],
  culinary: [
    "A culinária típica do Rio de Janeiro é caracterizada pela mistura de influências indígenas, africanas e portuguesas. A cidade é famosa por sua rica gastronomia, que oferece uma variedade de pratos saborosos, muitos deles consumidos em quiosques à beira da praia e em restaurantes típicos. Os ingredientes frescos, especialmente frutos do mar e produtos locais, são a base para muitas receitas cariocas.",
    "1. **Feijoada**\n   - A feijoada é um prato tradicional feito com feijão preto e várias carnes, como carne de porco e linguiça, geralmente servido com arroz, farofa, couve e laranja.",
    "2. **Pão de Queijo**\n   - O pão de queijo é uma pequena iguaria feita com polvilho e queijo, muito apreciada como lanche ou café da manhã, com uma textura macia e crocante.",
    "3. **Moqueca**\n   - A moqueca é um prato de peixe cozido em molho de dendê, leite de coco, cebola e pimentões, vindo principalmente da tradição baiana, mas muito consumida no Rio também.",
    "4. **Açaí**\n   - O açaí é uma bebida ou sobremesa feita com a polpa do fruto do açaí, geralmente batida e servida com acompanhamentos como granola, banana e mel.",
    "5. **Caipirinha**\n   - A caipirinha é a bebida mais icônica do Brasil, feita com cachaça, limão, açúcar e gelo, perfeita para refrescar em um dia de calor na praia."
  ],
  transportation: [
    "No Rio de Janeiro, os turistas têm várias opções de transporte para se locomover pela cidade, incluindo transporte público, táxis, aplicativos de transporte e aluguel de carros.\n\n**Transporte Público:**\n\n1. **Ônibus:** A cidade conta com uma extensa rede de ônibus que cobre diversas áreas. Os ônibus são identificados por números e destinos, podendo ser consultados em aplicativos ou no site da prefeitura. Para utilizar, é necessário comprar um cartão único, que pode ser adquirido em pontos de venda e recarga por toda a cidade. \n\n2. **Metrô:** O metrô do Rio tem quatro linhas que ligam áreas importantes, como Copacabana, Ipanema e a Zona Sul ao Centro da cidade. O bilhete pode ser comprado em máquinas ou bilheteiras nas estações. O cartão pré-pago também está disponível e proporciona tarifas reduzidas para várias viagens. \n\n3. **VLT (Veículo Leve sobre Trilhos):** O VLT opera na região central, facilitando a locomoção entre pontos turísticos, com integração ao metrô e ônibus. A bilhetagem é similar à do metrô, com a opção de cartão pré-pago.\n\n4. **Bonde de Santa Teresa:** Uma atração turística, oferece uma experiência única com vistas deslumbrantes do bairro de Santa Teresa. O bilhete pode ser comprado no próprio bonde.\n\n**Táxi e Transporte por Aplicativo:**\nTáxis são amplamente disponíveis em pontos estratégicos e podem ser chamados via telefone ou apps. Aplicativos como Uber e 99 são muito populares e podem ser usados para se deslocar com facilidade.\n\n**Aluguel de Carros:**\nVárias locadoras atuam no Rio, sendo uma opção para famílias que desejam explorar a cidade com mais liberdade. No entanto, é importante considerar o trânsito intenso e a dificuldade de estacionar em áreas como Copacabana e Ipanema.\n\n**Aeroportos:**\nRio de Janeiro possui dois aeroportos principais:\n1. **Aeroporto Internacional Tom Jobim (GIG):** Localizado em Galeão, serve voos nacionais e internacionais. Para chegar ao centro, opções incluem ônibus, táxis e serviços de aplicativos. Há também um serviço de ônibus executivo que conecta ao aeroporto.\n   \n2. **Aeroporto Santos Dumont (SDU):** Mais próximo do centro, principalmente ideal para voos domésticos. O acesso é fácil através de táxis, ônibus ou a pé, dependendo do seu destino final.\n\n**Considerações Finais:**\nO transporte público no Rio é uma maneira econômica e prática de explorar a cidade, mas é aconselhável estar atento aos horários e à segurança, especialmente à noite. Apps de transporte oferecem uma alternativa mais segura e confortável. Para visitas a museus, praias e centros culturais, planejamento prévio das rotas e horários pode otimizar o tempo da viagem."
  ],
  visa: [
    "Cidadãos japoneses não precisam de visto para estadias de até 90 dias no Brasil, incluindo o Rio de Janeiro. No entanto, é necessário apresentar um passaporte válido na entrada do país. É recomendável também ter um comprovante de passagem de volta e, se possível, um comprovante de acomodação durante a estadia. Não há necessidade de documentação adicional específica para turismo."
  ],
  warnings: [
    "**Cuidados e Riscos:**\n- Evitar áreas conhecidas por violência e criminalidade, especialmente à noite.\n- Cuidado com pertences pessoais em locais públicos e durante passeios, como praias e mercados.\n- Estar atento a fraudes comuns, como o golpe do \"cercadinho\", onde o turista é cercado por pessoas pedindo dinheiro.\n- Sempre utilizar táxi ou aplicativos de transporte confiáveis, em vez de aceitar caronas de estranhos.",
    "**Diferenças Culturais:**\n- O Brasil tem uma cultura mais informal; cumprimentos físicos como abraços e beijos são comuns entre amigos e conhecidos.\n- A pontualidade pode ser mais flexível; eventos podem começar mais tarde do que o anunciado.\n- A descontração é valorizada, e o vestuário pode ser mais casual do que em muitos lugares no Japão; é comum o uso de roupas de banho na praia.",
    "**Cuidados Especiais:**\n- Mulheres devem evitar andar sozinhas à noite e estar cientes de locais com aglomerações, onde o assédio pode ocorrer.\n- Para crianças, assegurar que estejam sempre sob vigilância e evitar levá-las a áreas de grande agitação.\n- Minorias LGBT+ devem estar cientes de que, enquanto as grandes cidades tendem a ser mais aceitantes, existem áreas onde pode haver hostilidade; é recomendável pesquisar sobre a cultura local."
  ],
  climate: [
    "Em Junho, o clima do Rio de Janeiro é ameno, com temperaturas agradáveis. A média das temperaturas máximas gira em torno de **25°C**, enquanto a média das temperaturas mínimas fica em torno de **18°C**. Junho é considerado um mês mais seco na cidade, com menos chuvas em comparação a outros meses, e não é tipicamente associado a desastres climáticos."
  ],
  emergency: [
    "**Números de Emergência:**\n1. **Polícia**: 190 \n2. **Bombeiros**: 193 \n3. **Ambulância**: 192",
    "**Funcionamento dos Serviços de Emergência:**\n- Os serviços de emergência no Rio de Janeiro operam 24 horas por dia. O acionamento pode ser feito através dos números de emergência listados. A polícia atende a questões de segurança e ordem pública, os bombeiros lidam com incêndios e resgates, e as ambulâncias prestam socorro médico e transporte para hospitais.",
    "**Qualidade, Confiabilidade e Custo:**\n- Os serviços de emergência são gratuitos e, em geral, considerados confiáveis, embora a qualidade possa variar. Em situações de emergência, a resposta costuma ser rápida, mas a capacidade de atendimento pode ser afetada por fatores como a demanda e a localização."
  ],
  bag: [
    "**Roupas:**\n   - Camisetas de mangas curtas (dias quentes)\n   - Camisas de manga longa leves (para a noite)\n   - Shorts e saias\n   - Vestidos leves\n   - Um casaco ou suéter (para a noite, pois pode esfriar)",
    "**Calçados:**\n   - Sandálias confortáveis (para passeios e praias)\n   - Tênis ou sapatilhas (para caminhadas)\n   - Chinelo (para praia)",
    "**Outros:**\n   - Protetor solar (para proteção contra o sol)\n   - Óculos de sol\n   - Chapéu ou boné (para se proteger do sol)\n   - Garrafa de água reutilizável (manter-se hidratado)\n   - Mochila leve (para passeios e compras)\n   - Câmera ou smartphone (para registrar os momentos)\n   - Adaptador de tomada (caso necessário)"
  ],
  quick: [
    "Português", "Real", "Brasil", "GMT-3"
  ]
};

export default function Principal() {
  const router = useRouter();
  const { tripData } = useTripContext();
  const [activeTab, setActiveTab] = useState("itinerary");

  // Redirect to questionnaire if no trip data
  useEffect(() => {
    if (!tripData) {
      router.push('/questionnaire');
    }
  }, [tripData, router]);

  // Show loading or redirect if no data
  if (!tripData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your travel plan...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "itinerary", label: "Itinerário", icon: <Calendar className="w-5 h-5" /> },
    { id: "culinary", label: "Culinária", icon: <Utensils className="w-5 h-5" /> },
    { id: "transportation", label: "Transporte", icon: <MapPin className="w-5 h-5" /> },
    { id: "visa", label: "Documentos", icon: <Info className="w-5 h-5" /> },
    { id: "warnings", label: "Avisos", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "climate", label: "Clima", icon: <Thermometer className="w-5 h-5" /> },
    { id: "emergency", label: "Emergência", icon: <Plane className="w-5 h-5" /> },
    { id: "bag", label: "Bagagem", icon: <ShoppingBag className="w-5 h-5" /> }
  ];

  // Componentes customizados para o ReactMarkdown
  const markdownComponents = {
    h1: ({ children }: any) => <h1 className="text-2xl font-bold text-gray-800 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-bold text-gray-800 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-semibold text-gray-800 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-base font-semibold text-gray-800 mb-2">{children}</h4>,
    p: ({ children }: any) => <p className="text-gray-600 mb-3 leading-relaxed">{children}</p>,
    ul: ({ children }: any) => <ul className="list-none space-y-2 mb-4">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600">{children}</ol>,
    li: ({ children }: any) => (
      <li className="flex items-start gap-2 text-gray-600">
        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-gray-800">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-700">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-200 pl-4 py-2 bg-gray-50 rounded-r text-gray-700 mb-4">
        {children}
      </blockquote>
    ),
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "itinerary":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Roteiro da Viagem</h3>            <div className="space-y-4">
              {tripData.itinerary.map((day, index) => (
                <div key={index} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {day}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );      case "culinary":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Culinária Local</h3>
            <div className="space-y-4">
              {tripData.culinary.map((item, index) => (
                <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );      case "transportation":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Transporte</h3>
            <div className="space-y-4">
              {tripData.transportation.map((item, index) => (
                <div key={index} className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );      case "visa":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Documentação</h3>
            <div className="space-y-4">
              {tripData.visa.map((item, index) => (
                <div key={index} className="border border-indigo-200 bg-indigo-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );

      case "warnings":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Avisos Importantes</h3>
            <div className="space-y-4">
              {tripData.warnings.map((item, index) => (
                <div key={index} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );

      case "climate":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Clima</h3>
            <div className="space-y-4">
              {tripData.climate.map((item, index) => (
                <div key={index} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );

      case "emergency":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Emergências</h3>
            <div className="space-y-4">
              {tripData.emergency.map((item, index) => (
                <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );      case "bag":
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Lista de Bagagem</h3>
            <div className="space-y-4">
              {tripData.bag.map((item, index) => (
                <div key={index} className="border border-teal-200 bg-teal-50 rounded-lg p-4">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Informações Rápidas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800">Idioma</h4>
                <p className="text-gray-600">{tripData.quick[0]}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800">Moeda</h4>
                <p className="text-gray-600">{tripData.quick[1]}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800">País</h4>
                <p className="text-gray-600">{tripData.quick[2]}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800">Fuso Horário</h4>
                <p className="text-gray-600">{tripData.quick[3]}</p>
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/questionnaire')}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
        
        {/* Seção superior */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          
          {/* Informações do destino */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">{tripData.destination}</h1>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-sm">
              <p className="text-gray-700 leading-relaxed">{tripData.history}</p>
            </div>
          </div>

          {/* Imagem única */}
          {/* <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-80 rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={tripData.destination.image}
                alt={tripData.destination.name}
                width={400}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div> */}
        </div>

        {/* Barras de navegação */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Área de conteúdo */}
        <div className="mb-8">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}