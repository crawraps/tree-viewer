import { TreeViewerData } from './../treeViewerData'
import { CustomElement } from './CustomElement'

export default class TreeViewer extends CustomElement {
  static readonly DOMName = 'tree-viewer'
  protected readonly state: TreeViewerData

  constructor() {
    super()

    this.setStyle({
      position: 'absolute',
      top: '0px',
      left: '0px',
      minWidth: '100px',
      width: '350px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#3d3d3d',
    })
  }
}
