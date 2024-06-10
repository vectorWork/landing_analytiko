//Opciones menu
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('buttonProducts');
  var button2list = document.getElementById('buttonProducts2');
  var options = document.getElementById('optionProducts');
  var options2list = document.getElementById('optionCases');
  function ocultarLista() {
    options.classList.remove('showOptions');
    options.classList.add('hideOptions');
  }
  function mostrarLista() {
    options.classList.remove('hideOptions');
    options.classList.add('showOptions');
  }
  function ocultarLista2() {
    options2list.classList.remove('showOptions');
    options2list.classList.add('hideOptions');
  }
  function mostrarLista2() {
    options2list.classList.remove('hideOptions');
    options2list.classList.add('showOptions');
  }
  // Agrega el evento 'mouseenter' para mostrar la lista cuando el mouse entra en el li
  button.addEventListener('mouseenter', mostrarLista);
  button.addEventListener('mouseleave', ocultarLista);
  button2list.addEventListener('mouseenter', mostrarLista2);
  button2list.addEventListener('mouseleave', ocultarLista2);

  ////////////////////////
  //Botones desplegables//
  ////////////////////////
  var botones = document.querySelectorAll('.botones-desplegables');

  function mostrarOcultarContenido(event) {
    var boton = event.target;
    var targetId = boton.getAttribute('data-target');
    var contenido = document.querySelector(`[data-toggle="${targetId}"]`);

    if (contenido) {
      contenido.classList.toggle('visible');
    }
  }

  botones.forEach(function (boton) {
    boton.addEventListener('click', mostrarOcultarContenido);
  });

  ////////////////////////
  ///////Boton Menu///////
  ////////////////////////
  var toggleModalButton = document.getElementById('toggleModalButton');
  var modal = document.getElementById('myModal');

  toggleModalButton.addEventListener('click', function () {
    if (modal.style.display === 'block') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'block';
    }
  });

  var botonesDesplegable = document.querySelectorAll('.botones-desplegable');

  botonesDesplegable.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var target = boton.getAttribute('data-target');
      var opciones = document.querySelector("[data-toggle='" + target + "']");

      opciones.classList.toggle('show-options');
    });
  });
  ///////////////////////////////////
  //Validacion de campos
  const form = document.getElementById('contact');
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var button = document.querySelector('.form-submit-btn');
  button.setAttribute('style', 'pointer-events: none;');
  form.addEventListener('input', (e) => {
    var allRequired = document.getElementById('allRequired');
    var button = document.querySelector('.form-submit-btn');
    if (form.querySelectorAll(':invalid').length !== 0) {
      allRequired.classList.remove('hide');
      button.setAttribute('style', 'pointer-events: none;');
      valid = false;
    } else {
      valid = true;

      allRequired.classList.add('hide');
      button.setAttribute('style', 'pointer-events: all;');
    }

    // console.log(e.target.id);
    var inputChanged = document.getElementById(e.target.id);
    var inputRequired = document.getElementById(e.target.id + 'Required');
    var inputEmailFormat = document.getElementById('inputEmailFormat');
    if (
      inputChanged.value === '' ||
      inputChanged.value == null ||
      /^\s*$/.test(inputChanged.value)
    ) {
      inputRequired.classList.remove('hide');
    } else {
      inputRequired.classList.add('hide');
    }
    if (e.target.id == 'correo') {
      if (!inputChanged.value.match(regex)) {
        inputEmailFormat.classList.remove('hide');
      } else {
        inputEmailFormat.classList.add('hide');
      }
    }
  });

  ///////////////////////////////////
  //Capcha
  ///////////////////////////////////
  //const form = document.querySelector('.contact'); // Get the form
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default action of the form
    // let fields = document.querySelectorAll('.contact .form-control'); // Get all the fields

    if (valid) {
      // If all the fields are valid
      document.querySelector('.formfields').style.display = 'none';
      document.querySelector('#alert').innerText =
        'Procesando su envio, por favor espere...';
      grecaptcha.ready(function () {
        // Wait for the recaptcha to be ready
        grecaptcha
          .execute('6LcqYOcpAAAAAIMcIT3l1FSmS5mBnQhCrg3uazid', {
            action: 'contact',
          }) // Execute the recaptcha
          .then(function (token) {
            let recaptchaResponse =
              document.getElementById('recaptchaResponse');
            recaptchaResponse.value = token; // Set the recaptcha response

            fetch('capchav3.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
              },
              body: JSON.stringify({ token }), // Convert to JSON
            })
              .then((response) => response.text())
              .then((response) => {
                let responseJson = JSON.parse(response);
                if (responseJson.arrResponse['success']) {
                  const responseText = responseJson.res; // Get the response
                  // Crear un objeto para almacenar los datos del formulario
                  let formData = {};

                  // Iterar sobre todos los elementos del formulario
                  for (let i = 0; i < form.elements.length; i++) {
                    let field = form.elements[i];

                    // Asegurarse de que el campo tiene un nombre (los campos sin nombre no se envían con el formulario)
                    if (field.name) {
                      // Agregar el valor del campo al objeto formData
                      formData[field.name] = field.value;
                    }
                  }
                  //formData['_next'] = './Contacto/Contacto_Analytiko_web.html';
                  // https://github.com/axios/axios
                  axios.defaults.headers.post['Content-Type'] =
                    'application/json';
                  axios
                    .post(
                      'https://formsubmit.co/ajax/analytiko.formulario@gmail.com',
                      formData
                    )
                    .then((response) => {
                      document.querySelector('#alert').innerText =
                        '¡Información enviada con exito!';
                    })

                    .catch((error) => {
                      if (error.code == 'ERR_NETWORK') {
                        document.querySelector('#alert').innerText =
                          '¡Información enviada con exito!';
                        console.log(error);
                      } else {
                        document.querySelector('#alert').innerText =
                          'Error al enviar';
                        console.log(error);
                      }
                    });
                } else {
                  document.querySelector('#alert').innerText =
                    'Ha ocurrido un error, capcha indica bot';
                  console.log('bot');
                }
              })
              .catch((error) => {
                document.querySelector('#alert').innerText =
                  'Error de verificación';
                console.log(error);
              });
          });
      });
    }
  });
});
