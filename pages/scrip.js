document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os cabeçalhos dos tópicos
    const topicHeaders = document.querySelectorAll(".topic-header");

    topicHeaders.forEach(header => {
        header.addEventListener("click", () => {
            // Adiciona ou remove a classe 'active' no cabeçalho clicado
            header.classList.toggle("active");

            // Seleciona o ícone e o conteúdo associado ao cabeçalho
            const icon = header.querySelector(".toggle-icon");
            const content = header.nextElementSibling;

            // Verifica se o cabeçalho está ativo para mostrar ou esconder o conteúdo
            if (header.classList.contains("active")) {
                // Mostra o conteúdo
                icon.textContent = "−"; // Muda o ícone para "-"
                // Define a altura máxima igual à altura total do conteúdo para uma transição suave
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.padding = "1.5rem"; // Adiciona o padding de volta
            } else {
                // Esconde o conteúdo
                icon.textContent = "+"; // Muda o ícone de volta para "+"
                content.style.maxHeight = null; // Remove a altura máxima
                content.style.padding = "0 1.5rem"; // Remove o padding vertical
            }
        });
    });
});