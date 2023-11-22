const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const paginationButtons = document.getElementById('paginationButtons');
const tableRows = document.querySelectorAll('table#Tabla tbody tr');

const rowsPerPage = 3; // Cambia este valor según tus necesidades
let currentPage = 1;

function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    tableRows.forEach((row, index) => {
        if (index >= startIndex && index < endIndex) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

function createPaginationButtons() {
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);
    paginationButtons.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        if (i === currentPage) {
            button.classList.add('current');
        }

        button.addEventListener('click', () => {
            currentPage = i;
            showPage(currentPage);

            // Actualiza la clase "current" en los botones
            const buttons = paginationButtons.querySelectorAll('button');
            buttons.forEach((btn) => {
                btn.classList.remove('current');
            });
            button.classList.add('current');
        });

        paginationButtons.appendChild(button);
    }
}

showPage(currentPage);
createPaginationButtons();

nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(tableRows.length / rowsPerPage)) {
        currentPage++;
        showPage(currentPage);
        createPaginationButtons();
    }
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        createPaginationButtons();
    }
});

