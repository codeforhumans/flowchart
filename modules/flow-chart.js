'use strict';

class FlowChart extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = `
            <style>
            :host {
                background: linear-gradient(90deg, #fbfbfb 20px, transparent 0) center,
                    linear-gradient(#fbfbfb 20px, transparent 0) center,
                    #ddd;
                background-size: 22px 22px;
                border: 1px solid #ccc;
                display: flex;
                margin: 0;
                overflow: hidden;
                padding: 0;
                position: relative;
                user-select: none;
            }
            </style>
            <slot></slot>
        `;
    }

    connectedCallback() {
        this.style.height = this.getAttribute('height');
    }
}

customElements.define('flow-chart', FlowChart);