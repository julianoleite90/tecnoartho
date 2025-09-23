# Site Joelhos Saudáveis - Landing Page de Alta Conversão

Uma landing page otimizada para conversão de um produto de dropshipping focado em saúde dos joelhos, com design médico em tons de verde e elementos de alta conversão.

## 🚀 Características

- **Design Médico Profissional**: Paleta de cores verde que transmite confiança e saúde
- **Otimizada para Conversão**: Elementos de urgência, prova social e CTAs estratégicos
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Performance Otimizada**: Carregamento rápido e experiência fluida
- **Integração com WhatsApp**: Redirecionamento automático após captura de lead

## 📋 Seções da Landing Page

1. **Header** - Logo e urgência
2. **Hero** - Título impactante, benefícios e CTA principal
3. **Problema** - Identificação com dores e limitações
4. **Solução** - Apresentação do produto e suas funcionalidades
5. **Benefícios** - Diferenciais e vantagens competitivas
6. **Depoimentos** - Prova social com avaliações de clientes
7. **Urgência** - Contador regressivo e oferta limitada
8. **CTA Final** - Formulário de captura de leads
9. **Footer** - Links legais e informações da empresa

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fontes**: Google Fonts (Inter)
- **Ícones**: Font Awesome
- **Design**: CSS Grid, Flexbox, Animações CSS

## 📦 Instalação

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd site-joelhos
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o servidor**:
```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

4. **Acesse no navegador**:
```
http://localhost:3000
```

## ⚙️ Configuração

### Personalização do Produto

Edite o arquivo `public/index.html` para personalizar:
- Nome do produto
- Preços e ofertas
- Benefícios e características
- Depoimentos de clientes
- Informações de contato

### Integração com WhatsApp

No arquivo `public/js/script.js`, altere a linha:
```javascript
const phoneNumber = '5511999999999'; // Substitua pelo seu número
```

### Cores e Estilo

As cores podem ser personalizadas no arquivo `public/css/style.css` através das variáveis CSS:
```css
:root {
    --primary-green: #2d5a27;
    --secondary-green: #4a7c59;
    --light-green: #6b9b6b;
    /* ... outras cores */
}
```

## 📊 Otimizações de Conversão

### Elementos de Urgência
- Contador regressivo de 24 horas
- Texto de "últimas unidades"
- Oferta com desconto limitada

### Prova Social
- Depoimentos de clientes reais
- Avaliações com estrelas
- Números de pessoas atendidas

### CTAs Estratégicos
- Botões com cores contrastantes
- Texto de ação persuasivo
- Múltiplos pontos de conversão

### Formulário Otimizado
- Campos essenciais apenas
- Validação em tempo real
- Redirecionamento para WhatsApp

## 🔧 Funcionalidades JavaScript

- **Contador Regressivo**: Atualização em tempo real
- **Validação de Formulário**: Verificação de dados antes do envio
- **Animações de Scroll**: Elementos aparecem conforme o usuário rola
- **Notificações**: Feedback visual para ações do usuário
- **Tracking**: Preparado para Google Analytics e Facebook Pixel

## 📱 Responsividade

A landing page é totalmente responsiva com breakpoints:
- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🚀 Deploy

### Deploy no Heroku

1. Crie um arquivo `Procfile`:
```
web: node server.js
```

2. Configure as variáveis de ambiente:
```bash
heroku config:set NODE_ENV=production
```

3. Faça o deploy:
```bash
git push heroku main
```

### Deploy no Vercel

1. Instale o Vercel CLI:
```bash
npm i -g vercel
```

2. Faça o deploy:
```bash
vercel
```

### Deploy no Netlify

1. Configure o build command:
```
npm install && npm start
```

2. Configure o publish directory:
```
public
```

## 📈 Analytics e Tracking

### Google Analytics
Adicione seu código GA no `<head>` do HTML:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel
Adicione o código do Pixel no `<head>`:
```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 🔒 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- Headers de segurança (recomendado adicionar)
- HTTPS obrigatório em produção

## 📞 Suporte

Para dúvidas ou suporte técnico:
- Email: suporte@joelhos-saudaveis.com
- WhatsApp: (11) 99999-9999

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Changelog

### v1.0.0
- Lançamento inicial
- Landing page completa
- Sistema de captura de leads
- Design responsivo
- Integração com WhatsApp

---

**Desenvolvido com ❤️ para maximizar conversões e ajudar pessoas com dores nos joelhos.**

