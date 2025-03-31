// test.js
console.log("¡Hola! Este mensaje confirma que test.js se ha cargado correctamente.");

const DEFAULT_AVATAR_URL = 'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-174669.jpg';
// URLs para las insignias:
const BADGE_UNLOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';
const BADGE_LOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';

// Tamaños de las imágenes (puedes ajustarlos)
const AVATAR_WIDTH = 60;   // ancho en píxeles para el avatar
const AVATAR_HEIGHT = 60;  // alto en píxeles para el avatar
const BADGE_SIZE = 40;     // ancho/alto de cada insignia

// Función global para actualizar el estado del header
window.updateHeaderData = function(newData) {
  let headerData = getHeaderData();
  Object.assign(headerData, newData);
  localStorage.setItem('headerData', JSON.stringify(headerData));
  renderHeader();
};

// Obtiene los datos guardados en localStorage o devuelve valores predeterminados
function getHeaderData() {
  let data = JSON.parse(localStorage.getItem('headerData') || '{}');
  if (typeof data.progress === 'undefined') data.progress = 0;
  if (!data.avatar) data.avatar = DEFAULT_AVATAR_URL;
  if (!data.badges) data.badges = [false, false, false, false, false];
  return data;
}

// Renderiza el header en el contenedor con id "header-contenedor"
function renderHeader() {
  const container = document.getElementById('header-contenedor');
  if (!container) {
    console.warn("No se encontró el contenedor #header-contenedor");
    return;
  }
  const data = getHeaderData();

  // Crear la barra de progreso
  const progressBar = `
    <div style="background: #ddd; width: 100%; height: 10px; border-radius: 5px; overflow: hidden;">
      <div style="background: #4caf50; width: ${data.progress}%; height: 100%;"></div>
    </div>
  `;

  // Crear el HTML para el avatar
  const avatarHtml = `
    <div style="padding: 5px;">
      <img src="${data.avatar}" alt="Avatar" style="
        width: ${AVATAR_WIDTH}px; 
        height: ${AVATAR_HEIGHT}px; 
        border-radius: 50%;
        object-fit: cover;">
    </div>
  `;

  // Crear el HTML para las insignias
  const badgesHtml = data.badges.map((unlocked, index) => {
    return unlocked
      ? `<img src="${BADGE_UNLOCKED_URL}" alt="Badge ${index+1}" style="margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;">`
      : `<img src="${BADGE_LOCKED_URL}" alt="Badge bloqueada" style="opacity:0.3; margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;">`;
  }).join('');

  // Montar el HTML completo del header
  container.innerHTML = `
    <div style="border-bottom: 1px solid #ccc; padding: 10px; display: flex; align-items: center; gap: 20px;">
      ${avatarHtml}
      <div style="flex-grow:1;">
        <div style="font-weight: bold; margin-bottom: 5px;">Progreso: ${data.progress}%</div>
        ${progressBar}
      </div>
      <div style="display: flex; align-items: center;">
        ${badgesHtml}
      </div>
    </div>
  `;
}

// Cuando el DOM esté listo, renderiza el header.
// Si no hay datos en localStorage, inicializa con valores predeterminados.
  if (!localStorage.getItem('headerData')) {
    updateHeaderData({
      progress: 10,
      badges: [false, false, false, false, false]
    });
  } else {
    renderHeader();
  }
