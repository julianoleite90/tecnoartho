# Imagens do Produto - Joelhos Saudáveis

Este diretório deve conter as imagens do produto para o carrossel. Substitua os placeholders no HTML pelas imagens reais.

## Estrutura de Imagens Recomendada

### Imagem Principal
- **Arquivo**: `produto-principal.jpg`
- **Dimensões**: 800x800px (quadrada)
- **Formato**: JPG ou PNG
- **Descrição**: Imagem principal do produto mostrando o dispositivo

### Imagens do Carrossel (5 imagens)
1. **produto-1.jpg** - Vista frontal do dispositivo
2. **produto-2.jpg** - Vista lateral do dispositivo
3. **produto-3.jpg** - Dispositivo em uso
4. **produto-4.jpg** - Detalhes do produto
5. **produto-5.jpg** - Embalagem do produto

### Especificações Técnicas
- **Dimensões**: 400x400px (imagem principal) e 200x200px (carrossel)
- **Formato**: JPG (recomendado) ou PNG
- **Qualidade**: Alta resolução para web
- **Otimização**: Comprimidas para web (máximo 500KB cada)

## Como Substituir as Imagens

1. **Adicione as imagens** na pasta `public/images/`
2. **Atualize o HTML** em `public/index.html`:

```html
<!-- Imagem principal -->
<img id="mainProductImage" src="images/produto-principal.jpg" alt="Joelhos Saudáveis - Imagem Principal" class="main-product-image">

<!-- Carrossel -->
<div class="carousel-item active" data-image="images/produto-1.jpg">
    <img src="images/produto-1.jpg" alt="Produto 1">
</div>
<div class="carousel-item" data-image="images/produto-2.jpg">
    <img src="images/produto-2.jpg" alt="Produto 2">
</div>
<!-- ... e assim por diante -->
```

## Dicas para Imagens de Alta Conversão

### Imagem Principal
- Mostre o produto de forma clara e atrativa
- Use fundo neutro ou branco
- Inclua elementos que transmitam confiança (certificações, selos)
- Evite sobreposições de texto na imagem

### Imagens do Carrossel
- Mostre diferentes ângulos do produto
- Inclua imagens do produto em uso
- Mostre a embalagem e acessórios
- Use cores consistentes com a identidade visual

### Otimização
- Use ferramentas como TinyPNG ou ImageOptim
- Mantenha a qualidade visual mas reduza o tamanho do arquivo
- Teste o carregamento em diferentes dispositivos

## Exemplo de Estrutura Final

```
public/images/
├── produto-principal.jpg
├── produto-1.jpg
├── produto-2.jpg
├── produto-3.jpg
├── produto-4.jpg
└── produto-5.jpg
```

## Ferramentas Recomendadas

- **Edição**: Photoshop, GIMP, Canva
- **Otimização**: TinyPNG, ImageOptim, Squoosh
- **Conversão**: Online-Convert, CloudConvert
- **Redimensionamento**: ResizeImage.net, Bulk Resize Photos

