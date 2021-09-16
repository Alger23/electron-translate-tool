const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const {app, BrowserWindow} = electron;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Translate Tools',
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3003"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({mode: 'detach'});
    }
}

//app.on("ready", createWindow);
app.whenReady().then(createWindow);
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