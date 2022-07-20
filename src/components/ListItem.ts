import { Item } from '../treeViewerData'
import { CustomElement } from './CustomElement'

export default class ListItem extends CustomElement {
  static readonly DOMName = 'list-item'
  protected readonly state: { info: Item }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    console.log(this.state.info)
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          width: 100%;
          background-color: #3d3d3d;
          height: 35px;
          display: flex;
          flex-direction: column;
        }
    
        #item{
          display: flex;
        }
      </style>

      <div id="item">
        <img src="${this.state.info.icon}" alt="${this.state.info.type}-icon" />
        <span>${this.state.info.label}</span>
      </div>
      <div id="children">
      </div>
    `
  }
}
