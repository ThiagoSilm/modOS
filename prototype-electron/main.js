const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('load-module', async (event, moduleName) => {
  const zipPath = path.join(__dirname, 'modules', `${moduleName}.zip`);
  const tempPath = path.join(__dirname, 'temp', moduleName);
  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath, { recursive: true });
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(tempPath, true);
  }
  const htmlPath = path.join(tempPath, 'index.html');
  return `file://${htmlPath}`;
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});