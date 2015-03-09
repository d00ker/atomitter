var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

var handleWindow = function() {
  // Create the browser window.
  mainWindow = new BrowserWindow ({'width':900,'height':600,'min-width':900,'min-height':600,'max-width':900, 'max-height':2000, 'zoom-factor': 0.95});
  // and load the index.html of the app.
  mainWindow.loadUrl('https://twitter.com');
  console.log('twitter.com is loading...'); 

  mainWindow.webContents.on('did-finish-load', function() {
    console.log('twitter.com is loaded!'); 
    mainWindow.webContents.executeJavaScript("alert('pyes!');");
  });

  mainWindow.webContents.on('new-window', function(event, url, frameName, disposition) {
    if (disposition != 'default') {
      event.preventDefault();
      var exec = require('child_process').exec, child; // wtf?
      child = exec('open ' + url + ' -g');
      console.log('open ' + url + ' -g'); 
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', handleWindow);
app.on('activate-with-no-open-windows', handleWindow);
app.dock.setBadge("23");