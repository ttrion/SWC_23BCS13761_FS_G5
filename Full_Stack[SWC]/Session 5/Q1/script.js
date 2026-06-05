const itemsPerPage = 10;
let currentPage = 1;

const items = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`
}));

const itemList = document.getElementById("itemList");
const pagination = document.getElementById("pagination");

function renderItems() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentItems = items.slice(start, end);

    itemList.innerHTML = currentItems
        .map(
            item => `
            <div class="card">
                ${item.name}
            </div>
        `
        )
        .join("");
}

function renderPagination() {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    let html = `
        <button
            ${currentPage === 1 ? "disabled" : ""}
            onclick="changePage(${currentPage - 1})"
        >
            Previous
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button
                class="${currentPage === i ? "active" : ""}"
                onclick="changePage(${i})"
            >
                ${i}
            </button>
        `;
    }

    html += `
        <button
            ${currentPage === totalPages ? "disabled" : ""}
            onclick="changePage(${currentPage + 1})"
        >
            Next
        </button>
    `;

    pagination.innerHTML = html;
}

function changePage(page) {
    const totalPages = Math.ceil(items.length / itemsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;

    renderItems();
    renderPagination();
}

renderItems();
renderPagination();