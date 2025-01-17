let users = [];

// DOM이 로드된 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#registerBtn').addEventListener('click', registerUser);
    document.querySelector('#deleteBtn').addEventListener('click', deleteSelected);
    document.querySelector('#selectAll').addEventListener('click', toggleAll);
});

function registerUser() {
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;
    const userPhone = document.getElementById('userPhone').value;

    // 입력값 검증
    if (!userId || !userName || !userPhone) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    // 아이디 중복 검사
    let isIdDuplicate = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userId) {
            isIdDuplicate = true;
            break;
        }
    }
    if (isIdDuplicate) {
        alert('이미 존재하는 아이디입니다.');
        return;
    }

    // 전화번호 중복 검사
    let isPhoneDuplicate = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].phone === userPhone) {
            isPhoneDuplicate = true;
            break;
        }
    }
    if (isPhoneDuplicate) {
        alert('이미 등록된 전화번호입니다.');
        return;
    }

    // 새 사용자 추가
    users.push({
        id: userId,
        name: userName,
        phone: userPhone
    });

    // 테이블에 사용자 추가
    updateTable();

    // 입력 필드 초기화
    clearInputs();
}

function updateTable() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="user-checkbox" data-index="${index}"></td>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
        `;
        tableBody.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById('userId').value = '';
    document.getElementById('userName').value = '';
    document.getElementById('userPhone').value = '';
}

function deleteSelected() {
    const checkboxes = document.getElementsByClassName('user-checkbox');
    const indicesToDelete = [];
    
    // 삭제할 인덱스들을 수집
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            indicesToDelete.push(parseInt(checkboxes[i].getAttribute('data-index')));
        }
    }
    
    // 선택된 항목이 없는 경우
    if (indicesToDelete.length === 0) {
        alert('삭제할 항목을 선택해주세요.');
        return;
    }
    
    // 배열에서 해당 인덱스들의 항목을 제거
    indicesToDelete.sort((a, b) => b - a).forEach(index => {
        users.splice(index, 1);
    });
    
    // 테이블 업데이트
    updateTable();
    document.getElementById('selectAll').checked = false;
}

function toggleAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.getElementsByClassName('user-checkbox');
    
    for (let checkbox of checkboxes) {
        checkbox.checked = selectAllCheckbox.checked;
    }
}
