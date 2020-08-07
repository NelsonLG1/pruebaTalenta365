function guardarPeliculas(arrayPeliculas) {
    var peliculas = []
    arrayPeliculas.forEach(films => {
        var pelicula = new Object();
        pelicula.nombre = films.title;
        pelicula.planetas = films.planets;
        pelicula.naves = films.starships;
        peliculas.push(pelicula);
    });
    return peliculas;
}

function guardarPlanetas(arrayPlanetas) {
    var planetas = new Array();
    arrayPlanetas.forEach(planet => {
        var planeta = new Object();
        fetch(planet.replace("http", "https"))
            .then(response => response.json())
            .then(json => {
                planeta.Nombre = json.name,
                    planeta.Terreno = json.terrain,
                    planeta.Gravedad = json.gravity,
                    planeta.Diametro = json.diameter,
                    planeta.Población = json.population,
                    planetas.push(planeta)
            }
            )
    });
    return planetas;
}

function guardarNave(arrayNaves) {
    var nave = new Object();
    arrayNaves.forEach(planet => {
        var naveMax = new Object();
        naveMax.length = 0;
        fetch(planet.replace("http", "https"))
            .then(response => response.json())
            .then(json => {
                if (planet.length > naveMax.length) {                    
                    naveMax.Nombre = json.name,
                    naveMax.Modelo = json.model,
                    naveMax.Fabricante = json.manufacturer,
                    naveMax.Pasajeros = json.passengers,
                    nave = naveMax
                }
            })
    });
    console.log("guardarNave -> nave", nave);
    return nave;
}


function obtenerPeliculas() {
    fetch('https://swapi.dev/api/films/')
        .then(response => response.json())
        .then(json =>
            guardarPeliculas(json.results)
        )
        .then(json => {
            var array = [];
            json.forEach(element => {
                planetas = guardarPlanetas(element.planetas)
                element.planetas = planetas;
            });
            return json;
        })
        .then(json => {
            var array = [];
            json.forEach(element => {
                nave = guardarNave(element.naves)
                element.nave = nave;
                element.naves = null;
            });
            console.log("obtenerPeliculas -> json", json)
        })
}

obtenerPeliculas();
