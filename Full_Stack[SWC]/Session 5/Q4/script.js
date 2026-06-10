const stories = [
    "Alex",
    "John",
    "Emma",
    "Sophia",
    "Mike",
    "David",
    "Chris"
];

const storiesContainer = document.getElementById("stories");
const feed = document.getElementById("feed");
const loading = document.getElementById("loading");

let postCount = 1;

stories.forEach(name => {

    const story = document.createElement("div");
    story.className = "story";

    story.innerHTML = `
        <div class="story-circle">${name[0]}</div>
        <p>${name}</p>
    `;

    storiesContainer.appendChild(story);
});

function createPost() {

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <img src="https://picsum.photos/500/300?random=${postCount}">
        <div class="post-content">
            <h4>User ${postCount}</h4>
            <p>This is post number ${postCount}</p>
        </div>
    `;

    feed.appendChild(post);

    postCount++;
}

for (let i = 0; i < 5; i++) {
    createPost();
}

window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
    ) {

        loading.style.display = "block";

        setTimeout(() => {

            for (let i = 0; i < 3; i++) {
                createPost();
            }

            loading.style.display = "none";

        }, 1000);
    }
});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode";
    }
});