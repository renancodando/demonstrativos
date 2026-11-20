# ApacheTech · Quatro demonstrativos RNCWeb

Apresentação independente de **quatro modelos de site para a ApacheTech**, assistência técnica de celulares no bairro Ibirapuera, em Vitória da Conquista (BA).

**Link de apresentação:** https://apachetech-demonstrativos.vercel.app/

**Cada modelo:**
- https://apachetech-demonstrativos.vercel.app/?demo=1 — Institucional claro
- https://apachetech-demonstrativos.vercel.app/?demo=2 — CSCell escuro/interativo
- https://apachetech-demonstrativos.vercel.app/?demo=3 — Esqueleto com testes e orçamento
- https://apachetech-demonstrativos.vercel.app/?demo=4 — Técnica Alpha com bancada 3D

## Dados públicos utilizados

- **Empresa:** ApacheTech — assistência técnica de celulares
- **Endereço:** Av. Rondônia, 697C, Ibirapuera, Vitória da Conquista/BA, CEP 45075-270, Brasil
- **Telefone/WhatsApp:** (77) 98133-5884 — https://wa.me/5577981335884
- **Atendimento:** segunda a sexta 08h30–18h30; sábado 08h30–12h; domingo fechado
- **Google Maps:** https://www.google.com/maps/search/?api=1&query=ApacheTech%20Vit%C3%B3ria%20da%20Conquista%20BA
- **Fonte adicional:** https://www.santoguia.com.br/vitoria-da-conquista-ba/conserto-de-celular

As informações públicas devem ser confirmadas com a empresa antes de uso comercial definitivo. Instagram não foi incluído por falta de identificação oficial verificada. Diagnóstico, reparos, garantia, disponibilidade e valores ficam sob consulta; não há promessa de orçamento, resultados de SEO ou atendimento imediato. Esta é uma **demonstração produzida pela RNCWeb**, não o site oficial da empresa.

## Sobre os modelos

Os quatro demonstrativos são **cópias independentes** dos modelos usados no projeto da Gtechservice, com personalização específica e URLs separadas. Nada é carregado do repositório da Gtechservice.

O quarto modelo possui uma bancada 3D com Three.js e animações de rolagem; o terceiro inclui testes interativos do aparelho. O segundo adapta o modelo CSCell. Todos oferecem informações de contato, localização e formulário que prepara mensagem de WhatsApp.

## Rodar e publicar

Node.js 22 ou superior:

```bash
npm install
npm run build
npx serve dist
```

Vercel: comando de instalação `npm install`, compilação `npm run build`, diretório publicado `dist`.

**Projeto Vercel:** `apachetech-demonstrativos`.

O projeto é publicado pela API da Vercel; o GitHub ainda não está conectado a deploy automático. Alterar o código não publica nova versão sem executar outro deploy.

## Escopo de alterações

Esta migração **substitui somente a marca Mi Tech Jaú no repositório `renancodando/demonstrativos`** por ApacheTech. O projeto separado `renancodando/rncweb` (Gtechservice) e os cadastros comerciais do Órbita CRM não devem ser alterados.

© RNCWeb · Demonstrações conceituais, sujeitas à aprovação da empresa.
