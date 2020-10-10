/* eslint-disable jsx-a11y/label-has-associated-control */
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { FC } from 'react'

const SimpleFormik: FC = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        terms: false,
        submitted: false,
      }}
      onSubmit={(_values, { setFieldValue }) => {
        setFieldValue('submitted', true)
      }}
    >
      <Form>
        <div>
          <label>
            Username
            <Field name="username" />
          </label>
        </div>
        <div>
          <label>
            Password
            <Field type="password" name="password" />
          </label>
        </div>
        <div>
          <label>
            <Field name="terms" type="checkbox" />
            Read the T&amp;C
          </label>
        </div>
        <button type="submit">Submit</button>
        <Field>
          {({ form }: FieldProps) => (
            <pre>{JSON.stringify(form.values, null, '  ')}</pre>
          )}
        </Field>
      </Form>
    </Formik>
  )
}

export default <SimpleFormik />
