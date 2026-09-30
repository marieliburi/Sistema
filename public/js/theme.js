// Mapeamento de cores principais para tons da sidebar, topbar e hover dinâmico
const temasCores = {
  '#2b6cb0': { primary: '#2b6cb0', sidebar: '#0f2b4c', topbar: '#1a56a3', hover: '#1a56a3' }, // Azul (Padrão)
  '#38a169': { primary: '#38a169', sidebar: '#1c4d25', topbar: '#276749', hover: '#22543d' }, // Verde
  '#e53e3e': { primary: '#e53e3e', sidebar: '#631717', topbar: '#9b2c2c', hover: '#742a2a' }, // Vermelho
  '#ecc94b': { primary: '#d69e2e', sidebar: '#5f450a', topbar: '#b7791f', hover: '#975a16' }, // Amarelo/Dourado
  '#b794f4': { primary: '#805ad5', sidebar: '#321d5a', topbar: '#553c9a', hover: '#44337a' }, // Roxo
  '#f687b3': { primary: '#d53f8c', sidebar: '#521334', topbar: '#97266d', hover: '#702459' }, // Rosa
  '#1a202c': { primary: '#2d3748', sidebar: '#11151c', topbar: '#1a202c', hover: '#171923' }  // Escuro/Preto
};

// Função para escurecer cor hex caso não esteja mapeada
function escurecerHex(hex, percent = 20) {
  try {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    const r = Math.max(0, Math.floor((num >> 16) * (100 - percent) / 100));
    const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (100 - percent) / 100));
    const b = Math.max(0, Math.floor((num & 0x0000FF) * (100 - percent) / 100));
    return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  } catch (e) {
    return '#1a56a3';
  }
}

function aplicarTema(cor, fonte) {
  const corSalva = cor || localStorage.getItem('sigu_primary_color') || '#2b6cb0';
  const fonteSalva = fonte || localStorage.getItem('sigu_font_size') || '15';

  const tema = temasCores[corSalva] || {
    primary: corSalva,
    sidebar: '#0f2b4c',
    topbar: escurecerHex(corSalva, 15),
    hover: escurecerHex(corSalva, 25)
  };

  const hoverColor = tema.hover || escurecerHex(tema.primary, 20);

  document.documentElement.style.setProperty('--primary-color', tema.primary);
  document.documentElement.style.setProperty('--primary-hover', hoverColor);
  document.documentElement.style.setProperty('--sidebar-color', tema.sidebar);
  document.documentElement.style.setProperty('--topbar-color', tema.topbar);
  document.documentElement.style.setProperty('--base-font-size', fonteSalva + 'px');
}

// Aplicação imediata para evitar FOUC
aplicarTema();

// Re-executa no DOMContentLoaded se necessário
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => aplicarTema());
}
