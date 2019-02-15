$('#botao-placar').click(mostraPlacar);

function inserePlacar(){
    var corpoTabela = $('.placar').find('tbody');
    var usuario = 'André'
    var numeroPalavras = $('#contador-palavras').text();

    var linha = novaLinha(usuario, numeroPalavras);
    // linha.find('.botao-remover').click(function(event) {});

    corpoTabela.append(linha);
    // corpoTabela.prepend(linha);
}

function novaLinha(usuario, numeroPalavras) {
    var botao = $('<a>').addClass('botao-remover').attr('href', '#');
    var icon = $('<i>').addClass('material-icons').addClass('small').text('delete');
    
    botao.append(icon);
    botao.click(removeLinha);

    var linha = $('<tr>');
    linha.append($('<td>').text(usuario));
    linha.append($('<td>').text(numeroPalavras));
    linha.append($('<td>').append(botao));

    return linha;
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}

function mostraPlacar() {
    $('.placar').slideToggle(600);
}