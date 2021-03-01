//query selector variables
var bodyInput = document.querySelector("#bodyInput");
var ideaCardSection = document.querySelector("#ideaCardSection");
var saveButton = document.querySelector("#saveButton");
var searchBarInput = document.querySelector("#searchBar");
var showAllIdeasButton = document.querySelector("#showAll");
var showStarredButton = document.querySelector("#showStarred");
var titleInput = document.querySelector("#titleInput");
//event listeners
bodyInput.addEventListener("keyup", enableSaveButton);
ideaCardSection.addEventListener("click", deleteIdea);
ideaCardSection.addEventListener("click", favoriteIdea);
ideaCardSection.addEventListener("click", addComment);
saveButton.addEventListener("click", createIdeaCard);
searchBarInput.addEventListener("keyup", displayFilteredIdeas);
showAllIdeasButton.addEventListener("click", displayAllIdeas);
showStarredButton.addEventListener("click", displayStarredIdeas);
titleInput.addEventListener("keyup", enableSaveButton);
window.addEventListener("load", retrieveSavedIdeas);
//global variables
var savedIdeas = [];
// Local Storage Functions

/*
-figure out how to make querySelector / access comment button
-put event listener on the card section
-write function that says if event.target.classlist===comment, 
  then insert HTML textbox into ideabox
-user can type into text box, which will have save comment button
-when user clicks save comment button, create new instance of comment class
- + add comment object instance to this.comments array within idea instance
- update local storage with appropriate comment values
- then comment box will disappear
-comment is then visible on card
-rework to incorporate multiple comments
  */
function saveToStorage() {
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
    saveToStorage();
  }

  renderCards(savedIdeas);
}
//functions
function createIdeaCard() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  savedIdeas.push(newIdea);
  saveToStorage(newIdea);
  renderCards(savedIdeas);
  clearInputs();
}

function renderCards(ideasArray) {
  event.preventDefault();
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
          <input type="image" id="star" class="${starClass}" src="${starSrc}"/>
          <input type="image" id="delete" class="delete" src="assets/icons/delete.svg"/>
        </div>
        <div class="box-body">
          <h2 class="idea-box-title">${ideasArray[i].title}</h2>
          <p class="idea-box-body">${ideasArray[i].body}</p> 
        </div>
        <div class="box-footer">
          <input type="image" id="comment" class="comment" src="assets/icons/comment.svg"/>
          <button id="buttonComment" class="comment">Comment</button>
        </div>
      </article>`
  }
}

function clearInputs() {
  titleInput.value = "";
  bodyInput.value = "";
  saveButton.setAttribute("disabled", true);
}

function enableSaveButton() {
  if (titleInput.value && bodyInput.value) {
    saveButton.removeAttribute("disabled");
  } else {
    saveButton.setAttribute("disabled", true);
  }
}

function deleteIdea(event) {
  for ( var i = 0; i < savedIdeas.length; i++) {
    if (event.target.classList.contains("delete") && (parseInt(event.target.closest(".idea-box").id)  === savedIdeas[i].id)) {
      savedIdeas.splice(i,1);
      saveToStorage();
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
      saveToStorage();
    }
  }
}

function addComment() {
  for (var i = 0; i < savedIdeas.length; i++) {
    if (event.target.classList.contains("comment") 
    && parseInt(event.target.closest(".idea-box").id) === savedIdeas[i].id) {
      var commentArea = document.createElement("textarea")
      event.target.closest("article").appendChild(commentArea);
      // ideaCardSection.appendChild(commentArea);
      saveToStorage();
    }
  }
}

function toggle(element) {
  element.classList.toggle("hidden");
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

function displayFilteredIdeas(event) {
  var filteredIdeas = [];
  var searchString = event.target.value.toLowerCase();
  for (var i = 0; i <savedIdeas.length; i++) {
    var lowerCaseTitle = savedIdeas[i].title.toLowerCase();
    var lowerCaseBody = savedIdeas[i].body.toLowerCase();
      if (lowerCaseTitle.includes(searchString) || lowerCaseBody.includes(searchString)) {
        filteredIdeas.unshift(savedIdeas[i]);
      }
  }

  renderCards(filteredIdeas);
}
