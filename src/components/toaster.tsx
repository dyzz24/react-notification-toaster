import  { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { ToasterTimer } from '../utils/timer';
import {INotificationToast, IToasterData, IToasterTypes} from './index';
import toasterStyles from "./toaster-styles.css";


export const Toaster: React.FC<IToaster> = ({
                                              id,
                                              deleteCallback,
                                              text,
                                              timeOutDelay,
                                              indicateLine,
    toastClassName,
    progressIndicatorClassName,
    type
                                            }) => {
  const [timer, setTimer] = useState<ITimer | null>(null);
  const [toasterRemainingPercentage, setToasterRemainingPercentage] = useState(
      100
  );
  const [fadeOut, setFadeOut] = useState(false);

  const timeOutRef = useRef(0);

  const lastTick = () => {
    setTimeout(() => {
      deleteCallback(id || '');
    }, 400);
  };

  useEffect(() => {
    if (timeOutDelay && indicateLine) {
      const localTimer = ToasterTimer(timeOutDelay);
      checkTimerRemaining(localTimer);
      localTimer.resume();
      setTimer(localTimer);
    }

    if (timeOutDelay && !indicateLine) {
      const fadeOutAndDeleteToast = () => {
        setFadeOut(true);
        lastTick();
      };

      const localTimer = ToasterTimer(timeOutDelay, fadeOutAndDeleteToast);
      localTimer.resume();
      setTimer(localTimer);
    }

    return () => {
      setTimer(null);
      window.clearTimeout(timeOutRef.current);
    };
  }, []);

  const checkTimerRemaining = (localTimer: ITimer) => {
    const currentTimerRemaining = localTimer.getRemaining();

    if (currentTimerRemaining > 0 && timeOutDelay) {
      setToasterRemainingPercentage(
          (currentTimerRemaining * 100) / timeOutDelay
      );
      timeOutRef.current = window.setTimeout(() => {
        checkTimerRemaining(localTimer);
      }, 100);
    } else {
      window.clearTimeout(timeOutRef.current);
      setToasterRemainingPercentage(0);
      setTimer(null);
      lastTick();
    }
  };

  const returnToasterTypeClassName = () => {
    switch (type) {
      case IToasterTypes.NOTIFICATION:
        return toasterStyles.notificationToast;
      case IToasterTypes.ERROR:
        return toasterStyles.errorToast;
      default:
        return ''
    }
  }

  const showFadeOut =
      (timeOutDelay && toasterRemainingPercentage <= 0) || fadeOut;

  return (
      <div
          className={`${toasterStyles.toast} ${showFadeOut ? toasterStyles.fadeOut : ''} ${toastClassName || ''} ${returnToasterTypeClassName()}`}
          onClick={() => deleteCallback(id || '')}
          onMouseEnter={() => timer?.pause()}
          onMouseLeave={() => timer?.resume()}
      >
        <span>{text}</span>
        {timeOutDelay && indicateLine && (
            <div
                className={`${toasterStyles.toasterPercentage} ${progressIndicatorClassName || ''}`}
                style={{ width: String(toasterRemainingPercentage) + '%' }}
            ></div>
        )}
      </div>
  );
};

interface ITimer {
  pause: () => void;
  resume: () => void;
  getRemaining: () => number;
}

export interface IToaster extends IToasterData, INotificationToast {
  deleteCallback: (id: string) => void;
}
