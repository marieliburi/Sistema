const fs = require('fs');
const path = require('path');

const USUARIOS_FILE = path.join(__dirname, '..', 'data', 'usuarios.json');

function carregarUsuarios() {
  try {
    if (!fs.existsSync(USUARIOS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(USUARIOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler usuários:', error);
    return [];
  }
}

function salvarUsuarios(usuarios) {
  try {
    fs.writeFileSync(USUARIOS_FILE, JSON.stringify(usuarios, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
    return false;
  }
}

function autenticar(email, senha) {
  const usuarios = carregarUsuarios();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  
  if (usuario && usuario.senha === senha) {
    // Retorna cópia sem expor a senha diretamente
    const { senha: _, ...dadosPublicos } = usuario;
    return dadosPublicos;
  }
  return null;
}

function buscarPorId(id) {
  const usuarios = carregarUsuarios();
  const usuario = usuarios.find(u => u.id === Number(id));
  if (usuario) {
    const { senha: _, ...dadosPublicos } = usuario;
    return dadosPublicos;
  }
  return null;
}

function atualizarPerfil(id, novosDados) {
  const usuarios = carregarUsuarios();
  const index = usuarios.findIndex(u => u.id === Number(id));
  if (index === -1) return null;

  usuarios[index] = {
    ...usuarios[index],
    ...novosDados,
    id: usuarios[index].id,
    senha: usuarios[index].senha // preserva senha caso não seja alterada
  };

  salvarUsuarios(usuarios);
  const { senha: _, ...dadosPublicos } = usuarios[index];
  return dadosPublicos;
}

module.exports = {
  carregarUsuarios,
  autenticar,
  buscarPorId,
  atualizarPerfil
};
