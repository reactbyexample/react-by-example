import { Semaphore } from '.'

const tick = () => new Promise((resolve) => process.nextTick(resolve))

class MockIO {
  private tasks: (() => void)[] = []

  numberOfTasksLog: number[] = []

  run() {
    return new Promise((resolve) => {
      this.tasks.push(resolve)
      this.numberOfTasksLog.push(this.numberOfTasks())
    })
  }

  resolveOneTask() {
    const [task] = this.tasks.splice(Math.random() * this.numberOfTasks(), 1)
    task()
  }

  async resolveAllTasks() {
    await tick()
    if (this.anyTasksPending()) {
      this.resolveOneTask()
      await this.resolveAllTasks()
    }
  }

  numberOfTasks() {
    return this.tasks.length
  }

  anyTasksPending() {
    return !!this.numberOfTasks()
  }
}

describe('Semaphore', () => {
  const numberOfTasks = 100

  let mockIO: MockIO

  beforeEach(() => {
    mockIO = new MockIO()
  })

  describe('binary', () => {
    let result: number[]

    beforeEach(async () => {
      const semaphore = new Semaphore()
      result = []

      const task = async (i: number) => {
        await semaphore.enter(async () => {
          await mockIO.run()
          result.push(i)
        })
      }

      const tasks = Promise.all(
        Array.from({ length: numberOfTasks }).map((_, i) => task(i)),
      )
      await mockIO.resolveAllTasks()
      await tasks
    })

    it('should only allow one task on the critical path', () => {
      expect(mockIO.numberOfTasksLog.every((n) => n <= 1))
    })

    it('should execute in order of entry', () => {
      const expected = Array.from({ length: numberOfTasks }).map((_, i) => i)
      expect(result).toEqual(expected)
    })
  })

  describe('counting', () => {
    const count = 5

    beforeEach(async () => {
      const semaphore = new Semaphore(count)

      const task = async () => {
        await semaphore.enter(async () => {
          if (Math.random() < 0.3) throw new Error()
          await mockIO.run()
        })
      }

      const tasks = Promise.all(
        Array.from({ length: numberOfTasks }).map(task),
      ).catch(() => null)
      await mockIO.resolveAllTasks()
      await tasks
    })

    it('should only allow a certain number of parallel tasks on the critical path', () => {
      expect(mockIO.numberOfTasksLog.every((n) => n <= count))
    })
  })
})
