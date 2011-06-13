Titanium.UI.setBackgroundColor('#000000');

Ti.include('ipadCheck.js');
Ti.include('config.js');

var baseWindowTimeout = '';
var splashWindowTimeout = '';

var skippedSponsor = false;

var baseWin = Titanium.UI.createWindow({  
    title:'BASE',
    backgroundColor:'#000000'
});



baseWin.orientationModes = [
		Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT
	];

Titanium.UI.orientation = Ti.UI.PORTRAIT;

 
var win1 = Titanium.UI.createWindow({  
backgroundColor:'#000000',
backgroundImage:'images/background'+ipadSuffix+'.png',
barImage:'images/barImage'+ipadSuffix+'.png',
barColor:'#000000'
});

//win1.hideNavBar();


win1.orientationModes = [
		Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT
		];


var navGroup = Ti.UI.iPhone.createNavigationGroup( {
    window : win1
   });


//Create window for extended epicure
var extendedBG = Titanium.UI.createWindow({  
   backgroundImage:'Default.png'
});


//Create banner
var bannerImg = Titanium.UI.createImageView({
	image:'',
	height:'auto',
	width:'auto',
	bottom:0,
	bannerURL: '',
	preventDefaultImage:true,
	backgroundImage:'none'

});

bannerImg.addEventListener("click", function(e){
 		   if(bannerImg.bannerURL){				
				
				var closeButton = Titanium.UI.createButton({
			   title: 'Close',
			   	width:24,
			  	 height:31,
			   	top:10,
			   	left:60
			
				});
			
				
			
			 	var webview = Titanium.UI.createWebView({
			 	url:bannerImg.bannerURL,  
			 	title:'Advertisement'
			 	});
			 	
			    var window = Titanium.UI.createWindow({
			    
			    navBarHidden:false, 
			    title:'Advertisement',
			    leftNavButton: closeButton
			    
			    });
			    window.add(webview);
			    window.open({modal:true,modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL});
			
			  	closeButton.addEventListener('click',function(e)
			{
			   window.close();
			  			  	
			   
			    
			 });
    }
});



var headerImg = Titanium.UI.createImageView({
	image:'images/banner'+ipadSuffix+'.png',
	height:'auto',
	width:'auto',
	top:0



});

//Create background
var backgroundImg = Titanium.UI.createImageView({
	image:'images/background'+ipadSuffix+'.png'

});

//Create window for 2nd splash
var splash = Titanium.UI.createWindow({  
    title:'Sponsored Splash'    
   
});

var splashImg = Titanium.UI.createImageView({
	image:'',
	width:'auto',
	height:'auto',
	splashURL:''
});

splash.add(splashImg);


splashImg.addEventListener("click", function(e){


				 clearTimeout(baseWindowTimeout);

 		  				var closeButton = Titanium.UI.createButton({
			   title: 'Close',
			   	width:24,
			  	 height:31,
			   	top:10,
			   	left:60
			
				});
			
				
			
			 	var webview = Titanium.UI.createWebView({
			 	url:splashImg.splashURL,  
			 	title:'Advertisement'
			 	});
			 	
			    var window = Titanium.UI.createWindow({
			    
			    navBarHidden:false, 
			    title:'Advertisement',
			    leftNavButton: closeButton
			    
			    });
			    window.add(webview);
			    window.open({modal:true,modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL});
			
			  	closeButton.addEventListener('click',function(e)
			{
			   window.close();
			   splash.close();
			   extendedBG.close();	
			  baseWin.open();


			   
			    
			 });
    
});



var loadIndBg = Ti.UI.createView({
        width:70,
        height:70,
        backgroundColor:'#000000',
        borderRadius:8,
        opacity:0.5
    });


var loadInd = Ti.UI.createActivityIndicator({
        height:50,
        width:50,
        style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG
    }); 
    

//Buttons on menu

var skipButton = Titanium.UI.createButton({
	title:'Skip Ad',
	height:20,
	width:80,
	top:20,
	right:20
	});
	
	


extendedBG.add(skipButton);

skipButton.addEventListener("click", function(e){


				 clearTimeout(baseWindowTimeout);
				clearTimeout(splashWindowTimeout);
		
		
				skippedSponsor = true;
 				getBanners();
 		  	   splash.close();
			   extendedBG.close();	
			  baseWin.open();
});


if(ipadSuffix != '~ipad'){
//iphone layout
var button_submission = Ti.UI.createImageView({

	name:'button_submission',
	image:'images/button_submission'+ipadSuffix+'.png',
    width:'auto',
     height:'auto',
          top:20     
     });

button_submission.addEventListener('click',function(e)
{
	 
	 var submissionWin = Titanium.UI.createWindow({
		url:'submission_win.js',
		title:'Submit Entry',
		barColor:'#000000',
		navgroup: navGroup,
		basewin: baseWin,
		backgroundImage:'images/background'+ipadSuffix+'.png'
		});
		
		
   

	 
	 navGroup.open(submissionWin);
	

});

var button_news = Ti.UI.createImageView({

	name:'button_news',
	image:'images/button_news'+ipadSuffix+'.png',
    width:'auto',
     height:'auto',
     top:100          
     
     });

button_news.addEventListener('click',function(e)
{

var newsWin = Titanium.UI.createWindow({
	url:'news_win.js',
	title:'Food Hunting Prizes',
	barColor:'#000000',
	backgroundImage:'images/background'+ipadSuffix+'.png'
	});

	 navGroup.open(newsWin);
	

});

var button_entries = Ti.UI.createImageView({

	name:'button_entries',
	image:'images/button_past_results'+ipadSuffix+'.png',
	 width:'auto',
     height:'auto',
     top:180
    
     	     });
     

button_entries.addEventListener('click',function(e)
{
			var entriesWin = Titanium.UI.createWindow({
			backgroundImage:'images/background'+ipadSuffix+'.png',
	url:'entries_win.js',
		title:'Past Results',
	barColor:'#000000'
});

		
		 navGroup.open(entriesWin);

});


var button_subscribe = Ti.UI.createImageView({

	name:'button_subscribe',
	image:'images/button_subscribe'+ipadSuffix+'.png',
	 width:'auto',
     height:'auto',
     top:260
   

     	     });
     

button_subscribe.addEventListener('click',function(e)
{		


var subscribeWin = Titanium.UI.createWindow({
backgroundImage:'images/background'+ipadSuffix+'.png',
	url:'subscribe_win.js',
	
	title:'epicure Subscription',
	barColor:'#000000'
});

		 navGroup.open(subscribeWin);

});

}

if(ipadSuffix == '~ipad'){

//ipad layout
var button_submission = Ti.UI.createImageView({

	name:'button_submission',
	image:'images/button_submission'+ipadSuffix+'.png',
    width:'auto',
     height:'auto',
          top:80,
          left:10    
     });

button_submission.addEventListener('click',function(e)
{
var submissionWin = Titanium.UI.createWindow({
backgroundImage:'images/background'+ipadSuffix+'.png',
		url:'submission_win.js',
		
		title:'Submit Entry',
		barColor:'#000000'
		
		});



	 navGroup.open(submissionWin);
	

});

var button_news = Ti.UI.createImageView({

	name:'button_news',
	image:'images/button_news'+ipadSuffix+'.png',
    width:'auto', 
     height:'auto',
     top:210,
     left:10
     
               });

button_news.addEventListener('click',function(e)
{

var newsWin = Titanium.UI.createWindow({
backgroundImage:'images/background'+ipadSuffix+'.png',
	url:'news_win.js',
	
	title:'Food Hunting Prizes',
	barColor:'#000000'
	
	});
	 navGroup.open(newsWin);
	

});

var button_entries = Ti.UI.createImageView({

	name:'button_entries',
	image:'images/button_past_results'+ipadSuffix+'.png',
	 width:'auto',
     height:'auto',
     bottom:280,
     right:10
    
     	     });
     

button_entries.addEventListener('click',function(e)
{
			
		var entriesWin = Titanium.UI.createWindow({
		backgroundImage:'images/background'+ipadSuffix+'.png',
	url:'entries_win.js',
		title:'Past Results',
	barColor:'#000000'
});

		 navGroup.open(entriesWin);

});


var button_subscribe = Ti.UI.createImageView({

	name:'button_subscribe',
	image:'images/button_subscribe'+ipadSuffix+'.png',
	 width:'auto',
     height:'auto',
     bottom:150,
     right:10
   

     	     });
     

button_subscribe.addEventListener('click',function(e)
{		

var subscribeWin = Titanium.UI.createWindow({
backgroundImage:'images/background'+ipadSuffix+'.png',
	url:'subscribe_win.js',
	
	title:'epicure Subscription',
	barColor:'#000000'
});

		 navGroup.open(subscribeWin);

});

}

var buttonsView = Titanium.UI.createView({
	top:20
});

buttonsView.add(button_news);
buttonsView.add(button_submission);
buttonsView.add(button_entries);
buttonsView.add(button_subscribe); 

 
win1.navGroup = navGroup;
win1.add(buttonsView);
win1.add(bannerImg);
baseWin.add(backgroundImg);
baseWin.add(navGroup);


//Function Declarations

function getRemoteFile(filename, url, fn_end) {
    var file_obj = {file:filename, url:url, path: null};
 

    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
    if ( file.exists() ) {
        file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
        fn_end(file_obj);
    }
    
    
    if(true) {
 
        if ( Titanium.Network.online ) {
            var c = Titanium.Network.createHTTPClient();
 
            c.setTimeout(10000);
            c.onload = function()
            {
 				 loadIndBg.hide();
            	loadInd.hide(); 
                if (c.status == 200 ) {
 
 
                    var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,filename);
                    f.write(this.responseData);
                    file_obj.path = Titanium.Filesystem.applicationDataDirectory+Titanium.Filesystem.separator;
                }
 
                else {
                    file_obj.error = 'file not found'; // to set some errors codes
                }
              
            	
            	
            	
                fn_end(file_obj);
 
            };
            c.ondatastream = function(e)
            {
 
               // if ( fn_progress ) fn_progress(e.progress);
            };
            c.error = function(e)
            {
 
                file_obj.error = e.error;
                fn_end(file_obj);
            };
            c.open('GET',url);
            c.send();    
            
            loadIndBg.show();
            loadInd.show();       
        }
        else {
            file_obj.error = 'no internet';
            fn_end(file_obj);
        }
 
 
    }
}

function createSplash(fileObj){
	splashImg.image = fileObj.path+fileObj.file;
	
	
	setTimeout(function() {
	
	
	extendedBG.close();
	splash.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});}, 1000);
	
	baseWindowTimeout = setTimeout(function() {baseWin.open({transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});}, 4000);

}

function showExtendedBG(){

	setTimeout(function() {extendedBG.open();}, 50);
	
	splashWindowTimeout = setTimeout(function() {
	skipButton.hide();
	getBanners();
	
	
	
	
	}, 3000);

}


function getBanners(){
   
   
   	
   
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.onerror = function(e){
        Ti.API.info('IN ERROR ' + e.error);
        
         var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem accessing the server. Please try again later.'});
         
         
         errorBox.show();
         
         //Skip to main screen if splash screen can't be fetched.
         baseWin.open();

        
    };
     
    xhr.onsendstream = function(e){
 		
        //Titanium.API.info('in onsendstream : progress:'+e.progress+' - : status '+this.status+'  readystate:'+this.readyState);

    };
 
    var endPoint = Titanium.App.Properties.getString("bannerListURL");
  
    xhr.open('GET',endPoint, true);
 
  
    xhr.send();
    
      
    xhr.onload = function(){
 
       //Ti.API.info(this.responseText);
       
       try{
       
    	var bannerInfo = eval('('+this.responseText+')'); 
    	
    	
    	var splashScreen = bannerInfo.splashImage;
    	
    	splashImg.splashURL = bannerInfo.splashURL;
    	
    	var bannerImage = bannerInfo[0].image;
    	var bannerURL = bannerInfo[0].url;
    	}
        
        catch(e){
               var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem reaching the server. Please try again by restarting the application.\n\nIf the problem persists, please try again at a later time.'});
         
         
            errorBox.show();

        }
        
        
    	bannerImg.image = bannerImage;
    	bannerImg.bannerURL = bannerURL;
    	
    	//Untested code

		if(!skippedSponsor){
	
			var nameArray = [];
    		nameArray = splashScreen.split('/');
   		 	getRemoteFile(nameArray[nameArray.length-1], splashScreen, createSplash);
		}
   			
						
                           
    };

  
}



//End of Function Declarations


if (Titanium.Network.online == false) {
        Titanium.UI.createAlertDialog({title:'OFFLINE', message:'No network connection detected.\n\nAre you connected to wifi or a mobile network?'}).show();
}
else{
	
	showExtendedBG();

}

//getBanners();




