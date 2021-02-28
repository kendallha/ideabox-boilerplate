//query selector variables
var saveButton = document.querySelector("#saveButton");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var ideaCardSection = document.querySelector("#ideaCardSection");
var showStarredButton = document.querySelector("#showStarred");
var showAllIdeasButton = document.querySelector("#showAll");
var searchBarInput = 
//event listeners
bodyInput.addEventListener('input', enableSaveButton);
titleInput.addEventListener('input', enableSaveButton);
saveButton.addEventListener('click', createIdeaCard);
ideaCardSection.addEventListener('click', deleteIdea);
ideaCardSection.addEventListener('click', favoriteIdea);
showStarredButton.addEventListener('click', displayStarredIdeas);
showAllIdeasButton.addEventListener('click', displayAllIdeas);
window.addEventListener('load', retrieveSavedIdeas);
//global variables
var newIdea;
var savedIdeas = [];
var starredIdeas = [];
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
  renderCards(savedIdeas);
}
//functions
function createIdeaCard() {
  newIdea = new Idea(titleInput.value, bodyInput.value);
  saveToStorage(newIdea);
  renderCards(savedIdeas);
  clearInputs();
}

function renderCards(ideasArray) {
  event.preventDefault();
  console.log(ideasArray);
  ideaCardSection.innerHTML = "";
  for (var i = 0; i < ideasArray.length; i++) {
    if (ideasArray[i].star) {
      var starClass = "star-active";
      var starSrc = "assets/icons/star-active.svg";
    } else {
      var starClass = "star";
      var starSrc = "assets/icons/star.svg";
    }
    ideaCardSection.innerHTML +=
      `<article id=${ideasArray[i].id} class="idea-box">
        <div class="box-header">
          <input type="image" id="${ideasArray[i].id}star" class="${starClass}" src="${starSrc}"/>
          <input type="image" id="${ideasArray[i].id}delete" class="delete" src="assets/icons/delete.svg"/>
          <input type="image" id="${ideasArray[i].id}deleteActive" class="delete hidden" src="assets/icons/delete-active.svg"/>
        </div>
        <div class="box-body">
          <h2 class="idea-box-title">${ideasArray[i].title}</h2>
          <p class="idea-box-body">${ideasArray[i].body}</p>
        </div>
        <div class="box-footer">
          <input type="image" id="comment${ideasArray[i].id}" class="comment-button" src="assets/icons/comment.svg"/>
          <button id="buttonComment${ideasArray[i].id}" class="comment">Comment</button>
        </div>
      </article>`
  }
}

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.setAttribute('disabled', true);
}

function enableSaveButton() {
  if (titleInput.value && bodyInput.value) {
    saveButton.removeAttribute('disabled');
  }
}

function deleteIdea(event) {
  for ( var i = 0; i < savedIdeas.length; i++) {
    if (event.target.classList.contains("delete") && (parseInt(event.target.closest(".idea-box").id)  === savedIdeas[i].id)) {
      savedIdeas.splice(i,1);
      updateStorage();
      renderCards(savedIdeas);
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

function toggle(element) {
  element.classList.toggle('hidden');
}

function displayStarredIdeas() {
  starredIdeas = [];
  for (var i = 0; i < savedIdeas.length; i++) {
    if (savedIdeas[i].star) {
      starredIdeas.unshift(savedIdeas[i]);
    }
  }
  renderCards(starredIdeas);
  toggle(showAllIdeasButton);
  toggle(showStarredButton);
}

function displayAllIdeas() {
  renderCards(savedIdeas);
  toggle(showAllIdeasButton);
  toggle(showStarredButton);
}

//create query selector variable for search input box
//add event listener to this variable for keyup
//write function for filtering cards shown
// declare new variable filteredIdeas = [];
// declare new variable searchString = event.target.value
// iterate through savedIdeas array
// for each iteration, evaluate if savedIdeas[i].includes(searchString)
// if it does include the searchString, push [i] to filteredIdeas array
// invoke renderCards(filteredIdeas)
