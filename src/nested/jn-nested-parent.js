class JnNestedParent extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    constructor() {
        console.log('→ JN NESTED PARENT CONSTRUCTOR');

        super();

        this.attachShadow({ mode: 'open' });

        const observer = new MutationObserver(() => {
            this.mutationCallback();
        });
        observer.observe(this, { attributes: false, childList: true, subtree: true });
    }
    
    connectedCallback() {
        this.update();
    }

    disconnectedCallback() { }

    adoptedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) { }

    mutationCallback(mutationsList, observer) {
        console.log('JN NESTED PARENT MUTATION CALLBACK', this);

        console.log('STOP MUTATION OBSERVER', this.stopMutationObserver);
        if (!this.stopMutationObserver) {
            this.update();
        }
    }

    update() {
        console.log('JN NESTED PARENT UPDATE', this);

        while(this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.firstChild);
        }

        this.shadowRoot.appendChild(document.createTextNode('PARENT'));

        const body = this.shadowRoot.appendChild(document.createElement('div'));

        this.stopMutationObserver = true;
        this.test = this.test + 1;
        console.log('STOP MUTATION OBSERVER', this.stopMutationObserver);
        this.childNodes.forEach(node => {
            // body.appendChild(node.cloneNode(true));
            console.log('APPEND CHILD');
            body.appendChild(node);
        });
        this.stopMutationObserver = false;
    }
}

customElements.define('jn-nested-parent', JnNestedParent);
