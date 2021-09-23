import {useState} from "react";

const electron = window.require('electron');
const {ipcRenderer} = electron;

const RequestGoogleTranslateEventName = 'RequestGoogleTranslate';
const ReplyGoogleTranslateEventName = 'ReplyGoogleTranslate';
const ErrorGoogleTranslateEventName = 'ErrorGoogleTranslate';

export type TranslateMessage = {
  from: string;
  to: string | string[];
  text: string;
}

type TranslatedData = {
  from: string;
  to: string;
  text: string;
  pronunciation: string;
}

export interface TranslatedMessage {
  [key: string]: TranslatedData
}

export const useGoogleTranslate = () => {
  const [translated, setTranslated] = useState<TranslatedMessage>({});

  const handleTranslated = (event: any, args: any) => {
    setTranslated(args);
  };

  const handleTranslateError = (event: any, args: any) => {
    console.log(args);
  };

  ipcRenderer.on(ReplyGoogleTranslateEventName, handleTranslated);
  ipcRenderer.on(ErrorGoogleTranslateEventName, handleTranslateError);

  function removeTranslate() {
    ipcRenderer.off(ReplyGoogleTranslateEventName, handleTranslated);
    ipcRenderer.off(ErrorGoogleTranslateEventName, handleTranslateError);
  }

  // const message: TranslateMessage = {
  //   from: 'en',
  //   to: ['zh-TW', 'zh-CN', 'th', 'ja', 'en'],
  //   text: 'hello'
  // };
  function setTranslateMessage(message: TranslateMessage) {
    ipcRenderer.send(RequestGoogleTranslateEventName, message);
  }

  return {translated, setTranslateMessage, removeTranslate};
};