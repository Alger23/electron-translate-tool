const electron = window.require('electron');
const {ipcRenderer} = electron;

export const translateText = () => {
  const message = {
    from: 'en',
    to: 'zh-TW',
    text: 'hello'
  };
  ipcRenderer.send('translate', message);
};
