/*=======================================================================
 Main.js : point d'antrée de l'application Electron.
 voir : https://github.com/atom/electron/blob/master/docs/api
 
=======================================================================*/

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native var 
var ipc = require('ipc'); 
var mainWindow = null;
var configWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  if (app.dock && app.dock.hide) app.dock.hide();
  mainWindow = new BrowserWindow({
      x: -1270,y: 1,
      width: 230, height: 280, 
      frame: false,
      'title-bar-style': 'hidden',
      //transparent: true
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  
  ipc.on("showConfig", function() { 
      if (configWindow)
          configWindow.close();
      configWindow = new BrowserWindow({
          width: 400, height: 500, 
          show: true
      });
      configWindow.loadUrl('file://' + __dirname + '/config.html');
  }
  );
  ipc.on("hideConfig", function() { configWindow.hide();});
});
