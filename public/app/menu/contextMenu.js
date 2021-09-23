const {Menu} = require('electron');

const createContextMenu = () => {
    const contextTemplate = [
        {
            label: 'Cut',
            role: 'cut'
        },
        {
            label: 'Copy',
            role: 'copy'
        }
    ];
    return Menu.buildFromTemplate(contextTemplate);
}

const initContextMenu = (win)=>{
    const ctxMenu = createContextMenu();
    win.webContents.on('context-menu', (e, params)=>{
       ctxMenu.popup({
           window: win,
           x: params.x,
           y: params.y
       });
    });
};

module.exports = initContextMenu;