var campo = $('.campo-digitacao');
var tempoInicial = $('#tempo-digitacao').text();

// $(document).ready(function() {
//     console.log('pagina carregada');

//     atualizaTamanhoFrase();
//     inicializaContadores();
//     inicializaCronometro();

//     $('#botao-reiniciar').click(reiniciaJogo);
// });

$(function() {
    campo.val('');
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();

    $('#botao-reiniciar').click(reiniciaJogo);

    atualizaPlacar();
});

function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numeroPalavras = frase.split(' ').length;
    $('#tamanho-frase').text(numeroPalavras);
}

function inicializaContadores() {
    campo.on('input', function() {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length;

        $('#contador-palavras').text(qtdPalavras - 1);
        $('#contador-caracteres').text(conteudo.length);
    });
}

function inicializaCronometro() {
    campo.one('focus', function() {
        var tempoRestante = $('#tempo-digitacao').text();
        var cronometroId = setInterval(function() {
            tempoRestante--;

            $('#tempo-digitacao').text(tempoRestante);

            if (tempoRestante < 1){
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function reiniciaJogo(){
    campo.attr('disabled', false);
    campo.val('');
    campo.toggleClass('campo-desativado');
    campo.removeClass('campo-correto');
    campo.removeClass('campo-errado');

    atualizaTempoInicial(tempoInicial);
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
}


function inicializaMarcadores() {
    campo.on('input', function() {
        var frase = $('.frase').text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass('campo-correto');
            campo.removeClass('campo-errado');
        } else {
            campo.addClass('campo-errado');
            campo.removeClass('campo-correto');
        }

    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    // campo.css('background-color', 'lightgray')
    // campo.addClass('campo-desativado');
    campo.toggleClass('campo-desativado');
    inserePlacar();
}
