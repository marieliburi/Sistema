// Mapeamento de cores principais para tons escuros da sidebar
const temasCores = {
  '#2b6cb0': { primary: '#2b6cb0', sidebar: '#0f2b4c' }, // Azul (Padrão)
  '#38a169': { primary: '#38a169', sidebar: '#1c4d25' }, // Verde (Conforme imagem)
  '#e53e3e': { primary: '#e53e3e', sidebar: '#631717' }, // Vermelho
  '#ecc94b': { primary: '#d69e2e', sidebar: '#5f450a' }, // Amarelo/Dourado
  '#b794f4': { primary: '#805ad5', sidebar: '#321d5a' }, // Roxo
  '#f687b3': { primary: '#d53f8c', sidebar: '#521334' }, // Rosa
  '#1a202c': { primary: '#2d3748', sidebar: '#11151c' }  // Escuro/Preto
};

// Função executada ao carregar cada página
(function aplicarTemaGeral() {
  const corSalva = localStorage.getItem('sigu_primary_color') || '#2b6cb0';
  const fonteSalva = localStorage.getItem('sigu_font_size') || '15';

  const tema = temasCores[corSalva] || { primary: corSalva, sidebar: '#0f2b4c' };

  // Aplica as variáveis CSS globais
  document.documentElement.style.setProperty('--primary-color', tema.primary);
  document.documentElement.style.setProperty('--sidebar-color', tema.sidebar);
  document.documentElement.style.setProperty('--base-font-size', fonteSalva + 'px');
})();