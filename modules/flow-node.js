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
            :host h4 {
                margin: 0;
                padding: 0;
            }
            :host {
                background: #fff;
                border: .1em solid #ddd;
                border-radius: .3em;
                padding: 1em;
                position: absolute;
            }
            :host(:active) {
                border-color: #09f;
                box-shadow: 0 .2em .5em rgba(0,0,0,.2);
                cursor: grabbing !important;
            }
            :host(:hover) {
                cursor: grab;
            }
            </style>
            <slot></slot>
        `;

        this.addEventListener('mousedown', this.startDrag);
        this.addEventListener('mouseup', this.stopDrag);
        this.addEventListener('mousemove', this.drag);

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
        if (this.dragging) {
            const currentX = event.clientX - this.left;
            const currentY = event.clientY - this.top;
            this.style.transform = 'translate3d('+currentX+'px, '+currentY+'px, 0)';
        }
    }
}
