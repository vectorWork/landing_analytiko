﻿//Opciones menu
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('buttonProducts');
  var button2list = document.getElementById('buttonProducts2');
  var options = document.getElementById('optionProducts');
  var options2list = document.getElementById('optionCases');
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
      // contenido.classList.toggle("visible");

      if (window.innerWidth >= 767) {
        if (
          contenido.style.display == 'flex' ||
          contenido.style.display == ''
        ) {
          contenido.style.display = 'none';
        } else {
          contenido.style.display = 'flex';
        }
      } else if (window.innerWidth <= 767) {
        if (
          contenido.style.display == 'block' ||
          contenido.style.display == ''
        ) {
          contenido.style.display = 'none';
        } else {
          contenido.style.display = 'block';
        }
      }

      var svgId = boton.getAttribute('data-svg-id');
      if (svgId) {
        rotarIconoPorId(svgId);
      }
      // Obtener la imagen SVG dentro del botón
      // var svgIcon = boton.querySelector(".rotate-icon");
      // console.log('rota el icoono',svgIcon);
      // // Alternar la clase "rotated" en la imagen para rotarla
      // // svgIcon.classList.toggle("rotated");
      // if(svgIcon.style.transform == "rotate(0deg)"){
      //   svgIcon.style.transform = "rotate(-180deg)";
      //   svgIcon.style.transition = "transform 0.3s ease";
      // }else{
      //   svgIcon.style.transform = "rotate(0deg)";
      //   svgIcon.style.transition = "transform 0.3s ease";
      // }
    }
  }

  botones.forEach(function (boton) {
    boton.addEventListener('click', mostrarOcultarContenido);
  });
  ////////////////////////
  /////// cerrar modal mobile///////
  ////////////////////////

  var botonesModalOptionsCasoUso = document.querySelectorAll('.close');
  console.log(botonesModalOptionsCasoUso);
  botonesModalOptionsCasoUso.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var modal = document.getElementById('myModal');
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
      } else {
        modal.style.display = 'block';
      }
    });
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
function rotarIconoPorId(iconoId) {
  var svgIcon = document.getElementById(iconoId);
  if (svgIcon) {
    if (svgIcon.style.transform === 'rotate(0deg)') {
      svgIcon.style.transform = 'rotate(-180deg)';
    } else {
      svgIcon.style.transform = 'rotate(0deg)';
    }
    svgIcon.style.transition = 'transform 0.3s ease';
  }
}
