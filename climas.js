document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", function() {
            this.classList.toggle("active");
            const cardDetails = this.querySelector(".card-details");

            if (this.classList.contains("active")) {
                cardDetails.style.maxHeight = cardDetails.scrollHeight + "px";
                cardDetails.style.padding = "20px 25px";
            } else {
                cardDetails.style.maxHeight = "0";
                cardDetails.style.padding = "0 25px";
            }
        });
    });
});
