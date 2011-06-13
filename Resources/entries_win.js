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

 var overlay = Titanium.UI.createView({
	backgroundColor:'#000000',
	opacity:0.8
	
	
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
        
    var loadText = Titanium.UI.createLabel({
        color:'#ffffff',
        text:'Getting entries for selected month',
        top:100,
        width:200,
        textAlign:'center',
         font:{fontSize:18, fontWeight:'normal'},
        background:'none',
        height:50
    });




win.backgroundImage = 'images/background'+ipadSuffix+'.png';

var galleryHolder = Titanium.UI.createView({
	top:50,
	width:300,
	height:'auto'
	
});

	var tableview = Ti.UI.createTableView({
			top:50	,
			
			borderColor:'#ffffff',
			separatorColor:'#ffffff'
			

			});

		tableview.addEventListener("click", function(e){
 		   if(e.source.webURL){
    		    Ti.API.info("---> " + e.source.webURL);
    		    
				
				
				
				var closeButton = Titanium.UI.createButton({
			   title: 'Close',
			   	width:24,
			  	 height:31,
			   	top:10,
			   	left:60
			
				});
			
				
			
			 	var webview = Titanium.UI.createWebView({
			 	url:e.source.webURL,  
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

function getEntries(month, year){
   
   
   
   //Set month to actual month numbers
    month = month+1;
   
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.onerror = function(e){
        Ti.API.info('IN ERROR ' + e.error);
        
         var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem accessing the server. Please try again later.'});
         
         
         errorBox.show();

        
    };
     
    xhr.onsendstream = function(e){
 		
   
    };
 
    var endPoint = Titanium.App.Properties.getString("galleryListURL");
  
    xhr.open('GET',endPoint, true);
 	
 	//Ti.API.info('Month:'+month);
 	//Ti.API.info('Year:'+year);
 	
  
    xhr.send({
    	m:month,
    	y:year
    
    });
    
    overlay.show();
    loadInd.show();
    
    xhr.onload = function(){
 
     	var galleryInfo = eval('('+this.responseText+')'); 
    	
    	
    	var totalImages = galleryInfo.length - 1;
        	
    	
    	var imagesData = [];
     	
     	
     	for (var i = 1; i < galleryInfo.length; i++) {  
   			 var imageURL  = galleryInfo[i].image; 
   			 var webURL = galleryInfo[i].weburl;
   			  
   			  			
			var newsImage1 =  Ti.UI.createImageView({
				image:Titanium.App.Properties.getString("newsImageURL")+imageURL,
				webURL: webURL,
				defaultImage:'images/loading_image.png',
				height:90  * ipadMulti,
				width:90 * ipadMulti,
				top: 10
							});
			
			
			imagesData.push(newsImage1);
			
			
   		}  
   		
   			
			var cellWidth = 90;
			var cellHeight = 90;
			var xSpacer = 20;
			var ySpacer = 10;
			var xGrid = 3;
			var yGrid = Math.ceil(totalImages/3);
			 
			var tableData = [];
			 
					 
			var colorSetIndex = 0;
			var cellIndex = 0;
			 
			for (var y=0; y<yGrid; y++){
			    var thisRow = Ti.UI.createTableViewRow({
			    	selectedBackgroundColor:'#ffffff',
			    	borderColor:'#ffffff',
			        className: "grid",
			        layout: "horizontal",
			        height: cellHeight+(1*ySpacer)
			    });
			    for (var x=0; x<xGrid; x++){
			        var thisView = Ti.UI.createView({
			            objName:"grid-view",
			            objIndex:cellIndex.toString(),
			            			            left: ySpacer,
			            height: cellHeight,
			            width: cellWidth
			        });
			        
			        if(imagesData.length != 0){
			        
			            thisView.add(imagesData.pop());
			        }
			        
			    
			        thisRow.add(thisView);
			        cellIndex++;
			
			 
		
			    }
			    tableData.push(thisRow);
			}
					 
				tableview.data = tableData;
				overlay.hide();
				loadInd.hide();	
				
					
		    	if(totalImages < 1){
		    	
		    		 var errorBox = Titanium.UI.createAlertDialog({title:'No Entries Found', message:'There are no photo entries available for the current month that you have selected.'});
		         
		         
		         errorBox.show();
		    	
		    	}

			
                           
    };

  
}



var months = new Array(12);
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate()+15);

var monthYear = Titanium.UI.createLabel({
	color:'#000',
	width:150,
	height:30,
	top:10,
	textAlign:'center',
	font:{fontSize:14,fontWeight:'bold',fontFamily:'Verdana'},
	text:months[defaultDate.getMonth()]+" "+defaultDate.getFullYear()
});


// move scroll view left
var left = Titanium.UI.createButton({
	image:'images/icon_arrow_left.png',
	left:10,
	top:10,
		width:30,
	height:30,
	backgroundImage: 'none'

});
left.addEventListener('click', function(e)
{
	defaultDate.setMonth(defaultDate.getMonth() - 1);
	monthYear.text = months[defaultDate.getMonth()]+" "+defaultDate.getFullYear();
	getEntries(defaultDate.getMonth(), defaultDate.getFullYear()); 
 

});

// move scroll view right
var right = Titanium.UI.createButton({
	image:'images/icon_arrow_right.png',
	right:10,
	top:10,
		backgroundImage: 'none',
	width:30,
	height:30

});
right.addEventListener('click', function(e)
{
	defaultDate.setMonth(defaultDate.getMonth() + 1);
	monthYear.text = months[defaultDate.getMonth()]+" "+defaultDate.getFullYear();
	getEntries(defaultDate.getMonth(), defaultDate.getFullYear());  


});

    overlay.add(loadIndBg);
    overlay.add(loadText);
    //overlay.add(loadInd);
    overlay.show(); 
win.add(right);
win.add(left);
win.add(monthYear);
win.add(tableview);
win.add(overlay);
win.add(loadInd);

getEntries(defaultDate.getMonth(), defaultDate.getFullYear());  


