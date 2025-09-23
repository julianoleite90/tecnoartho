# Guia de Deploy - Site Joelhos Saudáveis

Este guia contém instruções detalhadas para fazer o deploy da landing page em diferentes plataformas.

## 🚀 Deploy Rápido (Recomendado)

### 1. Vercel (Mais Fácil)

1. **Instale o Vercel CLI**:
```bash
npm i -g vercel
```

2. **Faça login**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Configure as variáveis de ambiente** no painel do Vercel:
   - `NODE_ENV=production`
   - `PORT=3000`
   - Outras variáveis conforme necessário

### 2. Netlify

1. **Conecte seu repositório** no Netlify
2. **Configure o build**:
   - Build command: `npm install && npm start`
   - Publish directory: `public`
   - Functions directory: `netlify/functions` (se usar)

3. **Configure as variáveis de ambiente** no painel do Netlify

### 3. Heroku

1. **Instale o Heroku CLI**:
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Baixe do site oficial
```

2. **Crie um arquivo `Procfile`**:
```
web: node server.js
```

3. **Configure o app**:
```bash
heroku create joelhos-saudaveis
heroku config:set NODE_ENV=production
```

4. **Deploy**:
```bash
git push heroku main
```

## 🏗️ Deploy Avançado

### Deploy com Docker

1. **Crie um `Dockerfile`**:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build e run**:
```bash
docker build -t joelhos-saudaveis .
docker run -p 3000:3000 joelhos-saudaveis
```

### Deploy em VPS (Ubuntu/CentOS)

1. **Instale Node.js**:
```bash
# Ubuntu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

2. **Clone o repositório**:
```bash
git clone <seu-repositorio>
cd site-joelhos
```

3. **Instale dependências**:
```bash
npm install
```

4. **Configure PM2** (process manager):
```bash
npm install -g pm2
pm2 start server.js --name "joelhos-saudaveis"
pm2 startup
pm2 save
```

5. **Configure Nginx** (proxy reverso):
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

6. **Configure SSL com Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

## 🔧 Configurações Pós-Deploy

### 1. Configurar Domínio Personalizado

1. **No Vercel/Netlify**:
   - Vá para as configurações do projeto
   - Adicione seu domínio personalizado
   - Configure os DNS conforme instruções

2. **No Heroku**:
```bash
heroku domains:add www.seu-dominio.com
heroku domains:add seu-dominio.com
```

### 2. Configurar Analytics

1. **Google Analytics**:
   - Adicione o código GA no `<head>` do HTML
   - Configure goals de conversão

2. **Facebook Pixel**:
   - Adicione o código do Pixel
   - Configure eventos de conversão

### 3. Configurar Integrações

1. **Email Marketing**:
   - Configure as variáveis de ambiente
   - Teste o envio de leads

2. **WhatsApp**:
   - Configure o número do WhatsApp
   - Teste o redirecionamento

## 📊 Monitoramento

### 1. Logs e Monitoramento

```bash
# PM2 logs
pm2 logs joelhos-saudaveis

# Heroku logs
heroku logs --tail

# Vercel logs
vercel logs
```

### 2. Performance

- Use Google PageSpeed Insights
- Configure CDN (Cloudflare)
- Otimize imagens
- Configure cache

### 3. Backup

```bash
# Backup do banco (se usar)
pg_dump joelhos_saudaveis > backup.sql

# Backup dos arquivos
tar -czf backup.tar.gz /caminho/do/projeto
```

## 🔒 Segurança

### 1. Headers de Segurança

Adicione ao `server.js`:
```javascript
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});
```

### 2. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // máximo 100 requests por IP
});

app.use(limiter);
```

### 3. Validação de Dados

- Sempre valide inputs
- Use sanitização
- Configure CORS adequadamente

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de porta**:
   - Verifique se a porta 3000 está livre
   - Configure a variável PORT

2. **Erro de dependências**:
   - Execute `npm install`
   - Verifique a versão do Node.js

3. **Erro de permissão**:
   - Verifique permissões de arquivo
   - Execute com sudo se necessário

4. **Erro de memória**:
   - Aumente o limite de memória do Node.js
   - Use `--max-old-space-size=4096`

### Logs Úteis

```bash
# Verificar status do serviço
pm2 status

# Reiniciar serviço
pm2 restart joelhos-saudaveis

# Verificar uso de recursos
pm2 monit
```

## 📈 Otimizações de Performance

### 1. CDN
- Use Cloudflare ou similar
- Configure cache de assets estáticos

### 2. Compressão
```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Cache
```javascript
app.use(express.static('public', {
    maxAge: '1d'
}));
```

## 🔄 CI/CD

### GitHub Actions

Crie `.github/workflows/deploy.yml`:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📞 Suporte

Para problemas específicos de deploy:
- Verifique os logs do serviço
- Consulte a documentação da plataforma
- Entre em contato com o suporte técnico

---

**Dica**: Sempre teste em ambiente de desenvolvimento antes de fazer deploy em produção!

