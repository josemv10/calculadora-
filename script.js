function calcularOxigeno() {
    const temperatura = parseFloat(document.getElementById('temperature').value);
    const salinidad = parseFloat(document.getElementById('salinity').value);
    const presion = parseFloat(document.getElementById('pressure').value);
    const altitud = parseFloat(document.getElementById('altitude').value);
    const cantidadAgua = parseFloat(document.getElementById('cantidad-agua').value);
    
    if (isNaN(temperatura) || isNaN(salinidad) || isNaN(presion) || isNaN(altitud) || isNaN(cantidadAgua)) {
        document.getElementById('resultado').innerText = 'Por favor, ingrese valores válidos.';
        return;
    }

    // Ajuste por altitud (simplificado)
    const ajusteAltitud = 1 - (altitud / 10000); // Factor de ajuste simple

    // Fórmula ajustada para calcular oxígeno disuelto (mg/L)
    const oxigenoDisueltoPorL = ((14.652 - 0.41022 * temperatura + 0.007991 * Math.pow(temperatura, 2) - 0.000077774 * Math.pow(temperatura, 3)) * (1 - (salinidad / 100)) * (presion / 760) * ajusteAltitud).toFixed(2);
    const oxigenoDisueltoTotal = (oxigenoDisueltoPorL * cantidadAgua).toFixed(2); // Total en mg

    // Cálculo del porcentaje de saturación
    const saturacionMaxima = 14.652 * (1 - (salinidad / 100)) * (presion / 760) * ajusteAltitud;
    const porcentajeSaturacion = ((oxigenoDisueltoPorL / saturacionMaxima) * 100).toFixed(2);

    document.getElementById('resultado').innerText = `Oxígeno Disuelto: ${oxigenoDisueltoPorL} mg/L\nTotal de Oxígeno Disuelto: ${oxigenoDisueltoTotal} mg\nPorcentaje de Saturación: ${porcentajeSaturacion}%`;

    mostrarEspecies(oxigenoDisueltoPorL);
}

function mostrarEspecies(oxigenoDisuelto) {
    const listaEspecies = document.getElementById('lista-especies');
    listaEspecies.innerHTML = ''; // Limpiar la lista anterior

    let especies = [];

    if (oxigenoDisuelto <= 2) {
        especies = ['Pez gato (Asterophysus batrachus)', 'Almejas (Corbicula fluminea)'];
    } else if (oxigenoDisuelto <= 5) {
        especies = ['Tilapia (Oreochromis spp.)', 'Cangrejo de río (Procambarus spp.)'];
    } else if (oxigenoDisuelto <= 8) {
        especies = ['Pargo (Lutjanus spp.)', 'Sardina (Sardinella spp.)'];
    } else if (oxigenoDisuelto <= 10) {
        especies = ['Mero (Epinephelus spp.)', 'Pulpo (Octopus spp.)'];
    } else if (oxigenoDisuelto <= 14) {
        especies = ['Delfín (Delphinus spp.)', 'Tortuga marina (Chelonia mydas)'];
    } else {
        especies = ['Tiburón (Carcharhinus spp.)', 'Ballena jorobada (Megaptera novaeangliae)'];
    }

    especies.forEach(especie => {
        const li = document.createElement('li');
        li.innerText = especie;
        listaEspecies.appendChild(li);
    });
}

function toggleRangos() {
    const rangosDiv = document.getElementById('rangos');
    if (rangosDiv.style.display === "none" || rangosDiv.style.display === "") {
        rangosDiv.style.display = "block";
    } else {
        rangosDiv.style.display = "none";
    }
}

function actualizarReloj() {
    const opciones = { timeZone: 'America/Santo_Domingo', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const fechaHora = new Intl.DateTimeFormat('es-DO', opciones).format(new Date());
    document.getElementById('reloj').innerText = fechaHora;
}

setInterval(actualizarReloj, 1000);
actualizarReloj(); // Llamar una vez al cargar
