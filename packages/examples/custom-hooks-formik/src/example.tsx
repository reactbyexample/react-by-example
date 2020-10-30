import React, {
  ChangeEventHandler,
  createContext,
  FC,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useCallback,
  useContext,
  useState,
} from 'react'

// #region context
export interface FormContextType {
  state: Record<string, string>
  setState: (newState: Record<string, string>) => void
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const FormContext = createContext<FormContextType>(null!)

export const Debug: FC = () => {
  const form = useContext(FormContext)
  return <pre>{JSON.stringify(form.state, null, '  ')}</pre>
}
// #endregion

// #region form
export interface FormProps {
  initialValues: Record<string, string>
}

export const Form: FC<FormProps> = ({ children, initialValues }) => {
  const [state, setState] = useState(initialValues)

  const context: FormContextType = {
    state,
    setState: useCallback(
      (partial) => setState((current) => ({ ...current, ...partial })),
      [],
    ),
  }

  return (
    <FormContext.Provider value={context}>
      <form>{children}</form>
    </FormContext.Provider>
  )
}
// #endregion

// #region custom hook
export interface UseForm<Element extends { value: string }> {
  value: string
  onChange: ChangeEventHandler<Element>
}

export const useForm = <Element extends { value: string }>(
  name: string,
): UseForm<Element> => {
  const form = useContext(FormContext)

  const value = form.state[name]
  const onChange: ChangeEventHandler<Element> = useCallback(
    (event) => {
      form.setState({ [name]: event.target.value })
    },
    [form, name],
  )

  return { value, onChange }
}
// #endregion

// #region form items using custom hook
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}
export const Input: FC<InputProps> = ({ name, ...props }) => {
  return <input {...useForm(name)} {...props} />
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
}
export const Select: FC<SelectProps> = ({ name, children, ...props }) => {
  return (
    <select {...useForm(name)} {...props}>
      {children}
    </select>
  )
}
// #endregion

export default (
  <Form initialValues={{ title: 'mr', first: 'Steve', last: 'Buscemi' }}>
    <label>
      title
      <Select name="title">
        <option value="mr">Mr</option>
        <option value="mrs">Mrs</option>
        <option value="ms">Ms</option>
        <option value="dr">Dr</option>
        <option value="lord">Lord</option>
        <option value="prof">Prof</option>
        <option value="esq">Esq</option>
        <option value="dame">Dame</option>
        <option value="na">N/A</option>
      </Select>
    </label>
    <br />
    <label>
      first name
      <Input name="first" />
    </label>
    <br />
    <label>
      last name
      <Input name="last" />
    </label>
    <Debug />
  </Form>
)
