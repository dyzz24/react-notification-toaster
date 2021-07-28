import {IToasterData} from "../components";

export enum ToastEvent {
    CREATE,
    DELETE_TOAST,
}

class ToastEventManager {
    list = new Map();
    queueCallbacks: Array<() => void> = [];
    timeOutRef  = 0;




    on(event: ToastEvent, callback: Callback) {
        !this.list.has(event) && this.list.set(event, callback);
        return this;
    }


    emit(event: ToastEvent, args: IToasterData | string) {
        if(this.list.size === 0) {
            this.queueCallbacks.push(() => this.emit(event, args));
            this.checkProcessing();
            return;
        }
        this.list.get(event)?.(args);
    }


    checkProcessing = () => {
        window.clearTimeout(this.timeOutRef);
        this.timeOutRef = window.setTimeout(() => {
            this.queueCallbacks.forEach(callback => callback())
        }, 1500)

    }


}

const toastEventManager = new ToastEventManager();
export { toastEventManager };

type Callback = CreateToaster | ClearToaster;

type CreateToaster = ({ text }: IToasterData) => void;
type ClearToaster = (id: string) => void;
