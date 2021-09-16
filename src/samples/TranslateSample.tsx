import React, {useEffect, useState} from 'react';
const electron = window.require('electron');
const {ipcRenderer} = electron;

export default function TranslateSample() {
    const [text, setText] = useState();

    useEffect(() => {
        const handleTranslated = (event: any, args: any) => {
            console.log(args);
            setText(args);
        };

        ipcRenderer.on('translated', handleTranslated);

        return () => ipcRenderer.off('translated', handleTranslated)
    }, []);


    const click = () => {
        const message = {
            from: 'en',
            to: 'zh-TW',
            text: 'hello'
        };
        ipcRenderer.send('translate', message);
    };

    return (<>
        <button onClick={click}>Send to ipcMain</button>
        <span>{text}</span>
    </>);
}
