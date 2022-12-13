// oop
class Article {
    constructor(name,marque,price,date,selctedvalue,promotion) {

        this.name = name;
        this.marque = marque;
        this.price = price;
        this.date = date;
        this.selctedvalue = selctedvalue;
        this.promotion = promotion;
    }
     modaldetails() {
        
        let div = document.getElementById('details');
        details.style.display = "block"
        div.innerHTML = `
        Nom: ${this.name}<br>
        Marque: ${this.marque} <br> 
        Price:  ${this.price} DH <br>
        Date:  ${this.date} <br>
        Type:  ${this.selctedvalue} <br>
        Promotion:  ${this.promotion} <br>
        `

    }

}


// -------- if localstorage is full bring data from local storage
var arr;
if (localStorage.product != null) {
    arr = JSON.parse(localStorage.product)
} else {
    arr = [];

}



// -------- clear all inputs after submit
function clearinput() {
    document.getElementById('nameOne').value = ""
    document.getElementById('marqueTwo').value = ""
    document.getElementById('priceThree').value = ""
    document.getElementById('dateFour').value = ""
}




let details = document.getElementById('infosdetailes');
let button = document.getElementById("submit");

// -------- array fo push true
const array = [];
button.addEventListener('click',(e) => {
    e.preventDefault()

    array.length = 0
    let name = document.getElementById('nameOne').value;
    let marque = document.getElementById('marqueTwo').value;
    let price = document.getElementById('priceThree').value;
    let date = document.getElementById('dateFour').value;
    let selctedvalue = document.getElementById('optionss').value;
    let promotion = document.querySelector('form').elements.namedItem("promotion").value;
    let namemarqueRegex = /^[a-zA-Z\s]+$/;
    let priceRegex = /^[1-9][0-9]*$/;
    let errormessage = document.getElementById('errormessage');
    // ------ deatails function



 // ------------- date ----------
 if (date != '') {
    array.push(true);
} else {
    errormessage.innerHTML = `<strong>date is empty !</strong> <br> 
    please enter a specific date to continue`
    errormessage.style.backgroundColor = "red"
}

 // ------------- price ----------

 if (priceRegex.test(price) === false) {
    errormessage.innerHTML = `<strong>Enter a Price !</strong> <br> 
    Price can not be empty`
    errormessage.style.backgroundColor = "red"
} else {
    array.push(true);
}
  // ------------- marque ----------

  if (marque.length === 0 || marque.length > 15 || namemarqueRegex.test(marque) === false) {
    errormessage.innerHTML = `<strong>Marque is invalid !</strong> <br> 
    marque must be between 1-15 characters and must not contain numbers nor speacial characters !`
    errormessage.style.backgroundColor = "red"
} else {
    array.push(true);
}
    // ------------- name ----------
    if (name.length === 0 || name.length > 15 || namemarqueRegex.test(name) === false) {
        errormessage.innerHTML = `<strong>Name is invalid !</strong> <br>
        name must be between 1-15 characters and must not contain numbers nor speacial characters !`
        errormessage.style.backgroundColor = "red"

    } else {
        array.push(true);
    }
  
    // ============= do all the thing if arr.lenght == 4 =================== ::
    if (array.length === 4) {
        let productone = new Article(name,marque,price,date,selctedvalue,promotion);
        arr.push(productone)
        productone.modaldetails() 
        clearinput()
        showallvalues()

        // -------------- sort my products based on name
        arr = arr.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        localStorage.setItem('product',JSON.stringify(arr))

    } else {
        scroll({
            top: 0
        })
    }

})

// -------------- show table after relode
showallvalues()

// -------------- function to CREATE table
function showallvalues() {
    let tablo = '';
    for (let i = 0; i < arr.length; i++) {
        tablo += `
            <tr>
            <th>${arr[i].name}</th>
            <th>${arr[i].marque}</th>
            <th>${arr[i].price} DH</th>
            <th>${arr[i].date}</th>
            <th>${arr[i].selctedvalue}</th>
            <th>${arr[i].promotion}</th>
            <th><button type="button" onclick="updateData(${i})" class="btn" id="edit" >edit</button></th>
            <th><button type="button" onclick="showpopup(${i})" class="btn" id="delete">delete</button></th>
            </tr>
            `
        document.getElementById('tbody').innerHTML = tablo
    }
}



popup = document.getElementById('overllay');
deletebtnpop = document.getElementById('btntodelete');
popup.onclick = function() {
    popup.style.display = "none" 
}
function hideback() {
    popup.style.display = "none" 
}



// ------- the button that i created in showallvalues() 

function showpopup(i) {
    // ---- display the popup
    popup.style.display = "block"
    // ---- if clicked in the red button // TO DELETE 
    deletebtnpop.onclick = function () {
        arr.splice(i,1)
        localStorage.product = JSON.stringify(arr)
        showallvalues()
        popup.style.display = "none"
        window.location.reload();
        
    }
}

// ------- to update values in arr == value in inputs
function updateData(i) {
    button.innerHTML = "modify"
    document.getElementById('nameOne').value = `${arr[i].name}`
    document.getElementById('marqueTwo').value = `${arr[i].marque}`
    document.getElementById('priceThree').value = `${arr[i].price}`
    document.getElementById('dateFour').value = `${arr[i].date}`
    document.getElementById('optionss').value = `${arr[i].selctedvalue}`
    document.querySelector('form').elements.namedItem("promotion").value = `${arr[i].promotion}`
    arr.splice(i,1)
    localStorage.product = JSON.stringify(arr)
    scroll({
        top: 0
    })
}
// ----- hide details -------------
function hidedetails() {
    details.style.display = "none"
    window.location.reload();
}

window.onscroll = function(){   
let scrollup = document.getElementById("scrollup");
 if(window.scrollY >= 400){     
    scrollup.style.display ="block"


scrollup.onclick = function(){   
window.scrollTo({       
  left:0,     
 top:0,        
 behavior:"smooth"});
}    
 } else{ 
    scrollup.style.display ="none"    
 }
  }