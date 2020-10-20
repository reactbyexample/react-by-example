import { calculateDelay } from './calculate-delay'

describe('calculateDelay', () => {
  let randomSpy: jest.SpiedFunction<Math['random']>

  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random')
  })

  it.each`
    attempt | minTimeout | maxTimeout  | factor | randomize | random | delay
    ${0}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${1}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${2}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${3}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${4}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${5}    | ${0}       | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${0}
    ${0}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${750}
    ${1}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${1500}
    ${2}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${3000}
    ${3}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${6000}
    ${4}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${12000}
    ${5}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0.5} | ${24000}
    ${0}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${100}
    ${1}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${90}
    ${2}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${81}
    ${3}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${73}
    ${4}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${66}
    ${5}    | ${100}     | ${Infinity} | ${0.9} | ${false}  | ${0.5} | ${59}
    ${0}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0}   | ${500}
    ${1}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${1}   | ${2000}
    ${2}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0}   | ${2000}
    ${3}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${1}   | ${8000}
    ${4}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${0}   | ${8000}
    ${5}    | ${500}     | ${Infinity} | ${2}   | ${true}   | ${1}   | ${32000}
    ${0}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${500}
    ${1}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${1000}
    ${2}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${2000}
    ${3}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${4000}
    ${4}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${8000}
    ${5}    | ${500}     | ${Infinity} | ${2}   | ${false}  | ${0.5} | ${16000}
    ${0}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${100}
    ${1}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${280}
    ${2}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${784}
    ${3}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${2195}
    ${4}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${6147}
    ${5}    | ${100}     | ${10000}    | ${2.8} | ${false}  | ${0.5} | ${10000}
  `(
    'should calculate an exponential backoff',
    ({
      attempt,
      minTimeout,
      maxTimeout,
      factor,
      randomize,
      random,
      delay,
    }: {
      attempt: number
      minTimeout: number
      maxTimeout: number
      factor: number
      randomize: boolean
      random: number
      delay: number
    }) => {
      randomSpy.mockReturnValue(random)
      expect(
        calculateDelay(attempt, minTimeout, maxTimeout, factor, randomize),
      ).toBe(delay)
    },
  )
})
