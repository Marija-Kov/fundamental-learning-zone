const test = (title, callback) => {
  console.log(` 🔹 ${title} 🔹 `);
  callback();
};

/*
 Example of stack implementation:
*/
(() => {
  class TextEditor {
    constructor() {
      this.text = [];
      this.undone = [];
    }
    write(text) {
      this.text.push(text);
    }
    undo() {
      this.undone.push(this.text[this.text.length - 1]);
      this.text.pop();
    }
    redo() {
      this.text.push(this.undone[this.undone.length - 1]);
      this.undone.pop();
    }
  }

  test("Text editor writes", () => {
    const textEditor = new TextEditor();
    textEditor.write("hello poozh");
    if (textEditor.text.join(" ") === "hello poozh") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Text editor undos", () => {
    const textEditor = new TextEditor();
    textEditor.write("hello poozh");
    textEditor.write("hi");
    textEditor.undo();
    if (
      textEditor.text.join(" ") === "hello poozh" &&
      textEditor.undone.join(" ") === "hi"
    ) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Text editor redos", () => {
    const textEditor = new TextEditor();
    textEditor.write("hello poozh");
    textEditor.write("hi");
    textEditor.undo();
    textEditor.redo();
    if (
      textEditor.text.join(" ") === "hello poozh hi" &&
      textEditor.undone.join(" ") === ""
    ) {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();

/*
 Example of queue implementation:
*/
(() => {
  class Printer {
    constructor() {
      this.queue = [];
    }
    addToQueue(document) {
      this.queue.push(document);
    }
    removeFromQueue(document) {
      let len = this.queue.length;
      let updatedQueue = [];
      for (let i = 0; i < len; ++i) {
        if (this.queue[i] !== document) {
          updatedQueue.push(this.queue[i]);
        }
      }
      if (updatedQueue.length === len) {
        console.log(`${document} not found`);
      } else {
        this.queue = updatedQueue;
      }
    }
    getQueue() {
      return this.queue.join(";");
    }
    print() {
      let len = this.queue.length;
      for (let i = 0; i < len; ++i) {
        this.queue.shift();
      }
    }
  }

  test("Printer adds to queue", () => {
    const hp3 = new Printer();
    hp3.addToQueue("birth certificate");
    hp3.addToQueue("marriage certificate");
    if (hp3.getQueue() === "birth certificate;marriage certificate") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Printer removes from queue", () => {
    const hp3 = new Printer();
    hp3.addToQueue("birth certificate");
    hp3.addToQueue("marriage certificate");
    hp3.removeFromQueue("marriage certificate");
    if (hp3.getQueue() === "birth certificate") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });

  test("Printer prints", () => {
    const hp3 = new Printer();
    hp3.addToQueue("birth certificate");
    hp3.addToQueue("marriage certificate");
    hp3.print();
    if (hp3.getQueue() === "") {
      console.log("✅ As expected");
    } else {
      console.log("❌ Not as expected");
    }
  });
})();
