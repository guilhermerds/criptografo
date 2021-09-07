const { app, BrowserWindow } = require('electron');

require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });

function createWindow () {
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        icon: __dirname + '/assets/Criptografia.png', 
    })

    win.loadFile('index.html')
}
  
app.whenReady().then(() => {
    createWindow()
})
  