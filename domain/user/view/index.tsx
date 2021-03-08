import style from "./userView.module.css";
import { User } from "../../../stores/UserStore";
import Button from "../../../components/button";
import Avatar from "../../../components/avatar";

interface UserViewProps {
  user: User;
  showEditUserPopup: () => void;
  deleteUser: () => void;
}

const UserView = ({ user, showEditUserPopup, deleteUser }: UserViewProps) => (
  <div className={style.container}>
    {user && (
      <div className={style.view}>
        <div className={style.viewContent}>
          <Avatar text={`${user.firstName[0]}${user.lastName[0]}`} />
          <div className={style.profile}>
            <div className={style.header}>
              <div>{user.firstName}</div>
              <div>{user.middleName}</div>
              <div>{user.lastName}</div>
            </div>
            <div className={style.body}>
              <div className={style.bodyItem}>
                <div>Email</div>
                <div>{user.email}</div>
              </div>
              <div className={style.bodyItem}>
                <div>Group</div>
                <div>{user.group}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.actionsPanel}>
          <div className={style.leftButtons}>
            <Button onClick={() => alert("Is not implemented")} text="Share" />
            <Button onClick={showEditUserPopup} text="Edit" />
          </div>
          <Button onClick={deleteUser} text="Delete" />
        </div>
      </div>
    )}
    {!user && <div>User is not choosen</div>}
  </div>
);
export default UserView;
