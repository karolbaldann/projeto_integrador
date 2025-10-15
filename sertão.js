document.addEventListener("DOMContentLoaded", function() {
    const topicHeaders = document.querySelectorAll(".topic-header");

    topicHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const topicContainer = this.closest(".topic-container");
            const topicContent = topicContainer.querySelector(".topic-content");
            const toggleIcon = this.querySelector(".toggle-icon");

            topicContainer.classList.toggle("active");

            if (topicContainer.classList.contains("active")) {
                topicContent.style.maxHeight = topicContent.scrollHeight + "px";
                topicContent.style.padding = "1.5rem 2rem";
                toggleIcon.style.transform = "rotate(45deg)";
                toggleIcon.style.color = "#dc3545";
            } else {
                topicContent.style.maxHeight = "0";
                topicContent.style.padding = "0 2rem";
                toggleIcon.style.transform = "rotate(0deg)";
                toggleIcon.style.color = "#007BFF";
            }
        });
    });
});

