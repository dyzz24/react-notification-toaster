import { useEffect, useState } from 'react';
import * as React from 'react';
import { ToastEvent, toastEventManager } from '../utils/toast-event-manager';
import * as ReactDOM from 'react-dom';
import { Toaster } from './toaster';
import {toasterContainer} from "./toaster-styles.css";




export const makeHash = (length: number) => {
  let result = '';
  const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const NotificationToast:React.FC<INotificationToast> = ({toastClassName, progressIndicatorClassName}) => {
  const [toasts, setToasts] = useState<IToasterData[]>([]);
  const [node, setNode] = useState<Element | null>(null);

  const createToaster = (props: IToasterData) => {
    const id = makeHash(10);
    const data = { ...props, id: id };
    setToasts((prevState) => prevState.concat(data));
  };
  const deleteToast = (id: string) => {
    setToasts((state) => state.filter((item) => item.id !== id));
  };

  const addToasterHandlers = () => {
    toastEventManager.on(ToastEvent.CREATE, createToaster);
    toastEventManager.on(ToastEvent.DELETE_TOAST, deleteToast);
  };

  const createToasterContent = () => {
    const node = document.getElementById('toaster_container');
    if (!node) {
      const containerDomNode = document.createElement('div') as Element;
      containerDomNode.id = 'toaster_container';
      document.body.appendChild(containerDomNode);
      setNode(containerDomNode);
    }
  };

  useEffect(() => {
    addToasterHandlers();
    createToasterContent();
  }, []);

  if (node) {
    return ReactDOM.createPortal(
      <div className={toasterContainer}>
        {toasts.map((el) => (
          <Toaster
              toastClassName={toastClassName}
              progressIndicatorClassName={progressIndicatorClassName}
            key={el.id}
            id={el.id}
            text={el.text}
            deleteCallback={deleteToast}
            timeOutDelay={el.timeOutDelay}
            type={el.type}
            indicateLine={el.indicateLine}
          />
        ))}
      </div>,
      node
    );
  } else return null;
};

export interface IToasterData {
  text: string;
  id?: string;
  type?: IToasterTypes;
  timeOutDelay?: number;
  indicateLine?: boolean;
}

export enum IToasterTypes {
  NOTIFICATION = 'notification',
  ERROR = 'error'
}

export interface INotificationToast {
  toastClassName?: string;
  progressIndicatorClassName?: string;
}
