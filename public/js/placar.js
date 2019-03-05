$('#botao-placar').click(mostraPlacar);
$('#botao-sync').click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $('.placar').find('tbody');
    var usuario = $('#usuarios').val();

    var numeroPalavras = $('#contador-palavras').text();

    var linha = novaLinha(usuario, numeroPalavras);
    // linha.find('.botao-remover').click(function(event) {});

    corpoTabela.append(linha);
    // corpoTabela.prepend(linha);
    $('.placar').slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;

    $("body").animate(
        {
            scrollTop: posicaoPlacar + "px"
        }, 1000);
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
    var linha = $(this).parent().parent();

    linha.fadeOut();
    setTimeout(function() {
        linha.remove();
    });
}

function mostraPlacar() {
    $('.placar').stop().slideToggle(300);
}

function sincronizaPlacar() {
  var placar = [];
  // var linhas = $('tbody tr');
  var linhas = $('tbody>tr');

  linhas.each(function() {
    var usuario = $(this).find('td:nth-child(1)').text();
    var palavras = $(this).find('td:nth-child(2)').text();

    placar.push({ usuario: usuario, pontos : palavras });
  });

  var dados = {
    placar : placar
  }

  $.post('http://localhost:3000/placar', dados, function() {
    $('.tooltip').tooltipster('open').tooltipster('content', 'Sucesso ao sincronizar :)');
  })
  .fail(function(){
    $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar :(')
  })
  .always(function() {
    setTimeout(function(){
      $('.tooltip').tooltipster('close');
    }, 1200);
  });
}

function atualizaPlacar() {
  $.get('http://localhost:3000/placar', function(data){

    $(data).each(function() {
      var linha = novaLinha(this.usuario, this.pontos);
      $('tbody').append(linha);
    });
  });
}
