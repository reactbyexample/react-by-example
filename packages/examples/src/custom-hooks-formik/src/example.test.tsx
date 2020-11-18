import { act, cleanup, render, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC, useContext } from 'react'
import example, {
  DebugForm,
  Form,
  FormContext,
  Input,
  Select,
  useForm,
} from './example'

describe('DebugForm', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(
      <Form initialValues={{ hello: 'world' }}>
        <DebugForm />
      </Form>,
    )
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })
})

describe('Form', () => {
  let stateSpy: jest.Mock
  let setStateSpy: jest.Mock

  const MockFormItem: FC = () => {
    const form = useContext(FormContext)

    stateSpy(form.state)
    setStateSpy.mockImplementation(form.setState)

    return null
  }

  beforeEach(() => {
    stateSpy = jest.fn()
    setStateSpy = jest.fn()

    render(
      <Form initialValues={{ hello: 'world' }}>
        <MockFormItem />
      </Form>,
    )
  })

  afterEach(() => {
    cleanup()
  })

  it('should set initial state to initialValues', () => {
    expect(stateSpy).toHaveBeenLastCalledWith({ hello: 'world' })
    expect(stateSpy).toHaveBeenCalledTimes(1)
  })

  describe('when updating state', () => {
    beforeEach(() => {
      act(() => {
        setStateSpy({ hello: 'new state' })
      })
    })

    it('should update state', () => {
      expect(stateSpy).toHaveBeenLastCalledWith({ hello: 'new state' })
    })

    describe('when extending state', () => {
      beforeEach(() => {
        act(() => {
          setStateSpy({ goodbye: 'world' })
        })
      })

      it('should merge state', () => {
        expect(stateSpy).toHaveBeenLastCalledWith({
          hello: 'new state',
          goodbye: 'world',
        })
      })
    })
  })
})

describe('useForm', () => {
  let component: RenderResult
  let textarea: HTMLElement

  const TextArea: FC = () => {
    return <textarea {...useForm('textarea')} />
  }

  beforeEach(() => {
    component = render(
      <Form initialValues={{ textarea: 'initial' }}>
        <TextArea />
        <DebugForm />
      </Form>,
    )
    textarea = component.getByRole('textbox')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should use initial value', () => {
    expect(textarea).toHaveValue('initial')
  })

  describe('when typing', () => {
    beforeEach(async () => {
      await userEvent.type(textarea, '{selectall}new value')
    })

    it('should update value', () => {
      expect(textarea).toHaveValue('new value')
      expect(component.container).toHaveTextContent(/"textarea": "new value"/)
    })
  })
})

describe('Input', () => {
  let component: RenderResult
  let input: HTMLElement

  beforeEach(() => {
    component = render(
      <Form initialValues={{ input: '' }}>
        <Input name="input" />
        <DebugForm />
      </Form>,
    )
    input = component.getByRole('textbox')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should use initial value', () => {
    expect(input).toHaveValue('')
  })

  describe('when typing', () => {
    beforeEach(async () => {
      await userEvent.type(input, '{selectall}updated value')
    })

    it('should update value', () => {
      expect(input).toHaveValue('updated value')
      expect(component.container).toHaveTextContent(/"input": "updated value"/)
    })
  })
})

describe('Select', () => {
  let component: RenderResult
  let select: HTMLElement

  beforeEach(() => {
    component = render(
      <Form initialValues={{ select: 'red' }}>
        <Select name="select">
          <option>red</option>
          <option>green</option>
          <option>blue</option>
        </Select>
        <DebugForm />
      </Form>,
    )
    select = component.getByRole('combobox')
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })

  it('should use initial value', () => {
    expect(select).toHaveValue('red')
  })

  describe('when choosing', () => {
    beforeEach(() => {
      userEvent.selectOptions(select, 'blue')
    })

    it('should update value', () => {
      expect(select).toHaveValue('blue')
      expect(component.container).toHaveTextContent(/"select": "blue"/)
    })
  })
})

describe('example', () => {
  let component: RenderResult

  beforeEach(() => {
    component = render(<>{example}</>)
  })

  afterEach(() => {
    cleanup()
  })

  it('should snapshot', () => {
    expect(component.container).toMatchSnapshot()
  })
})
