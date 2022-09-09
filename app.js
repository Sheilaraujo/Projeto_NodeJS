const express = require('express');
const api = express();

// Primeiro metodo. Teste
// Na arrow function, sempre que for enviar informacoes tem que ser preenchido o req e o res
// req = requisicao que estamos recebendo do usuario
// res = (response) = resposta que vamos retornar para o usuario

api.get('/teste', (req, res) => {
    return res.status(200).send('Nossa API esta funcionando!');
});

// funcao para calcular o IMC
fCalcularImc = (peso, altura) => {
    return peso / (altura * altura)
};

//funcao para verificar a classificacao
fClassificacao = (imc) => {
    if (imc < 18.5) {
        return 'Voce esta abaixo do peso'
    } else if (imc < 24.9) {
        return 'Voce esta com peso dentro do parametro considerado normal'
    } else {
        return 'Voce está com sobrepeso'
    }
};

//Array para armazenar o historico de calculos
let historico = [];

// GET para calcular o valor de IMC
// Esse metodo precisa receber os parametros de Nome, Altura e Peso.
api.get('/calcularIMC', (req, res) => {
    let nomeUsuario = String(req.query.nome);
    let pesoUsuario = Number(req.query.peso);
    let alturaUsuario = Number(req.query.altura);

    if (isNaN(pesoUsuario) || isNaN(alturaUsuario)) {
        return res.status(400).send('Valor informado é diferente de número');
    }

    let imcUsuario = fCalcularImc(pesoUsuario, alturaUsuario);
    let classificacaoUsuario = fClassificacao(imcUsuario);

    historico.push({ 
        nome: nomeUsuario, 
        peso: pesoUsuario, 
        altura: alturaUsuario, 
        imc: imcUsuario, 
        classificacao: classificacaoUsuario,
    });
    return res.json({
        nome: nomeUsuario, 
        peso: pesoUsuario, 
        altura: alturaUsuario, 
        imc: imcUsuario, 
        classificacao: classificacaoUsuario
    });
});

// Consulta histórico
api.post('/consultaHistorico', (req, res) => {
    if(historico.length= 0){
        return res.send('O histórico está vazio!');
    }

    let json = JSON.stringify(historico);
    res.send(json);
});

// Funcao para iniciar API
api.listen(5000, () => {
    console.log('A API esta funcionando...');
});