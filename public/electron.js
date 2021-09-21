const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const {app, BrowserWindow} = electron;
const {ipcMain} = electron;
const initAppMenu = require('./menu/menu');
const initDockMenu = require("./menu/dockMenu");
const initContextMenu = require("./menu/contextMenu");
const translate = require('@vitalets/google-translate-api');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Translate Tools',
        width: 320,
        height: 240,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3003"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
    // Open the DevTools.
    // if (isDev) {
    //     mainWindow.webContents.openDevTools({mode: 'detach'});
    // }
}

app.on("ready", () => {
    createWindow();
    initAppMenu();
    initDockMenu();
    initContextMenu(mainWindow);
});
//app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (mainWindow === null) {
    //     createWindow();
    // }
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('click', () => console.log('do click'));

ipcMain.on('translate', (event, args) => {
    console.log(args)
    translate(args.text, {from: args.from, to: args.to}).then(res => {
        console.log(res.text);
        console.log(res.from.language.iso);
        //=> nl

        event.reply('translated', res.text);
        //mainWindow.webContents.send("translated", res.text);
    }).catch(err => {
        console.error(err);
    });
});