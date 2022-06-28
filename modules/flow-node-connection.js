'use strict';

class FlowNodeConnection extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = `
            <style>
            :host {
                width: 100%;
            }
            :host svg {
                height: ${this.parentNode.clientHeight};
                width: ${this.parentNode.clientWidth};
            }
            :host svg line {
                cursor: pointer;
                stroke: #0af;
                stroke-width: 6;
                drop-shadow: 10px 10px 10px red;
            }
            :host svg line:active {
                stroke-width: 10;
            }
            </style>
            <svg xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="0" x2="200" y2="200" />
            </svg>
        `;

        this.parentNode.addEventListener('mousemove', this.updateOriginPosition.bind(this));
    }

    updateOriginPosition(event) {
        // if (!this.from) {
        //     return;
        // }

        console.log(this.dataset.from);

        const line = this.shadow.querySelector('line');

        line.setAttribute('x1', event.clientX - this.getBoundingClientRect().x);
        line.setAttribute('y1', event.clientY - this.getBoundingClientRect().y);
    }
}

customElements.define('flow-node-connection', FlowNodeConnection);