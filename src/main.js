//query selector variables
var saveButton = document.querySelector("#saveButton");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var ideaCardSection = document.querySelector("#ideaCardSection");
//event listeners
bodyInput.addEventListener('input', enableSaveButton);
titleInput.addEventListener('input', enableSaveButton);
saveButton.addEventListener('click', createIdeaCard);
//global variables
var newIdea;
var list = [];
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
          <input type="image" id="star${list[i].id}" class="star hidden" src="assets/icons/star.svg"/>
          <input type="image" id="starActive${list[i].id}" class="star-active" src="assets/icons/star-active.svg"/>
          <input type="image" id="delete${list[i].id}" class="delete" src="assets/icons/delete.svg"/>
          <input type="image" id="deleteActive${list[i].id}" class="delete-active hidden" src="assets/icons/delete-active.svg"/>
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
