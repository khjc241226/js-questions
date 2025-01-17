document.querySelectorAll('input[type="radio"]').forEach((radio, index) => {
    radio.addEventListener('change', () => {
        // 모든 이미지 숨기기
        document.querySelectorAll('.image-container img').forEach(img => {
            img.classList.remove('active');
        });
        
        // 선택된 이미지만 보이기
        document.querySelectorAll('.image-container img')[index].classList.add('active');
    });
});
