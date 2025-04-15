const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('modOS', {
  loadModule: (name) => ipcRenderer.invoke('load-module', name)
});