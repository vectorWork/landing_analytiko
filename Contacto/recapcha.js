// require('dotenv').config();
// const RECAPTCHA_V3_PUBLIC_KEY = process.env.RECAPTCHA_V3_PUBLIC_KEY;

// $('#form').submit(function (event) {
//   event.preventDefault();
//   /*Cambia 6LcZu9QUAAAAACaj-WBiVIQUlr94vfCC8DUpIanS por tu clave de sitio web*/
//   grecaptcha.ready(function () {
//     grecaptcha
//       .execute(RECAPTCHA_V3_PUBLIC_KEY, {
//         action: 'registro',
//       })
//       .then(function (token) {
//         $('#form').prepend(
//           '<input type="hidden" name="token" value="' + token + '">'
//         );
//         $('#form').prepend(
//           '<input type="hidden" name="action" value="registro">'
//         );
//         $('#form').unbind('submit').submit();
//       });
//   });
// });

window.addEventListener('load', function () {
  // Wait for the page to load

  ('use strict'); // Strict mode for JavaScript

  const form = document.querySelector('.contact'); // Get the form
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default action of the form
    let fields = document.querySelectorAll('.contact .form-control'); // Get all the fields
    let valid = true;
    for (var i = 0; i < fields.length; i++) {
      fields[i].classList.remove('no-error'); // Remove the no-error class from all fields
      if (fields[i].value === '') {
        // If the field is empty
        fields[i].classList.add('has-error');
        fields[i].nextElementSibling.style.display = 'block';
        valid = false;
      } else {
        // If the field is not empty
        fields[i].classList.remove('has-error');
        fields[i].classList.add('no-error');
        fields[i].nextElementSibling.style.display = 'none';
      }
    }
    if (valid) {
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
      console.log(formData);
      // If all the fields are valid
      document.querySelector('.formfields').style.display = 'none';
      document.querySelector('#alert').innerText =
        'Processing your submission, please wait...';
      grecaptcha.ready(function () {
        // Wait for the recaptcha to be ready
        grecaptcha
          .execute('6LdJW9kpAAAAADEnA_L9r8J-BfLFJy-IIYIoXQtk', {
            action: 'contact',
          }) // Execute the recaptcha
          .then(function (token) {
            let recaptchaResponse =
              document.getElementById('recaptchaResponse');
            recaptchaResponse.value = token; // Set the recaptcha response
            fetch('/form-post', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
              },
              body: JSON.stringify({ token: recaptchaResponse.value }), // Convert to JSON
            })
              .then((response) => response.text())
              .then((response) => {
                console.log(response);
                const responseText = response; // Get the response
                if (responseText.error !== '') {
                  // If there is an error
                  document.querySelector('#alert').innerText =
                    responseText.error;
                  document.querySelector('#alert').classList.add('error');
                  document.querySelector('.formfields').style.display = 'block';
                  return;
                }
                document.querySelector('#alert').innerText =
                  responseText.success;
                document.querySelector('#alert').classList.add('success');
                window.location.replace('/thanks'); // Redirect to the thanks page

                fetch('https://formsubmit.co/vritco98@gmail.com', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json', // Indicate that you're sending JSON
                  },
                  body: JSON.stringify(formData), // Convert to JSON
                }).then((res) => {
                  console.log(res);
                });
              });
          });
      });
    }
  });
});
