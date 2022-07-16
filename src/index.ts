import '@/styles/global.scss'
import { ICustomElement } from './components/CustomElement'
import TreeViewer from './components/TreeViewer'

class App {
  private elements: ICustomElement[]

  constructor(elements?: ICustomElement[]) {
    this.elements = elements
  }

  addElement(element: ICustomElement) {
    this.elements.push(element)
  }

  init() {
    if (this.elements) {
      this.elements.forEach((elem) =>
        window.customElements.define(elem.DOMName, elem)
      )
    } else {
      throw 'Elements is not defined'
    }
  }
}

const app = new App([TreeViewer])
app.init()
