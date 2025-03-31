(function() {

    // Función global para actualizar el estado de nuestro header
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
  
    /**
     * Lee los datos de localStorage o crea un objeto por defecto.
     */
    function getHeaderData() {
      let data = JSON.parse(localStorage.getItem('headerData') || '{}');
      // Valores por defecto si no existen
      if (typeof data.progress === 'undefined') data.progress = 0; // número entre 0 y 100
      if (!data.avatar) data.avatar = 'https://via.placeholder.com/50'; 
      if (!data.badges) data.badges = [false, false, false, false, false]; // 5 insignias
  
      return data;
    }
  
    /**
     * Inyecta dinámicamente el HTML del header en el div con id="header-contenedor".
     */
    function renderHeader() {
      const container = document.getElementById('header-contenedor');
      if (!container) return; // Si no existe el contenedor, salimos
  
      const data = getHeaderData();
  
      // Generar la barra de progreso (simple)
      const progressBar = `
        <div style="background: #ddd; width: 100%; height: 10px; border-radius: 5px; overflow: hidden;">
          <div style="background: #4caf50; width: ${data.progress}%; height: 100%;"></div>
        </div>
      `;
  
      // Generar avatar
      const avatarHtml = `
        <div style="padding: 5px;">
          <img src="${data.avatar}" alt="Avatar" style="height:50px; border-radius: 50%;">
        </div>
      `;
  
      // Generar insignias (badges)
      // false = bloqueada, true = desbloqueada
      const badgesHtml = data.badges.map((unlocked, index) => {
        return unlocked
          ? `<img src="https://via.placeholder.com/40?text=B${index+1}" alt="Badge ${index+1}" style="margin: 0 5px;">`
          : `<img src="https://via.placeholder.com/40?text=Lock" alt="Badge bloqueada" style="opacity:0.3; margin: 0 5px;">`;
      }).join('');
  
      // Montar el HTML del header
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
  
    // Intentamos renderizar el header en cuanto se cargue el DOM,
    // por si ya hay algo guardado en localStorage.
    document.addEventListener('DOMContentLoaded', renderHeader);
  
  })();
  