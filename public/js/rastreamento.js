// Rastreamento Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Máscara para CPF
    const cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Validação de formulário
    const form = document.querySelector('.consulta-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        consultarPedido();
    });

    // Enter key para consultar
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && (e.target.id === 'nomeCompleto' || e.target.id === 'cpf')) {
            consultarPedido();
        }
    });
});

function consultarPedido() {
    const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    // Validação básica
    if (!nomeCompleto || !cpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (cpf.length < 14) {
        alert('Por favor, digite um CPF válido.');
        return;
    }

    // Mostrar loading
    showLoading();

    // Simular consulta com delay
    setTimeout(() => {
        hideLoading();
        showResultado(nomeCompleto, cpf);
        trackRastreamentoEvent('consulta_realizada', 'formulario');
    }, 3000);
}

function showLoading() {
    document.getElementById('consultaForm').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('resultadoConsulta').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
}

function showResultado(nome, cpf) {
    // Ocultar CPF (mostrar apenas os 5 primeiros dígitos)
    const cpfOculto = cpf.substring(0, 5) + '.***.**-**';
    
    // Preencher dados do resultado
    document.getElementById('nomeResultado').textContent = nome;
    document.getElementById('cpfResultado').textContent = cpfOculto;
    
    // Mostrar resultado
    document.getElementById('resultadoConsulta').style.display = 'block';
    
    // Animar timeline
    animateTimeline();
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

function novaConsulta() {
    // Limpar formulário
    document.getElementById('nomeCompleto').value = '';
    document.getElementById('cpf').value = '';
    
    // Mostrar formulário
    document.getElementById('consultaForm').style.display = 'block';
    document.getElementById('resultadoConsulta').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
    
    // Focar no primeiro campo
    document.getElementById('nomeCompleto').focus();
    
    trackRastreamentoEvent('nova_consulta', 'botao');
}

// Funções de Analytics
function trackRastreamentoEvent(action, location) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Rastreamento',
            event_label: location,
            value: 1
        });
    }
}

// Validação de CPF (opcional)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validar dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}
