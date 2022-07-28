const $formulario = document.getElementById("formulario");
const $texto = document.getElementById("texto");
const $template = document.getElementById("template").content;
const $fragment = document.createDocumentFragment();
const $btnOrdenar = document.getElementById("ordenar");
const $contenedor = document.getElementById("contenedor-tareas");
const db= [];
let x = 1;

const genId = ()=> x++;

document.addEventListener("submit",e =>{
   e.preventDefault(); 
   $contenedor.textContent="";
    nombreTarea = $texto.value;
   const tarea = {
       Id: genId(),
       Nombre: nombreTarea,
       Estado: false
   };

   console.log(tarea);
   db.push(tarea);
   console.log(db);
   $formulario.reset();

  db.forEach(el => {
    $template.querySelector("p").textContent= `${el.Nombre.toUpperCase()}`;
  $clone = document.importNode($template,true);
  $fragment.appendChild($clone);
  });
  $contenedor.appendChild($fragment);
  
});

const tareaCompletada = () =>{
   document.addEventListener("click", e => {
      if(e.target.classList.contains('check-icon')){
        alert("funciona");
      }
   });
};

tareaCompletada();







