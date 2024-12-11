const bookForm = document.querySelector("#book-form");

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let isbn = document.querySelector("#isbn").value;

  if (!title || !author || !isbn) {
    alert("please fill the input fields");
    return;
  }

  const initializeUiBook = new bookUi();
  initializeUiBook.addBook(title, author, isbn);

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
});

tbody.addEventListener("click", function (event) {
  event.preventDefault();
  const currentElement = event.target;

  if ((currentElement.className = "delete" && confirm("Are you sure ?"))) {
    const initializeUiBook = new bookUi();
    initializeUiBook.removeBook(currentElement);
  }
});
