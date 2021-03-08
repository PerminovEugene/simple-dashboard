import { inject, observer } from "mobx-react";
import { UIStore } from "../stores/UIStore";
import { UserStore } from "../stores/UserStore";
import AlphabeticalList from "../components/alphabeticalList";
import Popup from "../components/popup/popup";
import AddUserForm from "../domain/user/form";
import PageLayout from "../layout/pageLayout";
import UserView from "../domain/user/view/userView";
import UserListItem from "../domain/user/listItem";
import Search from "../components/search";
import styles from "./dashboard.module.css";

interface DashboardProps {
  uiStore: UIStore;
  userStore: UserStore;
}

const Dashboard = inject(
  "userStore",
  "uiStore"
)(
  observer(({ userStore, uiStore }: DashboardProps) => {
    const {
      addUser,
      selectedUser,
      selectUser,
      filteredUsers,
      applyFilter,
      editUser,
      deleteUser,
    } = userStore;
    const {
      showAddUserPopup,
      hideAddUserPopup,
      showEditUserPopup,
      hideEditUserPopup,
      isEditUserPopupVisible,
      isAddUserPopupVisible,
    } = uiStore;
    return (
      <PageLayout>
        <nav className={styles.navigation}>
          <Search onChange={applyFilter} />
          <AlphabeticalList
            items={filteredUsers}
            onSelect={selectUser}
            fieldForNaming="firstName"
            selectedId={selectedUser && selectedUser.id}
            emptyListText={"No users found"}
          >
            <UserListItem />
          </AlphabeticalList>
          <button className={styles.addButton} onClick={showAddUserPopup}>
            Add...
          </button>
        </nav>
        <UserView
          user={selectedUser}
          deleteUser={deleteUser}
          showEditUserPopup={showEditUserPopup}
        />
        <Popup hide={hideAddUserPopup} isVisible={isAddUserPopupVisible}>
          <AddUserForm
            submit={addUser}
            onSuccessSubmit={hideAddUserPopup}
            submitText="Add"
            cancel={hideAddUserPopup}
          />
        </Popup>
        <Popup hide={hideEditUserPopup} isVisible={isEditUserPopupVisible}>
          <AddUserForm
            submit={editUser}
            submitText="Edit"
            onSuccessSubmit={hideEditUserPopup}
            cancel={hideEditUserPopup}
            initialData={selectedUser}
          />
        </Popup>
      </PageLayout>
    );
  })
);
export default Dashboard;
