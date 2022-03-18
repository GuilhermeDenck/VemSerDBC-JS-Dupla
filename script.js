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