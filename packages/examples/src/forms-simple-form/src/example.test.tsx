import { cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { SimpleForm } from './example'
import { UserAPI } from './user-api'

const matchDebug = (partial: Record<string, unknown>): RegExp =>
  new RegExp(JSON.stringify(partial, null, '  ').slice(4, -2))

describe('SimpleForm', () => {
  let component: RenderResult
  let form: HTMLElement
  let username: HTMLElement
  let password: HTMLElement
  let terms: HTMLElement
  let submit: HTMLElement
  let debug: HTMLElement
  let registerSpy: jest.SpyInstance

  beforeEach(() => {
    component = render(<SimpleForm />)
    form = component.getByRole('form')
    username = component.getByLabelText('Username')
    password = component.getByLabelText('Password')
    terms = component.getByLabelText(/Terms/)
    submit = component.getByRole('button')
    debug = component.getByText(matchDebug({ username: '' }))
    registerSpy = jest.spyOn(UserAPI, 'register').mockRejectedValue(new Error())
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  describe('when entering username', () => {
    beforeEach(async () => {
      await userEvent.type(username, 'my_username')
    })

    it('should update input', () => {
      expect(username).toHaveValue('my_username')
    })

    it('should update debug', () => {
      expect(debug).toHaveTextContent(matchDebug({ username: 'my_username' }))
    })

    describe('when entering password', () => {
      beforeEach(async () => {
        await userEvent.type(password, '12345678')
      })

      it('should update input', () => {
        expect(password).toHaveValue('12345678')
      })

      it('should update debug', () => {
        expect(debug).toHaveTextContent(matchDebug({ password: '12345678' }))
      })

      describe('when accepting terms', () => {
        beforeEach(() => {
          userEvent.click(terms)
        })

        it('should update input', () => {
          expect(terms).toBeChecked()
        })

        it('should update debug', () => {
          expect(debug).toHaveTextContent(matchDebug({ terms: true }))
        })

        it('should have all form values', () => {
          expect(form).toHaveFormValues({
            username: 'my_username',
            password: '12345678',
            terms: true,
          })
        })

        describe('when submitting', () => {
          let event: Event

          beforeEach(() => {
            document.addEventListener(
              'submit',
              (e) => {
                event = e
              },
              { once: true },
            )

            userEvent.click(submit)
          })

          it('should prevent default', () => {
            expect(event).toMatchObject({ defaultPrevented: true })
          })

          it('should update debug', () => {
            expect(debug).toHaveTextContent(matchDebug({ submitted: true }))
          })

          it('should register', () => {
            expect(registerSpy).toHaveBeenCalledWith({
              username: 'my_username',
              password: '12345678',
            })
          })
        })
      })
    })
  })
})
