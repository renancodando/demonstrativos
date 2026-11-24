/* Configuração central do site. Troque os textos e dados da empresa aqui. */
window.configuracaoEmpresa = {
  marca: { nome: "Master Tech", subtitulo: "Assistência Técnica de Celulares" },
  nomeEmpresa: "Master Tech - Conserto de Celular",

  // Número real com DDI e DDD, só dígitos (ex.: 5567999999999). Vazio = contato desativado com aviso.
  whatsapp: "",
  mensagemPadrao: "Olá! Vim pelo site e gostaria de um orçamento de reparo.",

  endereco: {
    rua: "Av. São Roque, 563 - sala 3",
    cidade: "Bento Gonçalves - RS",
    referencia: "Confirme o horário antes de visitar",
    linkMapa: "https://www.google.com/maps/search/?api=1&query=Av.%20S%C3%A3o%20Roque%2C%20563%20-%20sala%203%2C%20Universit%C3%A1rio%2C%20Bento%20Gon%C3%A7alves%20-%20RS%2C%2095705-218",
  },
  horarios: [
    ["Segunda a sexta", "Horário a confirmar"],
    ["Sábado", "Consulte disponibilidade"],
    ["Domingos e feriados", "Consulte a loja"],
  ],
  email: "",

  inicio: {
    sobretitulo: "Master Tech · Assistência em celulares",
    tituloLinha1: "Seu celular,",
    tituloLinha2: "sempre pronto",
    descricaoLinha1: "Manutenção e assistência para celulares e",
    descricaoLinha2: "atendimento sob consulta.",
    botaoPrincipal: "Solicitar reparo",
    botaoSecundario: "Ver serviços",
    atendimento: "Atendimento a confirmar",
    garantias: [
      ["Reparo técnico", "prazos sob consulta"],
      ["Garantia", "condições a confirmar"],
      ["Peças", "sob consulta"],
    ],
  },

  servicos: [
    { chave: "tela", nome: "Troca de tela", linha1: "Display novo e", linha2: "alta durabilidade", detalhe: "Substituição do display e do vidro com teste de toque, brilho e cores antes da entrega.", itens: ["Teste de toque e cores", "Vedação conferida", "Película opcional"] },
    { chave: "bateria", nome: "Troca de bateria", linha1: "Mais autonomia", linha2: "e segurança", detalhe: "Bateria nova com verificação de carga e temperatura, para o aparelho durar o dia inteiro.", itens: ["Teste de saúde da bateria", "Ciclo de carga conferido", "Descarte correto da antiga"] },
    { chave: "camera", nome: "Reparo de câmera", linha1: "Qualidade original", linha2: "de imagem", detalhe: "Troca de módulo, lente ou vidro da câmera com teste de foco, flash e estabilização.", itens: ["Foco e estabilização", "Lente e vidro traseiro", "Câmera frontal e traseira"] },
    { chave: "conector", nome: "Conector de carga", linha1: "Carregamento estável", linha2: "e sem falhas", detalhe: "Limpeza ou troca do conector para recuperar o carregamento e a transferência de dados.", itens: ["Limpeza técnica", "Troca do conector", "Teste com cabo e carregador"] },
    { chave: "revisao", nome: "Revisão completa", linha1: "Diagnóstico e", linha2: "limpeza interna", detalhe: "Checagem completa de hardware e software, com limpeza interna e relatório do estado do aparelho.", itens: ["Checklist de 30 itens", "Limpeza interna", "Relatório do aparelho"] },
  ],

  diagnostico: {
    selo: "Diagnóstico inteligente",
    tituloLinha1: "Descubra o problema",
    tituloLinha2: "do seu aparelho agora.",
    botao: "Iniciar diagnóstico",
    perguntas: [
      { pergunta: "O que está acontecendo com o aparelho?", opcoes: [["tela", "Tela quebrada ou sem toque"], ["bateria", "Bateria dura pouco ou estufou"], ["conector", "Não carrega ou carrega devagar"], ["camera", "Câmera com mancha ou sem foco"], ["revisao", "Lento, travando ou outro problema"]] },
    ],
  },

  etapas: [
    ["01", "Solicite o serviço", "online ou na loja"],
    ["02", "Diagnóstico", "rápido"],
    ["03", "Reparo com", "peças de qualidade"],
    ["04", "Orientações", "para retirada"],
  ],

  diferenciais: [
    ["Prazos informados", "Consulte a equipe sobre prazos de reparo e disponibilidade de peças antes de contratar o serviço."],
    ["Garantia sob consulta", "Condições e cobertura de garantia variam conforme o serviço e devem ser confirmadas com a equipe."],
    ["Peças sob consulta", "Confira disponibilidade e compatibilidade das peças com a equipe da loja."],
    ["Solicite orçamento", "Converse com a loja para conhecer diagnóstico, preço e condições antes de autorizar um reparo."],
  ],

  perguntas: [
    ["Quanto tempo leva o reparo?", "Depende do serviço e da disponibilidade da peça. O prazo é informado junto com o orçamento."],
    ["O diagnóstico tem custo?", "Consulte a equipe para saber se há taxa de avaliação e como funciona o orçamento."],
    ["Meus dados ficam seguros?", "O aparelho é manuseado só pela equipe técnica. Sempre que possível, faça um backup antes de trazer."],
    ["Vocês atendem quais marcas?", "Confirme com a equipe os modelos de celulares atendidos."],
  ],

  animacao: {
    velocidade: 1, // 0 desliga as animações decorativas
    abrirCamadas: true,
  },
};
