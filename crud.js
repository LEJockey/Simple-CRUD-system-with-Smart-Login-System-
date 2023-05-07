// Catching the inputs to get it's value using (DOM)
let pName = document.getElementById('pName')
let count = document.getElementById('count')
let pPrice = document.getElementById('pPrice')
let pTexes = document.getElementById('pTaxes')
let pAds = document.getElementById('pAds')
let pDiscount = document.getElementById('pDiscount')
let pTotal = document.getElementById('total')
let pCategory = document.getElementById('pCategory')
let pModel = document.getElementById('pModel')
let addBtn = document.getElementsByClassName('addProd')[0]
let confirmAddBtn = document.getElementsByClassName('confirmAdd')[0]
let updateBtn = document.getElementsByClassName('updateProd')[0]
let confirmUpdateBtn = document.getElementsByClassName('confirmUpdate')[0]
let deleteAllBtn = document.getElementsByClassName('deleteAll')[0]

// variables for Updating Function
let specificProductArr = []
let diffProductsArr = []
let index 

// Handle Log out function:
let logOutBtn = document.querySelector('nav .logOut')
logOutBtn.onclick = function () {
    location.href = "./index.html"
}

// Handle name of user:
let userName = localStorage.lastUserLogin
document.querySelector('nav .userName').innerHTML = `Hello  ${userName}`




// calling add product function to add new products when click on add btn:
confirmAddBtn.onclick = addProd

// making update on product and call update product function when click on update btn:
confirmUpdateBtn.onclick = function () {addUpdate(index)}

// calling delete all products function incase of click on delete all btn:
deleteAllBtn.onclick = function () {
    let confirm = window.confirm('Are u sure you want to delete all products?')
    if (confirm) {
        deleteAllProducts()   
    }
}

// Calc Product Price Function:
function calcPrice() {
    if (pPrice !== '') {
        let sum = +(pPrice.value) + +(pTexes.value) + +(pAds.value) - +(pDiscount.value)
        pTotal.value = sum
    }else pTotal.value = 0.00
}

// Check if no products in the Products container, display delete all btn:
let prodContainer = []
if (prodContainer.length > 0) {
    deleteAllBtn.classList.remove('hide')
}else deleteAllBtn.classList.add('hide')

// Check at the program start if products data stored before to display it:
window.onload = function () {
    if ('products' in localStorage) {
        prodContainer = JSON.parse(localStorage.getItem('products'))
        displayProd(prodContainer)  
    }
    showDeleteAllBtn()
}


// Adding Product Function:
function addProd() {
    let product = {
        prodName: pName.value,
        prodCount: count.value === '' ? 1 : +count.value,
        prodPrice: pPrice.value,
        prodTaxes: pTexes.value,
        prodAds: pAds.value,
        prodDiscount: pDiscount.value,
        prodTotal: pTotal.value,
        prodCategory: pCategory.value,
        prodModel: pModel.value,
    }
    if (count.value > 1) {
        for (let i = 0; i < count.value; i++) {prodContainer.push(product)   }
    }else prodContainer.push(product)

    localStorage.setItem('products', JSON.stringify(prodContainer))
    showDeleteAllBtn()
    displayProd(prodContainer)
    clearForm()
}

// Display Products details in table
function displayProd(arr) {

    // Sort products by price
    arr.sort((a, b) => parseFloat(a.prodPrice) - parseFloat(b.prodPrice));

    let productRow = ``
    for (let i = 0; i < arr.length; i++) {
        productRow += `<tr class="align-middle">
        <td class="d-none d-lg-table-cell" >${i+1}</td>
        <td>${arr[i].prodName.charAt(0).toUpperCase()}${arr[i].prodName.slice(1)}</td>
        <td>${arr[i].prodPrice}</td>
        <td class="d-none d-lg-table-cell">${arr[i].prodTaxes == 0 ? arr[i].prodTaxes = 0 : arr[i].prodTaxes}</td>
        <td class="d-none d-lg-table-cell">${arr[i].prodAds == 0 ? arr[i].prodAds = 0 : arr[i].prodAds}</td>
        <td>${arr[i].prodDiscount == 0 ? arr[i].prodDiscount  = 0 : arr[i].prodDiscount }</td>
        <td>${arr[i].prodTotal}</td>
        <td class="d-none d-lg-table-cell">${arr[i].prodCategory.charAt(0).toUpperCase()}${arr[i].prodCategory.slice(1)}</td>
        <td class="d-none d-lg-table-cell">${arr[i].prodModel}</td>
        <td><button onclick="updateProd(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button  class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteProduct${i}">Delete</button></td>
        <div class="modal fade"
            id="deleteProduct${i}"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5 text-dark"
                            id="exampleModalLabel">Delete Product</h1>
                    </div>
                    <div class="modal-body">
                        <p class="text-dark"> Are you sure you want to delete product from your CRUD System?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                            data-bs-dismiss="modal"
                            class="btn btn-outline-success" onclick="deleteProd(${i})">Yes</button>
                        <button type="button"
                            class="btn btn-outline-danger"
                            data-bs-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>
    </tr>`   
    }
    document.getElementById('pInfo').innerHTML = productRow
}

// Clear Form function after Adding Product or Updating Product:
function clearForm() {
    pName.value = ''
    count.value = ''
    pPrice.value = ''
    pTexes.value = ''
    pAds.value = ''
    pDiscount.value = ''
    pTotal.value = ''
    pCategory.value = ''
    pModel.value = ''
}


// Delete Specific Product Function from table:
function deleteProd(x) {
    let oneProd = prodContainer[x]
    let count = + prodContainer[x].prodCount
    
    for (let i = 0; i < prodContainer.length; i++) {
        if (prodContainer[i].prodName === oneProd.prodName && prodContainer[i].prodCount === count && prodContainer[i].prodPrice === oneProd.prodPrice) {
            prodContainer[i].prodCount = count - 1 
        }   
    }
    prodContainer.splice(x, 1)
    localStorage.setItem('products', JSON.stringify(prodContainer))
    displayProd(prodContainer)
    showDeleteAllBtn()
}

// Function to show Delete All Btn:
function showDeleteAllBtn() {
    if (prodContainer.length > 0) {
        deleteAllBtn.classList.remove ('hide')
    }else deleteAllBtn.classList.add ('hide')
}

// Function to delete all products:
function deleteAllProducts() {
    localStorage.removeItem('products')
    prodContainer.splice(0)
    displayProd(prodContainer)
    deleteAllBtn.classList.add('hide')
    addBtn.classList.remove('hide')
    updateBtn.classList.add('hide')
    clearForm()
}

// Function to search by product name:
function searchByName(item) {
    let searchedItems = []
    for (let i = 0; i < prodContainer.length; i++) {
        if (prodContainer[i].prodName.toLowerCase().includes(item.toLowerCase())) {
            searchedItems.push(prodContainer[i])
        } 
    }
    // showDeleteAllBtn()
    displayProd(searchedItems)
}

// Function to search by product category:
function searchByCateg(type) {
    let searchedTypes = []
    for (let i = 0; i < prodContainer.length; i++) {
        if (prodContainer[i].prodCategory.toLowerCase().includes(type.toLowerCase())) {
            searchedTypes.push(prodContainer[i])
        }  
    }
    // showDeleteAllBtn()
    displayProd(searchedTypes)
}


// Function to get Product Specification to update it :
function updateProd(i) {
    addBtn.classList.add('hide')
    updateBtn.classList.remove('hide')
    pName.value = prodContainer[i].prodName
    count.value = prodContainer[i].prodCount
    pPrice.value = prodContainer[i].prodPrice
    pTexes.value = prodContainer[i].prodTaxes
    pAds.value = prodContainer[i].prodAds
    pDiscount.value = prodContainer[i].prodDiscount
    pTotal.value = prodContainer[i].prodTotal
    pCategory.value = prodContainer[i].prodCategory
    pModel.value = prodContainer[i].prodModel
    index = i

    // make array for target product to be update
    specificProductArr = prodContainer.filter(pro => (pro.prodName === pName.value && pro.prodCount === + count.value && pro.prodPrice === pPrice.value))

    // make array of products out of array 
    diffProductsArr = prodContainer.filter (pro => !(pro.prodName === pName.value && pro.prodCount === + count.value && pro.prodPrice === pPrice.value))
}

function addUpdate(index) {
    
    // Update the product that only stored with count = 1 
    if (specificProductArr.length === 1 && +count.value === 1) {

    prodContainer[index].prodName = pName.value
    prodContainer[index].prodCount = + count.value
    prodContainer[index].prodPrice =  pPrice.value
    prodContainer[index].prodTaxes = pTexes.value
    prodContainer[index].prodAds = pAds.value
    prodContainer[index].prodDiscount = pDiscount.value
    prodContainer[index].prodTotal = pTotal.value
    prodContainer[index].prodCategory = pCategory.value
    prodContainer[index].prodModel = pModel.value
    }
    // Update the product that stored with count > 1 || Update the product with count = 1 (but updating it's count more than 1)
    else if (specificProductArr.length > 1 || (specificProductArr.length === 1 && +count.value > 1)) {
        
        let updatedProduct = {
            prodName: pName.value,
            prodCount: +count.value,
            prodPrice: pPrice.value,
            prodTaxes: pTexes.value,
            prodAds: pAds.value,
            prodDiscount: pDiscount.value,
            prodTotal: pTotal.value,
            prodCategory: pCategory.value,
            prodModel: pModel.value,
            }

            let updatedProductsArr = new Array(+count.value).fill(updatedProduct)
            prodContainer = diffProductsArr.concat(updatedProductsArr)
        }
    
    addBtn.classList.toggle('hide')
    updateBtn.classList.toggle('hide')
    localStorage.setItem('products', JSON.stringify(prodContainer))
    showDeleteAllBtn()
    displayProd(prodContainer)
    clearForm()
}



