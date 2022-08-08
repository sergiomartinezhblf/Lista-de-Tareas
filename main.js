const $formulario = document.getElementById("formulario");
const $texto = document.getElementById("texto");
const $template = document.getElementById("template").content;
const $fragment = document.createDocumentFragment();
const $btnOrdenar = document.getElementById("ordenar");
const $contenedor = document.getElementById("contenedor-tareas");
let db= {};
let completada= {};
let sincompletar={};
let x = 1;

const genId = ()=> x++;

const imprimeTarea =()=>{

  Object.values(db).forEach(el => {
    $clone = $template.cloneNode(true);
    if(el.Estado){
      $clone.getElementById("tarea").classList.replace('tarea','success');
    }
    $clone.querySelector("p").textContent= `${el.Nombre.toUpperCase()}`;
    $clone.querySelector("img").dataset.id=el.Id;
    $clone.querySelector("span").dataset.id=el.Id;
    
  $fragment.appendChild($clone);
  });
  $contenedor.appendChild($fragment);
}


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
db[tarea.Id]=tarea;
console.log(db);
   $formulario.reset();

  imprimeTarea();
  
});




const tareaCompletada = () =>{
   document.addEventListener("click", e => {
      if(e.target.classList.contains('check-icon')){
        e.target.parentElement.parentElement.classList.add('success');
        db[e.target.dataset.id].Estado=true;
        console.log(db[e.target.dataset.id]);
      }
      
   });
   imprimeTarea();
};

const borrarTarea = () =>{
  document.addEventListener("click", e => {
    if(e.target.classList.contains('delate-icon')){      
      e.target.parentElement.parentElement.style.display="none";
      delete db[e.target.dataset.id];
    }
    
});
   imprimeTarea();
};

const ordenarTarea = () =>{
  document.addEventListener("click", e =>{
    if(e.target.classList.contains('order')){
      Object.values(db).forEach(el=>{
        if(el.Estado){
          completada[el.Id]=el;
        }
         if(!el.Estado){
          sincompletar[el.Id]=el;} 
      })
        console.log(completada);
        console.log(sincompletar);
      let nuevo = Object.values(completada).concat(Object.values(sincompletar));
      console.log(nuevo);
      db={...nuevo};
      $contenedor.textContent="";
      Object.values(db).forEach(el => {
        $clone = $template.cloneNode(true);
        if(el.Estado){
          $clone.getElementById("tarea").classList.replace('tarea','success');
        }
        $clone.querySelector("p").textContent= `${el.Nombre.toUpperCase()}`;
        $clone.querySelector("img").dataset.id=el.Id;
        $clone.querySelector("span").dataset.id=el.Id;
        
      $fragment.appendChild($clone);
      });
      $contenedor.appendChild($fragment);
    }
  });
}



borrarTarea();
tareaCompletada();
ordenarTarea();








