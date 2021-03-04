simple react toaster component for show notifications 

how to use:

import {NotificationToast, ToastEvent, toastEventManager } from 'dyzz-toaster';


export const Button = () => 
<button onClick={() => {toastEventManager.emit(ToastEvent.CREATE, 
{timeOutDelay: 4000, indicateLine: true, text: 'SHOW'})
}}>show toast</button>

export function App() {
    return (
      <>
       <NotificationToast/>
       <Button/>
       </>
    )
}