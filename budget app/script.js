const currencyHolder=document.getElementById("currency")

const balanceHolder=document.getElementById("balance")

const tnxNameHolder=document.getElementById("name")
 
const tnxAmountHolder=document.getElementById("amount")

const income=document.getElementById("income")
const expense=document.getElementById("expense")

const saveButton=document.getElementById("save")
const displayList=document.getElementById("list_of_Transaction")


let symbol ="$"
let listOfTransactions=[]
let currentBalance =0
 
 function edit(i){
    tnxNameHolder.value=listOfTransactions[i].name;
    tnxAmountHolder.value=listOfTransactions[i].amount;
    if(listOfTransactions[i].type=="income"){
        income.checked=true;
    }else{
        expense.checked=true
    }

 }
function del(i){
    listOfTransactions =listOfTransactions.
    filter((e,index)=>i !==index);
    render();
}
function saveData(){
    localStorage.setItem("symbol",symbol);
    localStorage.setItem("balance",currentBalance)
    localStorage.setItem("list",JSON.stringify(listOfTransactions))
}
function loadData(){
     symbol =localStorage.getItem("symbol");
    listOfTransactions= JSON.parse(localStorage.getItem("list"))
    currentBalance = Number( localStorage.getItem("balance"))
}
function render(){
    let currentBalance= listOfTransactions.reduce((total,value)=>{
        return value.type=="expense"? total -value.amount:total+value.amount},0
    )
    
     
    displayList.innerHTML="";

    if(listOfTransactions.length==0){
        displayList.innerHTML+="no Transaction found"
    }
    else{
        listOfTransactions.forEach((e,i)=>{
            displayList.innerHTML+=`
             <li class="transaction ${e.type}">
            <p>${e.name}</p>
           <div class="right_side">
               <p>${symbol}${e.amount}</p>
               <button  onclick="edit(${i})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button">
               <button onclick="del(${i})"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
           </div>
       </li>`
        })
    }

currencyHolder.innerHTML=symbol;
balanceHolder.innerHTML=currentBalance
saveData()
}
saveButton.addEventListener("click",()=>{
  if(tnxNameHolder.value==""||Number(tnxAmountHolder.value)<= 0){
    alert("can't do that!")
    return;
  }

    let transaction ={
        name:tnxNameHolder.value,
        amount:Number(tnxAmountHolder.value),
        type:income.checked?"income":"expense"
    }
    listOfTransactions.push(transaction)
    tnxNameHolder.value=""
    tnxAmountHolder.value=""
    render()
   
})

loadData()
render()
