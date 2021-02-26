//query selector variables
var saveButton = document.querySelector("#saveButton");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var ideaCardSection = document.querySelector("#ideaCardSection");

//event listeners
bodyInput.addEventListener('input', enableSaveButton);
titleInput.addEventListener('input', enableSaveButton);
saveButton.addEventListener('click', createIdeaCard);
ideaCardSection.addEventListener('click', deleteIdea);
ideaCardSection.addEventListener('click', favoriteIdea);
//global variables
var newIdea;
var list = [];
var favoriteList = [];
//functions
function enableSaveButton() {
  if (titleInput.value && bodyInput.value) {
    saveButton.removeAttribute('disabled');
  }
}

function createIdeaCard() {
  newIdea = new Idea(titleInput.value, bodyInput.value);
  list.push(newIdea);
  renderCards();
  clearInputs();
}

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.setAttribute('disabled',true);
}

function renderCards() {
  event.preventDefault();
  ideaCardSection.innerHTML = "";
  for (var i =0; i < list.length; i++) {
    ideaCardSection.innerHTML +=
    `<article id=${list[i].id} class="idea-box">
        <div class="box-header">
          <input type="image" id="${list[i].id}star" class="star" src="assets/icons/star.svg"/>
          <input type="image" id="${list[i].id}delete" class="delete" src="assets/icons/delete.svg"/>
          <input type="image" id="${list[i].id}deleteActive" class="delete hidden" src="assets/icons/delete-active.svg"/>
        </div>
        <div class="box-body">
          <h2 class="idea-box-title">${list[i].title}</h2>
          <p class="idea-box-body">${list[i].body}</p>
        </div>
        <div class="box-footer">
          <input type="image" id="comment${list[i].id}" class="comment-button" src="assets/icons/comment.svg"/>
          <button id="buttonComment${list[i].id}" class="comment">Comment</button>
        </div>
      </article>`
  }
}

function deleteIdea(event) {
  var shortId = parseInt(event.target.id.replace(/[^0-9]/g,""));
  if (event.target.classList.contains("delete")) {
    for ( var i = 0; i < list.length; i++) {
      if (shortId === list[i].id) {
        list.splice(i,1);
        renderCards();
      }
    }
  }
}

function favoriteIdea() {
  changeStarColor(event);
  updateStarStatus(event);
}

function changeStarColor() {
  var star = event.target.closest("input");
  if (event.target.classList.contains("star")) {
    star.src = "assets/icons/star-active.svg";
    star.className = "star-active";
} else if (event.target.classList.contains("star-active")) {
    star.src = "assets/icons/star.svg";
    star.className = "star";
  }
}

function updateStarStatus() {
  var shortId = parseInt(event.target.id.replace(/[^0-9]/g,""));
  for (var i = 0; i < list.length; i++) {
    if (shortId === list[i].id) {
      list[i].updateIdea();
    }
  }
}






// }
