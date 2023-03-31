// Start JS

function checkCredentials(){
    var user = document.getElementById("username").value;
    var psw = document.getElementById("password").value;
    if (user == "jam",psw == "1234"){
        console.log("asdas");
        location.href = "Orders.html"
    }
}


// Orders JS

// Get all checkboxes and add an event listener to each one
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
// Get the ID of the checkbox
const checkboxId = checkbox.getAttribute('id');

// Check if there is a value for this checkbox in localStorage
const checkboxState = localStorage.getItem(checkboxId);

// If there is, set the state of the checkbox to the stored value
if (checkboxState === 'true') {
    checkbox.checked = true;
}
// Add an event listener to each checkbox to save its state when clicked
checkbox.addEventListener('click', () => {
    localStorage.setItem(checkboxId, checkbox.checked);
});
});


//fetch

fetch('https://www.cc.puv.fi/~asa/cgi-bin/fetchOrders.py')
 .then(response => response.json())
 .then(data => parse(data));
let orders;
let dataHTML ="";

//Parse

function parse(data){
    orders = data
    fill(orders)
    console.log(orders);
}
function fill(orders){
    dataHTML += '<tr class="row1"><th class="check"></th><th class="info">Tilausnumero</th><th class="info">Asiakasnumero</th><th class="info">Tilaaja</th><th class="info">Toimituspäivä</th><td class="open"></td></tr>'
    document.getElementById("table").innerHTML = dataHTML;
    for (let i = 0; i < orders.length; i++){
        let x = orders[i];
        dataHTML += '<tr class="row" id="row"><td class="check"><input type="checkbox" name="checkbox" id="checkbox" class="checkbox"></td><td class="block" id="orderId">' + x.orderid + '</td><td class="block">' + x.customerid + '</td><td class="block">' + x.customer + '</td><td class="block">' + x.deliverydate + '</td><td class="open"><button class="nappi"><a href="Projekti.pdf.html?id='+i+'" target="_blank" class="button">Avaa</a></button></td></tr>'
    }
    document.getElementById("table").innerHTML = dataHTML;
}
