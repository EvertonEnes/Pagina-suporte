//Valida Cpf
function ValidaCpf(){
  const cpfEnviado = document.querySelector('.input-cpf')
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function(){
      return cpfEnviado.value.replace(/\D+/g,'');
    }
  });
}

ValidaCpf.prototype.valida = function(){
  if(typeof this.cpfLimpo === "undefined") return false;
  if(this.cpfLimpo.length !== 11) return false;
  if (this.isSequencia()) return false;
  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digito1 = this.criaDigito(cpfParcial);
  const digito2 = this.criaDigito(cpfParcial + digito1);
  const novoCpf = cpfParcial + digito1 + digito2;
  return novoCpf === this.cpfLimpo;
}

ValidaCpf.prototype.criaDigito = function(cpfParcial){
  let cpfArray = Array.from(cpfParcial);
  let regressivo = cpfArray.length + 1;
  let total = cpfArray.reduce((acumulador, valor) => {
      acumulador += (regressivo*valor);
      regressivo--;
      return acumulador;
  }, 0)
  digito = 11 - (total % 11);
  return digito > 9? 0 : digito;
}

ValidaCpf.prototype.isSequencia = function() {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
}

document.querySelector('.btn-submit').addEventListener('click', function() {
  let valido = true;

  // Reseta todas as mensagens de erro
  document.querySelectorAll('.erro-field').forEach(function(error) {
    error.textContent = '';
  });

  // Valida primeiro nome
  const primeiroNome = document.querySelector('.input-nome');
  if (primeiroNome.value === '') {
    valido = false;
    primeiroNome.nextElementSibling.textContent = 'Este campo é obrigatório!';
  }

  // Valida sobrenome
  const sobrenome = document.querySelector('.input-sobrenome');
  if (sobrenome.value === '') {
    valido = false;
    sobrenome.nextElementSibling.textContent = 'Este campo é obrigatório!';
  }

  // Valida Email
  const email = document.querySelector('.input-email');
  if (email.value === '') {
    valido = false;
    email.nextElementSibling.textContent = 'Este campo é obrigatório!';
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    valido = false;
    email.nextElementSibling.textContent = 'Por favor insira um endereço de e-mail válido!';
  }

  //Valida Numero
  const numero = document.querySelector('.input-numero');
  if (numero.value === ''){
    valido = false;
    numero.nextElementSibling.textContent = 'Este campo é obrigatório!';
  }  else if (!/^\d{10,11}$/.test(numero.value.replace(/\D+/g, ''))) {
    valido = false;
    numero.nextElementSibling.textContent = 'Por favor insira um número de telefone válido!'
  }


  //Valida Cpf
  const cpfField = document.querySelector('.input-cpf');
  const cpf = new ValidaCpf();
  if (cpfField.value === ''){
    valido = false;
    cpfField.nextElementSibling.textContent = 'Este campo é obrigatório!'
  } else if(!cpf.valida()){
    valido = false;
    cpfField.nextElementSibling.textContent = 'Por favor insira um CPF válido!'
  }

  // Valida radio
  const queryType = document.querySelectorAll('.input-radio');
  let queryTypeSelected = false;
  queryType.forEach(function(radio) {
    if (radio.checked) {
      queryTypeSelected = true;
    }
  });
  if (!queryTypeSelected) {
    valido = false;
    document.querySelector('.container-check + .erro-field').textContent = 'Selecione um tipo de consulta!';
  }

  // Valida Message
  const message = document.querySelector('.text-area');
  if (message.value === '') {
    valido = false;
    message.nextElementSibling.textContent = 'Este campo é obrigatório!';
  }

  // Valida Checkbox
  const autorizacao = document.querySelector('.input-confirm');
  if (!autorizacao.checked) {
    valido = false;
    autorizacao.parentElement.nextElementSibling.textContent = 'Para submeter este formulário, por favor aceite ser contactado!';
  }

  if (valido) {
    const successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'block';
    document.querySelectorAll('.limpar').forEach(function(input) {
      input.value = '';
      });
    document.querySelectorAll('.text-area').forEach(function(textarea) {
        textarea.value = '';
        });
    document.querySelectorAll('.input-radio').forEach(function(radio) {
      radio.checked = false;
      });
    document.querySelector('.input-confirm').checked = false;
    // Here you can add code to actually submit the form
    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 5000);
  }
});