export class Semaphore {
  private usedResources = 0

  private waiting: (() => void)[] = []

  constructor(private availableResources = 1) {}

  enter<T>(whenEntered: () => Promise<T>): Promise<T> {
    const promise = new Promise<void>((resolve) => {
      this.waiting.push(resolve)
    })
      .then(whenEntered)
      .finally(() => {
        this.usedResources -= 1
        this.startWaitingTask()
      })

    this.startWaitingTask()

    return promise
  }

  private startWaitingTask() {
    if (this.usedResources < this.availableResources) {
      const task = this.waiting.shift()
      if (!task) return
      this.usedResources += 1
      task()
    }
  }
}
