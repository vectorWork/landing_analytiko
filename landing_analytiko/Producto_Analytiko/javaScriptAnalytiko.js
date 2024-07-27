//Opciones menu
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('buttonProducts');
  var button2list = document.getElementById('buttonProducts2');
  var button3list = document.getElementById('buttonProducts3');

  var options = document.getElementById('optionProducts');
  var options2list = document.getElementById('optionCases');
  var options3list = document.getElementById('optionResources');

  function ocultarLista() {
    options.style.display = 'none';
  }
  function mostrarLista() {
    options.style.display = 'block';
  }
  function ocultarLista2() {
    options2list.style.display = 'none';
  }
  function mostrarLista2() {
    options2list.style.display = 'block';
  }
  function ocultarLista3() {
    options3list.style.display = 'none';
  }
  function mostrarLista3() {
    options3list.style.display = 'block';
  }
  // Agrega el evento 'mouseenter' para mostrar la lista cuando el mouse entra en el li
  button.addEventListener('mouseenter', mostrarLista);
  button.addEventListener('mouseleave', ocultarLista);
  button2list.addEventListener('mouseenter', mostrarLista2);
  button2list.addEventListener('mouseleave', ocultarLista2);
  button3list.addEventListener('mouseenter', mostrarLista3);
  button3list.addEventListener('mouseleave', ocultarLista3);

  ////////////////////////
  //Botones desplegables//
  ////////////////////////
  var botones = document.querySelectorAll('.botones-desplegables');
  function mostrarOcultarContenido(event) {
    var boton = event.target;
    var targetId = boton.getAttribute('data-target');
    var contenido = document.querySelector(`[data-toggle="${targetId}"]`);
    if (contenido) {
      // contenido.classList.toggle("visible");
      if (contenido.style.display == 'block') {
        contenido.style.display = 'none';
      } else {
        contenido.style.display = 'block';
      }
      // Obtener la imagen SVG dentro del botón
      var svgIcon = boton.querySelector('.rotate-icon');

      // Alternar la clase "rotated" en la imagen para rotarla
      // svgIcon.classList.toggle("rotated");
      if (svgIcon.style.transform == 'rotate(0deg)') {
        svgIcon.style.transform = 'rotate(180deg)';
        svgIcon.style.transition = 'transform 0.3s ease';
      } else {
        svgIcon.style.transform = 'rotate(0deg)';
        svgIcon.style.transition = 'transform 0.3s ease';
      }
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

      // opciones.classList.toggle("show-options");
      if (opciones.style.display == 'block') {
        opciones.style.display = 'none';
      } else {
        opciones.style.display = 'block';
      }
    });
  });
});
