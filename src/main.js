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
window.addEventListener('load', retrieveSavedIdeas);
//global variables
var newIdea;
var savedIdeas = [];
// Local Storage Functions
function saveToStorage(idea) {
    savedIdeas.push(idea);
    var savedIdeasString = JSON.stringify(savedIdeas);
    localStorage.setItem("savedIdeas", savedIdeasString);
  }

function updateStorage() {
    var savedIdeasString = JSON.stringify(savedIdeas);
    localStorage.setItem("savedIdeas", savedIdeasString);
  }
//functions
function retrieveSavedIdeas() {
  var savedIdeaString = localStorage.getItem("savedIdeas");
  var parsedIdeaArray = JSON.parse(savedIdeaString) || [];
  instantiateSavedIdeas(parsedIdeaArray);
}

function instantiateSavedIdeas(ideas) {
  for (var i = 0; i < ideas.length; i++) {
    ideas[i] = new Idea(ideas[i].title, ideas[i].body, ideas[i].star, ideas[i].id);
    savedIdeas = ideas;
    updateStorage();
  };
  renderCards();
}

function enableSaveButton() {
  if (titleInput.value && bodyInput.value) {
    saveButton.removeAttribute('disabled');
  }
}

function createIdeaCard() {
  newIdea = new Idea(titleInput.value, bodyInput.value);
  saveToStorage(newIdea);
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
  console.log(savedIdeas);
  ideaCardSection.innerHTML = "";
  for (var i =0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star) {
      var starClass = "star-active";
      var starSrc = "assets/icons/star-active.svg";
    } else {
      var starClass = "star";
      var starSrc = "assets/icons/star.svg";
    }
    ideaCardSection.innerHTML +=
    `<article id=${savedIdeas[i].id} class="idea-box">
        <div class="box-header">
          <input type="image" id="${savedIdeas[i].id}star" class="${starClass}" src="${starSrc}"/>
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
        savedIdeas.splice(i,1);
        updateStorage();
        renderCards();
      }
    }
  }

function favoriteIdea() {
  updateStarStatus(event);
  changeStarColor(event);
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
    if ((event.target.classList.contains("star") || event.target.classList.contains("star-active")) 
       && (parseInt(event.target.closest(".idea-box").id)  === savedIdeas[i].id)) 
    {
      savedIdeas[i].updateIdea();
      console.log(savedIdeas[i]);
      updateStorage();
    }
  }
}