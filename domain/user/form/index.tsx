import { Formik, Form, Field, ErrorMessage } from "formik";
import { User } from "../../../stores/UserStore";
import { checkRequired, checkMaxLength } from "../../../utils/validation";
import styles from "./userForm.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../../../components/avatar";
import { users } from "../../../transport/mocks/users";

const maxInputLength = 50;

interface AddUserFormProps {
  submit: (user: User) => Promise<void>;
  submitText: string;
  onSuccessSubmit: () => void;
  initialData?: User;
  cancel: () => void;
}

const AddUserForm = ({
  submit,
  onSuccessSubmit,
  submitText,
  initialData,
  cancel,
}: AddUserFormProps) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formHeader}>
        <div>{submitText.toUpperCase()}</div>
        <div>
          <FontAwesomeIcon icon={faTimes} onClick={() => cancel()} />
        </div>
      </div>
      <div className={styles.formBody}>
        <Avatar
          text={
            initialData &&
            `${initialData.firstName[0]}${initialData.lastName[0]}`
          }
        />
        <Formik
          initialValues={initialData || {}}
          validate={(values) => {
            const errors = {};
            checkRequired(values, "firstName", "first name", errors);
            checkRequired(values, "lastName", "last name", errors);
            checkRequired(values, "email", "email", errors);
            if (!Object.keys(errors).length) {
              checkMaxLength(
                values,
                "firstName",
                "first name",
                errors,
                maxInputLength
              );
              checkMaxLength(
                values,
                "middleName",
                "first name",
                errors,
                maxInputLength
              );
              checkMaxLength(
                values,
                "lastName",
                "first name",
                errors,
                maxInputLength
              );
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
              <div>
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  id="firstName"
                />
                <ErrorMessage name="firstName" component="div" />
              </div>
              <div>
                <label htmlFor="middleName">Middle Name</label>
                <Field
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  id="middleName"
                />
                <ErrorMessage name="middleName" component="div" />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  id="lastName"
                />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div>
                <label htmlFor="group">Group</label>
                <Field as="select" name="group" id="group">
                  <option value="family">family</option>
                  <option value="friends">friends</option>
                  <option value="school">school</option>
                  <option value="work">work</option>
                </Field>
              </div>

              <div className={styles.inlineInputBlock}>
                <Field
                  type="checkbox"
                  name="notification"
                  value="hidden"
                  id="notifications"
                />
                <label htmlFor="notifications">
                  Hide notifications from this contact
                </label>
              </div>
              <div className={styles.buttons}>
                <button
                  className={styles.submit}
                  onClick={() => cancel()}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className={styles.submit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {submitText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUserForm;
