const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const {app, BrowserWindow} = electron;
const {ipcMain} = electron;
const initAppMenu = require('./app/menu/menu');
const initDockMenu = require("./app/menu/dockMenu");
const initContextMenu = require("./app/menu/contextMenu");

const initGoogleTranslate = require('./app/translate/googleTranslate');

const port = process.env.PORT ? process.env.PORT : 3000;
const ELECTRON_START_URL = `http://localhost:${port}`;


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Translate Tools',
        width: 780,
        height: 520,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            nativeWindowOpen: true,
        },
    });
    mainWindow.loadURL(
        isDev
            ? `${ELECTRON_START_URL}`
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
initGoogleTranslate();

try {
    require('electron-reloader')(module);
} catch {
}
