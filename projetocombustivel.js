//API para calculo de consumo medio de combustivel

fCalcularConsumo = (potencia) => {
    let indice = 0.243;
    return potencia*indice;
    };

fCalculoDiesel = (litrodiesel) => {
    return (fCalcularConsumo() * litrodiesel);
}

module.exports = async function (context, req) {
    let potencia = Number(req.query.potencia);
    let litrodiesel = Number(req.query.litrodiesel).toFixed(2);

    if(isNaN(potencia) || isNaN(litrodiesel)){
        return context.res.status(400).send('Os valores informados estao invalidos');
    }

    let consumoCombustivel = fCalcularConsumo(potencia).toFixed(2);
    let valorCombustivel = Number(fCalculoDiesel());
    //let valor = fCalcularConsumo(potencia);

    context.res.json({
        potencia: potencia,
        consumo: consumoCombustivel,
        litrodiesel: litrodiesel,        
        gastocombustivel: valorCombustivel
    });

}
