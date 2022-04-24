import EventEmiiter from 'eventemitter3'

export default class Sizes {
  container: Element
  width: number
  height: number
  pixelRatio: number
  eventEmitter: EventEmiiter

  constructor(_container: Element) {
    // input
    this.container = _container

    const { width, height } = this.container.getBoundingClientRect()

    // Setup
    this.width = width
    this.height = height
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.eventEmitter = new EventEmiiter()

    // Resize event
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.eventEmitter.emit('resize')
    })
  }
}
