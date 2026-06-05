const storiesContainer = document.getElementById("stories");
const feed = document.getElementById("feed");
const loader = document.getElementById("loader");
const themeBtn = document.getElementById("themeBtn");

let page = 1;
let loading = false;

const stories = [
    "Alex",
    "Sarah",
    "John",
    "Emma",
    "Mike",
    "Olivia",
    "James",
    "Sophia"
];

stories.forEach(name => {
    const story = document.createElement("div");
    story.className = "story";

    story.innerHTML = `
        <div class="story-circle"></div>
        <p>${name}</p>
    `;

    storiesContainer.appendChild(story);
});

function loadPosts() {
    if (loading) return;

    loading = true;
    loader.classList.remove("hidden");

    setTimeout(() => {
        for (let i = 1; i <= 5; i++) {
            const post = document.createElement("div");
            post.className = "post";

            post.innerHTML = `
                <h3>User ${((page - 1) * 5) + i}</h3>
                <img src="https://picsum.photos/500/300?random=${Math.random()}">
                <p>Sample Instagram post description.</p>
            `;

            feed.appendChild(post);
        }

        page++;
        loading = false;
        loader.classList.add("hidden");
    }, 1000);
}

window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
    ) {
        loadPosts();
    }
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀️ Light Mode"
            : "🌙 Dark Mode";
});

loadPosts();