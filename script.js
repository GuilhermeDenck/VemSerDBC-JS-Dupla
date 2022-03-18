class Usuario {
  id;
  tipo;
  nome;
  dataNascimento;
  email;
  senha;
  candidaturas = [];

  constructor(id, tipo, nome, dataNascimento, email, senha, candidaturas) {
    this.id = id;
    this.tipo = tipo;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.email = email;
    this.senha = senha;
    this.candidaturas = candidaturas;
  }
}

class Candidaturas {
  idVaga;
  idCandidato;
  reprovado;

  constructor(idVaga, idCandidato, reprovado) {
    this.idVaga = idVaga;
    this.idCandidato = idCandidato;
    this.reprovado = reprovado;
  }
}

class Vaga {
  id;
  titulo;
  descricao;
  remuneção;
  candidatos = [];

  constructor(id, titulo, descricao, remuneção, candidatos) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.remuneção = remuneção;
    this.candidatos = candidatos;
  }
}

const alternarClasses = (elemento, ...classes) => {
  classes.forEach( classe => {
    elemento.classList.toggle(classe);
  });
}

const irPara = (origem, destino) => {
  const elementoOrigem = document.getElementById(origem);
  const elementoDestino = document.getElementById(destino);

  alternarClasses(elementoOrigem, 'd-none', 'd-flex');
  alternarClasses(elementoDestino, 'd-none', 'd-flex');
}

const validarLogin = async () => {	
  const emailDigitado = document.getElementById('email-input-login').value;
  const senhaDigitada = document.getElementById('password-input-login').value;
  try {
    const response = await axios.get(`http://localhost:3000/usuarios?email=${emailDigitado}`);

    const user = response.data[0];

    const validarSenha = user.senha === senhaDigitada;

    if(validarSenha) {
      irPara('login', 'home');
    } else {
      alert('Senha incorreta');
    }
  } catch (error) {
    console.log('Email incorreto', error);
    alert('Email incorreto');
  }
}

