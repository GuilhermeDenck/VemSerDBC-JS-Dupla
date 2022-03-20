let USER_LOGADO;
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
  idvaga;
  idcandidato;
  reprovado;

  constructor(idvaga, idcandidato, reprovado) {
    this.idvaga = idvaga;
    this.idcandidato = idcandidato;
    this.reprovado = reprovado;
  }
}

class Vaga {
  id;
  titulo;
  descricao;
  remuneracao;
  candidatos = [];

  constructor(id, titulo, descricao, remuneracao, candidatos) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.remuneracao = remuneracao;
    this.candidatos = candidatos;
  }
}


//#region VALIDAR NOME

const validarNome = () => {
  const nomeInput = document.getElementById('nome-input');
  const nome = nomeInput.value;
  const nomeSplit = [...nome];
  
  
  const verificaNome = nomeSplit.some( c => c.toLowerCase() === c.toUpperCase() && c !== ' ');
  
  
  const nomeErro = document.getElementById('nome-erro');
  
  const ehValido = !verificaNome;
  ehValido ? nomeErro.classList.add('d-none') : nomeErro.classList.remove('d-none');
  
  return ehValido;
}
//#endregion VALIDAR NOME

//#region Validação Email
const validarEmail = () => {
  let emailDigitado = document.getElementById('email-input-registration').value;
  let listaCaracteres = emailDigitado.split(''); // [...emailDigitado]

  let emailSplit = emailDigitado.split('@');
  
  let possuiArroba = emailSplit.length > 1;

  let dominioEmail = possuiArroba ? emailSplit[1] : '';
  let dominioEmailSplit = dominioEmail.split('.');

  let possuiPontosNoDominio = dominioEmailSplit.length > 1;

  let possuiCaracteresEntrePontos = dominioEmailSplit.every( d => d.length > 1 );

  let comecaComLetra = listaCaracteres.length ? listaCaracteres[0].toUpperCase() !== listaCaracteres[0].toLowerCase() : false;

  let ehValido = possuiArroba && possuiPontosNoDominio && possuiCaracteresEntrePontos && comecaComLetra;

  // para setar o texto de erro em vermelho
  let erroEmail = document.getElementById('email-registration-error');
  erroEmail.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

  return ehValido;
}
//#endregion Validação Email

//#region Validação Senha
const validarSenha = () => {
  let senhaDigitada = document.getElementById('password-input-registration').value;
  let listaCaracteres = senhaDigitada.split('');

  let letras = listaCaracteres.filter( char => char.toLowerCase() !== char.toUpperCase() );

  let possuiLetraMaiuscula = letras.some( l => l.toUpperCase() === l ); // "A".toUppercase() === "A"
  let possuiLetraMinuscula = letras.some( l => l.toLowerCase() === l );

  let possuiCharEspecial = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && isNaN(parseInt(char)) );
  let possuiNumero = listaCaracteres.some( char => char.toLowerCase() === char.toUpperCase() && !isNaN(parseInt(char)) );

  let possuiOitoCaracteres = senhaDigitada.length >= 8;

  let naoPossuiEspacos = !senhaDigitada.includes(' ');

  let ehValido = possuiOitoCaracteres && possuiLetraMaiuscula && possuiLetraMinuscula && 
      possuiCharEspecial && possuiNumero && naoPossuiEspacos;

  // para setar o texto de erro em vermelho
  let erroSenha = document.getElementById('password-registration-error');
  erroSenha.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

  return ehValido;
}
//#endregion Validação Senha

//#region Validação Data
const validarData = () => { 
  let inputData = document.getElementById('date-input-registration');
  let dataDigitada = inputData.value;

  adicionarMascaraData(inputData, dataDigitada);

  let dataConvertida = moment(dataDigitada, 'DDMMYYYY');

  let dezoitoAnosAtras = moment().diff(dataConvertida, 'years') >= 18;

  // comparações de data - date1.isBefore(date2)  /  date1.isAfter(date2)  /  date1.isSameOrBefore(date2)  /  date1.isSameOrAfter(date2)
  let dataAnteriorHoje = dataConvertida.isBefore(moment());

  let ehValido = dataConvertida.isValid() && dataAnteriorHoje && dezoitoAnosAtras && dataDigitada.length === 10; // 10/05/2001

  // para setar o texto de erro em vermelho
  let erroData = document.getElementById('date-registration-error');
  erroData.setAttribute('class', ehValido ? 'd-none' : 'text-danger');

  return ehValido;
}

const adicionarMascaraData = (input, data) => {
  let listaCaracteres = [...data];
  
  let listaFiltrada = listaCaracteres.filter(c => !isNaN(parseInt(c)));
  if(listaFiltrada && listaFiltrada.length) {
      let dataDigitada = listaFiltrada.join('');

      const { length } = dataDigitada;

      switch(length) { 
          case 0: case 1: case 2:
              input.value = dataDigitada; 
              break;
          case 3: case 4:
              input.value = `${dataDigitada.substring(0, 2)}/${dataDigitada.substring(2, 4)}`;
              break;
          default:
              input.value = `${dataDigitada.substring(0, 2)}/${dataDigitada.substring(2, 4)}/${dataDigitada.substring(4, 8)}`;
      }
  }
}
//#endregion Validação Data


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

const validarCadastro = (event) => {
  let cadastroValido = validarData() && validarEmail() && validarSenha() && validarNome();
  cadastroValido ? alert('Cadastro realizado com sucesso!') : alert('Erro! Confira os campos de cadastro!');

  if(cadastroValido) {
    cadastrarUsuario(event);
    irPara('registration', 'login')
  }
}

const cadastrarUsuario = async () => {
  const campoTipo = document.getElementById('user-type').value
  const campoNome = document.getElementById("nome-input").value;
  const campoData = document.getElementById("date-input-registration").value;
  const campoEmail = document.getElementById("email-input-registration").value;
  const campoSenha = document.getElementById("password-input-registration").value;
  const nomeFormatado = campoNome.split(' ').map( nome => nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase() ).join(' ');
  const usuario = new Usuario (null, campoTipo, nomeFormatado, campoData, campoEmail, campoSenha, []);
  try {
    const response = await axios.post(`http://localhost:3000/usuarios`, usuario);
    let idUser = response.data.id;
    usuario.id = idUser;

    document.getElementById('user-type').value = '';
    document.getElementById("nome-input").value = '';
    document.getElementById("date-input-registration").value = '';
    document.getElementById("email-input-registration").value = '';
    document.getElementById("password-input-registration").value = '';
    
  } catch (error) {
    console.log(`${error}, Ops, algo deu errado, por favor aguarde!`)
  }
}

const validarLogin = async () => {	
  const emailDigitado = document.getElementById('email-input-login').value;
  const senhaDigitada = document.getElementById('password-input-login').value;
  try {
    const response = await axios.get(`http://localhost:3000/usuarios?email=${emailDigitado}`);

    const user = response.data[0];

    const validarSenha = user.senha === senhaDigitada;
    if(validarSenha) {
      USER_LOGADO = user;
      document.getElementById('email-input-login').value = '';
      document.getElementById('password-input-login').value = '';
      const ulVagas = document.getElementById('lista-vagas');
      ulVagas.textContent = '';
      listaVagas();
      irPara('login', 'vagas');
    } else {
      alert('Senha incorreta');
    }
  } catch (error) {
    console.log('Email incorreto', error);
    alert('Email incorreto');
  }
}


const esqueceuSenha = async () => {
  try {
    const email = prompt('Digite seu e-mail');
    alert('Pesquisando aguarde...');
    const response = await axios.get(`http://localhost:3000/usuarios?email=${email}`);

    const senhaRecuparada = response.data[0].senha;

    alert(`Sua senha é: ${senhaRecuparada}`);
  } catch (error) {
    alert('Email não encontrado');
  }
}

const validarCadastroVaga = async (event) => {
  const cadastroValido = validarTitulo() && validarDescricao() && validarRemuneracao();

  try {
    if(cadastroValido) {
      const titulo = document.getElementById('titulo-input-registration').value;
      const descricao = document.getElementById('descricao-input-registration').value;
      const remuneracao = document.getElementById('remuneracao-input-registration').value;

      const vaga = new Vaga(null, titulo, descricao, remuneracao, []);

      const response = await axios.post(`http://localhost:3000/vagas`, vaga);
      let idVaga = response.data.id;
      vaga.id = idVaga;
      alert('Vaga cadastrada com sucesso!');
      
      const ulVagas = document.getElementById('lista-vagas');
      ulVagas.textContent = '';
      listaVagas();

      irPara('registrationVagas', 'vagas');
      document.getElementById('titulo-input-registration').value = '';
      document.getElementById('descricao-input-registration').value = '';
      document.getElementById('remuneracao-input-registration').value = '';
    } else {
      alert('Erro! Confira os campos de cadastro!');
    }
  } catch (error) {
    alert('Erro ao cadastrar vaga');
  }
}

const validarTitulo = () => {
  const titulo = document.getElementById('titulo-input-registration').value;
  const errorTitulo = document.getElementById('titulo-erro-registration');
  const tituloSplit = [...titulo];

  const valid =  tituloSplit.length >= 5;

  valid ? errorTitulo.classList.add('d-none') : errorTitulo.classList.remove('d-none');

  return valid;
}

const validarDescricao = () => {
  const descricao = document.getElementById('descricao-input-registration').value;
  const errordescricao = document.getElementById('descricao-erro-registration');
  const descricaoSplit = [...descricao];

  const valid =  descricaoSplit.length >= 5;

  valid ? errordescricao.classList.add('d-none') : errordescricao.classList.remove('d-none');

  return valid;
}

const validarRemuneracao = () => {
  const inputRemuneracao = document.getElementById('remuneracao-input-registration');
  const remuneracao = document.getElementById('remuneracao-input-registration').value;


  const errorremuneracao = document.getElementById('remuneracao-registration-error');
  maskRemunaracao(inputRemuneracao, remuneracao);

  const remuneracaoSplit = [...remuneracao];

  const valid =  remuneracaoSplit.length >= 2;

  valid ? errorremuneracao.classList.add('d-none') : errorremuneracao.classList.remove('d-none');
  

  return valid;

}

const maskRemunaracao = (input, value) => {
  let listaCaracteres = [...value];
  
  let listaFiltrada = listaCaracteres.filter(c => !isNaN(parseInt(c)));
  if(listaFiltrada && listaFiltrada.length) {
      let dataDigitada = listaFiltrada.join('');

      const { length } = dataDigitada;

      switch(length) { 
          case 0: case 1: case 2:
              input.value = `R$ ${dataDigitada}`; 
              break;
      }
  }
}

const listaVagas = async() => {
  const CLASS_UL = "py-4 px-5 container";
  const CLASS_BUTTON = "d-flex p-3 w-100 border border-dark rounded align-items-center justify-content-between btn-hover-vagas"
  const STYLE_BUTTON = "background: transparent; outline: none; border: none;";
  const CLASS_SPAN = "fw-normal";
  const CLASS_P = "fw-bold m-0";

  try {
    const response = await axios.get(`http://localhost:3000/vagas`);
    response.data.forEach( elemento => {
      const ul = document.getElementById('lista-vagas');
      const spanTitulo = document.createElement('span');
      spanTitulo.textContent = elemento.titulo;
      spanTitulo.setAttribute('class', CLASS_SPAN);

      const pTitulo = document.createElement('p');
      pTitulo.textContent = 'Titulo: ';
      pTitulo.setAttribute('class', CLASS_P);
      pTitulo.append(spanTitulo);

      const spanRemuneracao = document.createElement('span');
      spanRemuneracao.textContent = elemento.remuneracao;
      spanRemuneracao.setAttribute('class', CLASS_SPAN);

      const pRemuneracao = document.createElement('p');
      pRemuneracao.textContent = 'Remuneração: ';
      pRemuneracao.setAttribute('class', CLASS_P);
      pRemuneracao.append(spanRemuneracao);

      const button = document.createElement('button');
      const idVaga = elemento.id;
      button.setAttribute('id', idVaga)
      button.setAttribute('class', CLASS_BUTTON);
      button.setAttribute('style', STYLE_BUTTON);
      button.setAttribute('onclick', 'abrirDetalhes(event)');
      button.append(pTitulo, pRemuneracao);


      const li = document.createElement('li');
      li.appendChild(button);
      li.setAttribute('class', 'mt-3');

      ul.appendChild(li);
      ul.setAttribute('class', CLASS_UL);
    })
    
    const btnTrabalhador = document.getElementById('btn-vagas-trabalhador');
    const btnRecrutador = document.getElementById('btn-vagas-recrutador');
    if(USER_LOGADO.tipo == 'trabalhador') {
      btnRecrutador.classList.remove('d-flex');
      btnRecrutador.classList.add('d-none');
      btnTrabalhador.classList.remove('d-none');
      btnTrabalhador.classList.add('d-flex');
    }
    if(USER_LOGADO.tipo == 'recrutador') {
      btnTrabalhador.classList.remove('d-flex');
      btnTrabalhador.classList.add('d-none');
      btnRecrutador.classList.remove('d-none');
      btnRecrutador.classList.add('d-flex');
    }

  } catch (error) {
    console.log(`Erro ao listar vagas: ${error}`);
  }
}

let idDetalhe;
const abrirDetalhes = async (event) => {
  idDetalhe = event.target.id;
  try {
    const response = await axios.get(`http://localhost:3000/vagas?id=${idDetalhe}`);
    const vaga = response.data[0];
    const { id, titulo, descricao, remuneracao, candidatos } = vaga;

    irPara('vagas', 'detalhe-vagas');
    
    const spanTituloVaga = document.getElementById('span-titulo-vaga');
    spanTituloVaga.textContent = vaga.titulo;

    const spanDescricaoVaga = document.getElementById('span-descricao-vaga');
    spanDescricaoVaga.textContent = vaga.descricao;

    const spanRemuneracaoVaga = document.getElementById('span-remuneracao-vaga');
    spanRemuneracaoVaga.textContent = vaga.remuneracao;

    const STYLE_LI_CANDITADOS = "d-flex justify-content-between border border-dark py-2 ps-2 pe-4";
    const STYLE_SPAN_DATA = "py-2";

    const ulTrabalhador = document.getElementById('lista-candidatos-vaga');
    ulTrabalhador.textContent = '';

    const ulRecrutador = document.getElementById('lista-candidatos-vaga-recrutador');
    ulRecrutador.textContent = '';

    const divTrabalhador = document.getElementById('candidatos-trabalhador');

    const divRecrutador = document.getElementById('candidatos-recrutador');

    if(USER_LOGADO.tipo == 'trabalhador') {
      divRecrutador.classList.remove('d-flex');
      divRecrutador.classList.add('d-none');
      divTrabalhador.classList.remove('d-none');
      divTrabalhador.classList.add('d-flex');
      
      vaga.candidatos.forEach(candidato => {
        const spanNome = document.createElement('span');
        const spanDataNacimento = document.createElement('span');
        const li = document.createElement('li');

        spanNome.textContent = candidato.nome;
        spanNome.setAttribute('class', STYLE_SPAN_DATA)
        spanDataNacimento.textContent = candidato.dataNascimento;
        spanDataNacimento.setAttribute('class', STYLE_SPAN_DATA);
        li.append(spanNome, spanDataNacimento);
        li.setAttribute('class', STYLE_LI_CANDITADOS);
        ulTrabalhador.appendChild(li);
      });
    }

    if(USER_LOGADO.tipo == 'recrutador') {
      divTrabalhador.classList.remove('d-flex');
      divTrabalhador.classList.add('d-none');
      divRecrutador.classList.remove('d-none');
      divRecrutador.classList.add('d-flex');

    const STYLE_BTN_REPROVAR = "btn btn-danger";
    vaga.candidatos.forEach(candidato => {
      let idButton = `btn-reprova-${candidato.id}`
      const spanNome = document.createElement('span');
      const spanDataNacimento = document.createElement('span');
      const btnReprovar = document.createElement('button');
      const li = document.createElement('li');
      btnReprovar.setAttribute('id', idButton)
      btnReprovar.setAttribute('class', STYLE_BTN_REPROVAR);
      btnReprovar.textContent = 'Reprovar';
      btnReprovar.setAttribute('onclick', 'reprovarCandidato(event)');
      

      spanNome.textContent = candidato.nome;
      spanNome.setAttribute('id', `candidato-${candidato.id}`)
      spanNome.setAttribute('class', STYLE_SPAN_DATA)
      spanDataNacimento.textContent = candidato.dataNascimento;
      spanDataNacimento.setAttribute('class', STYLE_SPAN_DATA);
      li.append(spanNome, spanDataNacimento, btnReprovar);
      li.setAttribute('class', STYLE_LI_CANDITADOS);
      
      //setar id para Li para poder reprovar o cara li.setAttribute('id', );
      ulRecrutador.appendChild(li);
    });
    }
  } catch (error) {
    console.log('Erro ao carregar detalhes da vaga', error);
  }
}

const candidatarVaga = async () => {
  try {
    
    const responsePostCandidatura = await adicionarCandidatura();

    const adicionarCandidaturaUsuario = await adicionarNoUsuario(responsePostCandidatura.data);

    const adicionarCandidatoNasVagas = await adicionarUserNasVagas();
    

  } catch (error) {
    console.log(`Erro ao candidatar vaga: ${error}`);
  }
}

const adicionarCandidatura = async () => {
  const candidaturas = new Candidaturas(idDetalhe, USER_LOGADO.id, false);
  try {
    const responsePostCandidatura = await axios.post('http://localhost:3000/candidaturas', candidaturas);
    return responsePostCandidatura;
  } catch (error) {
    console.log(`Erro ao adicionar candidatura: ${error}`);
  }
}

const adicionarNoUsuario = async (objCandidatura) => {
  const { candidaturas } = USER_LOGADO;
  candidaturas.push(objCandidatura);
  try {
    const UserAlterado = {
      id: USER_LOGADO.id,
      tipo: USER_LOGADO.tipo,
      nome: USER_LOGADO.nome,
      dataNascimento: USER_LOGADO.dataNascimento,
      email: USER_LOGADO.email,
      senha: USER_LOGADO.senha,
      candidaturas: candidaturas
    }

    const response = await axios.put(`http://localhost:3000/usuarios/${USER_LOGADO.id}`, UserAlterado);
    return response
  } catch (error) {
    console.log(`Erro ao adicionar candidatura no usuario: ${error}`);
  }
}

const adicionarUserNasVagas = async () => {

  try {
    let vaga = await getVagaById(idDetalhe);
    const { id, titulo, descricao, remuneracao, candidatos } = vaga.data;

    candidatos.push({
      id: USER_LOGADO.id,
      nome: USER_LOGADO.nome,
      dataNascimento: USER_LOGADO.dataNascimento,
      email: USER_LOGADO.email
    })

    const vagaAlterada = {
      id: id,
      titulo: titulo,
      descricao: descricao,
      remuneracao: remuneracao,
      candidatos: candidatos
    }
    const response = await axios.put(`http://localhost:3000/vagas/${id}`, vagaAlterada);
    console.log(response);
    return response;
  } catch (error) {
    console.log('erro ao adicionar candidato nas candidaturas da vaga', error)
  }
}

const getVagaById = (idVaga) => {
  try {
    const response = axios.get(`http://localhost:3000/vagas/${idVaga}`);
    return response;
  } catch (error) {
    console.log(`Erro ao buscar vaga: ${error}`);
  }

}

const reprovarCandidato = (event) => {
  const idBtn = event.target.id;
  const idCandidato = idBtn.split('-')[2];
  console.log(idCandidato);


  document.getElementById(idBtn).disabled = true;
  console.log('teste reprovar');
}

const getUserById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/usuarios/${id}`)
    return response;
  } catch (error) {
    console.log('Erro ao buscar o usuario pelo id:', error)
  }
}




const excluirVaga = async () => {
  try {
    const pegaCandidaturas = await getCandidaturas();
    let idVaga;
    let idCandidatoVaga = [];

    for(const i of pegaCandidaturas.data){
      if(i.idvaga === idDetalhe){
        idVaga = i.id;
        idCandidatoVaga.push(i.idcandidato);
      }
    }

    const deletarCandidatos = await axios.delete(`http://localhost:3000/candidaturas/${idVaga}`);

    const deletarVagas = await axios.delete(`http://localhost:3000/vagas/${idDetalhe}`);

    const deletarVagaDoCandidato = await deletarVagaCandidato(idCandidatoVaga, idVaga);

  } catch (error) {
    console.log('erro ao deletar a vaga', error)
  }
}

const getCandidaturas = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/candidaturas`);
    return response;
  } catch (error) {
    console.log('Erro ao pegar candidaturas:', error)
  }
}

const deletarVagaCandidato = async (idCandidato, idVaga) => {
  try {
      let arrayCandidatos = [];
      console.log('entrei no deletar vaga candidato');
      idCandidato.forEach( async id => {
        try {
          console.log(id)
          console.log('entrei no forEach');
          let response = await axios.get(`http://localhost:3000/usuarios/${id}`);
          console.log(response.data)
          arrayCandidatos.push(response.data);
        } catch (error) {
          console.log('erro ao deletar vaga do candidato', error);
        }
      });

      console.log('sai do forEach');
      console.log(arrayCandidatos);
      arrayCandidatos.forEach(async (user) => {
        console.log('entrei no forEach do arrayCandidatos');
        let newCandidaturasUser = user.candidaturas.filter(candidato => candidato.id != idVaga );
        console.log(newCandidaturasUser);
        try {
          const newCandidatura = {
            id: user.id,
            tipo: user.tipo,
            nome: user.nome,
            dataNascimento: user.dataNascimento,
            email: user.email,
            senha: user.senha,
            candidaturas: newCandidaturasUser
          }
          const response = await axios.put(`http://localhost:3000/usuarios/${user.id}`, newCandidatura);
          return response
        } catch (error) {
          console.log('erro ao deletar vaga do candidato', error);
        }
      });
  } catch (error) {
    console.log('erro ao deletar vaga das candidaturas do usuário', error);
  }
}