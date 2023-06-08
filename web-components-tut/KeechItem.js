
const template = document.createElement('template');
template.innerHTML = `
<style>
/* @import url(); */

 h2 {
    background: pink; color: rgb(57, 57, 57);
    font-size: 25px;
 }
 
 .template {
    border: solid 1px pink;
    padding: 15px 30px;
 }
 :host { /* for the shadow root i.e. host */
         /* doesn't work for me, tho */
  background-color: orange;
  display: block
 }
 :host(keech-item){
 }
 :host-context(main){}
 ::slotted(*){
    /* anything that's slotted will get this style */
    /* you can't simply style the slot tag because it's being replaced in the html file */
    text-decoration: underline
 }
 /* ::part(){
    works with elements that have part attribute, but not from the template 
    it's made for the developer that's using the widget tho style the element containing part attribute 
 } */
</style>
<div class="template">
  <h1 part="topper">This has a <i>part</i> attribute</h1>
  <h2> Stuff Keech likes </h2>
  <slot name="title">Your title should be here</slot>
  <slot name="names">Doggo names should be here</slot>
</div>
`;
// the slot element holds the elements whose slot attr value is identical 
// to its name attr value
// - we can set up default values in case there are no html elements with
// the corresponding slot attr value

class Keech extends HTMLElement {
  constructor() {
    super();
    // ??? determine when it's this.root and when it's const shadowRoot
    this.root = this.attachShadow({ mode: "open" });
    // let p = document.createElement('p');
    // p.textContent = "keech";
    // shadowRoot.append(p)
    let templateClone = template.content.cloneNode(true);
    this.root.append(templateClone);
  }

  //* * * define the allowed attributes on your custom element - custom attributes
  // built-in HTML attributes are already allowed by default
  
  static get observedAttributes() {
    return ["doggocharacter", "doggosize"]; // all custom attributes MUST be in lowercase
  }

  //* * * sync attributes with propertied as you want
  get doggocharacter(){
    return this.getAttribute("doggoCharacter");
  }
  set doggocharacter(value){
    // you can do any kind of attr value validation or type conversion here
    this.setAttribute("doggocharacter", value)
    console.log(value)
  }

  get doggosize(){
    return this.getAttribute("doggoSize");
  }
  set doggosize(value){
    this.setAttribute("doggosize", value);
  }

  //* * * handle values and changes to the attributes
  // with the function that will run every time an attr value change is observed

  attributeChangedCallback(attrName, oldVal, newVal){
    // the three arguments are always going to be passed in, it's up to you if you want to use them
    if(attrName === 'doggosize'){
       let title = this.root.querySelector('h2');
       if(title.style.fontSize === "25px"){
         title.style.fontSize = "40px";
       } else {
        title.style.fontSize = "25px";
       }
    }
    if(attrName === 'doggocharacter'){
        let doggos = document.querySelectorAll('li');
        doggos.forEach(doggo => {
            console.log(doggo.innerText.toLowerCase()===newVal)
            if(doggo.innerText.toLowerCase()===newVal){
                // this class must be within the app where the widget is being used
                doggo.classList.add('spotlight')
            } else {
                doggo.classList.remove("spotlight");
            }
            
        })
    }
    console.log(`${attrName} changed`)
  }

}

window.customElements.define("keech-item", Keech)

// nesting elements inside the custom tag --> with <template>

//just for commits