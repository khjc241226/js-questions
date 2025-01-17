const createBtn = document.querySelector("#createBtn");
const resetBtn = document.querySelector("#resetBtn");
const randomBtn = document.querySelector("#randomBtn");
const btnContainer = document.querySelector(".btn-container");
const lottoBoard = document.querySelector("#lottoBoard");

// #createBtn 버튼 클릭 시
// #lottoBoard에 div.number 요소 45개 생성해서 추가하기
createBtn.addEventListener("click", () => {

  // #lottoBoard 이전 내용 삭제
  lottoBoard.innerHTML = "";

  // div.number 만들어서 추가
  for(let i=1 ; i<46 ; i++){
    const number = document.createElement("div");
    number.classList.add("number"); // 클래스 추가
    number.textContent = i;

    // 만들어진 div.number에 클릭 시 동작 추가
    number.addEventListener("click", e => {
      // console.log(e.target.textContent);


      // 클릭 전에 화면에 선택된 요소가 5개 이하일 경우
      // 또는 
      // 클릭한 요소에 active 클래스가 있을 경우
      const count = document.querySelectorAll(".active").length;

      if(count <= 5 || e.target.classList.contains("active")){
        /* 요소.classList.toggle(클래스명) :
          요소에 (클래스명)이 있으면 제거, 없으면 추가 */
        e.target.classList.toggle("active");
      }
      else{
        alert("6개 까지만 선택할 수 있습니다");
      }
    });

    lottoBoard.append(number); // 화면에 추가

    btnContainer.classList.remove("hidden");
    createBtn.classList.add("hidden");
  }
});


// 선택 초기화 함수
function resetFn(){
  const actives = document.querySelectorAll(".active");
  actives.forEach(item => item.classList.remove("active"));
}

// 랜덤 선택 함수
function randomSelectFn(){
  // 중복 X 난수 6개 생성
  const set = new Set(); // 중복 값을 저장하지 않는 객체
  while(set.size < 6){ // 저장된 숫자가 6개 미만이면 반복
    const ran = Math.floor(Math.random() * 45 + 1);
    set.add(ran);
  }

  const numbers = document.querySelectorAll(".number");

  set.forEach(num => {
    numbers[num-1].classList.add("active");
  });
  
}

// 초기화 버튼 클릭 시
resetBtn.addEventListener("click", resetFn);

// 랜덤 버튼 클릭 시
randomBtn.addEventListener("click", () => {
  randomBtn.disabled = true; // 클릭 못하게 비활성화

  let currentInterval = setInterval(()=>{
    resetFn(); // 기존 선택 초기화
    randomSelectFn(); // 랜덤 선택
  }, 50);
  
  
  const ran = Math.floor(Math.random() * 6 + 5);
  setTimeout(()=>{
    clearInterval(currentInterval);
    randomBtn.disabled = false;
  }, ran * 200);
  
});



// active 클래스 없으면 -> 추가
// active 클래스 있으면 -> 제거

/* 요소.classList.contains(클래스명) : 
    요소에 (클래스명)이 존재하면 true, 아님 false
*/
// if(e.target.classList.contains("active")){
//   e.target.classList.remove("active");
// } else{
//   e.target.classList.add("active");
// }