import '@/styles/global.scss'
import { ICustomElement } from './components/CustomElement'
import Search from './components/Search'
import TreeViewer from './components/TreeViewer'
import { InitialData, TreeViewerData } from './treeViewerData'

class App {
  private elements: ICustomElement[]

  constructor(elements?: ICustomElement[]) {
    this.elements = elements
  }

  addElement(element: ICustomElement) {
    this.elements.push(element)
  }

  setViewerData(state: TreeViewerData) {
    const viewer: TreeViewer = document.querySelector('tree-viewer')
    viewer.setState(state)
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

// Initialize the app
const app = new App([TreeViewer, Search])
app.init()

app.setViewerData(InitialData)
