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
          <input type="image"  class="star" src="assets/icons/star.svg"/>
          <input type="image"  class="star hidden" src="assets/icons/star-active.svg"/>
          <input type="image"  class="delete" src="assets/icons/delete.svg"/>
          <input type="image"  class="delete hidden" src="assets/icons/delete-active.svg"/>
        </div>
        <div class="box-body">
          <h2 class="idea-box-title">${list[i].title}</h2>
          <p class="idea-box-body">${list[i].body}</p>
        </div>
        <div class="box-footer">
          <input type="image" class="comment-button" src="assets/icons/comment.svg"/>
          <button class="comment">Comment</button>
        </div>
      </article>`
  }
}

function changeStarColor(event) {
  if (event.target.classList.contains("star")) {
    target.
  }
}
// function checkForStar() {
//   if
// }

function deleteIdea(event) {
  console.log(event.target.id);
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
// function makeFavorite() {
//
//       favoriteList.push(list[i]);
//   }
//
//   }
// }


// function deleteCard() {
//   var shortId = event.target.id.substring(0, 13);
//   for (var i = 0; i < list.length; i++) {
//     if (shortId === list[i].id && event.target.className === "delete") {
//       list.splice(i, 1);
//     }

//   }
// }
