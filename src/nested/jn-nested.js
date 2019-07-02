class JnNested extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'type'];
    }

    constructor() {
        console.log('→ JN NESTED CONSTRUCTOR');

        super();

        this.attachShadow({ mode: 'open' });

        const observer = new MutationObserver(() => { this.mutationCallback(); });
        observer.observe(this, { attributes: false, childList: true, subtree: true });
    }

    connectedCallback() {
        console.log('JN NESTED CONNECTED CALLBACK');

        this.update();
    }

    disconnectedCallback() { }

    adoptedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('JN NESTED ATTRIBUTE CHANGED CALLBACK', name, newValue);
    }

    mutationCallback(mutationsList, observer) {
        console.log('JN NESTED MUTATION CALLBACK');

        this.update();
    }

    update() {
        console.log('JN NESTED UPDATE');

        this.shadowRoot.appendChild(document.createTextNode('CHILD'));
    }
}

customElements.define('jn-nested', JnNested);