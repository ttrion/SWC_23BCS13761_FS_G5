const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const error = document.getElementById("error");

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    error.textContent = "";
    preview.classList.add("hidden");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        error.textContent = "Please select a valid image file.";
        imageInput.value = "";
        return;
    }

    if (file.size > MAX_SIZE) {
        error.textContent = "Image size must be less than 2MB.";
        imageInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        preview.src = e.target.result;
        preview.classList.remove("hidden");
    };

    reader.readAsDataURL(file);
});