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
