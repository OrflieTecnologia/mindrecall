# Mind Recall — Landing Page

Landing page da formação profissionalizante em hipnose clínica da Mind Recall.

**Versão de revisão.** A página está completa em estrutura e conteúdo, mas ainda não deve receber tráfego pago — ver pendências abaixo.

## Como rodar localmente

Não tem build nem dependência. É HTML e CSS puros, com um script pequeno para as animações de scroll.

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`. Abrir o `index.html` direto pelo sistema de arquivos também funciona.

## Estrutura

```
index.html          página inteira (HTML + CSS + JS inline)
assets/             logo e fotos otimizadas para web
assets/videos/      depoimentos em vídeo + capas (poster)
```

Fontes vêm do Google Fonts: Cinzel (títulos), Spectral (subtítulos), IBM Plex Sans e Mono (corpo e rótulos).

## Decisões técnicas

- **Vídeos com `preload="none"` e poster.** Nenhum byte de vídeo é baixado até o visitante clicar em play. Os três depoimentos somam 7,6 MB; carregá-los de início derrubaria a conversão no celular.
- **`+faststart` nos MP4.** O vídeo começa a tocar antes de terminar o download.
- **Sem framework e sem dependência externa** além das fontes. A página inteira é um arquivo.
- **Responsiva e acessível.** Testada em 1280px e 375px, com foco visível no teclado e `prefers-reduced-motion` respeitado.

## Pendências antes de publicar de verdade

- [ ] **Formulário não está ligado a nenhum destino.** Hoje ele mostra um aviso em vez de enviar. Definir para onde o lead vai (CRM, planilha ou WhatsApp) e conectar.
- [ ] Datas reais das próximas turmas por capital (os campos estão como `[data]`).
- [ ] Condições de parcelamento.
- [ ] Profissão e cidade dos alunos que aparecem em vídeo.
- [ ] Logo em PNG transparente e vetor — o arquivo atual tem fundo chapado.
- [ ] Remover os blocos de anotação marcados na página antes da publicação final.
