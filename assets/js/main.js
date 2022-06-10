// Capturar evento de submit do formulário
const form = document.querySelector('.formulario');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso').value;
  const inputAltura = e.target.querySelector('#altura').value;
  
  const valorPeso = inputPeso.replace(",",".");
  const valorAltura = inputAltura.replace(",",".");
  
  const peso = Number(valorPeso);
  const altura = Number(valorAltura);

  if (!peso || peso > 600) { // Se pesso for falso, no caso NaN, pois convertemos a string adicionada pelo usuário para Number
    setResultado('Peso inválido', false);
    return; // ele para aqui
  }

  if (!altura || altura > 3) {
    setResultado('Altura inválida', false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);

  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true); // passa true pois chegou até aqui e está tudo correto.
});

function getNivelImc (imc) { // Posso criar funções em qualquer lugar em JS, pois ele eleva elas, vamos ver isso.
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc (peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP () {
  const p = document.createElement('p');//Criando uma tag <p/>
  return p;
}

function setResultado (msg, isValid) {
  const resultado = document.querySelector('#resultado'); // seleciona a div criada no html com o id '#resultado'
  resultado.innerHTML = ''; //Deixa o resultado vazio

  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);// insere a tag <p> dentro da <div> do arquivo index.html
}
