const numberList = document.getElementsByClassName("number");
const result = document.getElementById("result");
const reset = document.getElementById("reset");

for (let number of numberList) {
  number.addEventListener("click", e => {

    if (result.innerText.length < 10) {
      result.innerText += e.target.innerText;
    } else {
      alert("10자 까지만 입력할 수 있습니다");
    }
  });
}

reset.addEventListener("click", () => {
  result.innerText = "";
})