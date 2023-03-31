function displayText() {
  var inputText = document.getElementById("input-text").value;
  var outputElement = document.getElementById("output");
  outputElement.innerHTML += inputText + "<br>";
  document.getElementById("input-text").value = "";

 // Store the text in local storage
 var storedText = localStorage.getItem("text");
 if (storedText) {
   storedText += "\n" + inputText;
 } else {
   storedText = inputText;
 }
 localStorage.setItem("text", storedText);
}

// Load the stored text when the page is loaded
window.onload = function() {
 var storedText = localStorage.getItem("text");
 if (storedText) {
   var outputElement = document.getElementById("output");
   outputElement.innerHTML = storedText.replace(/\n/g, "<br>");
 }
}

const myUrl2 = new URL(window.location.toLocaleString()).searchParams;;
const id = myUrl2.get('id')
console.log(id);



fetch('https://www.cc.puv.fi/~asa/cgi-bin/fetchOrders.py')
 .then(response => response.json())
 .then(data => parse(data));
let orders;
let dataHTML ="";
let otsikkoHTML ="";

function parse(data){
  orders = data
  let x = orders[id]
  console.log(x);
  let tuotteet = x.products
  console.log(tuotteet);

  otsikkoHTML += '<h1 id="otsikko">Tilaus '+ x.orderid+'</h1>'
  document.getElementById("otsikko").innerHTML = otsikkoHTML
  dataHTML += '<tr><th class="block1">Tilausnumero</th><th class="block1">Asiakasnumero</th><th class="block1">Tilaaja</th><th class="block1">Tilausosoite</th><th class="block1">Laskutusosoite</th><th class="block1">Toimituspäivä</th><th class="block1">Kommentti</th></tr>'
  dataHTML += '<tr><th class="block">'+x.orderid+'</th><th class="block">'+x.customerid+'</th><th class="block">'+x.customer+'</th><th class="block">'+x.delivaddr+'</th><th class="block">'+x.invaddr+'</th><th class="block">'+x.deliverydate+'</th><th class="block">'+x.comment+'</th></tr>'
  dataHTML += '<tr><th class="block1">Koodi</th><th class="block1">Tuote</th><th class="block1">Tuotekuvaus</th><th class="block1">Määrä</th><th class="block1">Hyllypaikka</th><th class="block1">Valmistuskoodi</th><th class="block1">Hinta</th></tr>'
  
  for (let i = 0; i < tuotteet.length; i++){
    let y = tuotteet[i];
    dataHTML += '<tr><th class="block">'+y.code+'</th><th class="block">'+y.product+'</th><th class="block">'+y.description+'</th><th class="block">'+y.qty+'</th><th class="block">'+y.shelf_pos+'</th><th class="block">'+y.suppliercode+'</th><th class="block">'+y.unit_price+'</th></tr>'
  }
  document.getElementById("orderer").innerHTML = dataHTML
}