let answer = generateNumber();
let attempts = [];

// 4자리 랜덤 숫자 생성 (각 자리 숫자는 서로 달라야 함)
function generateNumber() {
    let numbers = [0,1,2,3,4,5,6,7,8,9];
    let result = [];
    
    // 첫 번째 숫자는 0이 될 수 없음
    let firstNum = Math.floor(Math.random() * 9) + 1;
    result.push(firstNum);
    numbers.splice(numbers.indexOf(firstNum), 1);
    
    // 나머지 세 숫자 선택
    for(let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * numbers.length);
        result.push(numbers[index]);
        numbers.splice(index, 1);
    }
    
    return result;
}

function checkNumber() {
    let inputs = document.querySelectorAll('.digit-input');
    let userNumber = Array.from(inputs).map(input => parseInt(input.value));
    
    // 입력값 검증
    if(userNumber.some(num => isNaN(num))) {
        document.getElementById('message').innerHTML = 
            '모든 칸에 숫자를 입력해주세요!';
        return;
    }
    
    // 중복된 숫자 체크
    if(new Set(userNumber).size !== 4) {
        document.getElementById('message').innerHTML = 
            '서로 다른 숫자를 입력해주세요!';
        return;
    }
    
    // 스트라이크와 볼 계산
    let strike = 0;
    let ball = 0;
    
    for(let i = 0; i < 4; i++) {
        if(userNumber[i] === answer[i]) {
            strike++;
        } else if(answer.includes(userNumber[i])) {
            ball++;
        }
    }
    
    // 결과 저장 및 표시
    let result = `${userNumber.join('')}: ${strike}스트라이크 ${ball}볼`;
    if(strike === 4) {
      result = `${userNumber.join('')}: 정답입니다!!!`;
    }

    attempts.push(result);
    
    // 히스토리 업데이트
    updateHistory();
    
    // 결과 메시지 표시
    if(strike === 4) {
        document.getElementById('message').innerHTML = 
            `🎉 정답입니다! ${attempts.length}번 만에 맞추셨네요!`;
        inputs.forEach(input => input.disabled = true);
    } else {
        document.getElementById('message').innerHTML = 
            `${strike}스트라이크 ${ball}볼`;
    }
    
    // 입력창 초기화
    inputs.forEach(input => input.value = '');
    inputs[0].focus();
}

// 자동으로 다음 입력칸으로 이동
function setupInputHandlers() {
    const inputs = document.querySelectorAll('.digit-input');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value.length === 0) {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });
    });

    inputs[inputs.length - 1].addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            checkNumber();
        }
    });
}

function restartGame() {
    answer = generateNumber();
    attempts = [];
    const inputs = document.querySelectorAll('.digit-input');
    document.getElementById('message').innerHTML = '';
    document.getElementById('history').innerHTML = '';
    inputs.forEach(input => {
        input.value = '';
        input.disabled = false;
    });
    inputs[0].focus();
}

function updateHistory() {
  let history = document.getElementById('history');
  history.innerHTML = '<h3>시도 기록</h3>';
  attempts.forEach(attempt => {
      history.innerHTML += `<div class="history-item">${attempt}</div>`;
  });
}

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    setupInputHandlers();
    document.getElementById('checkButton').addEventListener('click', checkNumber);
    document.getElementById('restartButton').addEventListener('click', restartGame);
});
