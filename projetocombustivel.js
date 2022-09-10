//API para calculo de consumo medio de combustivel

fCalcularConsumo = (potencia) => {
    let indice = 0.243;
    let valor = potencia*indice;
    return valor
    };

fCalculoDiesel = (litrodiesel) => {
    return fCalcularConsumo(valor) * litrodiesel
}

module.exports = async function (context, req) {
    let potencia = Number(req.query.potencia);
    let litrodiesel = Number(req.query.litrodiesel);

    if(isNaN(potencia) || isNaN(litrodiesel)){
        return context.res.status(400).send('Os valores informados estao invalidos');
    }

    let consumoCombustivel = fCalcularConsumo(valor);
    let valorCombustivel = fCalculoDiesel();

    context.res.json({
        potencia: potencia,
        litrodiesel: litrodiesel,
        consumo: consumoCombustivel,
        gastocombustivel: valorCombustivel
    });

}