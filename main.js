// Create account variables:
let createForm = document.querySelector('.create')
let headchange = document.querySelector('header h2')
let userCreate = document.querySelector('#userCreate')
let mailCreate = document.querySelector('#mailCreate')
let passCreate = document.querySelector('#passCreate')
let confirmPass = document.querySelector('#confirmPass')
let createBtn = document.querySelector('.create button')
let createInputs = document.querySelectorAll('.create .form-control')
let goToSignForm = document.querySelector('.create span')
let goToCreateForm = document.querySelector('.login .noAccout')


// Login variables:
let loginForm = document.querySelector('.login')
let userLogin = document.querySelector('#userLogin')
let passLogin = document.querySelector('#passLogin')
let loginBtn = document.querySelector('.login button')
let loginInputs = document.querySelectorAll('.login .form-control')

let usersData = []
let usersDataMails = []


function showCreateForm () {
    loginForm.classList.add('hide')
    createForm.classList.remove('hide')
    headchange.innerHTML = `Create account`
}

function showLoginForm() {
    createForm.classList.add('hide')
    loginForm.classList.remove('hide')
    headchange.innerHTML = `Login`
}

// Check if Data of userInfo in localStorage:
window.onload = function () {
    if ('usersInfo' in localStorage) {
        usersData = JSON.parse(localStorage.usersInfo)
        let allMails = usersData.map(e => e.userMail)
        usersDataMails = allMails
    } else {
        showCreateForm()
    }  
}

console.log(usersDataMails)
// Go to sign Form
goToSignForm.onclick = function () {
    showLoginForm()
}

// Go to create Form 
goToCreateForm.onclick = function () {
    showCreateForm()
}

// Login Part
loginBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    if (checkDataLogin()) {
        location.href = "./crud.html"
        clearForm(loginInputs)
    }
})

// check Login Data
function checkDataLogin() {
    let nameLogin = userLogin.value.trim()
    let passwordLogin = passLogin.value.trim()
    for (let i = 0; i < usersData.length; i++) { 
        if ((nameLogin.toUpperCase() === usersData[i].userName.toUpperCase() || nameLogin === usersData[i].userMail) && (passwordLogin === usersData[i].userPass) ) {
            setSucessFor (userLogin); setSucessFor (passLogin)
            localStorage.lastUserLogin = nameLogin
            return true 
        }
    }
    setErrorFor (passLogin, `Incorrect user name or password`); setErrorFor (userLogin, '') 
    userLogin.classList.add('mb')
    return false
}

// Go to next page:
createBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    if (enterUserData()) {
        clearForm(createInputs)
        showLoginForm()
    }
})

// Enter user data:
function enterUserData() {
    if (checkUserName() && checkUserMail() && checkUserPassword() && checkConfirmationPassword()) {
        let user = {
            userName: userCreate.value.trim(),
            userMail: mailCreate.value.trim(),
            userPass: passCreate.value.trim(),
            checkPass: confirmPass.value.trim(),
        }
        usersData.push(user)
        localStorage.usersInfo = JSON.stringify(usersData)   
        return true   
    }
}

//Clear Form:
function clearForm(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].value = '';   
    }
}

//Setting error msg of Inputs:
function setErrorFor(input, msg) {
    input.classList.add('error-class')
    input.classList.remove('sucess-class')
    input.classList.remove ('mb')
    let inputForm = input.parentElement
    let errorMsg = inputForm.querySelector('small')
    errorMsg.classList.remove('hide')
    errorMsg.innerText = msg
    let errorIcon = inputForm.querySelector('.text-danger-emphasis')
    let sucessIcon = inputForm.querySelector('.text-success-emphasis')
    errorIcon.classList.remove('hide')
    sucessIcon.classList.add('hide')
    return false  
}

//Setting success msg of Inputs:
function setSucessFor(input) {
    input.classList.add('sucess-class')
    input.classList.remove('error-class')
    input.classList.add ('mb')
    let inputForm = input.parentElement
    let errorMsg = inputForm.querySelector('small')
    errorMsg.classList.add('hide')
    let sucessIcon = inputForm.querySelector('.text-success-emphasis')
    let errorIcon = inputForm.querySelector('.text-danger-emphasis')
    sucessIcon.classList.remove('hide')
    errorIcon.classList.add('hide')
    return true
}

// Mail Validation:
function isMail(mail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)
}

// Password validation:
function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)
}

// Check user name:
function checkUserName() {
    let username = userCreate.value.trim()
    if (username === '') {
        return setErrorFor (userCreate, `Username can't be empty`)
    }else if (username.length < 3 || username.length > 25 ) {
        return setErrorFor (userCreate, `Username must be between 3 and 25 characters.`)
    }else return setSucessFor(userCreate)
}
userCreate.addEventListener('input', checkUserName)

// Check user mail:
function checkUserMail() {
    let usermail = mailCreate.value.trim()
    if (usermail === '') {
        return setErrorFor (mailCreate, `Email can't be empty`)
    }else if (!isMail(usermail)) {
        return setErrorFor (mailCreate, `Email is not valid`)
    }else if (usersDataMails.includes(usermail)) {
        return setErrorFor (mailCreate, `Email already in use`)
    }else return setSucessFor(mailCreate)
}
mailCreate.addEventListener('input', function () {
    checkUserName()
    checkUserMail()
})

// Check user password 
function checkUserPassword() {
    let userpassword = passCreate.value.trim()
    if (userpassword === '') {
        return setErrorFor (passCreate, `Password can't be empty`)
    }else if (!isPassword(userpassword)) {
        return setErrorFor (passCreate, `Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)`)
    }else return setSucessFor(passCreate)
}
passCreate.addEventListener('input', function () {
    checkUserMail()
    checkUserPassword()
})

// Check confirmation password
function checkConfirmationPassword() {
    let confirmationpassword = confirmPass.value.trim()
    let userpassword = passCreate.value.trim()
    if (confirmationpassword === '') {
        return setErrorFor (confirmPass, `Please enter the password again`)
    }else if (confirmationpassword !== userpassword) {
        return setErrorFor (confirmPass, `Confirm password does not match`)
    }else return setSucessFor(confirmPass)
}
confirmPass.addEventListener('input', function () {
    checkUserPassword()
    checkConfirmationPassword()
} )









    




























// function checkStorageUserName() {
//     if (userCreate.value.trim() === usersData[i].userName) {
//         document.querySelector('.create .nameInput .errorMsg').innerHTML = 'Username has already taken'
//         document.querySelector('.create .nameInput .errorMsg').classList.add('remove-opacity')
//         document.querySelector('.create .nameInput .text-danger-emphasis').classList.remove('hide')
//     }
// }


// console.log (document.querySelector('.create .nameInput .text-danger-emphasis'))
// let formInput = userCreate.parentElement
// console.log (formInput.querySelector('small'))





