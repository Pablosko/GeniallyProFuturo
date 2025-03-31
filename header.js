(function() {
    // ==========================
    //   CONFIGURACIÓN (Variables)
    // ==========================
    const DEFAULT_AVATAR_URL = 'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-174669.jpg';
    // Para las insignias, por ejemplo:
    const BADGE_UNLOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';
    const BADGE_LOCKED_URL = 'https://cdn-icons-png.flaticon.com/512/1426/1426761.png';
  
    // Tamaños de las imágenes (puedes ajustarlos a mano aquí)
    const AVATAR_WIDTH = 60;   // ancho en píxeles para el avatar
    const AVATAR_HEIGHT = 60;  // alto en píxeles para el avatar
    const BADGE_SIZE = 40;     // ancho/alto de cada insignia
  
    // ==========================
    //   Función global para actualizar datos
    // ==========================
    window.updateHeaderData = function(newData) {
      // 1. Leer lo que ya tengamos en localStorage
      let headerData = getHeaderData();
  
      // 2. Mezclar con los nuevos datos recibidos
      Object.assign(headerData, newData);
  
      // 3. Guardar en localStorage
      localStorage.setItem('headerData', JSON.stringify(headerData));
  
      // 4. Volver a renderizar el header con la nueva info
      renderHeader();
    };
  
    // ==========================
    //   Obtener el estado guardado
    // ==========================
    function getHeaderData() {
      let data = JSON.parse(localStorage.getItem('headerData') || '{}');
      // Valores por defecto si no existen
      if (typeof data.progress === 'undefined') data.progress = 0; // número entre 0 y 100
      if (!data.avatar) data.avatar = DEFAULT_AVATAR_URL; 
      if (!data.badges) data.badges = [false, false, false, false, false]; // 5 insignias por ejemplo
  
      return data;
    }
  
    // ==========================
    //   Renderizar el header en el DOM
    // ==========================
    function renderHeader() {
      const container = document.getElementById('header-contenedor');
      if (!container) return; // Si no existe, salimos
  
      const data = getHeaderData();
  
      // Barra de progreso
      const progressBar = `
        <div style="background: #ddd; width: 100%; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: #4caf50; width: ${data.progress}%; height: 100%;"></div>
        </div>
      `;
  
      // Avatar (redimensionado usando las variables de configuración)
      const avatarHtml = `
        <div style="padding: 5px;">
          <img 
            src="${data.avatar}" 
            alt="Avatar" 
            style="
              width: ${AVATAR_WIDTH}px; 
              height: ${AVATAR_HEIGHT}px; 
              border-radius: 50%;
              object-fit: cover;
            ">
        </div>
      `;
  
      // Insignias (badges)
      //   - false = bloqueada (BADGE_LOCKED_URL con opacidad)
      //   - true = desbloqueada (BADGE_UNLOCKED_URL normal)
      const badgesHtml = data.badges.map((unlocked, index) => {
        return unlocked
          ? `<img 
               src="${BADGE_UNLOCKED_URL}" 
               alt="Badge ${index+1}" 
               style="margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;"
             >`
          : `<img 
               src="${BADGE_LOCKED_URL}" 
               alt="Badge bloqueada" 
               style="opacity:0.3; margin: 0 5px; width: ${BADGE_SIZE}px; height: ${BADGE_SIZE}px;"
             >`;
      }).join('');
  
      // Montar el header final
      container.innerHTML = `
        <div style="border-bottom: 1px solid #ccc; padding: 10px; display: flex; align-items: center; gap: 20px;">
          <!-- Sección Avatar -->
          ${avatarHtml}
  
          <!-- Sección Progreso -->
          <div style="flex-grow:1;">
            <div style="font-weight: bold; margin-bottom: 5px;">Progreso: ${data.progress}%</div>
            ${progressBar}
          </div>
  
          <!-- Sección Badges -->
          <div style="display: flex; align-items: center;">
            ${badgesHtml}
          </div>
        </div>
      `;
    }
  
    // Escuchamos la carga del DOM para renderizar
    document.addEventListener('DOMContentLoaded', renderHeader);
  
  })();
  