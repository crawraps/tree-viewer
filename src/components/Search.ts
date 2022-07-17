import { CustomElement } from './CustomElement'

export default class Search extends CustomElement {
  static readonly DOMName = 'tree-search'
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: absolute;
          top: 0;
          left: 0;
          height: 35px;
          width: 100%;
          background-color: #3A3A3A;
          display: flex;
        }
      </style>
      
      <img src='${require('../assets/images/icons/search.svg')}' />
      <input></input>
    `
  }
}
