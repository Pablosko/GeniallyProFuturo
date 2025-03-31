<<<<<<< HEAD
=======
  const currentScript = document.currentScript;
  if (currentScript) {
    console.log("Atributos recibidos:", currentScript.dataset);
  } else {
>>>>>>> origin/main
    console.log("document.currentScript es null");
  // Recupera el script actual y sus atributos data
  const dataset = currentScript ? currentScript.dataset : {};

  // Extraer parámetros, convirtiéndolos al tipo adecuado
  const DEFAULT_PROGRESS = dataset.progress ? parseInt(dataset.progress, 10) : 0;
  const DEFAULT_AVATAR_URL = dataset.avatar || 'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-174669.jpg';
  // Nota: si pasas badges como string JSON, conviertele
  const DEFAULT_BADGES = dataset.badges ? JSON.parse(dataset.badges) : [false, false, false, false, false];

  // Configuración de imágenes y tamaños (puedes ajustar)
  const BADGE_UNLOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';
  const BADGE_LOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';
  const AVATAR_WIDTH = 60;
  const AVATAR_HEIGHT = 60;
  const BADGE_SIZE = 40;

  // Función global para actualizar los datos del header
  window.updateHeaderData = function(newData) {
    let headerData = getHeaderData();
    Object.assign(headerData, newData);
    localStorage.setItem('headerData', JSON.stringify(headerData));
    renderHeader();
  };

  function getHeaderData() {
    let data = JSON.parse(localStorage.getItem('headerData') || '{}');
    if (typeof data.progress === 'undefined') data.progress = DEFAULT_PROGRESS;
    if (!data.avatar) data.avatar = DEFAULT_AVATAR_URL;
    if (!data.badges) data.badges = DEFAULT_BADGES;
    return data;
  }

  function renderHeader() {
    const container = document.getElementById('header-contenedor');
    if (!container) return;
    const data = getHeaderData();

    const progressBar = `
      <div style="background: #ddd; width: 100%; height: 10px; border-radius: 5px; overflow: hidden;">
        <div style="background: #4caf50; width: ${data.progress}%; height: 100%;"></div>
      </div>
    `;

    const avatarHtml = `
      <div style="padding: 5px;">
        <img src="${data.avatar}" alt="Avatar" style="width: ${AVATAR_WIDTH}px; height: ${AVATAR_HEIGHT}px; border-radius: 50%; object-fit: cover;">
      </div>
    `;

    const badgesHtml = data.badges.map((unlocked, index) => {
      return unlocked
        ? `<img src="${BADGE_UNLOCKED_URL}" alt="Badge ${index+1}" style="margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;">`
        : `<img src="${BADGE_LOCKED_URL}" alt="Badge bloqueada" style="opacity:0.3; margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;">`;
    }).join('');

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

  // Escucha la carga del DOM para renderizar
  document.addEventListener('DOMContentLoaded', renderHeader);

  // Inicializa con los valores pasados por atributos
  updateHeaderData({
    progress: DEFAULT_PROGRESS,
    avatar: DEFAULT_AVATAR_URL,
    badges: DEFAULT_BADGES
  });

