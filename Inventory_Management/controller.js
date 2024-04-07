

var loginUrl = "https://retoolapi.dev/nxM49S/InventoryLogin";
var productsUrl = "https://retoolapi.dev/su7YBh/InventoryProducts";
// var cartUrl = "https://retoolapi.dev/BLb5vi/InventoryCart";
var cartUrl="https://retoolapi.dev/ReTSa5/InventoryCart";
var products = [];
function checkSession() {
    let user = sessionStorage.getItem('user');
    console.log(user);
    if (user == null) {
        window.location.href = "./login.html";
    }
}

function registerEmployee(employee){
    fetch(loginUrl, {
        "method": "POST",
        "body": JSON.stringify(employee),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
    .then((response)=> response.json())
    .then((data)=> { 
        console.log(data);
        alert("Registered Successfully...");
        window.location.href="./login.html";
    }).catch((err)=> {
        console.log(err);
        alert("Currently not able to Register.. Please check the data and try again..");
    });


}

function employeeLogin(userName, pswd){
    let apiUrl = loginUrl + "?empName=" + userName + "&password=" +pswd;
    fetch(apiUrl, {
        "method": "GET",
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
    .then((response)=> response.json())
    .then((employees)=> {
        
        console.log(employees);

        if(employees.length > 0) 
        {
            if(employees[0].status){
                sessionStorage.setItem("user",userName);
                alert("Successfully Login...")
                window.location.href = "./index.html";
            }else{
                alert("Please wait for approval");
            }
        }
        else
            alert("Invalid Username or password");
        
    }).catch((err)=> {
        console.log(err);
        alert("Something Went wrong,,Please try again later....");
    })
}

function displayProducts(){
    return fetch(productsUrl, {
        "method": "GET",
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    });
}

function addToCart(cart){
    return fetch(cartUrl, {
        "method": "POST",
        "body": JSON.stringify(cart),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
    .then((response)=> response.json())
    .then((data)=> { 
        console.log(data);
        alert("added Successfully...");
        // window.location.href="./l.html";
    })
}

function displayCart(){
    let apiUrl = cartUrl + "?status=false";
    return fetch(apiUrl, {
        "method": "GET",
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    });
    
}
function UpdateCountAndTotal(updatecart,id){
    let apiUrl=cartUrl+"/"+id;
    console.log(apiUrl)
    fetch(apiUrl, {
        "method": "PATCH",
        "body": JSON.stringify(updatecart),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
    .then((response)=> response.json())
    .then((data)=> { 
        console.log(data);
        
    });
}
 function updateProduct(product){
    let apiUrl = productsUrl + "/" + product.id;
    return fetch(apiUrl, {
        "method": "PUT",
        "body": JSON.stringify(product),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })

 }

function approveProduct(cart){
    let apiUrl = cartUrl + "/" + cart.id;
    return fetch(apiUrl, {
        "method": "PUT",
        "body": JSON.stringify(cart),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
}

function rejectProduct(recordId){
    // alert("wair");
    let apiUrl = cartUrl+ "/" +recordId ;
    return fetch(apiUrl, {
    "method": "DELETE",
    "headers": { "Content-Type": "application/json; charset=UTF-8" }
    });

}

function displayEmployees(){
    let apiUrl = loginUrl + "?status=false";
    return fetch(apiUrl, {
        "method": "GET",
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    });
}

function approveEmployee(employee){
    let apiUrl = loginUrl + "/" + employee.id;
    return fetch(apiUrl, {
        "method": "PUT",
        "body": JSON.stringify(employee),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    })
}

function rejectEmployee(recordId){
    let apiUrl = loginUrl + "/" + recordId;
    return fetch(apiUrl, {
        "method": "DELETE",
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    });
}