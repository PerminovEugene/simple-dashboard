import { makeAutoObservable, observable } from "mobx"

export class UIStore {
    isAddUserPopupVisible = false;
    isEditUserPopupVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    public showAddUserPopup = () => {
        this.isAddUserPopupVisible = true;
    }

    public hideAddUserPopup = () => {
        this.isAddUserPopupVisible = false;
    }

    public showEditUserPopup = () => {
        this.isEditUserPopupVisible = true;
    }

    public hideEditUserPopup = () => {
        this.isEditUserPopupVisible = false;
    }
}