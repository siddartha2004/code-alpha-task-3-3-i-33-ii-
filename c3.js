document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const bookList = document.getElementById('book-list');
    const borrowingHistory = document.getElementById('borrowing-history');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        fetchBooks(query);
    });

    function fetchBooks(query) {
        fetch(`/api/books?search=${query}`)
            .then(response => response.json())
            .then(data => {
                bookList.innerHTML = '';
                data.books.forEach(book => {
                    const bookItem = document.createElement('div');
                    bookItem.className = 'book-item';
                    bookItem.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;
                    bookList.appendChild(bookItem);
                });
            });
    }

    function fetchBorrowingHistory() {
        fetch('/api/borrowings')
            .then(response => response.json())
            .then(data => {
                borrowingHistory.innerHTML = '';
                data.history.forEach(entry => {
                    const historyItem = document.createElement('div');
                    historyItem.className = 'history-item';
                    historyItem.innerHTML = `<strong>${entry.title}</strong> borrowed on ${entry.date}`;
                    borrowingHistory.appendChild(historyItem);
                });
            });
    }

    fetchBorrowingHistory();
});
