import '@/styles/global.scss'
import { CustomElement, ICustomElement } from './components/CustomElement'
import Search from './components/Search'
import TreeViewer from './components/TreeViewer'
import { InitialData, TreeViewerData } from './treeViewerData'

class App {
  private readonly components: ICustomElement[]
  public readonly elements: { [key: string]: CustomElement }

  constructor(components?: ICustomElement[]) {
    this.components = components
    this.elements = {}
  }

  setViewerData(state: TreeViewerData) {
    const viewer: TreeViewer = document.querySelector('tree-viewer')
    viewer.setState(state)
  }

  defineComponents() {
    if (this.components) {
      this.components.forEach((elem) => {
        window.customElements.define(elem.DOMName, elem)
        this.elements[elem.DOMName] = document.querySelector(elem.DOMName)
      })
    } else {
      throw 'Elements is not defined'
    }
  }
}

// Initialize the app
export const app = new App([TreeViewer, Search])
app.defineComponents()
app.setViewerData(InitialData)
