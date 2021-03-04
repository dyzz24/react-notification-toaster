import { IToasterData } from '../components';

export enum ToastEvent {
  CREATE,
  DELETE_TOAST,
}

class ToastEventManager {
  list = new Map();

  on(event: ToastEvent, callback: Callback) {
    !this.list.has(event) && this.list.set(event, callback);
    return this;
  }

  emit(event: ToastEvent, args: IToasterData | string) {
    this.list.get(event)?.(args);
  }
}

const toastEventManager = new ToastEventManager();
export { toastEventManager };

type Callback = CreateToaster | ClearToaster;

type CreateToaster = ({ text }: IToasterData) => void;
type ClearToaster = (id: string) => void;
