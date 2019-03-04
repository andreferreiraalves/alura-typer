$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

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

function buscaFrase(){
  var fraseID = $('#frase-id').val();
  var dados = { id: fraseID };

  $('#spinner').show();

  $.get('http://localhost:3000/frases', dados, trocaFrase)
  .fail(function() {
    $('#erro').show();

    setTimeout(() => {
        $('#erro').hide();
    }, 2000);
  })
  .always(function() {
    $('#spinner').hide();
  });
}

function trocaFrase(data) {
  $('.frase').text(data.texto);
  atualizaTempoInicial(data.tempo);
  atualizaTamanhoFrase();
}
