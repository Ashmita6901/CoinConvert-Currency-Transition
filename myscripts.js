//const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected=true;
        }
        else if(select.name ==="to" && code ==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}

//updating flag on choosing new option

const updateFlag= (element) =>{
    let currCode =element.value;
    let countryCode=countryList[currCode];//IN
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img= element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click" , async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal<1) {
        amtVal=1;
        amount.value="1";
    }

    //console.log(fromCurr.value , toCurr.value);
    const fromURL =`${BASE_URL}/${fromCurr.value.toLowerCase()}.min.json`;
    const fromResponse = await fetch(fromURL);
//     if (fromResponse.ok){
//         let fromData=await fromResponse.json();
//         let fromRate = fromData[fromCurr.value.toLowerCase()].inr;
//         console.log(fromRate);
// }
let response = await fetch(fromURL);
let data=await response.json();
let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount = amount.value * rate;
console.log(finalAmount);
msg.innerHTML = `<b>${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}</b>`;
})

