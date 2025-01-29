document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.querySelector(".btn-yes");
    const noButton = document.querySelector(".btn-no");
    const title = document.querySelector("h1");

    yesButton.addEventListener("click", () => {
        title.textContent = "Сосал?";
        noButton.remove();
    });
});