console.log("main");

/* const home = document.getElementById('#home'); */ 
/* const userBtn = document.querySelector('#user');
const cartBtn = document.querySelector('#cart'); */ 
const prod = document.getElementById("contenedor-hbs");
listaProductos();
/* 
function cargaEventListeners(){
    home.addEventListener('click', listaProductos);

    /userBtn.addEventListener('click', datoUsuario);

    cartBtn.addEventListener('click', listaCart);
}  */
function prodList() {
    fetch('http://localhost:8080/api/products')
        .then(response => response.json())
        .then((data) => {              
            const arr =  data.data          
            console.log(arr); 
            return arr;           
        });
}

function listaProductos() {       
    const products = prodList();  
    console.log(products); 
    /* fetch('../prodItem.hbs')
        .then(data => data.text())
        .then((serverTemplate) => {
            const template = Handlebars.compile(serverTemplate);
            const html = template({products});
            prod.innerHTML = html;
        }) */
}; 