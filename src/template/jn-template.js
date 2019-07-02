class JnTemplate extends HTMLElement {
   static get observedAttributes() {
      return [];
   }

   constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      (new MutationObserver(() => { this.mutationCallback(); }))
         .observe(this, { attributes: false, childList: true, subtree: true });
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
   }

   mutationCallback(mutationsList, observer) {
      // Callback function to execute when mutations are observed.
   }

   update() { }
}

customElements.define('jn-template', JnTemplate);
