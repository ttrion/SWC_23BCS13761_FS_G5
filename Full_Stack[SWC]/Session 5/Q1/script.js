const items = [];

for (let i = 1; i <= 50; i++) {
    items.push("Product " + i);
}

const itemsPerPage = 10;
let currentPage = 1;

const itemList = document.getElementById("itemList");
const pagination = document.getElementById("pagination");

function displayItems(page) {
    itemList.innerHTML = "";

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = items.slice(start, end);

    pageItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        itemList.appendChild(li);
    });
}

function setupPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;

    prevBtn.addEventListener("click", () => {
        currentPage--;
        updatePage();
    });

    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;

        if (i === currentPage) {
            pageBtn.classList.add("active");
        }

        pageBtn.addEventListener("click", () => {
            currentPage = i;
            updatePage();
        });

        pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;

    nextBtn.addEventListener("click", () => {
        currentPage++;
        updatePage();
    });

    pagination.appendChild(nextBtn);
}

function updatePage() {
    displayItems(currentPage);
    setupPagination();
}

updatePage();