import { User } from "../../../stores/UserStore";

interface UserListItemProps {
    item?: User;
}

const UserListItem = ({item}: UserListItemProps) => (
    <>
        {item && <>{item.firstName} {item.middleName && item.middleName[0]}. {item.lastName}</>}
    </>
)
export default UserListItem;