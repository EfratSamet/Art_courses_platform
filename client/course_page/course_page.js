document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.querySelector('.rating-message');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const selectedValue = star.getAttribute('data-value');

            // הסר את הבחירה מכוכבים אחרים
            stars.forEach(s => s.classList.remove('selected'));
            // סמן את הכוכבים שנבחרו
            for (let i = 0; i < selectedValue; i++) {
                stars[i].classList.add('selected');
            }
        });
    });

    document.querySelector('.submit-rating').addEventListener('click', () => {
        const selectedStar = document.querySelector('.star.selected');
        if (selectedStar) {
            const rating = selectedStar.getAttribute('data-value');
            ratingMessage.innerText = `תודה על הדירוג שלך: ${rating} כוכבים!`;
        } else {
            ratingMessage.innerText = 'אנא בחר דירוג לפני שליחת.';
        }
    });
});
