//API para calculo de consumo medio de combustivel

fCalcularConsumo = (potenciacv) => {
    let indice = 0.243;
    let conversor = 1.34102209;
    let potenciakw = potenciacv / conversor
    return potenciakw * indice;
};

fConversorKW = (potenciacv) => {
    let conversor = 1.34102209;
    let potenciakw = potenciacv / conversor;
    return potenciakw
}

fCalculoDiesel = (litrodiesel, potenciacv) => {
    return (fCalcularConsumo(potenciacv) * litrodiesel);
}

fCalculoLubrificante = (litrodiesel, potenciacv) => {
    return fCalculoDiesel(litrodiesel, potenciacv) * (15 / 100);
}

module.exports = async function (context, req) {
    let potenciacv = Number(req.query.potenciacv);
    let litrodiesel = Number(req.query.litrodiesel).toFixed(2);

    if (isNaN(potenciacv) || isNaN(litrodiesel)) {
        return context.res.status(400).send('Os valores informados estao invalidos');
    }

    let consumoCombustivel = fCalcularConsumo(potenciacv).toFixed(2);
    let valorCombustivel = fCalculoDiesel(litrodiesel, potenciacv).toFixed(2);
    let lubrificante = fCalculoLubrificante(litrodiesel, potenciacv).toFixed(2);
    let potenciaemkw = fConversorKW(potenciacv).toFixed(2);
    //let valor = fCalcularConsumo(potencia);

    context.res.json({
        potenciacv: potenciacv,
        potenciakw: potenciaemkw,
        consumo: consumoCombustivel,
        litrodiesel: litrodiesel,
        gastocombustivel: valorCombustivel,
        valorLubrificante: lubrificante
    });

}