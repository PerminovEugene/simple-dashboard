import { User } from "../../../stores/UserStore";
import Button from "../../../components/button";
import Avatar from "../../../components/avatar";
import styles from "./view.module.css";

interface UserViewProps {
  user: User;
  showEditUserPopup: () => void;
  deleteUser: () => void;
}

const UserView = ({ user, showEditUserPopup, deleteUser }: UserViewProps) => (
  <div className={styles.container}>
    {user && (
      <div className={styles.view}>
        <div className={styles.viewContent}>
          <Avatar text={`${user.firstName[0]}${user.lastName[0]}`} />
          <div className={styles.profile}>
            <div className={styles.header}>
              <div>{user.firstName}</div>
              <div>{user.middleName}</div>
              <div>{user.lastName}</div>
            </div>
            <div className={styles.body}>
              <div className={styles.bodyItem}>
                <div>Email</div>
                <div>{user.email}</div>
              </div>
              <div className={styles.bodyItem}>
                <div>Group</div>
                <div>{user.group}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionsPanel}>
          <div className={styles.leftButtons}>
            <Button onClick={() => alert("Is not implemented")} text="Share" />
            <Button onClick={showEditUserPopup} text="Edit" />
          </div>
          <Button onClick={deleteUser} text="Delete" />
        </div>
      </div>
    )}
    {!user && <div>User is not chosen</div>}
  </div>
);
export default UserView;
