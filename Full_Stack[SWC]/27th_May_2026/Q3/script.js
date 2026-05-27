let images = [
  "https://picsum.photos/id/1015/500/300",
  "https://picsum.photos/id/1025/500/300",
  "https://picsum.photos/id/1035/500/300"
];

let index = 0;

let slider = document.getElementById("slider");

function showImage() {
  slider.src = images[index];
}

function nextImage() {
  index++;

  if (index >= images.length) {
    index = 0;
  }

  showImage();
}

function prevImage() {
  index--;

  if (index < 0) {
    index = images.length - 1;
  }

  showImage();
}

let autoSlide = setInterval(nextImage, 3000);

slider.addEventListener("mouseenter", function () {
  clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", function () {
  autoSlide = setInterval(nextImage, 3000);
});