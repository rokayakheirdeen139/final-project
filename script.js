var addButton = document.querySelector(".add-btn");
var bookmarksContainer = document.querySelector(".bookmarks-container");
var titleInput = document.querySelector(".title-input");
var urlInput = document.querySelector(".url-input");
var modeToggle = document.querySelector(".mode-toggle");
var listViewBtn = document.querySelector(".list-view");
var cardViewBtn = document.querySelector(".card-view");

var bookmarks = [];
modeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

function isValidURL(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}


cardViewBtn.addEventListener("click", function() {
  bookmarksContainer.classList.add("card");
  bookmarksContainer.classList.remove("list");
});

addButton.addEventListener("click", function(event) {
  event.preventDefault();

  var title = titleInput.value.trim();
  var url = urlInput.value.trim();

  if (title === "" || !isValidURL(url)) {
    alert("Please enter a valid title and URL (starting with http:// or https://).");
    return;
  }

  var newBookmark = {
    id: bookmarks.length + 1,
    title: title,
    url: url
  };

  bookmarks.push(newBookmark);

  bookmarksContainer.innerHTML += `
    <div class="bookmark-item">
      <h3 class="bookmark-title">${newBookmark.title}</h3>
      <div class="actions">
        <a href="${newBookmark.url}" target="_blank">Open</a>
        <button class="fav-btn">★</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `;

  titleInput.value = "";
  urlInput.value = "";

  addEventListenersToExistingBookmarks();
});

function addEventListenersToExistingBookmarks() {
  var favButtons = document.querySelectorAll(".fav-btn");
  var deleteButtons = document.querySelectorAll(".delete-btn");

  for (var i = 0; i < favButtons.length; i++) {
    favButtons[i].addEventListener("click", function () {
      var card = this.closest(".bookmark-item");
      if (card) {
        card.classList.toggle("favorite");
      }
    });
  }

  for (var j = 0; j < deleteButtons.length; j++) {
    deleteButtons[j].addEventListener("click", function () {
      var card = this.closest(".bookmark-item");
      if (card && card.parentElement) {
        var index = Array.from(bookmarksContainer.children).indexOf(card);
        bookmarks.splice(index, 1);
        card.parentElement.removeChild(card);
      }
    });
  }
}

function loadBookmarks() {
  for (var i = 0; i < bookmarks.length; i++) {
    var bookmark = bookmarks[i];
    bookmarksContainer.innerHTML += `
      <div class="bookmark-item">
        <h3 class="bookmark-title">${bookmark.title}</h3>
        <div class="actions">
          <a href="${bookmark.url}" target="_blank">Open</a>
          <button class="fav-btn">★</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `;
  }
}

addEventListenersToExistingBookmarks();
