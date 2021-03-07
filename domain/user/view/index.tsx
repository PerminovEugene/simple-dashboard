import style from './userView.module.css';
import { User } from "../../../stores/UserStore";
import Button from '../../../components/button';

interface UserViewProps {
    user: User;
    showEditUserPopup: () => void;
    deleteUser: () => void;
}

const UserView = ({ user, showEditUserPopup, deleteUser }: UserViewProps) => (
    <div className={style.container}>
    {user &&
        <div className={style.view}>
            <div className={style.viewContent}>
                <div className={style.avatar}>
                    {user.firstName[0]} {user.lastName[0]}
                </div>
                <div>
                    <div className={style.header}>
                        <div>{user.firstName}</div>
                        <div>{user.middleName}</div>
                        <div>{user.lastName}</div>
                    </div>
                    <div className={style.body}>
                        <div>{user.email}</div>
                        <div>{user.group}</div>
                    </div>
                </div>
            </div>
            <div className={style.actionsPanel}>
                <Button onClick={() => alert('Is not implemented')} text="Share"/>
                <Button onClick={showEditUserPopup} text="Edit"/>
                <Button onClick={deleteUser} text="Delete"/>
            </div>
        </div>
    }
    {!user &&
        <div>
            User is not choosen
        </div>
    }
    </div>
)
export default UserView;