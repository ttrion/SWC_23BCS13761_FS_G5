const searchInput =
    document.getElementById("searchInput");

const suggestionsBox =
    document.getElementById("suggestions");

const trendingList =
    document.getElementById("trendingList");

const suggestions = [
    "JavaScript Tutorial",
    "React JS",
    "Redux Toolkit",
    "Netflix Clone",
    "Amazon Clone",
    "Google Search",
    "Weather Today",
    "IPL Schedule",
    "Cricket World Cup",
    "Programming Jobs",
    "Frontend Developer",
    "Machine Learning",
    "Web Development",
    "Node JS",
    "Python Tutorial"
];

const trendingSearches = [
    "IPL 2026",
    "AI Tools",
    "React Interview Questions",
    "Netflix New Releases",
    "JavaScript Projects"
];

function displayTrending() {

    trendingList.innerHTML = "";

    trendingSearches.forEach(item => {

        const li =
            document.createElement("li");

        li.textContent = item;

        trendingList.appendChild(li);
    });
}

function showSuggestions(value) {

    suggestionsBox.innerHTML = "";

    if (value.trim() === "") {

        suggestionsBox.style.display =
            "none";

        return;
    }

    const filtered =
        suggestions.filter(item =>
            item
                .toLowerCase()
                .includes(
                    value.toLowerCase()
                )
        );

    filtered.forEach(item => {

        const div =
            document.createElement("div");

        div.classList.add(
            "suggestion-item"
        );

        div.textContent = item;

        div.addEventListener(
            "click",
            () => {

                searchInput.value =
                    item;

                suggestionsBox.style.display =
                    "none";
            }
        );

        suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display =
        filtered.length
            ? "block"
            : "none";
}

searchInput.addEventListener(
    "input",
    e => {

        showSuggestions(
            e.target.value
        );
    }
);

document.addEventListener(
    "click",
    e => {

        if (
            !searchInput.contains(
                e.target
            ) &&
            !suggestionsBox.contains(
                e.target
            )
        ) {

            suggestionsBox.style.display =
                "none";
        }
    }
);

displayTrending();