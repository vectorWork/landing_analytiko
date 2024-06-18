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
  var botones = document.querySelectorAll('.botones-desplegable');

  function mostrarOcultarContenido(event) {
    var boton = event.target;
    var targetId = boton.getAttribute('data-target');
    var contenido = document.querySelector(`[data-toggle="${targetId}"]`);

    if (contenido) {
      contenido.classList.toggle('visible');

      // Obtener la imagen SVG dentro del botón
      var svgIcon = boton.querySelector('.rotate-icon');

      // Alternar la clase "rotated" en la imagen para rotarla
      svgIcon.classList.toggle('rotated');
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
  var botonesDesplegable = document.querySelectorAll('.botones-desplegables');
  function mostrarOcultarContenidoDesplegables(event) {
    var boton = event.target;
    console.log(boton);
    var targetId = boton.getAttribute('data-target');
    var contenido = document.querySelector(`[data-toggle="${targetId}"]`);

    if (contenido) {
      contenido.classList.toggle('visible');
    }
  }
  botonesDesplegable.forEach(function (boton) {
    boton.addEventListener('click', mostrarOcultarContenidoDesplegables);
  });
});
function descargarPDF() {
  // Ruta del archivo PDF que quieres descargar
  var rutaDelArchivo = '../Assets/Descargables/BrochureCasosEstudio.pdf';

  // Crear un enlace temporal a la URL
  var tempLink = document.createElement('a');
  tempLink.href = rutaDelArchivo;
  tempLink.setAttribute('target', '_blank');

  // Agregar el enlace temporal al DOM
  document.body.appendChild(tempLink);

  // Hacer clic en el enlace
  tempLink.click();

  // Eliminar el enlace temporal
  document.body.removeChild(tempLink);
}
function descargarPDF2() {
  // Ruta del archivo PDF que quieres descargar
  var rutaDelArchivo = '../Assets/Descargables/BrochureAnalytiko_web.pdf';

  // Crear un enlace temporal a la URL
  var tempLink = document.createElement('a');
  tempLink.href = rutaDelArchivo;
  tempLink.setAttribute('target', '_blank');

  // Agregar el enlace temporal al DOM
  document.body.appendChild(tempLink);

  // Hacer clic en el enlace
  tempLink.click();

  // Eliminar el enlace temporal
  document.body.removeChild(tempLink);
}
