'use strict';

class FlowNode extends HTMLElement {
    constructor() {
        super();

        this.dragging = false;
        this.left = 0;
        this.top = 0;

        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = `
            <style>
            :host {
                background: #fff;
                border: 3px solid #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px #eee;
                position: absolute;
            }
            :host(:active) {
                border-color: #0af;
                box-shadow: 0 .3em .6em rgba(0,0,0,.2);
                cursor: grabbing !important;
                z-index: 1000;
            }
            :host(:hover) {
                box-shadow: 0 2px 5px #ddd;
                cursor: grab;
            }
            :host h4 {
                border-bottom: 1px solid #ddd;
                margin: 0;
                padding: .5em;
            }
            :host slot {
                display: block;
                padding: .5em;
            }
            </style>
            <slot></slot>
        `;

        this.setAttribute('id', Math.floor(Math.random() * 1000000));

        this.addEventListener('mousedown', this.startDrag);
        this.addEventListener('mouseup', this.stopDrag);
        this.parentNode.addEventListener('mousemove', this.drag.bind(this));

    }

    connectedCallback() {
        if (this.hasAttribute('title')) {
            const titleElement = document.createElement('h4');
            titleElement.textContent = this.getAttribute('title');
            this.shadow.prepend(titleElement);
        }
    }

    startDrag(event) {
        this.left = event.clientX - this.getBoundingClientRect().x;
        this.top = event.clientY - this.getBoundingClientRect().y;
        this.dragging = true;
    }

    stopDrag() {
        this.dragging = false;
    }

    drag(event) {
        if (! this.dragging) {
            return;
        }

        const currentX = event.clientX - this.left;
        const currentY = event.clientY - this.top;
        this.style.transform = 'translate3d('+currentX+'px, '+currentY+'px, 0)';
    }
}

customElements.define('flow-node', FlowNode);