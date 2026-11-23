/* RNCWEB Assistência Técnica: conteúdo da configuração, interações e animações. */
(() => {
  const config = window.configuracaoEmpresa || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)");
  const ler = (caminho) => caminho.split(".").reduce((o, k) => (o == null ? undefined : o[k]), config);

  /* ---------- textos da configuração ---------- */
  $$("[data-c]").forEach((el) => {
    const v = ler(el.dataset.c);
    if (typeof v !== "string" || !v) return;
    if (el.classList.contains("t-tit2")) el.innerHTML = esc(v.replace(/\.$/, "")) + "<b>.</b>";
    else el.textContent = v;
  });
  const servicos = config.servicos || [];
  const end = config.endereco || {};
  $$("[data-endereco]").forEach((el) => (el.innerHTML = esc(end.rua) + "<br>" + esc(end.cidade) + (end.referencia ? "<br><small>" + esc(end.referencia) + "</small>" : "")));
  $$("[data-endereco-curto]").forEach((el) => (el.textContent = [end.rua, end.cidade].filter(Boolean).join(" · ")));
  $$("[data-horarios]").forEach((el) => (el.innerHTML = (config.horarios || []).map(([d, h]) => esc(d) + ": " + esc(h)).join("<br>")));
  const lista = $("[data-lista-servicos]");
  if (lista)
    lista.innerHTML = servicos
      .map((s, i) => `<article class="servico revelar" id="servico-${esc(s.chave)}"><h3>${esc(s.nome)}</h3><p>${esc(s.detalhe)}</p><ul>${(s.itens || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul><button type="button" data-pedir-servico="${i}">Pedir orçamento <svg class="seta" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h14.5M13 6l6 6-6 6"/></svg></button></article>`)
      .join("");
  const dif = $("[data-lista-diferenciais]");
  if (dif) dif.innerHTML = (config.diferenciais || []).map(([t, d]) => `<div class="diferencial revelar"><b>${esc(t)}</b><p>${esc(d)}</p></div>`).join("");
  const perg = $("[data-lista-perguntas]");
  if (perg) perg.innerHTML = (config.perguntas || []).map(([p, r]) => `<details class="revelar"><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`).join("");
  const selecao = $("[data-select-servicos]");
  if (selecao) selecao.innerHTML = servicos.map((s) => `<option value="${esc(s.chave)}">${esc(s.nome)}</option>`).join("") + '<option value="outro">Outro problema</option>';

  /* ---------- menu do celular ---------- */
  const menuBotao = $(".menu-botao"), menu = $("#menu-movel");
  const fecharMenu = () => { menuBotao.setAttribute("aria-expanded", "false"); menu.hidden = true; };
  menuBotao?.addEventListener("click", () => { const abrir = menu.hidden; menu.hidden = !abrir; menuBotao.setAttribute("aria-expanded", String(abrir)); });
  menu?.addEventListener("click", (e) => { if (e.target.closest("a")) fecharMenu(); });
  document.addEventListener("click", (e) => { if (menu && !menu.hidden && !e.composedPath().some((el) => el === menu || el === menuBotao)) fecharMenu(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu && !menu.hidden) { fecharMenu(); menuBotao.focus(); } });

  /* ---------- janelas e WhatsApp ---------- */
  const abrirJanela = (j) => { if (typeof j.showModal === "function") j.showModal(); else j.setAttribute("open", ""); };
  $$(".janela").forEach((j) => {
    $$(".fechar, .fechar-ok", j).forEach((b) => b.addEventListener("click", () => j.close()));
    j.addEventListener("click", (e) => { if (e.target === j) j.close(); });
  });
  const aviso = $("#aviso");
  const numero = String(config.whatsapp || "").replace(/\D/g, "");
  function whatsapp(mensagem) {
    if (!numero) {
      $(".aviso-texto", aviso).textContent = "Este é um site demonstrativo. Informe o número de WhatsApp da loja em configuracao.js para ativar o contato. Mensagem preparada: “" + mensagem + "”";
      abrirJanela(aviso);
      return;
    }
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, "_blank", "noopener");
  }
  $$("[data-whats]").forEach((b) => b.addEventListener("click", () => whatsapp(config.mensagemPadrao || "Olá!")));

  const form = $(".formulario");
  function irParaContato(chave) {
    if (chave && selecao) selecao.value = chave;
    $("#contato").scrollIntoView({ behavior: reduzido.matches ? "auto" : "smooth" });
    setTimeout(() => $("input[name=nome]", form)?.focus({ preventScroll: true }), reduzido.matches ? 0 : 700);
  }
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(form));
    const erro = $(".erro-form", form);
    if (!String(d.nome || "").trim() || !String(d.modelo || "").trim()) { erro.textContent = "Informe seu nome e o modelo do aparelho."; erro.hidden = false; return; }
    erro.hidden = true;
    const s = servicos.find((x) => x.chave === d.servico);
    whatsapp(`Olá! Sou ${d.nome.trim()}. Aparelho: ${d.modelo.trim()}. Serviço: ${s ? s.nome : "outro problema"}.${d.mensagem ? " " + d.mensagem.trim() : ""}`);
  });

  /* detalhe do serviço */
  const janelaServico = $("#janela-servico");
  let servicoAtual = null;
  function abrirServico(i) {
    const s = servicos[i]; if (!s) return;
    servicoAtual = s;
    $("#servico-janela-titulo").textContent = s.nome;
    $(".janela-texto", janelaServico).textContent = s.detalhe;
    $(".janela-itens", janelaServico).innerHTML = (s.itens || []).map((x) => `<li>${esc(x)}</li>`).join("");
    abrirJanela(janelaServico);
  }
  $("[data-pedir]", janelaServico)?.addEventListener("click", () => { janelaServico.close(); irParaContato(servicoAtual?.chave); });
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-servico-detalhe]"); if (c) return abrirServico(Number(c.dataset.servicoDetalhe));
    const p = e.target.closest("[data-pedir-servico]"); if (p) return irParaContato(servicos[Number(p.dataset.pedirServico)]?.chave);
    const r = e.target.closest("a[href='#contato'][data-servico]"); if (r) { e.preventDefault(); irParaContato(r.dataset.servico); }
  });

  /* diagnóstico guiado */
  const janelaDiag = $("#janela-diagnostico");
  const opcoes = $("[data-opcoes-diagnostico]"), resultado = $("[data-resultado-diagnostico]");
  const pergunta = (config.diagnostico?.perguntas || [])[0];
  function montarDiagnostico() {
    resultado.hidden = true; opcoes.hidden = false;
    $("#diag-janela-titulo").textContent = pergunta?.pergunta || "O que está acontecendo?";
    opcoes.innerHTML = (pergunta?.opcoes || []).map(([chave, texto]) => `<button type="button" data-diag-opcao="${esc(chave)}">${esc(texto)}</button>`).join("");
  }
  $("[data-diagnostico]")?.addEventListener("click", () => { montarDiagnostico(); abrirJanela(janelaDiag); });
  opcoes?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-diag-opcao]"); if (!b) return;
    const s = servicos.find((x) => x.chave === b.dataset.diagOpcao) || servicos[servicos.length - 1];
    opcoes.hidden = true; resultado.hidden = false;
    $("#diag-janela-titulo").textContent = "Indicação: " + s.nome;
    resultado.innerHTML = `<p>${esc(s.detalhe)}</p><p>O diagnóstico na loja confirma o problema e o valor antes de qualquer reparo.</p><button class="botao-form" type="button" data-diag-pedir="${esc(s.chave)}">Pedir orçamento</button>`;
  });
  resultado?.addEventListener("click", (e) => { const b = e.target.closest("[data-diag-pedir]"); if (b) { janelaDiag.close(); irParaContato(b.dataset.diagPedir); } });

  /* revelação ao rolar */
  const revelador = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("visivel"); revelador.unobserve(x.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$(".revelar").forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 0.08}s`; revelador.observe(el); });

  /* =================== animações =================== */
  const vel = Number(config.animacao?.velocidade ?? 1);
  const TAU = Math.PI * 2;
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  function prepara(canvas, L, A) {
    const r = canvas.getBoundingClientRect(); if (!r.width) return null;
    const dpr = Math.min(devicePixelRatio || 1, 1.6), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const ctx = canvas.getContext("2d"); ctx.setTransform(w / L, 0, 0, h / A, 0, 0); ctx.clearRect(0, 0, L, A); return ctx;
  }
  const brilho = (ctx, x, y, r, cor, a) => { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${cor},${a})`); g.addColorStop(1, `rgba(${cor},0)`); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); };

  /* ---- cena do celular (coordenadas da arte, origem 775,15) ---- */
  const cena = $(".m-cena"), vidro = $(".m-cena .vidro"), circuito = $(".m-cena .circuito"), telaCena = $(".m-cena .fx");
  const O = [775, 15];
  const P = (x, y) => [x - O[0], y - O[1]];
  const VIDRO = [[1210, 77], [1260, 80], [1401, 101], [1398, 121], [1117, 253], [953, 232], [946, 216], [958, 205]].map(([x, y]) => P(x, y));
  const CHIP = P(1192, 270), RAIO = P(1183, 350), PLAT = P(1178, 448), ANEL = P(1186, 208);
  const LADRILHOS = [P(1188, 76), P(1510, 162), P(1500, 322), P(865, 282), P(944, 140)];
  let mouse = [0, 0], mouseAlvo = [0, 0];
  cena?.addEventListener("pointermove", (e) => { const r = cena.getBoundingClientRect(); mouseAlvo = [((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1]; }, { passive: true });
  cena?.addEventListener("pointerleave", () => (mouseAlvo = [0, 0]));
  const poeira = Array.from({ length: 46 }, (_, i) => ({ x: 120 + rnd(i) * 680, v: 0.25 + rnd(i + 9) * 0.6, s: 0.6 + rnd(i + 3) * 1.6, f: rnd(i + 5), c: rnd(i + 7) < 0.55 }));
  const DIRS = [[1, 0.5], [-1, -0.5], [1, -0.55], [-1, 0.55], [0.6, 0.62], [-0.6, -0.62], [1.2, 0.1], [-1.2, -0.1]];
  const pulsosChip = Array.from({ length: 16 }, (_, i) => ({ d: DIRS[i % 8], k: rnd(i), v: 0.35 + rnd(i + 2) * 0.5, l: 55 + rnd(i + 4) * 45 }));
  let abertura = 0;

  function desenharCena(t) {
    const k = cena.clientWidth / 897;
    mouse[0] += (mouseAlvo[0] - mouse[0]) * 0.06; mouse[1] += (mouseAlvo[1] - mouse[1]) * 0.06;
    // ciclo das camadas: fecha → abre → mantém → fecha (8 s)
    const p = ((t * 0.125) % 1);
    const alvo = config.animacao?.abrirCamadas === false ? 0 : p < 0.12 ? 0 : p < 0.36 ? ease((p - 0.12) / 0.24) : p < 0.62 ? 1 : p < 0.86 ? 1 - ease((p - 0.62) / 0.24) : 0;
    abertura = alvo;
    const respira = Math.sin(t * 1.3);
    const vy = -12 * abertura - 1.4 * respira, cy = -6 * abertura - 0.8 * respira;
    const vx = mouse[0] * 5, cx = mouse[0] * 2.4;
    vidro.style.transform = `translate3d(${(vx * k).toFixed(2)}px,${((vy + mouse[1] * 3) * k).toFixed(2)}px,0)`;
    circuito.style.transform = `translate3d(${(cx * k).toFixed(2)}px,${((cy + mouse[1] * 1.5) * k).toFixed(2)}px,0)`;
    const ctx = prepara(telaCena, 897, 535); if (!ctx) return;
    ctx.globalCompositeOperation = "lighter";
    // plataforma: dois cometas de luz e anel tracejado girando
    for (const [vel_, cor, fase] of [[0.32, "255,140,50", 0], [0.32, "60,220,240", Math.PI]]) {
      for (let i = 0; i < 60; i++) {
        const a = t * vel_ * TAU * 0.5 + fase - i * 0.022, x = PLAT[0] + Math.cos(a) * 335, y = PLAT[1] + Math.sin(a) * 74, frente = Math.sin(a) > 0 ? 1 : 0.35;
        ctx.fillStyle = `rgba(${cor},${(1 - i / 60) * 0.7 * frente})`; ctx.beginPath(); ctx.arc(x, y, 2.6 * (1 - i / 70), 0, TAU); ctx.fill();
      }
      const a = t * vel_ * TAU * 0.5 + fase; brilho(ctx, PLAT[0] + Math.cos(a) * 335, PLAT[1] + Math.sin(a) * 74, 26, cor, Math.sin(a) > 0 ? 0.55 : 0.2);
    }
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * TAU - t * 0.25, b = a + 0.09, al = 0.1 + 0.18 * (Math.sin(a) > 0 ? 1 : 0.3) * (0.5 + 0.5 * Math.sin(t * 2 + i));
      ctx.strokeStyle = `rgba(255,170,90,${al})`; ctx.beginPath(); ctx.ellipse(PLAT[0], PLAT[1], 245, 54, 0, a, b); ctx.stroke();
    }
    // anel de ladrilhos: cometa orbitando e varredura de brilho nos ícones
    for (let i = 0; i < 70; i++) {
      const a = -t * 0.55 - i * 0.018, x = ANEL[0] + Math.cos(a) * 338, y = ANEL[1] + Math.sin(a) * 132;
      ctx.fillStyle = `rgba(140,240,255,${(1 - i / 70) * (Math.sin(a) > 0 ? 0.75 : 0.3)})`; ctx.beginPath(); ctx.arc(x, y, 2 * (1 - i / 80), 0, TAU); ctx.fill();
    }
    LADRILHOS.forEach(([x, y], i) => {
      const f = Math.pow(Math.max(0, Math.sin(t * 1.1 - i * 1.26)), 6);
      brilho(ctx, x, y, 46, "70,225,245", 0.38 * f + 0.05);
      // pulso de dados do ícone até o chip
      const q = (t * 0.45 + i * 0.2) % 1;
      if (q < 0.6) { const u = q / 0.6, px = x + (CHIP[0] - x) * u, py = y + (CHIP[1] + cy - y) * u - Math.sin(u * Math.PI) * 30; brilho(ctx, px, py, 7, i % 2 ? "255,170,80" : "120,240,255", 0.8 * Math.sin(u * Math.PI)); }
    });
    // chip pulsando e trilhas de energia na placa
    const cxC = CHIP[0] + cx, cyC = CHIP[1] + cy, bat = 0.55 + 0.45 * Math.sin(t * 3.2);
    brilho(ctx, cxC, cyC, 70, "255,140,40", 0.22 + 0.22 * bat);
    brilho(ctx, cxC, cyC, 28, "255,210,150", 0.25 + 0.3 * bat);
    for (let j = 0; j < 2; j++) { const q = (t * 0.7 + j * 0.5) % 1; ctx.strokeStyle = `rgba(255,170,80,${0.5 * (1 - q)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(cxC, cyC, 30 + q * 70, (30 + q * 70) * 0.5, -0.46, 0, TAU); ctx.stroke(); }
    for (const pc of pulsosChip) {
      const q = (pc.k + t * pc.v) % 1, d = q * pc.l, x = cxC + pc.d[0] * d * 0.8, y = cyC + pc.d[1] * d * 0.8;
      ctx.fillStyle = `rgba(255,${200 + 40 * q | 0},140,${0.9 * (1 - q)})`; ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
    }
    // raio da bateria carregando quando as camadas abrem
    brilho(ctx, RAIO[0], RAIO[1], 46, "255,150,50", 0.12 + 0.3 * abertura * (0.6 + 0.4 * Math.sin(t * 6)));
    // reflexo deslizando no vidro
    const vq = (t * 0.2) % 1.6;
    if (vq < 1) {
      ctx.save(); ctx.translate(vx, vy + mouse[1] * 3); ctx.beginPath(); VIDRO.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.clip();
      const sx = 150 + vq * 520, g = ctx.createLinearGradient(sx - 50, 0, sx + 50, 0);
      g.addColorStop(0, "rgba(220,250,255,0)"); g.addColorStop(0.5, "rgba(220,250,255,.28)"); g.addColorStop(1, "rgba(220,250,255,0)");
      ctx.fillStyle = g; ctx.translate(sx, 160); ctx.transform(1, 0, -0.55, 1, 0, 0); ctx.fillRect(-50, -200, 100, 400); ctx.restore();
    }
    // poeira luminosa subindo
    for (const d of poeira) { const q = (d.f + t * d.v * 0.12) % 1, y = 500 - q * 470, x = d.x + Math.sin(t * 0.8 + d.f * 9) * 12; ctx.fillStyle = d.c ? `rgba(110,230,250,${0.6 * Math.sin(q * Math.PI)})` : `rgba(255,170,90,${0.6 * Math.sin(q * Math.PI)})`; ctx.fillRect(x, y, d.s, d.s); }
    ctx.globalCompositeOperation = "source-over";
  }

  /* ---- diagnóstico (origem 470,692) ---- */
  const telaDiag = $(".m-diagarte .fx");
  const onda = JSON.parse($("#dados-onda")?.textContent || "[]").map(([x, y]) => [x - 470, y - 692]);
  const lados = [onda.filter((p) => p[0] < 150), onda.filter((p) => p[0] > 150)];
  const CD = [153, 111];
  function desenharDiag(t) {
    const ctx = prepara(telaDiag, 306, 226); if (!ctx) return;
    ctx.globalCompositeOperation = "lighter";
    // arcos girando em sentidos opostos
    ctx.lineCap = "round";
    for (const [r, v, n, cor, lw] of [[104, 0.5, 3, "70,230,250", 3], [116, -0.32, 2, "70,230,250", 1.6], [92, 0.9, 6, "255,160,80", 1.2]]) {
      for (let i = 0; i < n; i++) { const a = t * v + (i / n) * TAU; ctx.strokeStyle = `rgba(${cor},${0.55})`; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(CD[0], CD[1], r, a, a + (n > 4 ? 0.12 : 0.55)); ctx.stroke(); }
    }
    // batimento percorrendo a linha (esquerda → tela → direita)
    const q = (t * 0.55) % 1;
    const desenhaPulso = (pts, u) => {
      if (!pts.length || u < 0 || u > 1) return;
      const c = Math.floor(u * (pts.length - 1));
      for (let j = 0; j < 22; j++) { const p = pts[c - j]; if (!p) break; ctx.fillStyle = `rgba(200,255,255,${0.9 * (1 - j / 22)})`; ctx.beginPath(); ctx.arc(p[0], p[1], 2.2 * (1 - j / 26), 0, TAU); ctx.fill(); }
      const p = pts[c]; brilho(ctx, p[0], p[1], 16, "90,235,255", 0.7);
    };
    desenhaPulso(lados[0], q / 0.42);
    desenhaPulso(lados[1], (q - 0.58) / 0.42);
    // tela do celular: varredura e logo pulsando quando o pulso passa
    const naTela = clamp(1 - Math.abs(q - 0.5) / 0.1);
    brilho(ctx, 153, 114, 52, "255,140,50", 0.16 + 0.4 * naTela);
    const sy = 36 + ((t * 0.4) % 1) * 152;
    const g = ctx.createLinearGradient(0, sy - 8, 0, sy + 8); g.addColorStop(0, "rgba(90,235,255,0)"); g.addColorStop(0.5, "rgba(140,245,255,.35)"); g.addColorStop(1, "rgba(90,235,255,0)");
    ctx.fillStyle = g; ctx.fillRect(112, sy - 8, 82, 16);
    ctx.globalCompositeOperation = "source-over";
  }

  /* ---- como funciona (origem 795,693) ---- */
  const telaComo = $(".m-como .fx"), etapas = $$(".etapa");
  const CC = [[113, 93], [312, 93], [514, 93], [716, 93]];
  let etapaAcesa = -1;
  function desenharComo(t) {
    const ciclo = (t * 0.32) % 4.6, i = Math.floor(ciclo), u = ciclo - i;
    const alvo = i < 4 ? i : -1;
    if (alvo !== etapaAcesa) { etapaAcesa = alvo; etapas.forEach((el, j) => el.classList.toggle("acesa", j === alvo)); }
    const ctx = telaComo && telaComo.offsetParent !== null ? prepara(telaComo, 832, 224) : null; if (!ctx) return;
    ctx.globalCompositeOperation = "lighter";
    if (i < 4) {
      const [x, y] = CC[i];
      for (let j = 0; j < 2; j++) { const q = (u + j * 0.5) % 1; ctx.strokeStyle = `rgba(255,170,90,${0.7 * (1 - q)})`; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(x, y, 24 + q * 22, 0, TAU); ctx.stroke(); }
      brilho(ctx, x, y, 40, "255,140,50", 0.45);
      if (i < 3) { const x2 = CC[i + 1][0], px = x + (x2 - x) * ease(clamp((u - 0.35) / 0.65)); for (let j = 0; j < 26; j++) { const xx = px - j * 3; if (xx < x + 24) break; ctx.fillStyle = `rgba(255,${200 - j * 3},120,${0.9 * (1 - j / 26)})`; ctx.fillRect(xx, y - 1.3, 3, 2.6); } brilho(ctx, px, y, 12, "255,200,140", 0.8); }
    }
    for (let j = 0; j < 30; j++) { const x = 40 + ((j * 26 + t * 30) % 770); ctx.fillStyle = `rgba(80,230,245,${0.25 + 0.25 * Math.sin(t * 2 + j)})`; ctx.fillRect(x, 92, 1.5, 1.5); }
    ctx.globalCompositeOperation = "source-over";
  }

  /* ---- laço único ---- */
  const alvos = [[cena, desenharCena], [$(".m-diagarte"), desenharDiag], [$(".m-como"), desenharComo]].filter(([el]) => el);
  const visiveis = new Set();
  const io = new IntersectionObserver((es) => { es.forEach((x) => (x.isIntersecting ? visiveis.add(x.target) : visiveis.delete(x.target))); acordar(); }, { rootMargin: "80px" });
  alvos.forEach(([el]) => io.observe(el));
  let quadro = 0, inicio = performance.now(), ultimo = 0;
  const parado = () => reduzido.matches || vel <= 0;
  function laco(agora) {
    quadro = 0;
    if (document.hidden) return;
    const t = parado() ? 2.6 : ((agora - inicio) / 1000) * vel;
    for (const [el, f] of alvos) if (visiveis.has(el)) f(t);
    if (!parado() && visiveis.size) quadro = requestAnimationFrame(laco);
    ultimo = agora;
  }
  function acordar() { if (!quadro) quadro = requestAnimationFrame(laco); }
  document.addEventListener("visibilitychange", acordar);
  reduzido.addEventListener?.("change", acordar);
  addEventListener("resize", acordar, { passive: true });
  acordar();
})();
