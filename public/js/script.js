// Configurações globais
const CONFIG = {
    countdownEndTime: new Date().getTime() + (24 * 60 * 60 * 1000), // 24 horas
    apiEndpoint: '/capture-lead',
    animationDuration: 300
};

// Google Analytics Tracking Functions
function trackEvent(category, action, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value || 1
        });
    }
}

function trackPopupStep(step, action) {
    trackEvent('Popup', action, `Step_${step}`, 1);
}

function trackCTAClick(ctaName, location) {
    trackEvent('CTA', 'click', `${ctaName}_${location}`, 1);
}

function trackFormEvent(action, formName) {
    trackEvent('Form', action, formName, 1);
}

function trackMobileEvent(action) {
    trackEvent('Mobile', action, 'Fixed_CTA', 1);
}

function trackCarouselEvent(action, carouselName) {
    trackEvent('Carousel', action, carouselName, 1);
}

function trackFAQEvent(action, question) {
    trackEvent('FAQ', action, question, 1);
}

// Elementos DOM
const elements = {
    form: document.getElementById('leadForm'),
    countdownElements: {
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    },
    ctaButtons: document.querySelectorAll('.cta-button')
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    initializeFormHandling();
    initializeScrollAnimations();
    initializeCTAButtons();
    initializeUrgencyEffects();
    initializeImageCarousel();
    initializeHeroImageCarousel();
    initializeMobileFixedCTA();
});

// Contador regressivo
function initializeCountdown() {
    if (!elements.countdownElements.hours) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CONFIG.countdownEndTime - now;
        
        if (distance < 0) {
            // Reset para 24 horas quando acabar
            CONFIG.countdownEndTime = now + (24 * 60 * 60 * 1000);
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        elements.countdownElements.hours.textContent = hours.toString().padStart(2, '0');
        elements.countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
        elements.countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Manipulação do formulário
function initializeFormHandling() {
    if (!elements.form) return;
    
    elements.form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(elements.form);
        const leadData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };
        
        // Validação básica
        if (!validateForm(leadData)) {
            showNotification('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }
        
        // Mostrar loading
        const submitButton = elements.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(leadData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Lead capturado com sucesso! Em breve entraremos em contato.', 'success');
                elements.form.reset();
                
                // Redirecionar para página de agradecimento ou WhatsApp
                setTimeout(() => {
                    redirectToWhatsApp(leadData);
                }, 2000);
            } else {
                throw new Error(result.message || 'Erro ao processar solicitação');
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            showNotification('Erro ao enviar dados. Tente novamente ou entre em contato via WhatsApp.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Validação do formulário
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    
    if (!data.name || data.name.trim().length < 2) return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.phone || !phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 10) return false;
    
    return true;
}

// Redirecionamento para WhatsApp
function redirectToWhatsApp(leadData) {
    const phoneNumber = '5511999999999'; // Substitua pelo seu número
    const message = `Olá! Me interessei pelo produto Joelhos Saudáveis. Meu nome é ${leadData.name} e meu telefone é ${leadData.phone}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Animações de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .problem-item, .feature-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Inicializar botões CTA
function initializeCTAButtons() {
    elements.ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Scroll suave para o formulário
            if (this.textContent.includes('QUERO ELIMINAR') || this.textContent.includes('DESCUBRA')) {
                e.preventDefault();
                scrollToForm();
            }
        });
    });
}

// Scroll suave para o formulário
function scrollToForm() {
    const formElement = document.getElementById('cta-form');
    if (formElement) {
        formElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Destacar o formulário
        formElement.style.boxShadow = '0 0 20px rgba(45, 90, 39, 0.3)';
        setTimeout(() => {
            formElement.style.boxShadow = '';
        }, 3000);
    }
}

// Efeitos de urgência
function initializeUrgencyEffects() {
    // Piscar texto de urgência
    const urgencyText = document.querySelector('.urgency-text');
    if (urgencyText) {
        setInterval(() => {
            urgencyText.style.opacity = urgencyText.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    }
    
    // Animação de pulso nos preços
    const priceElements = document.querySelectorAll('.new-price');
    priceElements.forEach(price => {
        setInterval(() => {
            price.style.transform = 'scale(1.05)';
            setTimeout(() => {
                price.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Analytics e tracking (exemplo)
function trackEvent(eventName, eventData = {}) {
    // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Exemplo de integração com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Tracking de conversões
function trackConversion(conversionType, value = 0) {
    trackEvent('conversion', {
        conversion_type: conversionType,
        value: value,
        currency: 'BRL'
    });
}

// Otimizações de performance
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar layout para mobile
function adjustForMobile() {
    if (isMobile()) {
        // Ajustes específicos para mobile
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.flexDirection = 'column';
        }
    }
}

// Lazy loading para elementos pesados
function initializeLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'css/style.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Inicializar otimizações
window.addEventListener('load', function() {
    optimizeImages();
    adjustForMobile();
    initializeLazyLoading();
    preloadCriticalResources();
});

// Tratamento de erros
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

// Carrossel de Imagens
let currentImageIndex = 0;
    const totalImages = 7;

function initializeImageCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const mainImage = document.getElementById('mainProductImage');
    
    if (!carouselItems.length || !mainImage) return;
    
    // Adicionar event listeners para cada item do carrossel
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectImage(index);
        });
    });
    
    // Auto-play do carrossel (opcional)
    setInterval(() => {
        changeImage(1);
    }, 8000); // Muda a cada 8 segundos
}

function selectImage(index) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const mainImage = document.getElementById('mainProductImage');
    
    if (!carouselItems[index] || !mainImage) return;
    
    // Remover classe active de todos os itens
    carouselItems.forEach(item => item.classList.remove('active'));
    
    // Adicionar classe active ao item selecionado
    carouselItems[index].classList.add('active');
    
    // Atualizar imagem principal
    const newImageSrc = carouselItems[index].getAttribute('data-image');
    if (newImageSrc) {
        // Efeito de fade
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = newImageSrc;
            mainImage.style.opacity = '1';
        }, 150);
    }
    
    currentImageIndex = index;
}

function changeImage(direction) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (!carouselItems.length) return;
    
    currentImageIndex += direction;
    
    // Loop do carrossel
    if (currentImageIndex >= carouselItems.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = carouselItems.length - 1;
    }
    
    selectImage(currentImageIndex);
}

// FAQ Accordion
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    const question = element.querySelector('h3').textContent;
    
    // Fechar todos os outros itens
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir/fechar o item clicado
    if (!isActive) {
        trackFAQEvent('opened', question);
        faqItem.classList.add('active');
    }
}

// Carousel de imagens do hero
function initializeHeroImageCarousel() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const mainImage = document.getElementById('mainProductImage');
    
    if (!carouselItems.length || !mainImage) return;
    
    carouselItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos os itens
            carouselItems.forEach(carouselItem => {
                carouselItem.classList.remove('active');
            });
            
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Trocar a imagem principal
            const newImageSrc = this.getAttribute('data-image');
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                mainImage.alt = this.querySelector('img').alt;
            }
        });
    });
}

// Modal de Disponibilidade
function openAvailabilityModal() {
    const modal = document.getElementById('availabilityModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        trackPopupStep(1, 'opened');
    }
}

function closeAvailabilityModal() {
    const modal = document.getElementById('availabilityModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        trackPopupStep(1, 'closed');
        // Reset do modal
        const cepInput = document.getElementById('cepInput');
        const result = document.getElementById('availabilityResult');
        const loading = document.getElementById('loadingState');
        const paymentRedirect = document.getElementById('paymentRedirect');
        const modalHeader = document.querySelector('.modal-header');
        const cepContainer = document.querySelector('.cep-input-container');
        
        if (cepInput) cepInput.value = '';
        if (result) result.style.display = 'none';
        if (loading) loading.style.display = 'none';
        if (paymentRedirect) paymentRedirect.style.display = 'none';
        if (modalHeader) modalHeader.classList.remove('hidden');
        if (cepContainer) cepContainer.classList.remove('hidden');
    }
}

function checkAvailability() {
    const cepInput = document.getElementById('cepInput');
    const result = document.getElementById('availabilityResult');
    const loading = document.getElementById('loadingState');
    
    if (!cepInput || !result || !loading) return;
    
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
    }
    
    // Mostrar loading
    loading.style.display = 'block';
    result.style.display = 'none';
    trackFormEvent('cep_submitted', 'availability_check');
    
    // Simular busca do CEP e endereço
    setTimeout(() => {
        // Buscar endereço via API do ViaCEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                loading.style.display = 'none';
                
                if (data.erro) {
                    alert('CEP não encontrado. Por favor, verifique o número digitado.');
                    return;
                }
                
                // Exibir endereço encontrado
                const addressElement = document.getElementById('userAddress');
                if (addressElement) {
                    const address = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                    addressElement.textContent = address;
                }
                
                // Mostrar resultado
                result.style.display = 'block';
                trackPopupStep(1, 'cep_verified_success');
                
                // Ocultar título e campo CEP no mobile após verificar
                if (window.innerWidth <= 768) {
                    const modalHeader = document.querySelector('.modal-header');
                    const cepContainer = document.querySelector('.cep-input-container');
                    if (modalHeader) modalHeader.classList.add('hidden');
                    if (cepContainer) cepContainer.classList.add('hidden');
                }
                
                result.scrollIntoView({ behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                loading.style.display = 'none';
                
                // Fallback com endereço genérico
                const addressElement = document.getElementById('userAddress');
                if (addressElement) {
                    addressElement.textContent = `Região do CEP ${cep}`;
                }
                
                result.style.display = 'block';
                
                // Ocultar título e campo CEP no mobile após verificar
                if (window.innerWidth <= 768) {
                    const modalHeader = document.querySelector('.modal-header');
                    const cepContainer = document.querySelector('.cep-input-container');
                    if (modalHeader) modalHeader.classList.add('hidden');
                    if (cepContainer) cepContainer.classList.add('hidden');
                }
                
                result.scrollIntoView({ behavior: 'smooth' });
            });
    }, 2000); // 2 segundos de loading
}



function showPaymentRedirect() {
    // Esconder o resultado de disponibilidade
    const availabilityResult = document.getElementById('availabilityResult');
    if (availabilityResult) {
        availabilityResult.style.display = 'none';
    }
    
    trackPopupStep(2, 'opened');
    
    // Mostrar o redirecionamento de pagamento
    const paymentRedirect = document.getElementById('paymentRedirect');
    if (paymentRedirect) {
        paymentRedirect.style.display = 'block';
        
        // Redirecionar automaticamente após 3 segundos
        setTimeout(() => {
            // Substitua pela URL de pagamento desejada
            window.location.href = 'https://full.sale/nQSHAk';
        }, 3000);
    }
}


// Máscara para CEP
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cepInput');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
});

// Mobile Fixed CTA
function initializeMobileFixedCTA() {
    const mobileCTA = document.getElementById('mobileFixedCTA');
    const solutionSection = document.querySelector('.solution-section');
    
    if (!mobileCTA || !solutionSection) return;
    
    function checkScroll() {
        // Só funciona no mobile
        if (window.innerWidth > 768) return;
        
        const solutionSectionRect = solutionSection.getBoundingClientRect();
        const solutionSectionBottom = solutionSectionRect.bottom;
        
        // Mostra o CTA quando a seção "A Solução Definitiva" estiver quase saindo da tela
        if (solutionSectionBottom < 100) {
            mobileCTA.classList.add('show');
        } else {
            mobileCTA.classList.remove('show');
        }
    }
    
    // Verifica no scroll
    window.addEventListener('scroll', checkScroll);
    
    // Verifica no resize da janela
    window.addEventListener('resize', checkScroll);
    
    // Verifica inicialmente
    checkScroll();
}
