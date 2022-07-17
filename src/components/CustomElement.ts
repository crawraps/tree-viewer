export interface ICustomElement {
  new (): HTMLElement
  DOMName: string
}

export abstract class CustomElement extends HTMLElement {
  protected readonly state: { [key: string]: any }

  constructor() {
    super()
    this.state = {}
  }

  updateBindings(prop: string, value = ''): void {
    const bindings = [...this.selectAll(`[data-bind$="${prop}"]`)]

    bindings.forEach((node) => {
      const dataProp = node.dataset.bind
      const bindProp = dataProp.includes(':')
        ? dataProp.split(':').shift()
        : dataProp
      const bindValue = dataProp.includes('.')
        ? dataProp
            .split('.')
            .slice(1)
            .reduce((obj: any, p: any) => obj[p], value)
        : value
      const target = [...this.selectAll(node.tagName)].find((el) => el === node)
      const isStateUpdate =
        dataProp.includes(':') && this.isCustomElement(target)

      isStateUpdate
        ? target.setState({ [`${bindProp}`]: bindValue })
        : this.isArray(bindValue)
        ? (target.state[bindProp] = bindValue)
        : (node.textContent = bindValue.toString())
    })
  }

  setState(newState: typeof this.state): void {
    Object.entries(newState).forEach(([key, value]) => {
      this.state[key] =
        this.isObject(this.state[key]) && this.isObject(value)
          ? { ...this.state[key], ...value }
          : value

      const bindKey = this.isObject(value) ? this.getBindKey(key, value) : key
      const bindKeys = (
        this.isArray(bindKey) ? bindKey : [bindKey]
      ) as Array<string>

      bindKeys.forEach((key) => this.updateBindings(key, value))
    })
  }

  getBindKey(key: string, obj: { [key: string]: any }): string[] {
    return Object.keys(obj).map((k) =>
      this.isObject(obj[k])
        ? `${key}.${this.getBindKey(k, obj[k])}`
        : `${key}.${k}`
    )
  }

  isArray(arr: any) {
    return Array.isArray(arr)
  }

  isObject(obj: any) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  isCustomElement(element: HTMLElement) {
    return (
      Object.getPrototypeOf(customElements.get(element.tagName.toLowerCase()))
        .name === 'CustomElement'
    )
  }

  select(selector: string): typeof this {
    return this.shadowRoot
      ? this.shadowRoot.querySelector(selector)
      : this.querySelector(selector)
  }

  selectAll(selector: string): Array<typeof this> {
    return Array.from(
      this.shadowRoot
        ? this.shadowRoot.querySelectorAll(selector)
        : this.querySelectorAll(selector)
    )
  }

  multiSelect(config: { [key: string]: string }) {
    Object.entries(config).forEach(([prop, selector]) => {
      this.state[prop] = this.select(selector)
    })
  }

  setStyle(style: Partial<CSSStyleDeclaration>) {
    Object.entries(style).forEach(
      ([key, value]) => (this.style[key as any] = value as string)
    )
  }
}
