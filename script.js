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

