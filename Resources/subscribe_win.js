
var win = Titanium.UI.currentWindow;

Ti.include('ipadCheck.js');


function openWebBrowser(currentWindow,url,title){
 
    var current_url = url;
    var w = currentWindow;
 
    w.tabBarHidden = true;
    var win_title = 'web browser';
    if(title!=null){
        win_title = title;
    }
    var webwindow = Ti.UI.createWebView();
    webwindow.url = url;
    w.backButtonTitle = 'Back';
    w.title = win_title;
    w.add(webwindow);
 
    var loadIndBg = Ti.UI.createView({
        width:70,
        height:70,
        backgroundColor:'#000000',
        borderRadius:8,
        opacity:0.5
    });
   // webwindow.add(loadIndBg);       
    var loadInd = Ti.UI.createActivityIndicator({
        height:50,
        width:50,
        style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
    }); 
   // webwindow.add(loadInd);
    
    
    var flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
 
    
    // create a back button image
    var back_button = Ti.UI.createButton({
       systemButton: Ti.UI.iPhone.SystemButton.REWIND,
       enabled:false
    });
    back_button.addEventListener('click', function(){
        webwindow.goBack();
    });
    // create a forward button image
    var forward_button = Ti.UI.createButton({
       systemButton:Ti.UI.iPhone.SystemButton.FAST_FORWARD,
       enabled:false
    });
    forward_button.addEventListener('click', function(){
        webwindow.goForward();
    });
    var refresh_button = Ti.UI.createButton({
        systemButton:Ti.UI.iPhone.SystemButton.REFRESH
    });
    refresh_button.addEventListener('click', function(){
        webwindow.reload();
    });
    // add the control buttons to the toolbar
    w.toolbar = [back_button,flexSpace,refresh_button,flexSpace,forward_button];
    // show activity when loading
    webwindow.addEventListener('beforeload',function(e){
        loadIndBg.show();
        loadInd.show();
    }); 
    webwindow.addEventListener('load',function(e){
        loadIndBg.hide();
        loadInd.hide();
        // set the control buttons
        if(webwindow.canGoForward()){
            forward_button.enabled = true;
        } else {            
            forward_button.enabled = false;
        }
        if(webwindow.canGoBack()){
            back_button.enabled = true;
        } else {            
            back_button.enabled = false;
        }
        current_url = e.url;
    });
    // open the browser window (relative to the current window - [win])
   
 
}

openWebBrowser(win, Titanium.App.Properties.getString("subscriptionURL"), Titanium.App.Properties.getString("subscriptionTitle"));
