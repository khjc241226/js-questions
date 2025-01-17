const btn = document.getElementById("btn");
const sumBtn = document.getElementById("sumBtn");
const result = document.getElementById("result");
const container = document.getElementById("container");

btn.addEventListener("click", e => {
    container.innerHTML = "";

    const count = e.target.previousElementSibling.value;
    console.log(count);

    for(let i=0 ; i<count ; i++){
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.classList.add("input-number");
        container.append(input);
    }
});

sumBtn.addEventListener("click", ()=>{
    const inputArr = document.getElementsByClassName("input-number");

    let sum = 0;
    for(let input of inputArr){
        sum += Number(input.value);
    }
    result.innerText = sum;
});
