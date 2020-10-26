// pseudo tests using AAA, read it as prose

describe('wrap everything in a describe', () => {
  /* 1 */ beforeEach(() => {
    // setup needed for every test
    // ARRANGE
  })

  describe('group main functionality in 1st level of describes', () => {
    /* 2 */ beforeEach(() => {
      // do something to change the state
      // use a `beforeEach` even if there is only one `it`
      // it will be easier to extend later
      // ARRANGE & ACT
    })

    it('should respond to the change', () => {
      // test the outcome
      // ASSERT
    })

    describe('use nested describes to dive into branches', () => {
      /* 3 */ beforeEach(() => {
        // do something that changes the state further
        // ARRANGE & ACT
      })

      it('should respond to the change', () => {
        // assertion given that 1, 2, 3 executed
        // ASSERT
      })

      it('should follow the structure of your code', () => {
        // when you add new functionality it is easy to find where the tests need to go
        // ASSERT
      })
    })
  })

  // #region events
  describe('example events', () => {
    describe('when the user types', () => {
      beforeEach(() => {
        // find input element
        // ARRANGE
        // fire change event so that it is invalid
        // ACT
      })

      it('should validate input', () => {
        // find error
        // match text in error
        // ASSERT
      })

      describe('when the input is valid', () => {
        beforeEach(() => {
          // fire a change event so that the input is valid
          // ACT
        })

        it('should validate input', () => {
          // find error
          // expect that there are none
          // ASSERT
        })

        describe('when the user submits', () => {
          beforeEach(() => {
            // find submit button
            // click it
            // ARRANGE & ACT
          })

          it('should call api', () => {
            // expect mock to have been called with form data
            // ASSERT
          })
        })
      })
    })
  })
  // #endregion

  // #region a11y
  describe('example a11y', () => {
    describe('when the accordion is closed', () => {
      beforeEach(() => {
        // find the toggle button
        // ARRANGE
      })

      it('should have aria-expanded=false', () => {
        // expect the toggle button to have the attribute
        // ASSERT
      })

      describe('when the accordion is open', () => {
        beforeEach(() => {
          // click the toggle
          // ACT
        })

        it('should have aria-expanded=true', () => {
          // expect the toggle button to have the attribute
          // ASSERT
        })

        describe('when the accordion is closed', () => {
          beforeEach(() => {
            // click the toggle
            // ACT
          })

          it('should have aria-expanded=false', () => {
            // expect the toggle button to have the attribute
            // ASSERT
          })
        })
      })
    })
  })
  // #endregion

  // #region non-happy
  describe('example non-happy paths', () => {
    describe('when the api times out', () => {
      beforeEach(() => {
        // use mock timers
        // set mock to return unresolved promise
        // ARRANGE
        // action that calls into api
        // ACT
      })

      it('should show spinner', () => {
        // find spinner
        // expect that it exists
        // ASSERT
      })

      describe('when request times out', () => {
        beforeEach(() => {
          // run timers
          // ACT
        })

        it('should show error', () => {
          // find error
          // match text
          // ASSERT
        })
      })
    })

    describe('when api errors', () => {
      beforeEach(() => {
        // set mock to return unresolved promise
        // ARRANGE
        // action that calls into api
        // ACT
      })

      it('should show error', () => {
        // find error
        // match text
        // ASSERT
      })
    })
  })
  // #endregion
})

export const dummy = null
