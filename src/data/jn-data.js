class JnData extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'type', 'value', 'templateid'];
    }

    constructor() {
        super();

        console.log('CONSTRUCTOR', this);

        this._realyReady = false;

        this._name = null;
        this._type = null;
        this._value = null;
        // this._templateid = null;
        // this._template = null;

        this.attachShadow({ mode: 'open' });

        const observer = new MutationObserver(() => { this.mutationCallback(); });
        observer.observe(this, { attributes: false, childList: true, subtree: true });
    }

    connectedCallback() {
        console.log('CONNECTED CALLBACK', this);
        this.update();
    }

    disconnectedCallback() { }

    adoptedCallback() { }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
    }

    mutationCallback(mutationsList, observer) {
        this.update();
    }

    get reallyReady() {
        return this._reallyReady;
    }

    set reallyReady(value) {
        this._reallyReady = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    // get templateid() {
    //     return this._templateid;
    // }

    // set templateid(value) {
    //     this._templateid = value;
    // }

    // get template() {
    //     return this._template;
    // }

    // set template(value) {
    //     this._template = value;
    // }

    update() {
        console.log('UPDATE', this);

        const subComponents = this.querySelectorAll('jn-data');
        if (subComponents.length === 0) {
            switch (this.type) {
                case 'boolean':
                    this._value = this.textContent === 'true';

                case 'number':
                    this._value = +this.textContent;

                case 'date':
                    this._value = new Date(Date.parse(this.textContent));

                default:
                    this._value = this.textContent;
            }
        } else {
            switch (this.type) {
                case 'array':
                    this._value = Array.prototype.reduce.call(subComponents, (acc, cur, idx, src) => {
                        acc.push(cur.value);
                        return acc;
                    }, []);

                default:
                    this._value = Array.prototype.reduce.call(subComponents, (acc, cur, idx, src) => {
                        if (cur.name) {
                            acc[cur.name] = cur.value;
                        }
                        return acc;
                    }, {});
            }
        }

        console.log(this.value);
    }
}

customElements.define('jn-data', JnData);