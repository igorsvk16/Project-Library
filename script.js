const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
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
     const libraryContainer = document.getElementById(`library`);
     libraryContainer.innerHTML = '';
     myLibrary.forEach((book) => {
        const  card = document.createElement('div');
        card.classList.add('book-card');

        const titleEl = document.createElement('h3');
        titleEl.textContent = book.title;

        const authorEl = document.createElement('p');
        authorEl.textContent = `Author: ${book.author}`

        const statusEl = document.createElement('p');
        statusEl.textContent = `Status: ${book.isRead ? 'Read' : 'Not Read'}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.dataset.bookId = book.id;

        card.appendChild(deleteBtn);
        card.appendChild(titleEl);
        card.appendChild(authorEl);
        card.appendChild(statusEl);

        libraryContainer.appendChild(card);
     })
}

window.addEventListener('DOMContentLoaded', () => {
            console.log(
        document.getElementById('newBookBtn'),
        document.getElementById('bookForm'),
        document.getElementById('library')
        );
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
        })
    });






addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 200, false);
addBookToLibrary("1984", "George Orwell", 328, true);

displayLibrary();