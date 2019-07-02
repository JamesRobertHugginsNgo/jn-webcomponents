class JnList extends HTMLElement {
   static get observedAttributes() {
      return ['url', 'templateid'];
   }

   constructor() {
      super();

      this._data;
      this._templateid;

      this.attachShadow({ mode: 'open' });

      // (new MutationObserver(() => { this.mutationCallback(); }))
      //    .observe(this, { attributes: false, childList: true, subtree: true });

      const style = this.shadowRoot.appendChild(document.createElement('style'));
      style.innerHTML = `
         .wrapper > header {
            background-color: #f4f4f4;
            border: 1px solid #c8c8c8;
            border-radius: 3px 3px 0 0;
            padding: 0.5rem 1rem;
         }

         .wrapper > div {
            border-color: #c8c8c8;
            border-style: solid;
            border-width: 0 1px 1px 1px;
            padding: 0.5rem 1rem;
         }

         .wrapper > footer {
            background-color: #f4f4f4;
            border-color: #c8c8c8;
            border-style: solid;
            border-width: 0 1px 1px 1px;
            border-radius: 0 0 3px 3px;
            padding: 0.5rem 1rem;
         }
      `;

      this.wrapper = this.shadowRoot.appendChild(document.createElement('div'));
      this.wrapper.classList.add('wrapper');

      this.update();
   }

   connectedCallback() {
      // Invoked when the custom element is first connected to the document's DOM.
   }

   disconnectedCallback() {
      // Invoked when the custom element is disconnected from the document's DOM.
   }

   adoptedCallback() {
      // Invoked when the custom element is moved to a new document.
   }

   attributeChangedCallback(name, oldValue, newValue) {
      // Invoked when one of the custom element's attributes is added, removed, or changed.

      this[name] = newValue;
   }

   // mutationCallback(mutationsList, observer) {
   //    // Callback function to execute when mutations are observed.
   // }

   set url(value) {
      if (value.substring(0, 29) === 'data:application/json;base64,') {
         this.data = JSON.parse(atob(value.substring(29)));
      }
   }

   get data() {
      return this._data;
   }

   set data(value) {
      this._data = value;
      this.update();
   }

   get templateid() {
      return this._templateid;
   }

   set templateid(value) {
      this._templateid = value;
      this.update();
   }

   update() {
      console.log('UPDATE');

      while (this.wrapper.firstChild) {
         this.wrapper.removeChild(this.wrapper.firstChild);
      }

      const header = this.wrapper.appendChild(document.createElement('header'));
      header.textContent = 'Header';

      if (this.data && this.templateid) {
         this.data.forEach(item => {
            const element = this.wrapper.appendChild(document.createElement('div'));
            element.appendChild(createElementByTemplate(document.getElementById(this.templateid), item));
         });
      }

      const footer = this.wrapper.appendChild(document.createElement('footer'));
      footer.textContent = 'Footer';
   }
}

customElements.define('jn-list', JnList);
