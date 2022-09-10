//API para calculo de consumo medio de combustivel

fCalcularConsumo = (potencia) => {
    let indice = 0.243;
    return potencia*indice;
    };

fCalculoDiesel = (litrodiesel) => {
     return fCalcularConsumo() * litrodiesel;
}

fCalculoLubrificante = () => {
    return fCalculoDiesel() * (15/100);
}

module.exports = async function (context, req) {
    let potencia = Number(req.query.potencia);
    let litrodiesel = Number(req.query.litrodiesel).toFixed(2);

    if(isNaN(potencia) || isNaN(litrodiesel)){
        return context.res.status(400).send('Os valores informados estao invalidos');
    }

    let consumoCombustivel = fCalcularConsumo(potencia).toFixed(2);
    let valorCombustivel = fCalculoDiesel(consumoCombustivel);
    let lubrificante = fCalculoLubrificante(valorCombustivel);
    //let valor = fCalcularConsumo(potencia);

    context.res.json({
        potencia: potencia,
        consumo: consumoCombustivel,
        litrodiesel: litrodiesel,        
        gastocombustivel: valorCombustivel,
        valorLubrificante: lubrificante
    });

}
