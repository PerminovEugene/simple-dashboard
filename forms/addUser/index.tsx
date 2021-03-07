import { Formik, Form, Field, ErrorMessage } from 'formik';
import { User } from '../../stores/UserStore';

interface AddUserFormProps {
    submit: (user: User) => Promise<void>;
    onSuccessSubmit: () => void;
};

const AddUserForm = ({ submit, onSuccessSubmit }: AddUserFormProps, ) => (
  <div>
    <Formik
        initialValues={{}}
      validate={values => {
        const errors = {};
        // if (!values.email) {
        //   errors.email = 'Required';
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = 'Invalid email address';
        // }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await submit(values as User);
        setSubmitting(false);
        onSuccessSubmit();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="firstName" />
          <ErrorMessage name="firstName" component="div" />

          <Field type="text" name="middleName" />
          <ErrorMessage name="middleName" component="div" />

          <Field type="text" name="lastName" />
          <ErrorMessage name="lastName" component="div" />

          <Field as="select" name="group">
             <option value="family">family</option>
             <option value="friends">friends</option>
             <option value="school">school</option>
             <option value="work">work</option>
          </Field>

          <Field type="checkbox" name="notification" value="hidden" />

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default AddUserForm;