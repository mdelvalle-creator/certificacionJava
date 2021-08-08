
const comisionesPorPais = {
  argentina: {
    comision:0.0599,
    mediosDePago: [
      "Visa",
      "Mastercard",
      "American Express",
      "Cabal",
      "Nativa",
      "Naranja",
      "Mercado Pago",
      "cordobesa",
      "Diners Club",
      "CMR",
      "Tarjeta Walmart",
      "Tarjeta Shopping",
      "Maestro",
      "Rapipago",
      "Provincia Net",
      "Link",
      "Pago Facil",
    ],
    linkAyuda: "https://www.mercadopago.com.ar/ayuda/comision-recibir-pagos_220",  

  },
  mexico: {
    comision:0.0349, 
    mediosDePago:[
    "Visa",
    "Mastercard",
    "American Express",
    "BBVA",
    "Citibanamex",
    "HSBC",
    "Santander",
    "Banorte",
    "IXE",
    "Oxxo",
  ],
  linkAyuda: "https://www.mercadopago.com.mx/ayuda/costo-recibir-pagos_220",  },
  uruguay: {
    comision:0.0649,
    mediosDePago: [
    "Visa",
    "Mastercard",
    "OCA",
    "Diners Club",
    "Abitab",
    "Red Pagos",
  ],  linkAyuda: "https://www.mercadopago.com.uy/ayuda/costo-recibir-pagos_220",  },
}

class Propuesta {
  constructor(nombre, pais, nombreProducto, precioProducto) {
    this.nombreEmpresa = nombre;
    this.pais = pais;
    this.nombreProducto = nombreProducto;
    this.precioProducto = precioProducto;
    this.comision = 0;
    this.mediosDePago = [];
  }
  calcularComision() {
      this.comision = comisionesPorPais[this.pais.toLowerCase()].comision * this.precioProducto;
      this.mediosDePago = comisionesPorPais[this.pais.toLowerCase()].mediosDePago;
      this.linkAyuda = comisionesPorPais[this.pais.toLowerCase()].linkAyuda;
  }
  toString() {
    return (
      "Nombre de empresa: " +
      this.nombreEmpresa +
      "\nPais: " +
      this.pais +
      "\nNombre de producto: " +
      this.nombreProducto +
      "\nPrecio de producto: $" +
      this.precioProducto +
      "\nComision a cobrar: $" +
      this.comision +
      "." +
      "\nLos medios de pago disponibles son: " +
      this.mediosDePago.toString()
    );
  }
}
///Reemplazamos el boton por formulario y las alerts por inputs y eventos. No movemos el listener para antes de la funcion porque no funcionaria.
function comenzarSimulador() {
  let propuestaPasada = localStorage.getItem('datosIngresados');
  if(propuestaPasada != null){
      propuestaPasada = JSON.parse(propuestaPasada);
    }
    $(".btn.btn-primary.btn-lg").remove();
       $(".jumbotron").append(`
      <div class="contenedorFormulario">
      <form id='formularioCalculadora' class='formularioEstilo'>
            <span>Nombre de empresa</span>
            <input type='text' value=${propuestaPasada != null ? propuestaPasada.nombreEmpresa : ''} > <br />
            <span>Pais</span> 
            <input type="text" list="listaPaises" ${propuestaPasada != null ? 'value='+ propuestaPasada.pais : ''}>
            <datalist id="listaPaises">
              <option value="Argentina">  
              <option value="Mexico">
              <option value="Uruguay">
            </datalist>
             <br />
            <span>Nombre del producto</span>
            <input type='text' value=${propuestaPasada != null ? propuestaPasada.nombreProducto : ''}> <br />
            <span>Precio del producto</span>
            <input type='number' value=${propuestaPasada != null ? propuestaPasada.precioProducto : ''}><br />
            <a
              class="btn btn-primary btn-lg"
              href="#"
              role="button"
              
              > Calcular</a
            >
          </form>
      </div>`);
  
  $(".btn.btn-primary.btn-lg").click(ejecutarSimulador);
}
function cargarDatos() {
  const formulario = document.getElementById("formularioCalculadora");

  return new Propuesta(
    formulario.children[1].value,
    formulario.children[4].value,
    formulario.children[8].value,
    formulario.children[11].value
  );
}
function volverFormulario() {
  document
      .getElementsByClassName("jumbotron")[0]
      .removeChild(document.getElementsByClassName("resultado")[0]);
  comenzarSimulador();
} 
function ejecutarSimulador() {
  const formulario = document.getElementById("formularioCalculadora");
  if(!formulario.children[1].value ||
    !formulario.children[4].value ||
    !formulario.children[8].value ||
    !formulario.children[11].value)
    {alert ("Ingresa todos los datos.")}
  
  else if(formulario.children[11].value < 0){
    alert ("Ingresa un valor de precio válido para tu producto")
  }
  
    else { 
    const propuestaDeNegocios = cargarDatos();
    propuestaDeNegocios.calcularComision();
    localStorage.setItem('datosIngresados',JSON.stringify(propuestaDeNegocios));
    
    document
      .getElementsByClassName("jumbotron")[0]
      .removeChild(document.getElementsByClassName("contenedorFormulario")[0]);
    let resultado = document.createElement("div");
    //Definimos el innerHTML del elemento con una plantilla de texto que va a agregar el div con todo el contenido
    resultado.innerHTML = `
    <div class="contenedorResultado">  
    <p>Nombre Empresa: ${propuestaDeNegocios.nombreEmpresa}  </p> 
      <p>Pais:  ${propuestaDeNegocios.pais} </p> 
      <p>Producto: ${propuestaDeNegocios.nombreProducto}  </p>
      <p>Precio del producto:  $${propuestaDeNegocios.precioProducto}  </p>  
      <p>Comision:  $${propuestaDeNegocios.comision} </p> 
      <p>Medios de pago:  ${propuestaDeNegocios.mediosDePago.toString()} </p> 
      <p class="informacionExtra"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"/>
    </svg> Para más información sobre los costos, te dejamos este <a href="${propuestaDeNegocios.linkAyuda}" class="enlaceAyuda"> link </a> al Portal de Ayuda. </p>
     </div>
      <a
      class="btn btn-primary btn-lg" 
      href="#"
      role="button"
      
      > Volver </a>
      `;
    resultado.className = "resultado";


    //Agregamos el contenedor creado al body
    document.getElementsByClassName("jumbotron")[0].appendChild(resultado);
    $(".btn.btn-primary.btn-lg").click(volverFormulario);
  }
}
