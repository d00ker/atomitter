var app = require('app');  // Module to control application life.
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

var handleWindow = function() {
  // Create the browser window.
  mainWindow = new BrowserWindow ({'width':900,'height':600,'min-width':900,'min-height':600,'max-width':900, 'max-height':2000, 'zoom-factor': 0.95});
  // set size and position
  if ((windowPosition != null) && (windowSize != null)) {
    console.log(windowSize);
    console.log(windowPosition);
    mainWindow.setSize(windowSize[0], windowSize[1]);
    mainWindow.setPosition(windowPosition[0], windowPosition[1]);
  }
  // and load the twitter.com
  mainWindow.loadUrl('https://twitter.com');
  console.log('twitter.com is loading...');

  //Dynamically load jqery
  mainWindow.webContents.on('did-finish-load', function() {
    console.log('twitter.com is loaded!'); 
    mainWindow.webContents.executeJavaScript('(function () {function loadScript(url, callback) {var script = document.createElement("script")script.type = "text/javascript";if (script.readyState) { //IEscript.onreadystatechange = function () {if (script.readyState == "loaded" || script.readyState == "complete") {script.onreadystatechange = null;callback();}};} else { //Othersscript.onload = function () {callback();};}script.src = url;document.getElementsByTagName("head")[0].appendChild(script);}loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js", function () {console.log("jquery loaded");});})();');
  });

  // Do some JS after page is loaded.
  mainWindow.webContents.on('did-finish-load', function() {
    console.log('twitter.com is loaded!'); 
    mainWindow.webContents.executeJavaScript("var msg;if (window.jQuery) {msg = 'You are running jQuery version: ' + jQuery.fn.jquery;} else {msg = 'jQuery is not installed';}alert(msg);");
  });




  // Handle link clicks.
  mainWindow.webContents.on('new-window', function(event, url, frameName, disposition) {
    if (disposition != 'default') {
      event.preventDefault();
      if (process.platform = 'darwin') {
        var exec = require('child_process').exec, child; // wtf?
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
app.dock.setBadge("badge");