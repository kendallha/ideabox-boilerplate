class Idea {
  constructor(title, body, star, id) {
    this.title = title;
    this.body = body;
    this.star = star || false;
    this.id = id || Date.now();
  }

  updateIdea() {
    if (this.star) {
      this.star = false;
    } else {
      this.star = true
    }
  }
}

// An idea.js file that contains an Idea class.
// Idea methods must include, but are not limited to:
// constructor
// saveToStorage (should only have one job which is to save the instance to storage)
// deleteFromStorage
// updateIdea (should be able to update the idea’s title, body, or starred state)
// A main.js file that contains all DOM related JavaScript.
// Note The idea.js file must be the first script in your HTML so that your main.js file has access to your Idea class.
//
// Data Model
// An idea has an id, title, body, and star.
// The id should be a unique identifier. (Note: generating a random number does not guarantee it will be unique)
// title and body are strings.
// star is a boolean.
