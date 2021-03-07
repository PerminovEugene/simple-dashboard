import AlphabeticalList from '../components/alphabetical-list';
import { inject, observer } from 'mobx-react';
import { UIStore } from '../stores/UIStore';
import { UserStore } from '../stores/UserStore';
import Popup from '../components/popup/popup';
import AddUserForm from '../forms/addUser';

interface DashboardProps {
  uiStore: UIStore;
  userStore: UserStore;
}


const Dashboard = inject('userStore', 'uiStore')(
  observer(({ userStore, uiStore }: DashboardProps) => {
    const { addUser, users } = userStore;
    const { showAddUserPopup, hideAddUserPopup, isAddUserPopupVisible } = uiStore;
    return (
      <div>
        <AlphabeticalList items={users} />
        <button onClick={showAddUserPopup}>Add...</button>
        <Popup hide={hideAddUserPopup} isVisible={isAddUserPopupVisible}>
          <AddUserForm submit={addUser} onSuccessSubmit={hideAddUserPopup}/>
        </Popup>
      </div>
    );
  })
);
export default Dashboard;