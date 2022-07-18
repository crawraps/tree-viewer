import { app } from '..'
import { CustomElement } from './CustomElement'

export default class Search extends CustomElement {
  static readonly DOMName = 'tree-search'
  private readonly input: HTMLInputElement

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
          align-items: center;
          padding: 8px 14px;
          box-sizing: border-box;
        }
    
        input{
          width: 100%;
          margin-left: 10px;
          background-color: transparent;
          border: none;
          color: white;
        }
        input:focus {
          border: none;
          outline: none;
        }
      </style>
      
      <img src='${require('../assets/images/icons/search.svg')}' height='16' />
      <input type='text' id='input'>
    `

    this.input = this.shadowRoot.getElementById('input') as HTMLInputElement
    this.createListner()
  }

  private submitHandler(event: any) {
    if (event.key !== 'Enter') {
      return
    }
    if (event.target.value === this.state.search) {
      //todo: Focus on next element
    } else {
      const tree = app.elements['tree-viewer']

      tree.setState({ search: event.target.value })
    }
  }

  createListner() {
    this.input.addEventListener('keyup', this.submitHandler)
  }

  deleteListner() {
    this.input.removeEventListener('keyup', this.submitHandler)
  }
}
