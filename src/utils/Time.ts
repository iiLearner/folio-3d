import EventEmiiter from 'eventemitter3';

export default class Time {

  start: number
  current: number
  elapsed: number
  delta: number
  eventEmitter: EventEmiiter
  
  constructor() {

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16
    this.eventEmitter = new EventEmiiter()


    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.eventEmitter.emit('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
