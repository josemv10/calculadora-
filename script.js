function calculateOxygen() {
    const altitude = parseFloat(document.getElementById('altitude').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const temperatureC = parseFloat(document.getElementById('temperature').value);
    const salinity = parseFloat(document.getElementById('salinity').value);

    // Constantes
    const P0 = 101325; // Presión al nivel del mar en Pa
    const M = 0.029; // Masa molar del aire en kg/mol
    const g = 9.81; // Aceleración debida a la gravedad en m/s²
    const R = 8.314; // Constante universal de los gases en J/(mol·K)
    const T0 = 298; // Temperatura de referencia en K (25°C)
    const dHsol = -55560; // Entalpía de solubilidad del oxígeno en J/mol
    const kH0 = 769; // Constante de Henry a 25°C en atm·L/mol
    const B = 0.0313; // Coeficiente empírico para salinidad

    // Convertir temperatura a Kelvin
    const temperatureK = temperatureC + 273.15;

    // Calcular la presión atmosférica a la altitud dada
    const P_alt = P0 * Math.exp(-M * g * altitude / (R * temperatureK));

    // Calcular la presión hidroestática a la profundidad dada
    const P_prof = P_alt + 1000 * g * depth;

    // Calcular la constante de Henry ajustada por temperatura
    const kH_T = kH0 * Math.exp(dHsol / R * (1 / T0 - 1 / temperatureK));

    // Aplicar la corrección de salinidad
    const S_corr = Math.exp(-B * salinity / temperatureK);

    // Ajustar la constante de Henry por salinidad
    const kH_ST = kH_T * S_corr;

    // Calcular OD_real
    const OD_real = kH_ST * (P_prof / P0);

    // Calcular OD_sat (bajo condiciones estándar)
    const OD_sat = kH_ST;

    // Calcular el porcentaje de saturación
    const saturationPercentage = (OD_real / OD_sat) * 100;

    // Mostrar resultados
    document.getElementById('od-real').textContent = `Oxígeno Disuelto Real: ${OD_real.toFixed(2)} atm·L/mol`;
    document.getElementById('od-sat').textContent = `Oxígeno Disuelto a Saturación: ${OD_sat.toFixed(2)} atm·L/mol`;
    document.getElementById('saturation-percentage').textContent = `Porcentaje de Saturación: ${saturationPercentage.toFixed(2)}%`;
}
