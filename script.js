const firebaseConfig = {
    apiKey: "AIzaSyBb3zOvwH0io2TcY_bceXCj9vQrYSDJrc0",
    authDomain: "datos-formulario-900c6.firebaseapp.com",
    projectId: "datos-formulario-900c6",
    storageBucket: "datos-formulario-900c6.appspot.com",
    messagingSenderId: "78573827952",
    appId: "1:78573827952:web:93213eb12f55a5b1a901b5",
    measurementId: "G-L2Z7G40426"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    let nombre = document.getElementById('name')
    let email = document.getElementById('email')
    let pass = document.getElementById('password')

    let errorNombre = document.getElementById('nameError')
    let errorEmail = document.getElementById('emailError')
    let errorPass = document.getElementById('passwordError')

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const patronContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/

    if (nombre.value.trim() === '') {
        errorNombre.textContent = 'Introduce tu nombre, por favor'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    if (!patronEmail.test(email.value)) {
        errorEmail.textContent = 'Introduce un email valido, por favor'
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }

    if (!patronContrasenia.test(pass.value)) {
        errorPass.textContent = 'La contrasenia debe contener: 8 caracteres'
        errorPass.classList.add('error-message')
    } else {
        errorPass.textContent = ''
        errorPass.classList.remove('error-message')
    }

    if (!errorNombre.textContent && !errorEmail.textContent && !errorPass.textContent) {
        db.collection("users").add({
            nombre: nombre.value,
            email: email.value,
            password: pass.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con exito')
                document.getElementById('formulario').reset()
            })
            .catch((error) => {
                alert(error)
            });
    }
})