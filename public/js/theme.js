// Mapeamento de cores principais para tons escuros da sidebar e topbar
const temasCores = {
  '#2b6cb0': { primary: '#2b6cb0', sidebar: '#0f2b4c', topbar: '#1a56a3' }, // Azul (Padrão)
  '#38a169': { primary: '#38a169', sidebar: '#1c4d25', topbar: '#276749' }, // Verde
  '#e53e3e': { primary: '#e53e3e', sidebar: '#631717', topbar: '#9b2c2c' }, // Vermelho
  '#ecc94b': { primary: '#d69e2e', sidebar: '#5f450a', topbar: '#b7791f' }, // Amarelo/Dourado
  '#b794f4': { primary: '#805ad5', sidebar: '#321d5a', topbar: '#553c9a' }, // Roxo
  '#f687b3': { primary: '#d53f8c', sidebar: '#521334', topbar: '#97266d' }, // Rosa
  '#1a202c': { primary: '#2d3748', sidebar: '#11151c', topbar: '#1a202c' }  // Escuro/Preto
};

function aplicarTema(cor, fonte) {
  const corSalva = cor || localStorage.getItem('sigu_primary_color') || '#2b6cb0';
  const fonteSalva = fonte || localStorage.getItem('sigu_font_size') || '15';

  const tema = temasCores[corSalva] || {
    primary: corSalva,
    sidebar: '#0f2b4c',
    topbar: '#1a56a3'
  };

  document.documentElement.style.setProperty('--primary-color', tema.primary);
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
