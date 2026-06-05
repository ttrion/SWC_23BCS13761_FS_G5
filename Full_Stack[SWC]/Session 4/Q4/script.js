const categories = {
    Trending: [
        "Movie 1",
        "Movie 2",
        "Movie 3",
        "Movie 4",
        "Movie 5",
        "Movie 6"
    ],
    "Top Rated": [
        "Show 1",
        "Show 2",
        "Show 3",
        "Show 4",
        "Show 5",
        "Show 6"
    ],
    Action: [
        "Action 1",
        "Action 2",
        "Action 3",
        "Action 4",
        "Action 5",
        "Action 6"
    ]
};

const content = document.getElementById("content");

for (const category in categories) {
    const section = document.createElement("section");

    section.innerHTML = `
        <h2>${category}</h2>
        <div class="row">
            ${categories[category]
                .map(
                    item => `
                    <div class="card">
                        <img src="https://picsum.photos/200/300?random=${Math.random()}" alt="${item}">
                        <p>${item}</p>
                    </div>
                `
                )
                .join("")}
        </div>
    `;

    content.appendChild(section);
}