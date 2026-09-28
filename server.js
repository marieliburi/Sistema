const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de simulação de usuário logado
app.use((req, res, next) => {
  res.locals.usuario = {
    nome: "Marieli",
    nomeCompleto: "Marieli Buri da Silva",
    cargo: "Administrador",
    email: "marieliburi@email.com",
    telefone: "(14) 99887-7665",
    fotoUrl: "/images/avatar-user.png" // Opcional: imagem de avatar do perfil
  };
  next();
});

// Rota 1: Início (Dashboard Principal)
app.get('/', (req, res) => {
  res.render('dashboard', {
    paginaAtual: 'inicio'
  });
});

// Rota 2: Tela de Sistema
app.get('/sistema', (req, res) => {
  res.render('sistema', {
    paginaAtual: 'sistema'
  });
});
// Rota 3: Tela do Professor
app.get('/professor', (req, res) => {
  res.render('professor', {
    paginaAtual: 'professor'
  });
});

// Rota 4: Tela do Aluno
app.get('/aluno', (req, res) => {
  res.render('aluno', {
    paginaAtual: 'aluno'
  });
});
// Rota X: Tela de Perfil
app.get('/perfil', (req, res) => {
  res.render('perfil', {
    paginaAtual: 'perfil'
  });
});

// Rota de Personalização do Sistema
app.get('/personalizacao', (req, res) => {
  res.render('personalizacao', {
    paginaAtual: 'personalizacao'
  });
});


// Exemplo para futuras rotas (Professor, Aluno, etc.)
app.get('/:modulo', (req, res) => {
  const modulo = req.params.modulo;
  res.render('em-desenvolvimento', {
    paginaAtual: modulo,
    tituloModulo: modulo.toUpperCase()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});