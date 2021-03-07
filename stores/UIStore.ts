import { makeAutoObservable, observable } from "mobx"

export class UIStore {
    isAddUserPopupVisible = false;

    constructor() {
        makeAutoObservable(this);
    }

    public showAddUserPopup = () => {
        this.isAddUserPopupVisible = true;
    }

    public hideAddUserPopup = () => {
        this.isAddUserPopupVisible = false;
    }
}