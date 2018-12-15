let elementosEnCarrito = 1;
let divProductos = $('#productos');
let divPagos = $('.medios');
let arrayProductos = [];
let total = 0;

const productosTienda = [
  {producto: 'Pantone Cookies', img: './img/galles-1.jpg', precio: 100},
  {producto: 'Diamond Cookies', img: './img/galles-2.jpg', precio: 300},
  {producto: 'Watermelon Cookies', img: './img/galles-3.jpg', precio: 550},
  {producto: 'Donuts', img: './img/donuts.jpg', precio: 550},
  {producto: 'Chewbacca Cookies', img: './img/galles-4.jpg', precio: 200},
  {producto: 'Diamond Cookies', img: './img/galles-2.jpg', precio: 300},
  {producto: 'Watermelon Cookies', img: './img/galles-3.jpg', precio: 550},
  {producto: 'Donuts', img: './img/donuts.jpg', precio: 550},
  {producto: 'Pantone Cookies', img: './img/galles-1.jpg', precio: 100},
  {producto: 'Chewbacca Cookies', img: './img/galles-4.jpg', precio: 200},
  {producto: 'Watermelon Cookies', img: './img/galles-3.jpg', precio: 550},
  {producto: 'Donuts', img: './img/donuts.jpg', precio: 550},
];

const mediosDePago = [
  {medio: 'Cash', img: './img/cash.png', recargo: 0},
  {medio: 'Debit Card', img: './img/debit.jpg', recargo: 5},
  {medio: 'Credit Card', img: './img/card.png', recargo: 10},
  {medio: 'Check', img: './img/receipt.jpg', recargo: 20},
];

$(".productos").animate({
  width: '100%',
  opacity: '1.0'
});

function carroCosas(){
  let compraUsuario = JSON.parse(localStorage.getItem('arrayProductos'));
}

function armarcarrousel(){
    for (i = 0; i < productosTienda.length; i++) {
        let imagen = productosTienda[i].img;
        let precio = productosTienda[i].precio;
        let divCarrousel = $('<div class="cluster"><span class="nombre">' + productosTienda[i].producto + '</span><img src="' + productosTienda[i].img + '"><span class="price">' + productosTienda[i].precio + '</span><button class="cart-btn cargar-pagos"><i class="fas fa-cookie"></i> Want it!</button></div>');
        divProductos.append(divCarrousel);
    }
    
    $( ".cart-btn" ).on("click", function() {
       // aca me tengo que guardar el objeto clickeado
       let contadorProductos = $("#cosas-en-carrito").addClass('fondo');
       let cookie = $(this).children().addClass('fas fa-cookie-bite');      
       let cosasEnCarrito = $("#cosas-en-carrito");
       let contadorCarrito = $('<span id="cosas-en-carrito">' + elementosEnCarrito + '<span>');
       // por cada click en el corazon me suma el producto
       elementosEnCarrito++
       cosasEnCarrito.html(contadorCarrito);
       console.log('este es mi array de productos', arrayProductos);
      
      let nombreproducto = $(this).siblings('.nombre').html();
      let precio = $(this).siblings('.price').html();
      let producto = {
        nombreproducto: nombreproducto,
        precio: precio,
      }
      arrayProductos.push(producto)
      let data = localStorage.getItem('arrayProductos'); //null
      if (data == null) {
          data = []
      } else {
        data = JSON.parse(data);
        }

      console.log('esta es la data que pusheo al prod', data, typeof data);
      data.push(producto);

      let compraUsuario = JSON.parse(localStorage.getItem('arrayProductos'));

      console.log('es total es de', total);

      carroCosas();
      sumarCompra();
      crearListaComprados();

  });   
};

$("#pago").animate({
  opacity: '1.0'
});

$('#ir-a-pagar').on("click", function(){
  $('#pago').removeClass('none');
  $('.productos').addClass('none');
})
  
function armarMediosDePago(){
  for (i = 0; i < mediosDePago.length; i++) {
    let imagen = mediosDePago[i].img;
    let nombrePago = mediosDePago[i].medio;
    let divMediosPago = $('<div class="medio"><img src="' + mediosDePago[i].img + '"><span class="nombre"><i class="far fa-heart"></i> ' + mediosDePago[i].medio + '</span></div>');
    divPagos.append(divMediosPago);
  };

  $('.medio').on('click', function(){
    let corazon = $(this).children().siblings().children().addClass('fas fa-heart');
    let clickMedioDePago = $(this).children().attr('src');
    if (clickMedioDePago == "./img/card.png"){
      $('#cuotas').removeClass('none');
      $('#pagar-total').removeClass('none');
      let cuantasCuotas = $( "#select-cuotas" ).val();
      console.log('pagaste con tarjeta de credito', 'tu total es de $ ', total);
    } else if (clickMedioDePago == "./img/receipt.jpg") {
      cheque();
      let extra = (total * 20) / 100;
      let totalCheque = total + extra;
      let checkout = $('<div class="total"><p>The total amount of your purchase is $ '+ totalCheque +'</p><p>Thanks! <i class="far fa-smile"></i></p></div>');
      $('#modal-checkout').append(checkout);
      console.log('pagaste con cheque');
    } else if (clickMedioDePago == "./img/debit.jpg") {
      debito();
      let extra = (total * 5) / 100;
      let totalDebito = total + extra;
      let checkout = $('<div class="total"><p>The total amount of your purchase is $ '+ totalDebito +'</p><p>Thanks! <i class="far fa-smile"></i></p></div>');
      $('#modal-checkout').append(checkout);
      console.log('pagaste con tarjeta de debito', 'tu total es de', totalDebito );
    } else { 
      let checkout = $('<div class="total"><p>The total amount of your purchase is $ '+ total +'</p><p>Thanks! <i class="far fa-smile"></i></p></div>');
      $('#modal-checkout').append(checkout);
      console.log('pagaste con efectivo');
    }
  })
}  

function sumarCompra(){
  console.log('este es mi array de productos antes de sumar la compra', arrayProductos);
  total = 0;
  arrayProductos.forEach(function (obj) {
  total += parseInt(obj.precio);
  console.log('precio actual del objeto', obj.precio);
});
}

// ver mi total
$('.fa-shopping-cart').on('click', function(){
  $('#total-text').toggleClass('none');
  $('#balloon').toggleClass('none');
  $('.suma-total').html(total);
})

// cerrar pop up
$('.fa-times-circle').on('click', function(){
  $('#total-text').toggleClass('none');
  $('#balloon').toggleClass('none');
  $('.suma-total').html(total);
})

 // formas de pago
function debito() {
   let extra = (total * 5) / 100;
   let totalDebito = total + extra;
   console.log('gastaste', total + extra);
}

function cheque() {
  let extra = (total * 20) / 100;
  let totalCheque = total + extra;
  console.log('gastaste', total + extra);
}

// cuotas tarjeta de credito
$('#pagar-total').on('click', function(){ 
  let extra = (total * 10) / 100;
  let cuantasCuotas = $( "#select-cuotas" ).val();
  if ( cuantasCuotas == '24cuotas') {
    var interes = (total * 45) / 100;
  } else if ( cuantasCuotas == '36cuotas') {
    var interes = (total * 70) / 100;
  } else if (cuantasCuotas == '12cuotas') {
    var interes = (total * 20) / 100;
  } else (interes = null); 
    console.log('no tenes intereses');

  let subtotal = total + extra + interes;
  
  let checkout = $('<div class="total"><p>Purchase in ' + cuantasCuotas + ' dues. The total amount of your purchase is $' + subtotal +'</p><p>Thanks! <i class="far fa-smile"></i></p></div>');
  $('#modal-checkout').append(checkout);
  console.log('pagaste con tarjeta de credito', 'tu total es de', subtotal, cuantasCuotas);
})

function crearListaComprados() {
  let tablaProductos = $('<ul class="comprados"></ul>')
  let cabecera = '<h3>Productos comprados</h3>'
  tablaProductos.append(cabecera)

  let container = $('div.carrito');
  container.append(tablaProductos);
  render();
}

function render() {
  let tablaProductos = $('.comprados');
  for ( let i = 0; i<= arrayProductos.length; i++) {
      var nombreproducto = "<span>" + arrayProductos[i].nombreproducto + "</span>";

  let buttonBorrar = $('<button>Delete</button>');
  buttonBorrar.on("click", function() {
      eliminarProducto(arrayProductos[i]);
  });

  let fila = $('<li class="fila"></li>');
  fila.append(nombreproducto);
  fila.append(buttonBorrar);
  tablaProductos.append(fila);
  carroCosas();
  sumarCompra();
  }
}

function eliminarProducto(producto) {
  let indice = arrayProductos.findIndex(p => p.id === producto.id);
  arrayProductos.splice(indice, 1);
  
  limpiarTabla()
  render(arrayProductos)
  sumarCompra()
}

function limpiarTabla(){
  $('.fila').remove();
}

armarcarrousel();
armarMediosDePago();