// Do your work here...
console.log('Hello, world!');
console.log("JS berjalan dengan baik");

 let books = [];
      if (localStorage.getItem('books')) {
        books = JSON.parse(localStorage.getItem('books'));
      } else {
        books = [
          {
            id: 123456,
            title: 'Atomic Habits',
            author: 'James Clear',
            year: 2018,
            isComplete: false
          },
          {
            id: 111111,
            title: 'The Tipping Point',
            author: 'Malcolm Gladwell',
            year: 2000,
            isComplete: false
          }
          ,
          {
            id: 789012,
            title: 'Rich Dad Poor Dad',
            author: 'Robert Kiyosaki',
            year: 1997,
            isComplete: true
          },
          {
            id: 222222,
            title: 'Psychology of Money',
            author: 'Morgan Housel',
            year: 2020,
            isComplete: true
          }
        ];
        localStorage.setItem('books', JSON.stringify(books));
      }

      // fungsi untuk menambahkan buku
      document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const titleInput = document.getElementById('bookFormTitle');
        const authorInput = document.getElementById('bookFormAuthor');
        const yearInput = document.getElementById('bookFormYear');
        const isComplete = document.getElementById('bookFormIsComplete').checked;

        // menghasilkan ID buku
        const bookId = new Date().getTime();

        const newBook = {
          id: bookId,
          title: titleInput.value,
          author: authorInput.value,
          year: Number(yearInput.value),
          isComplete: isComplete
        };

        books.push(newBook);
        updateDisplay();
        saveToLocalStorage();
        document.getElementById('bookForm').reset();
      });

      // fungsi untuk menampilkan data buku
      function updateDisplay() {
        const shelf1 = document.getElementById('incompleteBookList');
        const shelf2 = document.getElementById('completeBookList');
        
        shelf1.innerHTML = '';
        shelf2.innerHTML = '';

        books.forEach(function(book) {
          const bookElement = document.createElement('div');
          bookElement.className = 'book-item';
          bookElement.setAttribute('data-bookid', book.id);
          bookElement.setAttribute('data-testid', 'bookItem');
          bookElement.innerHTML = ` 
            <h3 data-testid="bookItemTitle">${book.title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
            <p data-testid="bookItemYear">Tahun: ${book.year}</p>
            `;

            const buttonContainer = document.createElement('div');

            const toggleButton = document.createElement('button');
            toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
            toggleButton.innerText = book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca';
            toggleButton.addEventListener('click', () =>  {
              book.isComplete = !book.isComplete;
              updateDisplay();
              saveToLocalStorage();
            });

            // tombol  hapus
            const deleteButton = document.createElement('button');
            deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
            deleteButton.innerText = 'Hapus Buku';
            deleteButton.addEventListener('click', () => {
              deleteBook(book.id);
            });

            // tombol edit
            const editButton = document.createElement('button');
            editButton.setAttribute('data-testid', 'bookItemEditButton');
            editButton.innerText = 'Edit Buku';
            editButton.addEventListener('click', () => {
              editBook(book.id);
            });

            buttonContainer.appendChild(toggleButton);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.appendChild(editButton);
            bookElement.appendChild(buttonContainer);

          if (book.isComplete) {
            shelf2.appendChild(bookElement);
          }
          else {
            shelf1.appendChild(bookElement);
          }
        });
      }
  

      // fungsi edit buki
        function editBook(id) {
          const book = books.find(b => b.id === id)
          if (!book) return;

          document.getElementById('bookFormTitle').value = book.title;
          document.getElementById('bookFormAuthor').value = book.author;
          document.getElementById('bookFormYear').value = book.year;
          document.getElementById('bookFormIsComplete').checked = book.isComplete;

          deleteBook(id);
        }

      // fungsi untuk pindah buku antara rak
      function moveToIncomplete(id) {
        const book = books.find(b => b.id === id);
        if (book && !book.isComplete) {
          book.isComplete = false;
          updateDisplay();
          saveToLocalStorage();
        }
      }

      function moveToCompleted(id) {
        const book = books.find(b => b.id === id);
        if (book && !book.isComplete) {
          book.isComplete = true;
          updateDisplay();
          saveToLocalStorage();
        }
      }

      // fungsi untuk menghapus buku
      function deleteBook(id) {
        const index = books.findIndex(b => b.id === id);
        books.splice(index, 1);
        
        // update display
        updateDisplay();
        saveToLocalStorage();
      }

      // fungsi untuk menyimpan data ke localStorage
      function saveToLocalStorage() {
        localStorage.setItem('books', JSON.stringify(books));
      }

      
      updateDisplay();
