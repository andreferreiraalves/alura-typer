$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria(){
    $('#spinner').show();

    $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    .fail(function(){
        $('#erro').show();

        setTimeout(() => {
            $('#erro').hide();
        }, 2000);
    })
    .always(function(){
        $('#spinner').hide();
    });
}

function trocaFraseAleatoria(data){
    var id = Math.floor(Math.random() * data.length);
    $('.frase').text(data[id].texto);
    atualizaTempoInicial(data[id].tempo);
    atualizaTamanhoFrase();
}