const imageInput = document.getElementById("imageInput");
const imageError = document.getElementById("imageError");
const preview = document.getElementById("preview");

imageInput.addEventListener("change", function () {

    imageError.textContent = "";
    preview.style.display = "none";

    const file = this.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        imageError.textContent = "Only image files are allowed";
        this.value = "";
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        imageError.textContent = "File size must be less than 2 MB";
        this.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };

    reader.readAsDataURL(file);
});