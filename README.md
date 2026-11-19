# Mi Tech Jaú · 4 demonstrativos RNCWeb

Quatro propostas de site para a Mi Tech Celular — Loja 1, em Jaú/SP, prontas para apresentação com um link próprio.

**Empresa:** Mi Tech Celular — Assistência Técnica em Celulares (Loja 1), Rua Lourenço Prado, 364, Centro, Jaú/SP, CEP 17201-000.
**Contato público:** (14) 99890-1897 · WhatsApp https://wa.me/5514998901897
**Instagram:** https://www.instagram.com/mitech_jau/
**Horário informado:** segunda a sexta, 08h–18h; sábado, 08h–17h; domingo fechado.

As atividades apresentadas incluem diagnóstico, manutenção e reparos de celulares, sempre com preços, prazos, garantia, peças e serviços específicos sob consulta. Estas páginas são demonstrações conceituais da RNCWeb e não se apresentam como site oficial.

## Quatro modelos

1. Tradicional: `/?demo=1` — site institucional claro com serviços, localização, avaliações e formulário para WhatsApp.
2. CSCell: `/?demo=2` — identidade escura e vermelha, interações e efeitos do projeto CSCell, com a marca Mi Tech Jaú.
3. Esqueleto: `/?demo=3` — grade interativa, testes opcionais do celular (toque, pixels, som, vibração e bateria) e orçamento.
4. Técnica Alpha: `/?demo=4` — bancada e smartphone em 3D com Three.js, rolagem cinematográfica e formulário para WhatsApp.

As quatro versões estão incluídas neste repositório, separadas de quaisquer outros projetos para outros clientes.

## Compilar e publicar

Requer Node.js 22 ou superior.

```bash
npm install
npm run build
npx serve dist
```

Configuração Vercel: `npm install`; `npm run build`; diretório de saída `dist`; Node 22.x.

A versão CSCell carrega a ilustração original de celular do repositório público `renancodando/sonotechcell`. Os demais arquivos estão armazenados neste repositório; o modelo 3D é compilado localmente pelo Vite.

Informações da empresa referenciadas pelo perfil público Mi Tech Celular — Loja 1 (Google Maps). Confirmar dados e serviços com a empresa antes de usar em produção comercial.

Projeto desenvolvido pela RNCWeb.
