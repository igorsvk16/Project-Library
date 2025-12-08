const myLibrary = [];

function Book(title, author, isRead, id) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, isRead) {
    const newBook = new Book(title, author, isRead);
    myLibrary.push(newBook);
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

        card.appendChild(titleEl);
        card.appendChild(authorEl);
        card.appendChild(statusEl);

        libraryContainer.appendChild(card);
     })
}
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", false);
addBookToLibrary("1984", "George Orwell", true);

displayLibrary();