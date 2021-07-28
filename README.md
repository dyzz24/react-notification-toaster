simple react toaster component for show notifications 

how to use:
```
import {IToasterTypes, NotificationToast, ToastEvent, toastEventManager} from 'dyzz-toaster';


export const Button = () =>
    <button onClick={() => {
        toastEventManager.emit(ToastEvent.CREATE,
        {timeOutDelay: 9000, indicateLine: true, text: 'it is error toaster', type: IToasterTypes.ERROR})

        toastEventManager.emit(ToastEvent.CREATE,
            {timeOutDelay: 7000, indicateLine: true, text: 'it is notification toaster', type: IToasterTypes.NOTIFICATION})
    }}>show toast</button>

export function App() {
    return (
        <>
            <NotificationToast/>
            <Button/>
        </>
    )
}
```
