//CRUDS
//Declare variables -- Input Data and Read
var prodName = document.getElementById('productName');
var prodPrice = document.getElementById('productPrice');
var prodADS = document.getElementById('productADS');
var prodDiscount = document.getElementById('productDiscount');
var prodTaxes = document.getElementById('productTaxes');
var prodTotal = document.getElementById('productTotal');
var prodStock = document.getElementById('productStock');
var prodCounts = document.getElementById('productCounts');
var prodCategory = document.getElementById('productCategory');
var submit = document.getElementById('submit');

// document.getElementById('dataTable');
//Declare proctuctArray
var productArray;
//Make proctuctArray as dynamic value
if(localStorage.getItem('procductLocalStorage') != null){
    productArray = JSON.parse(localStorage.getItem('procductLocalStorage'));
    displayData();
    // console.log(localStorage.getItem('procductLocalStorage'));
}else{
    productArray=[];
    // console.log(localStorage.getItem('procductLocalStorage'));
}
//Update Element
var getIndexElement=0;

    //Create productObj
    // var productObj={
    //     productName:prodName,
    //     productPrice:prodPrice,
    //     productADS:prodADS,
    //     productDiscount:prodDiscount,
    //     productTaxes:prodTaxes,
    //     productTotal:prodTotal,
    //     productStock:prodStock,
    //     productCounts:prodCounts,
    //     productCategory:prodCategory,
    // };

//Declare variables -- search Data
var searchName = document.getElementById('searchName');
var searchCategory = document.getElementById('searchCategory');




// Start Create
submit.onclick = function (){
    if(prodName.value.length > 0 && prodPrice.value > 0 && prodCategory.value.length > 0){
        //Create productObj
        var productObj={
                productName:prodName.value,
                productPrice:prodPrice.value,
                productADS:prodADS.value,
                productDiscount:prodDiscount.value,
                productTaxes:prodTaxes.value.toFixed(2),
                productTotal:prodTotal.value.toFixed(2),
                productStock:prodStock.value,
                productCounts:prodCounts.value,
                productCategory:prodCategory.value,
            };
        //Assign Values
        // productObj.productName = productObj.productName.value;
        // productObj.productPrice = productObj.productPrice.value;
        // productObj.productADS = productObj.productADS.value;
        // productObj.productDiscount = productObj.productDiscount.value;
        // productObj.productTaxes = productObj.productTaxes.value.toFixed(2);
        // productObj.productTotal = productObj.productTotal.value.toFixed(2);
        // productObj.productStock = productObj.productStock.value;
        // productObj.productCounts = productObj.productCounts.value;
        // productObj.productCategory = productObj.productCategory.value;
        

        productArray.push(productObj);
        //Save proctuctArray at LocalStorage
        localStorage.setItem('procductLocalStorage',JSON.stringify(productArray));
        //Display DataTable
        displayData();
        clearData();
        getTotal();
        // console.log(productArray);

    }
    else{
        console.log('Please Complete Main Fields (Product Name, Product Price, Proctuct Category)');
    }
}
//Get Taxes
function getTaxes(){
    if(prodPrice.value > 0 && prodDiscount.value == '' && prodADS.value == ''){
        var result= parseFloat(prodPrice.value) * 0.14;
        if(result > 0){
            prodTaxes.innerHTML = result.toFixed(2);
            this.prodTaxes.value = result;
            prodTaxes.style.backgroundColor='#038103';
            prodTaxes.style.borderColor='#024602';
            // console.log(result);
        }
        else{
            prodTaxes.innerHTML = 0;
            this.prodTaxes.value = 0;
            prodTaxes.style.backgroundColor='tomato';
            // console.log(result);
        }

        
    }
    else if(prodPrice.value > 0 && prodDiscount.value > 0 && prodADS.value == ''){
        var result= (parseFloat(prodPrice.value) - parseFloat(prodDiscount.value)) * 0.14;
        
        if(result > 0){
            prodTaxes.innerHTML = result.toFixed(2);
            this.prodTaxes.value = result;
            prodTaxes.style.backgroundColor='#038103';
            prodTaxes.style.borderColor='#024602';
            // console.log(result);
        }
        else{
            prodTaxes.innerHTML = 0;
            this.prodTaxes.value = 0;
            prodTaxes.style.backgroundColor='tomato';
            // console.log(result);
        }
    }
    else if(prodPrice.value > 0 && prodDiscount.value == '' && prodADS.value > 0){
        var result= (parseFloat(prodPrice.value) - parseFloat(prodADS.value)) * 0.14;
        
        if(result > 0){
            prodTaxes.innerHTML = result.toFixed(2);
            this.prodTaxes.value = result;
            prodTaxes.style.backgroundColor='#038103';
            prodTaxes.style.borderColor='#024602';
            // console.log(result);
        }
        else{
            prodTaxes.innerHTML = 0;
            this.prodTaxes.value = 0;
            prodTaxes.style.backgroundColor='tomato';
            // console.log(result);
        }
    }
    else if(prodPrice.value > 0 && prodDiscount.value > 0 && prodADS.value > 0){
        var result= (parseFloat(prodPrice.value) - parseFloat(prodDiscount.value) - parseFloat(prodADS.value)) * 0.14;
        
        if(result > 0){
            prodTaxes.innerHTML = result.toFixed(2);
            this.prodTaxes.value = result;
            prodTaxes.style.backgroundColor='#038103';
            prodTaxes.style.borderColor='#024602';
            // console.log(result);
        }
        else{
            prodTaxes.innerHTML = 0;
            this.prodTaxes.value = 0;
            prodTaxes.style.backgroundColor='tomato';
            // console.log(result);
        }
    }
    else{
        prodTaxes.innerHTML = '';
        this.prodTaxes.value = '';
        prodTaxes.style.backgroundColor='#fff';
        prodTaxes.style.borderColor='red';
        // console.log('Not O.K');
    
    }

}

//Get Total
function getTotal(){
    if(prodPrice.value > 0 && prodADS.value == '' && prodDiscount.value == ''){
        getTaxes();
        var result = parseFloat(prodPrice.value) + parseFloat(prodTaxes.value);
        prodTotal.innerHTML = result.toFixed(2);
        this.prodTotal.value = result;
        prodTotal.style.backgroundColor='#038103';
        prodTotal.style.borderColor='#024602';

    }
    else if(prodPrice.value > 0 && prodADS.value > 0 && prodDiscount.value == ''){
        getTaxes();
        var result = (parseFloat(prodPrice.value) - parseFloat(prodADS.value)) + parseFloat(prodTaxes.value);
        if (result > 0){
            prodTotal.innerHTML = result.toFixed(2);
            this.prodTotal.value = result;
            prodTotal.style.backgroundColor='#038103';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
        else{
            prodTotal.innerHTML = 0;
            this.prodTotal.value = 0;
            prodTotal.style.backgroundColor='tomato';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
    }
    else if(prodPrice.value > 0 && prodADS.value =='' && prodDiscount.value >0){
        getTaxes();
        var result = (parseFloat(prodPrice.value) - parseFloat(prodDiscount.value)) + parseFloat(prodTaxes.value);
        if (result > 0){
            prodTotal.innerHTML = result.toFixed(2);
            this.prodTotal.value = result;
            prodTotal.style.backgroundColor='#038103';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
        else{
            prodTotal.innerHTML = 0;
            this.prodTotal.value = 0;
            prodTotal.style.backgroundColor='tomato';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
    }
    else if(prodPrice.value > 0 && prodADS.value >0 && prodDiscount.value >0){
        getTaxes();
        var result = (parseFloat(prodPrice.value) - parseFloat(prodDiscount.value) - parseFloat(prodADS.value)) + parseFloat(prodTaxes.value);
        if (result > 0){
            prodTotal.innerHTML = result.toFixed(2);
            this.prodTotal.value = result;
            prodTotal.style.backgroundColor='#038103';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
        else{
            prodTotal.innerHTML = 0;
            this.prodTotal.value = 0;
            prodTotal.style.backgroundColor='tomato';
            prodTotal.style.borderColor='#024602';
            // console.log(result);

        }
    }
    else {
        getTaxes();
        prodTotal.innerHTML = '';
        this.prodTotal.value = '';
        prodTotal.style.backgroundColor='#fff';
        prodTotal.style.borderColor='red';
        // console.log(prodTaxes.value);
        // console.log(prodTotal.value);
    }
}

// End Create -----------------------
//Start Read
//Display ProductData
function displayData(){
    var dataTableRow = '';
    if(productArray.length>0){
        for(var i = 0; i < productArray.length; i++ ){
            dataTableRow +=`
            <tr onclick="showDataRow(${i})">
            <td>${i+1}</td>
            <td>${productArray[i].productName}</td>
            <td>${productArray[i].productPrice}</td>
            <td>${productArray[i].productADS}</td>
            <td>${productArray[i].productDiscount}</td>
            <td>${productArray[i].productTaxes}</td>
            <td>${productArray[i].productTotal}</td>
            <td>${productArray[i].productCategory}</td>
            <td>
                <button class="btn btn-warning" onclick="updateDataRow()">Update</button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteDataRow(${i})">Delete</button>
            </td>
        </tr>
            `;
        }
        document.getElementById('dataTable').innerHTML = dataTableRow;
        
    }
    console.log(productArray);
}
//Clear DataTable
function clearData(){
    prodName.value = '';
    prodPrice.value = '';
    prodADS.value = '';
    prodDiscount.value = '';
    prodTaxes.value = ''
    prodTotal.value = '';
    prodStock.value = '';
    prodCounts.value = '';
    prodCategory.value='';
}

//End Read -----------------------

//Update
//Get element for update
function showDataRow(index){
    prodName.value = productArray[index].productName;
    prodPrice.value = productArray[index].productPrice;
    prodADS.value = productArray[index].productADS;
    prodDiscount.value = productArray[index].productDiscount;
    prodTaxes.value = productArray[index].productTaxes;
    prodTotal.value = productArray[index].productTotal;
    prodStock.value = productArray[index].productStock;
    prodCounts.value = productArray[index].productCounts;
    prodCategory.value= productArray[index].productCategory;
    getTotal();
    getIndexElement = index;
    console.log(getIndexElement);
}
//Make Update
function updateDataRow(){
    //Create productObj
    var productObj={
        productName:prodName.value,
        productPrice:prodPrice.value,
        productADS:prodADS.value,
        productDiscount:prodDiscount.value,
        productTaxes:prodTaxes.value.toFixed(2),
        productTotal:prodTotal.value.toFixed(2),
        productStock:prodStock.value,
        productCounts:prodCounts.value,
        productCategory:prodCategory.value,
    };

    productArray.splice(getIndexElement,1,productObj);
    //Save proctuctArray at LocalStorage
    localStorage.setItem('procductLocalStorage',JSON.stringify(productArray));
    clearData();
    displayData();
}
//Delete
function deleteDataRow(index){
    productArray.splice(index,1);
    //Save proctuctArray at LocalStorage
    localStorage.setItem('procductLocalStorage',JSON.stringify(productArray));
    clearData();
    displayData();
}
//Search