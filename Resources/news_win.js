var win = Titanium.UI.currentWindow;


Ti.include('ipadCheck.js');



//Create banner
var bannerImg = Titanium.UI.createImageView({
	image:'images/ad_bottom'+ipadSuffix+'.png',
	height:'auto',
	width:'auto',
	bottom:0

});

var headerImg = Titanium.UI.createImageView({
	image:'images/banner'+ipadSuffix+'.png',
	height:'auto',
	width:'auto',
	top:0



});

win.backgroundImage = 'images/background'+ipadSuffix+'.png';


var news_scroll = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    top:10,
    bottom:10,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false,
    layout:'vertical'
    });
    
    
win.add(news_scroll);

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


win.add(loadIndBg);
win.add(loadInd);

//Array of news articles and their details

    
function getEntries(){
   
     
   
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.onerror = function(e){
        Ti.API.info('IN ERROR ' + e.error);
        
         var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem accessing the server. Please try again later.'});
         
         
         errorBox.show();

    };
     
    xhr.onsendstream = function(e){
 		
        Titanium.API.info('in onsendstream : progress:'+e.progress+' - : status '+this.status+'  readystate:'+this.readyState);

    };
 
    var endPoint = Titanium.App.Properties.getString("newsListURL");
  
    xhr.open('GET',endPoint, true);
 
  
    xhr.send();
    loadInd.show();
	loadIndBg.show();

   
    
    xhr.onload = function(){
 
       Ti.API.info(this.responseText);
    	var newsInfo = eval('('+this.responseText+')'); 
    	
        if(newsInfo.length < 1){
        	 var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem accessing the server. Please try again later.'});
         
         
         errorBox.show();

        
        }
        
     	for (var i = 0; i < newsInfo.length; i++) {  
   			 var imageURL  = newsInfo[i].image; 
   			 var webURL = newsInfo[i].url;
   			 var content = newsInfo[i].excerpt;
   			 var header = newsInfo[i].header;
   			  
   			  			
			var newsItem1 = Ti.UI.createView({
		    backgroundColor:'#FFFFFF',
		    width:250 * ipadMulti,
		    height:'auto',
		    top:20,
		    
		    title:'News Button'
		       
		    
			});
			
			
			    
			
		var newsImage1 =  Ti.UI.createImageView({
			image:imageURL,
			defaultImage:'images/loading_image.png',
			width: 230 * ipadMulti,
			height:230 * ipadMulti,
			top: 10
					});

			
		
		var newsMonth1 = Titanium.UI.createLabel({
		    text:header,
		    height:'auto',
		    width:250  * ipadMulti,
		    color:'#666',
		    font:{fontSize:16, fontWeight:'bold'},
		    textAlign:'left',
		    top:newsImage1.top + newsImage1.height + 10,
		    left:10
		});
		
		
		
		
		
			
		var newsDescription1 = Ti.UI.createLabel({
			text:content,
			height:'auto',
			width:240  * ipadMulti,
			color:'#666',
			font:{fontSize:12},
			textAlign:'left',
			top:newsMonth1.top + newsMonth1.height + 10,
			left:10
			
		});
		
		
		var linkButton = Ti.UI.createButton({
				image:'images/icon_arrow_right.png',
				backgroundImage:'none',
				weblink: webURL,
				top:newsDescription1.top + newsDescription1.height + 10,
				right:5,
				bottom:10,
				width:30,
				height:30
		
		});
		
		
		
		
		linkButton.addEventListener("click", function(e){

 		   if(e.source.weblink){				
				
				var closeButton = Titanium.UI.createButton({
			   title: 'Close',
			   	width:24,
			  	 height:31,
			   	top:10,
			   	left:60
			
				});
			
				
			
			 	var webview = Titanium.UI.createWebView({
			 	url:e.source.weblink,  
			 	title:''
			 	});
			 	
			    var window = Titanium.UI.createWindow({
			    
			    navBarHidden:false, 
			    title:'',
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

		
		newsItem1.add(newsMonth1);
		newsItem1.add(newsImage1);
		newsItem1.add(newsDescription1);
		newsItem1.add(linkButton);	
		Ti.API.info(webURL);
		
		
		news_scroll.add(newsItem1);		
			
   		}  
   			loadInd.hide();
			loadIndBg.hide();

   		
			
			
                           
    };

  
}


getEntries();  
