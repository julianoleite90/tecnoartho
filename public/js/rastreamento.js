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
    const dataCompra = document.getElementById('dataCompra').value;

    // Validação básica
    if (!nomeCompleto || !cpf || !dataCompra) {
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
        showResultado(nomeCompleto, cpf, dataCompra);
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

function showResultado(nome, cpf, dataCompra) {
    // Ocultar CPF (mostrar apenas os 5 primeiros dígitos)
    const cpfOculto = cpf.substring(0, 5) + '.***.**-**';
    
    // Formatar data da compra
    const dataFormatada = formatarData(dataCompra);
    
    // Preencher dados do resultado
    document.getElementById('nomeResultado').textContent = nome;
    document.getElementById('cpfResultado').textContent = cpfOculto;
    document.getElementById('dataCompraResultado').textContent = dataFormatada;
    
    // Atualizar datas da timeline
    atualizarDatasTimeline(dataCompra);
    
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
    document.getElementById('dataCompra').value = '';
    
    // Mostrar formulário
    document.getElementById('consultaForm').style.display = 'block';
    document.getElementById('resultadoConsulta').style.display = 'none';
    document.getElementById('loadingState').style.display = 'none';
    
    // Focar no primeiro campo
    document.getElementById('nomeCompleto').focus();
    
    trackRastreamentoEvent('nova_consulta', 'botao');
}

function formatarData(data) {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString('pt-BR');
}

function atualizarDatasTimeline(dataCompra) {
    // Corrigir problema de timezone - adicionar um dia para compensar
    const dataBase = new Date(dataCompra + 'T00:00:00');
    
    // Pedido Recebido (mesmo dia da compra)
    const dataRecebido = new Date(dataBase);
    document.querySelector('.timeline-item:nth-child(1) .timeline-date').textContent = formatarData(dataRecebido);
    
    // Pedido Separado (1 dia depois)
    const dataSeparado = new Date(dataBase);
    dataSeparado.setDate(dataSeparado.getDate() + 1);
    document.querySelector('.timeline-item:nth-child(2) .timeline-date').textContent = formatarData(dataSeparado);
    
    // Aguardando Transportadora (2 dias depois) - status atual
    const dataTransportadora = new Date(dataBase);
    dataTransportadora.setDate(dataTransportadora.getDate() + 2);
    document.querySelector('.timeline-item:nth-child(3) .timeline-date').textContent = formatarData(dataTransportadora);
    
    // Embarcado - próximo passo (sem data)
    document.querySelector('.timeline-item:nth-child(4) .timeline-date').textContent = 'Em breve';
    
    // Enviado - próximo passo (sem data)
    document.querySelector('.timeline-item:nth-child(5) .timeline-date').textContent = 'Em breve';
    
    // Previsão de Entrega - próximo passo (sem data)
    document.querySelector('.timeline-item:nth-child(6) .timeline-date').textContent = 'Em breve';
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
