//Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton')
var createUserButton = document.getElementById('createUserButton')
var logOutButton = document.getElementById('logOutButton')

//Inputs
var emailInput = document.getElementById('emailInput')
var passwordInput = document.getElementById('passwordInput')

//Displays
var displayName = document.getElementById('displayName')

//Criar novo usuário
createUserButton.addEventListener('click', () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => {
      alert('Bem vindo: ' + emailInput.value)
      window.location.href = "http://localhost:8080/home.html"
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao cadastrar, verifique o erro no console')
    })
})

//Autenticar com e-mail e senha
authEmailPassButton.addEventListener('click', () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(result => {
      console.log(result.user.uid)
      displayName.innerText = "Bem vindo, " + emailInput.value
      alert('Bem vindo: ' + emailInput.value)
      window.location.href = "http://localhost:8080/home.html"
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao cadastrar, verifique o erro no console')
    })
})