const asesinos = document.getElementById('asesino');
const supervivientes = document.getElementById('superviviente');
const titulo = document.getElementById('tituloLore');
const loreContainer = document.getElementById('lore-container');
const Builds = document.getElementById('Builds')
const crearBuild = document.getElementById('crearBuild');
const guardarBuild = document.getElementById('guardarBuild');
const buildsContainer = document.getElementById('buildsContainer');
const imagesContainer = document.getElementById('imagesContainer'); 

let buildActual = null;


function mostrarLore(nombre, lore) {
    titulo.textContent = `Historia de: ${nombre}`;
    loreContainer.textContent = lore;
    localStorage.setItem('loreSeleccionado', JSON.stringify({ nombre, lore }));
}


function cargarLoreGuardado() {
    const loreGuardado = localStorage.getItem('loreSeleccionado');
    if (loreGuardado) {
        const { nombre, lore } = JSON.parse(loreGuardado);
        mostrarLore(nombre, lore);
    }
}
cargarLoreGuardado();

fetch('../json/personajes.json')
    .then(response => response.json())
    .then(informacion => {
        const { Survivors, Killers } = informacion;

        Survivors.forEach(survivor => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${survivor.nombre}</h3>
                <p>${survivor.lore}</p>
            `;
            li.addEventListener('click', () => {
                mostrarLore(survivor.nombre, survivor.lore);
            });
            supervivientes.appendChild(li);
        });

        Killers.forEach(killer => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${killer.nombre}</h3>
                <p>${killer.lore}</p>
            `;
            li.addEventListener('click', () => {
                mostrarLore(killer.nombre, killer.lore);
            });
            asesinos.appendChild(li);
        });
    })
    .catch(error => console.error('Error al cargar los datos:', error));

const imageList = [
    'agilidad.webp',
    'bailaConmigo.webp',
    'darknessRevealed.webp',
    'Discordance.webp',
    'EspíasDeLasSombras.webp',
    'estridor.webp',
    'gearhead.webp',
    'ironMaiden.webp',
    'monitorizacionyabuso.webp',
    'muertedefranklin.webp',
    'noSe.jpeg',
    'presencia.webp',
    'thanatofobia.webp',
    'unnvervingpresencia.webp',
    'velocidadSilenciosa.webp',
    'vocacionDeEnfermera.webp'
];

function imgRandom(images, num) {
    const shuffled = images.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

crearBuild.addEventListener('click', () => {
    const imagenesElegidas = imgRandom(imageList, 4);
    imagesContainer.innerHTML = '';
    imagenesElegidas.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `../assets/${image}`;
        imgElement.alt = 'Imagen aleatoria';
        imgElement.style.width = '200px';
        imgElement.style.height = '200px';
        imgElement.style.margin = '10px';
        imagesContainer.appendChild(imgElement);
    });
    buildActual = imagesContainer.innerHTML;
    Swal.fire({
        title: '¡Creada!',
        text: '¡Tu build ha sido creada!',
        imageUrl: '../assets/like.png',
        imageAlt: 'Imagen positiva'
    });
});
guardarBuild.addEventListener('click', () => {
    
    if (buildActual) {
        let buildsGuardadas = JSON.parse(sessionStorage.getItem('buildsGuardadas')) || [];
        buildsGuardadas.push(buildActual);
        sessionStorage.setItem('buildsGuardadas', JSON.stringify(buildsGuardadas));
        const buildElement = document.createElement('div');
        buildElement.innerHTML = buildActual;
        buildElement.style.border = '1px solid #ccc';
        buildElement.style.padding = '10px';
        buildElement.style.marginTop = '10px';
        buildsContainer.appendChild(buildElement);
        buildActual = null;
        
    } 
    Swal.fire({
        title: '¡Guardada!',
        text: '¡Tu build ha sido guardada!',
        imageUrl: '../assets/like.png',
        imageAlt: 'Imagen de guardado'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buildsGuardadas = JSON.parse(sessionStorage.getItem('buildsGuardadas')) || [];
    buildsGuardadas.forEach(build => {
        const buildElement = document.createElement('div');
        buildElement.innerHTML = build;
        buildElement.style.border = '1px solid #ccc';
        buildElement.style.padding = '10px';
        buildElement.style.marginTop = '10px';
        buildsContainer.appendChild(buildElement);
    });
});
