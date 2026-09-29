const express = require('express');
const path = require('path');
const session = require('express-session');
const authService = require('./services/authService');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Template Engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares para arquivos estáticos e parsing do corpo da requisição
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de Sessão
app.use(session({
  secret: 'sigu-escola-chave-secreta-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 horas de validade
  }
}));

// Middleware para disponibilizar o usuário autenticado em todas as views
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.urlAtual = req.path;
  next();
});

// Middleware de proteção de rotas privadas
function requerAutenticacao(req, res, next) {
  if (req.session && req.session.usuario) {
    return next();
  }
  // Redireciona para login guardando a URL de origem se necessário
  return res.redirect('/login');
}

// ==========================================
// ROTAS DE AUTENTICAÇÃO (LOGIN / LOGOUT)
// ==========================================

// Exibe a página de login
app.get('/login', (req, res) => {
  if (req.session && req.session.usuario) {
    return res.redirect('/');
  }
  res.render('login', {
    erro: null,
    emailAnterior: ''
  });
});

// Processa o formulário de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.render('login', {
      erro: 'Por favor, preencha todos os campos.',
      emailAnterior: email || ''
    });
  }

  const usuario = authService.autenticar(email, senha);

  if (usuario) {
    req.session.usuario = usuario;
    return res.redirect('/');
  }

  return res.render('login', {
    erro: 'E-mail ou senha inválidos. Tente novamente.',
    emailAnterior: email
  });
});

// Encerra a sessão do usuário
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar sessão:', err);
    }
    res.redirect('/login');
  });
});

// ==========================================
// ROTAS DO SISTEMA (PROTEGIDAS)
// ==========================================

// Dashboard Principal
app.get('/', requerAutenticacao, (req, res) => {
  res.render('dashboard', {
    paginaAtual: 'inicio'
  });
});

// Módulo Sistema
app.get('/sistema', requerAutenticacao, (req, res) => {
  res.render('sistema', {
    paginaAtual: 'sistema'
  });
});

// Módulo Professor
app.get('/professor', requerAutenticacao, (req, res) => {
  res.render('professor', {
    paginaAtual: 'professor'
  });
});

// Módulo Aluno
app.get('/aluno', requerAutenticacao, (req, res) => {
  res.render('aluno', {
    paginaAtual: 'aluno'
  });
});

// Módulo Infraestrutura
app.get('/infraestrutura', requerAutenticacao, (req, res) => {
  res.render('infraestrutura', {
    paginaAtual: 'infraestrutura'
  });
});

// Módulo Sistema de Ensino
app.get('/ensino', requerAutenticacao, (req, res) => {
  res.render('ensino', {
    paginaAtual: 'ensino'
  });
});

// Módulo Recursos Humanos
app.get('/rh', requerAutenticacao, (req, res) => {
  res.render('rh', {
    paginaAtual: 'rh'
  });
});

// Módulo Integração
app.get('/integracao', requerAutenticacao, (req, res) => {
  res.render('integracao', {
    paginaAtual: 'integracao'
  });
});

// Módulo Portal
app.get('/portal', requerAutenticacao, (req, res) => {
  res.render('portal', {
    paginaAtual: 'portal'
  });
});

// Tela Meu Perfil
app.get('/perfil', requerAutenticacao, (req, res) => {
  res.render('perfil', {
    paginaAtual: 'perfil'
  });
});

// Tela de Personalização
app.get('/personalizacao', requerAutenticacao, (req, res) => {
  res.render('personalizacao', {
    paginaAtual: 'personalizacao'
  });
});

// Rota Curinga / Fallback para submódulos ou rotas futuras
app.get('/:modulo', requerAutenticacao, (req, res) => {
  const modulo = req.params.modulo;
  res.render('em-desenvolvimento', {
    paginaAtual: modulo,
    tituloModulo: modulo.toUpperCase()
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor SIGUScola rodando em http://localhost:${PORT}`);
});