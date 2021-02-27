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
// window.addEventListener('load', displayLocalIdeas);
//global variables
var newIdea;
var savedIdeas = [];
var favoriteList = [];
//functions
function enableSaveButton() {
  if (titleInput.value && bodyInput.value) {
    saveButton.removeAttribute('disabled');
  }
}

function createIdeaCard() {
  newIdea = new Idea(titleInput.value, bodyInput.value);
  // savedIdeas.push(newIdea);
  newIdea.saveToStorage();
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
  for (var i =0; i < savedIdeas.length; i++) {
    ideaCardSection.innerHTML +=
    `<article id=${savedIdeas[i].id} class="idea-box">
        <div class="box-header">
          <input type="image" id="${savedIdeas[i].id}star" class="star" src="assets/icons/star.svg"/>
          <input type="image" id="${savedIdeas[i].id}delete" class="delete" src="assets/icons/delete.svg"/>
          <input type="image" id="${savedIdeas[i].id}deleteActive" class="delete hidden" src="assets/icons/delete-active.svg"/>
        </div>
        <div class="box-body">
          <h2 class="idea-box-title">${savedIdeas[i].title}</h2>
          <p class="idea-box-body">${savedIdeas[i].body}</p>
        </div>
        <div class="box-footer">
          <input type="image" id="comment${savedIdeas[i].id}" class="comment-button" src="assets/icons/comment.svg"/>
          <button id="buttonComment${savedIdeas[i].id}" class="comment">Comment</button>
        </div>
      </article>`
  }
}

function deleteIdea(event) {
    for ( var i = 0; i < savedIdeas.length; i++) {
      if (event.target.classList.contains("delete") && (parseInt(event.target.closest(".idea-box").id)  === savedIdeas[i].id)) {
        // savedIdeas[i].deleteFromStorage();
        savedIdeas.splice(i,1);
        newIdea.updateStorage();
        renderCards();
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
  for (var i = 0; i < savedIdeas.length; i++) {
    if ((event.target.classList.contains("star") || event.target.classList.contains("star-active")) && (parseInt(event.target.closest(".idea-box").id)  === savedIdeas[i].id)) {
      savedIdeas[i].updateIdea();
      console.log(savedIdeas[i]);
      savedIdeas[i].saveToStorage();
    }
  }
}


/*
-create getItemFromLocalStorage() method
-JSON.parse to turn each item into storable data
-after parsing each item, we want to push into array (parameter within method we write - written as savedPosters)
-repeat this for every key value in localStorage
-run renderPage to display all locally stored ideas
*/