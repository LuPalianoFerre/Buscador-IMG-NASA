document.getElementById("btnBuscar").addEventListener("click", buscarImagenes);

async function buscarImagenes() {
  const contenedor = document.getElementById("contenedor");
  const input = document.getElementById("inputBuscar");
  const termino = input.value.trim();

  // Limpia el contenedor antes de mostrar nuevos resultados
  contenedor.innerHTML = "";

  if (termino === "") {
    contenedor.innerHTML = `<p class="text-center text-danger">Por favor, ingresa un término de búsqueda.</p>`;
    return;
  }

  const url = `https://images-api.nasa.gov/search?q=${termino}`;

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    // Navegamos dentro del JSON hasta llegar a la lista de items
    const resultados = data.collection.items;

    if (resultados.length === 0) {
      contenedor.innerHTML = `<p class="text-center">No se encontraron resultados para "${termino}".</p>`;
      return;
    }

    // Recorremos los resultados y mostramos cada tarjeta
    resultados.forEach(item => {
      const { title, description, date_created } = item.data[0];
      const imagen = item.links ? item.links[0].href : "https://via.placeholder.com/300x200?text=Sin+imagen";

      const card = `
        <div class="card mb-3 shadow-sm">
          <img src="${imagen}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description ? description : "Sin descripción disponible."}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
          </div>
        </div>
      `;

      contenedor.innerHTML += card;
    });

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    contenedor.innerHTML = `<p class="text-center text-danger">Ocurrió un error al buscar las imágenes.</p>`;
  }
}