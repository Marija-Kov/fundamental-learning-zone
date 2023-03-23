// example of stack implementation 

class TextEditor {
    constructor(){
     this.text = [];
     this.undone = [];
    }
    write(text){
      this.text.push(text)
      console.log(this.text.join(" "))
    }
    undo(){
     this.undone.push(this.text[this.text.length-1]);   
     this.text.pop();
     console.log(this.text.join(" "));
    }
    redo(){
     this.text.push(this.undone[this.undone.length-1]);
     this.undone.pop()
     console.log(this.text.join(" "));
    }

}

// let textEditor = new TextEditor();
// textEditor.write("hello poozh")
// textEditor.write("i hope you're well");
// textEditor.write("kisses");
// textEditor.undo()
// textEditor.redo();
// textEditor.undo();
// textEditor.write("i kiss u");

// example of queue implementation 

class Printer {
    constructor(){
        this.queue = [];
    }
    addToQueue(document){
     this.queue.push(document)
     console.log(`queued for printing: ${this.queue.join(';')}`)
    }
    removeFromQueue(document){
        let len = this.queue.length;
        let updatedQueue = [];
     for(let i=0; i<len; ++i){
        if(this.queue[i] !== document){
          updatedQueue.push(this.queue[i]);
        } else {
            console.log(`${document} removed from queue`)
        }
     }
     if(updatedQueue.length === len){
        console.log(`${document} not found`)
     } else {
       this.queue = updatedQueue; 
     }
     
     console.log(`queued for printing: ${this.queue.join(";")}`);
    }
    print(){
       let len = this.queue.length;
       for(let i=0; i<len; ++i){
        console.log(`finished printing: ${this.queue[i]}`)
       }
    }
}

let hp333 = new Printer();
hp333.addToQueue("birth certificate")
hp333.addToQueue("university diploma");
hp333.addToQueue("highschool diploma");
hp333.addToQueue("marriage certificate");
hp333.removeFromQueue("highschool diploma")
hp333.print()