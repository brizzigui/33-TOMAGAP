# Trilo – Planejamento de Viagens Personalizado

Nome da equipe:
- TOMA GAP

Integrantes da equipe:
- Ana Lilian Alfonso Toledo – UX Designer
- Gabriel Stieguemeier  – Desenvolvedor back-end
- Guilherme Brizzi – Desenvolvedor back-end
- Jaime Antonio Daniel Filho – Desenvolvedor front-end
- Tobias Viero de Oliveira – Desenvolvedor front-end


## Tema / Área do problema:
Planejamento inteligente de viagens e personalização da experiência turística com apoio de inteligência artificial.

## O problema a ser resolvido:
Viajar para um destino desconhecido pode ser uma experiência desafiadora. Turistas muitas vezes enfrentam dificuldades para encontrar informações confiáveis e organizadas sobre o local, como pontos turísticos relevantes ao seu perfil, transporte local, clima, documentação necessária e até mesmo dicas culturais. A falta de planejamento adequado pode comprometer a experiência da viagem, gerar gastos desnecessários e situações inesperadas.


## Descrição da solução proposta:
O Trilo é uma plataforma inteligente de planejamento de viagens que atua como um guia turístico virtual. A partir de informações fornecidas pelo usuário — como cidade de destino, mês da viagem, número de dias, tipo de grupo, orçamento, ritmo, preferências de atividades e nacionalidade — o Trilo gera automaticamente um guia de viagem completo e personalizado.

O guia inclui:
- Itinerário diário com atividades alinhadas aos interesses do usuário.
- Culinária local com pratos típicos recomendados.
- Transporte com opções de mobilidade na cidade.
- Documentação necessária com base na nacionalidade.
- Avisos importantes sobre riscos, costumes e cuidados.
- Clima previsto para o período da viagem.
- Contatos de emergência locais.
- Dicas de bagagem, como roupas e acessórios recomendados.


A proposta é entregar ao usuário uma experiência de planejamento rápida, prática e adaptada ao seu perfil, utilizando IA para tornar a preparação da viagem tão prazerosa quanto a viagem em si.


## Tecnologias utilizadas:
### Back-end
- Python: Linguagem de programação principal para o desenvolvimento do back-end.
- Flask: biblioteca Python para servidores leves e rápidos.
- API da OpenAI, usando o modelo gpt-4o-mini
### Front-end
- Next.js: Framework baseado em React para desenvolvimento de aplicações web modernas e responsivas.
- TypeScript: Linguagem de programação que adiciona tipagem estática ao JavaScript, garantindo maior segurança e robustez no código.
- PostCSS: Ferramenta para transformar estilos CSS com plugins, permitindo maior flexibilidade na estilização.
- CSS: Para estilização da interface e criação de uma experiência visual atraente.

## Instruções de instalação e execução:
A aplicação está disponível em [trilo.brizzigui.com](https://trilo.brizzigui.com).

Alternativamente, você pode hospedar a aplicação localmente.

Para executar o servidor de back-end, é necessário Python e as bibliotecas auxiliares. Vejamos os passos:
Caso já não tenha instalado, instale o Python.
Instale as dependências com `pip install -r requirements.txt`.
Execute `python main.py`.

Para executar o servidor de front-end
Caso já não tenha instalado, instale o Node.js
Usando `npm install`, instale os pacotes necessários.
Copie o arquivo `.env.example` para `.env.local` e substitui o valor de `NEXT_PUBLIC_API_URL` para o endereço da API.
Rode `npm run build`
Rode `npm run start`

