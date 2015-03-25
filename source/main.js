var app = require('app');  // Module to control application life.
var ipc = require('ipc'); // Module to send messages
var fs = require('fs'); // Module to use file system
var BrowserWindow = require('browser-window');  // Module to create native browser window.


var windowPosition = null;
var windowSize = null;

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

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', handleWindow);
app.on('activate-with-no-open-windows', handleWindow);

//app.dock.setBadge("badge");
ipc.on('to_badge', function(event, arg) {
  console.log(arg);  // prints "ping"
  app.dock.setBadge(arg == 0 ? '' : arg.toString());
});

function handleWindow() {
  // Create the browser window.
  var windowUrl = "https://twitter.com/";
  var windowWidth = 890;
  mainWindow = new BrowserWindow ({
    'width': windowWidth,
    'height': 600,
    'min-width': windowWidth,
    'min-height': 600,
    'max-width': windowWidth,
    'max-height': 2000,
    'zoom-factor': 0.95,
  });
  // set size and position
  if ((windowPosition != null) && (windowSize != null)) {
    console.log("windowSize is " + windowSize);
    console.log("windowPosition is " + windowPosition);
    mainWindow.setSize(windowSize[0], windowSize[1]);
    mainWindow.setPosition(windowPosition[0], windowPosition[1]);
  }
  // load the twitter.com
  mainWindow.loadUrl('https://twitter.com');
  console.log('twitter.com is loading...');
  // Do some stuff after page is loaded.
  mainWindow.webContents.on('did-finish-load', loadExternalFiles)

  //var windowUrl = mainWindow.webContents.getUrl();
  mainWindow.webContents.on('did-stop-loading', function() {
    if (windowUrl != mainWindow.webContents.getUrl()) {
      windowUrl = mainWindow.webContents.getUrl()
      loadExternalFiles();
    }
    console.log("'did-stop-loading' is called");
  });

  // Handle link clicks.
  mainWindow.webContents.on('new-window', function(event, url, frameName, disposition) {
    if (disposition != 'default') {
      event.preventDefault();
      if (process.platform == 'darwin') {
        var exec = require('child_process').exec, child;
        child = exec('open ' + url + ' -g');
        console.log('open ' + url + ' -g');
      } else { // if not OSX
        var shell = require('shell');
        shell.openExternal(url);
      }
    }
  });
  // Emitted when the window is prepare to be closed.
  mainWindow.on('close', function() {
    windowPosition = mainWindow.getPosition();
    console.log('position has been saved!');
    windowSize = mainWindow.getSize();
    console.log('size has been saved!');
    app.dock.setBadge('');
  });
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  function loadExternalFiles () {
    console.log('external files is loaded!');
    console.log(mainWindow.webContents.getUrl());
    var pathToJS = __dirname + '/atomitter.js';
    var pathToCSS = __dirname + '/atomitter.css';
    console.log("pathToJS is: " + pathToJS);
    console.log("pathToCSS is: " + pathToCSS);
    // load js
    fs.readFile(pathToJS, 'utf8', function (err, data) {
      if (err) throw err;
      //console.log("jsOnWebPage...\n\n" + data);
      mainWindow.webContents.executeJavaScript(data);
    });
    // load css
    fs.readFile(pathToCSS, 'utf8', function (err, data) {
      if (err) throw err;
      //console.log("cssOnWebPage...\n\n" + data);
      mainWindow.webContents.insertCSS(data);
    });
  };
};