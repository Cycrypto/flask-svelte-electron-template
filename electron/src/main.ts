// electron/src/main.ts

import { app, BrowserWindow, protocol } from 'electron';
import * as path from 'path';
import { URL } from 'url';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL('app://./index.html');
}

app.on('ready', () => {
  protocol.interceptFileProtocol('file', (request, callback) => {
    const url = request.url.substr(7); // "file://" 이후 부분을 제거
    callback({ path: path.normalize(`${__dirname}/../dist/${url}`) });
  });

  protocol.registerFileProtocol('app', (request, callback) => {
    const url = request.url.substr(6); // "app://" 이후 부분을 제거
    callback({ path: path.join(__dirname, '../dist', url) });
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
