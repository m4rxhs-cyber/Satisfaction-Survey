//Funcao para logar no sistema
function logar() {
    var login = $("#login").val();
    var senha = $("#senha").val();
    

    $.get('https://x8ki-letl-twmt.n7.xano.io/api:inHLZiR6/usuario')
        .done(function (resposta) {
            for (i = 0; i < resposta.length; i++) {
                if (resposta[i].login == login && resposta[i].senha == senha) {
                    if(resposta[i].grupo == 'aluno'){
                        window.location.href = "./envio_avaliacao.html";
                    }else{window.location.href = "./avaliacoes.html"}
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Credenciais incorretas, tente novamente!!'
                    })
                }
            }
        })
        .fail(function (erro, mensagem, excecao) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo de errado aconteceu!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
              })
        });

        
}

//Funcao para deslogar do sistema
function logout() {
    window.location.href = "index.html";
}

//Envio da avaliacao
function envio() {
    let mensagem = {
        avaliacao: formulario.avalInput.value,
        comentario: formulario.mensagemInput.value,
        disciplina_id: formulario.disciplinaInput.value
    };

    $.ajax({
        type: 'POST',
        url: 'https://x8ki-letl-twmt.n7.xano.io/api:inHLZiR6/mensagem',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(mensagem),
        success: function () {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Avaliação enviada com sucesso',
                showConfirmButton: false,
                timer: 3500
            }),
            setTimeout(function() {
                window.location.reload();
            }, 3800);
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Erro ao enviar a avalização!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
              })
        }
    });

}

//Funcao para pegar todas as avaliacoes
function getAvaliacoes() {
    $.get('https://x8ki-letl-twmt.n7.xano.io/api:inHLZiR6/mensagem')
        .done(function(avaliacoes) {
            for(i = 0; i < avaliacoes.length; i++) {
                let row = $('<tr class="text-center"></tr>');

                row.append($('<td></td>').html(avaliacoes[i].nome_disciplina));
                row.append($('<td></td>').html(avaliacoes[i].avaliacao));
                row.append($('<td></td>').html(avaliacoes[i].comentario));
     

                $('#grid').append(row);
            }
        })
        .fail(function (erro, mensagem, excecao) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo de errado aconteceu!',
                footer: '<a href="mailto:m4rxhs3301@gmail.com" target="_blank">Contate o administrador aqui</a>'
              })
        });
}

$(document).ready(function() {
    getAvaliacoes();
});

function easteregg() {
    Swal.fire({
        title: 'Cade os meus dois pontos, Andre?',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: `
          rgba(0,0,123,0.4)
          url("./img/chew.webp")
          left top
          no-repeat
        `
      })
}