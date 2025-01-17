document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const historyList = document.getElementById('historyList');
    let searchHistory = [];

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // 검색어를 배열 맨 앞에 추가
                searchHistory.unshift(searchTerm);
                
                // 최대 5개까지만 유지
                if (searchHistory.length > 5) {
                    searchHistory.pop();
                }
                
                // 검색 기록 업데이트
                updateHistoryDisplay();
                
                // 입력창 초기화
                searchInput.value = '';
            }
        }
    });

    function updateHistoryDisplay() {
        historyList.innerHTML = '';
        searchHistory.forEach(term => {
            const li = document.createElement('li');
            li.textContent = term;
            historyList.appendChild(li);
        });
    }
});
