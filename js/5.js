/* 숫자 클릭 시 디스플레이에 출력 */
const keyList = document.querySelectorAll(".key");
const display = document.querySelector("#display");

keyList.forEach((key) => {
    key.addEventListener("click", () => {
        display.textContent += key.textContent;
    })
})


/* 초기화 버튼 클릭 시 디스플레이 내용 지우기 */
const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", () => {
    display.textContent = "";
})


/* 추가 버튼 클릭 시 목록에 디스플레이 번호 추가 */
/*  + 즐겨찾기 버튼 */
/*  + x 버튼 */
const addBtn = document.querySelector("#addBtn");
const numberList = document.querySelector(".number-list");

addBtn.addEventListener("click", () => {
    const li = document.createElement("li");

    const span1 = document.createElement("span");
    span1.textContent = display.textContent;

    const span2 = document.createElement("span");
    span2.textContent = "☆";

    /* 즐겨찾기 버튼 클릭 시 부모 요소에 favorites 클래스 추가/제거
     + 별 모양 변경 */
    span2.addEventListener("click", e => {
        const parent = e.target.parentElement;

        if(parent.classList.contains("favorites")) {
            parent.classList.remove("favorites");
            e.target.textContent = "☆";

        } else {
            parent.classList.add("favorites");
            e.target.textContent = "★";

        }
    })



    const span3 = document.createElement("span");
    span3.innerHTML = "&times;";


    /* X 버튼 클릭 시 목록에 번호 삭제 */
    span3.addEventListener("click", e => {
        e.target.parentElement.remove();
    });


    li.append(span1, span2, span3);
    numberList.append(li);

    display.textContent = "";
    
});

