import { Item } from '../treeViewerData'
import { CustomElement } from './CustomElement'

export default class List extends CustomElement {
  static readonly DOMName = 'tree-list'

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = `
      <style>
        :root {
          display: flex;
          flex-direction: column;
          height: 100vh;
          box-sizing: border-box;
          padding: 35px 0px;
          overflow: scroll;
        }
      </style>
    `

    setTimeout(() => {
      this.state.elements.forEach((el: Item) => {
        const item = document.createElement('list-item')
        item.setAttribute('data-bind', `info: elements`)
        this.shadowRoot.append(item)
      })
    }, 0)
  }
}
