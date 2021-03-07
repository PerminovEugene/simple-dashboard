import { Formik, Form, Field, ErrorMessage } from 'formik';
import { User } from '../../../stores/UserStore';
import { checkRequired, checkMaxLength } from '../../../utils/validation';

const maxInputLength = 50;

interface AddUserFormProps {
    submit: (user: User) => Promise<void>;
    submitText: string;
    onSuccessSubmit: () => void;
    initialData?: User;
};

const AddUserForm = ({
    submit,
    onSuccessSubmit,
    submitText,
    initialData,
}: AddUserFormProps) => {
  return (
  <div>
    <Formik
      initialValues={initialData || {}}
      validate={values => {
        const errors = {};
        checkRequired(values, 'firstName', 'first name', errors);
        checkRequired(values, 'lastName', 'last name', errors);
        checkRequired(values, 'email', 'email', errors);
        if (!Object.keys(errors).length) {
          checkMaxLength(values, 'firstName', 'first name', errors, maxInputLength);
          checkMaxLength(values, 'middleName', 'first name', errors, maxInputLength);
          checkMaxLength(values, 'lastName', 'first name', errors, maxInputLength);
        }
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
          <Field type="text" name="firstName" placeholder="First Name"/>
          <ErrorMessage name="firstName" component="div" />

          <Field type="text" name="middleName" placeholder="Middle Name"/>
          <ErrorMessage name="middleName" component="div" />

          <Field type="text" name="lastName" placeholder="Last Name"/>
          <ErrorMessage name="lastName" component="div" />

          <Field type="email" name="email" placeholder="email"/>
          <ErrorMessage name="email" component="div" />

          <Field as="select" name="group">
             <option value="family">family</option>
             <option value="friends">friends</option>
             <option value="school">school</option>
             <option value="work">work</option>
          </Field>

          <Field type="checkbox" name="notification" value="hidden" />

          <button type="submit" disabled={isSubmitting}>
            {submitText}
          </button>
        </Form>
      )}
    </Formik>
  </div>
)};

export default AddUserForm;