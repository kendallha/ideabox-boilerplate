//query selector variables
var saveButton = document.querySelector("#saveButton");
var titleInput = document.querySelector("#titleInput");
var bodyInput = document.querySelector("#bodyInput");
var ideaCardSection = document.querySelector("#ideaCardSection");
//event listeners

saveButton.addEventListener('mouseover', enableSave);
saveButton.addEventListener('click', createIdeaCard);
//{
  // event.preventDefault();
// });
//global variables
var newIdea;
var list = [];
//functions
function enableSave() {
  if (!titleInput.value && !bodyInput.value) {
    saveButton.disabled = true;
    console.log(saveButton.disabled);
  } else {
    saveButton.disabled = false;
    console.log(saveButton.disabled);
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
}

function renderCards() {
  event.preventDefault();
  ideaCardSection.innerHTML = "";
  console.log()
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
//Iteration 2 pseudo code:
// - save button should be greyed out until there is an input in the
// title and body
// - when title and body have input and save button is clicked:
// - new object instance of idea class is created
// - new card is created using newIdea object
// - title and body inputs go back to blank
// - page does not reload
