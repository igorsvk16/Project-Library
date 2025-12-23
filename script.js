const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}
function removeBookById(bookId) {
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

function displayLibrary() {
    const libraryContainer = document.getElementById('library');
    libraryContainer.innerHTML = '';
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('book-card');

        const titleEl = document.createElement('h3');
        titleEl.textContent = book.title;

        const authorEl = document.createElement('p');
        authorEl.textContent = `Author: ${book.author}`;

        const pagesEl = document.createElement('p');
        pagesEl.textContent = `Pages: ${book.pages}`;

        const statusEl = document.createElement('div');
        statusEl.classList.add('status');
        if (!book.isRead) {
            statusEl.classList.add('status--unread');
        }
        statusEl.textContent = book.isRead ? 'Read' : 'Not Read';

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.isRead ? 'Mark as Unread' : 'Mark as Read';
        toggleBtn.classList.add('btn', 'ghost');

        toggleBtn.addEventListener('click', () => {
            book.toggleReadStatus();
            displayLibrary();
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'danger');

        deleteBtn.dataset.bookId = book.id;

        deleteBtn.addEventListener('click', () => {
            const id = deleteBtn.dataset.bookId;
            removeBookById(id);
            displayLibrary();
        });

        const actions = document.createElement('div');
        actions.classList.add('actions');
        actions.appendChild(toggleBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(titleEl);
        card.appendChild(authorEl);
        card.appendChild(pagesEl);
        card.appendChild(statusEl);
        card.appendChild(actions);

        libraryContainer.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const newBookBtn = document.getElementById('newBookBtn');
    const bookForm = document.getElementById('bookForm');

    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    const pagesInput = document.getElementById('pagesInput');
    const isReadInput = document.getElementById('isReadInput');

    newBookBtn.addEventListener('click', () => {
        if (bookForm.style.display == 'block') {
            bookForm.style.display = 'none';
        } else {
            bookForm.style.display = 'block';
        }
    });

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const pages = pagesInput.value;
        const author = authorInput.value;
        const isRead = isReadInput.checked;

        addBookToLibrary(title, author, pages, isRead);

        displayLibrary();

        bookForm.reset();
        bookForm.style.display = 'none';
    });
});

addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 200, false);
addBookToLibrary("1984", "George Orwell", 328, true);

displayLibrary();
