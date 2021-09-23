const {app, Menu} = require('electron');

const dockMenuTemplate = [
    {
        label: 'New project',
        accelerator: 'Shift+CmdOrCtrl+N',
        click: () => {

        }
    },
    {
        label: 'Open project',
        accelerator: 'CmdOrCtrl+O'
    },
    {type: 'separator'},

];

const dockmenu = Menu.buildFromTemplate(dockMenuTemplate);
const initDockMenu = () => {
    app.dock.setMenu(dockmenu);
};

module.exports = initDockMenu;