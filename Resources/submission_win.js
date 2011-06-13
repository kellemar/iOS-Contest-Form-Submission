var win = Titanium.UI.currentWindow;


Ti.include('ipadCheck.js');


var pb=Titanium.UI.createProgressBar({
    width:250,
    min:0.0,
    max:1.0,
    value:0.0,
    color:'#fff',
    message:'Uploading your submission...',
    font:{fontSize:14, fontWeight:'bold'},
    style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
});


var overlay = Titanium.UI.createView({
	backgroundColor:'#000000',
	opacity:0.8
	
	
	});
	
var anim_out = Titanium.UI.createAnimation();
anim_out.opacity=0;
anim_out.duration = 250;


var anim_in = Titanium.UI.createAnimation();
anim_in.opacity=0.8;
anim_in.duration = 250;


function getnHeight(someimage, nWidth) { 

	var blob = someimage.toBlob(); 

	if(blob.width <= nWidth){ 

		return someimage; 

	}

	else{ 

		var nHeight = (blob.height / blob.width) * nWidth; 
		var reducedImageView = Titanium.UI.createImageView({}); 
		reducedImageView.image = blob ; 
		reducedImageView.width = parseInt(nWidth, 10); 
		reducedImageView.height = parseInt(nHeight, 10); 
		return reducedImageView; 
	}
};


function upload(firstName,  email,  rest_name,  country_name,  dish_name,  comments,  imageFile, mobileNum){
 
   Titanium.API.info("sending information");
 
    // you need to set this twice to stop the phone going to sleep during an upload
    Ti.App.idleTimerDisabled = false;
    Ti.App.idleTimerDisabled = true;
 
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 1000000;
    xhr.onerror = function(e){
        Ti.API.info('IN ERROR ' + e.error);
        
         var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem accessing the server. Please try again later.'});
         
         
         errorBox.show();

    };
    xhr.onload = function(){
 
              
        // let the phone sleep again
        Ti.App.idleTimerDisabled = false;
        
        overlay.hide();
        pb.hide();
                
        if(this.responseText == 'photo-success'){
        
         var successBox = Titanium.UI.createAlertDialog({title:'Submission Complete!', message:'Your food hunting submission has been successfully uploaded!'});
         
         
         successBox.show();
         
         
         successBox.addEventListener('click',function(e)
			{
				if(e.index == 0){
					
							win.navgroup.close(Titanium.UI.currentWindow);
				}
			
			});
			
         
           
       }
        
        
        else{
        
        	var errorBox = Titanium.UI.createAlertDialog({title:'Error', message:'There is a problem with the upload of your submission. Please try again later.'});
         
         
         errorBox.show();

             } 
                   
    };
 
    xhr.onsendstream = function(e){
 		
       		pb.value = e.progress;
    };
 
    var endPoint = Titanium.App.Properties.getString("submissionURL");
 
 
 	xhr.setRequestHeader("Content-Type","multipart/form-data");
 
    xhr.open('POST',endPoint);
 
  
    xhr.send({
    	action:'photosubmit',
    	nggID:'812',
        s_name:firstName,
        s_email:email,
        rest_name:rest_name,
        rest_country:country_name,
        pet_name:dish_name,
        photo_des:comments,
        uploadedfile:imageFile,
        s_mobile:mobileNum
    });
    
    
    overlay.show();
    pb.show();
 
}
 

var form_scroll = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false
       });
       
       
var formView = Titanium.UI.createView({
	width:270,
	height:'auto',
	backgroundColor:'#FFFFFF',
	top:10


});

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

//win.add(bannerImg);




var firstName = Titanium.UI.createLabel({
	color:'#000',
	text:'Your Name',
	top:10,
	left:10,
		width:100,
	height:'auto'
});

formView.add(firstName);

var firstNameField = Titanium.UI.createTextField({
	hintText:'enter your name',
	height:35,
	top:35,
		width:250,
       borderWidth:1,
    borderColor:'#000000'

});

formView.add(firstNameField);

//
//  CREATE FIELD EMAIL ADDRESS
//
var emailAddress = Titanium.UI.createLabel({
	color:'#000',
	text:'Email Address',
	top:75,
	left:10,
	width:200,
	height:'auto'
});

formView.add(emailAddress);

var emailAddressField = Titanium.UI.createTextField({
	hintText:'enter your email address',
	height:35,
	top:100,
	
	width:250,
       borderWidth:1,
    borderColor:'#000000'
	
	});

formView.add(emailAddressField);


//
//  CREATE FIELD PHONE NUMBER
//
var mobileNumber = Titanium.UI.createLabel({
	color:'#000',
	text:'Mobile number (Optional)',
	top:140,
	left:10,
	width:200,
	height:'auto'
});

formView.add(mobileNumber);

var mobileNumberField = Titanium.UI.createTextField({
	hintText:'enter your mobile number',
	height:35,
	top:165,
	
	width:250,
       borderWidth:1,
    borderColor:'#000000'
	
	});

formView.add(mobileNumberField);



//
//  CREATE FIELD RESTAURANT
//
var restaurantName = Titanium.UI.createLabel({
	color:'#000',
	text:'Restaurant',
	top:205,
	left:10,
	width:100,
	height:'auto'
});

formView.add(restaurantName);

var restaurantNameField = Titanium.UI.createTextField({
	hintText:'enter the restaurant',
	height:35,
	top:230,
	
	width:250,
       borderWidth:1,
    borderColor:'#000000'
});

formView.add(restaurantNameField);


//
//  CREATE FIELD COUNTRY
//
var countryName = Titanium.UI.createLabel({
	color:'#000',
	text:'Country',
	top:270,
	left:10,
	width:100,
	height:'auto'
});

formView.add(countryName);

var countryNameField = Titanium.UI.createTextField({
	hintText:'enter the country',
	height:35,
	top:295,
	
	width:250,
       borderWidth:1,
    borderColor:'#000000'
});

formView.add(countryNameField);

//
//  CREATE FIELD NAME OF DISH
//
var dishName = Titanium.UI.createLabel({
	color:'#000',
	text:'Dish Name',
	top:335,
	left:10,
	width:100,
	height:'auto'
});

formView.add(dishName);

var dishNameField = Titanium.UI.createTextField({
	hintText:'enter the dish name',
	height:35,
	top:360,
	   borderWidth:1,
    borderColor:'#000000',

	width:250
});

formView.add(dishNameField);


//
//  CREATE FIELD COMMENTS
//
var commentsName = Titanium.UI.createLabel({
	color:'#000',
	text:'Comments',
	top:400,
	left:10,
	width:100,
	height:'auto'
});

formView.add(commentsName);


var commentsNameField = Titanium.UI.createTextArea({
   hintText:'enter your comments',
    height:80,
    width:250,
    top:425,
    textAlign:'left',
       borderWidth:1,
    borderColor:'#000000'
    

});


formView.add(commentsNameField);


//
//  CREATE FIELD IMAGE
//
var imageHolder = Titanium.UI.createImageView({
	image:'images/photo_cam.png',
	top:550,
	width:150,
	height:124
	
});



var photoText = Titanium.UI.createLabel({
	color:'#000',
	text:'Click to add photo',
	top:680,
	width:150,
	textAlign:'center',
	 font:{fontSize:10, fontWeight:'italic'},

	height:'auto'
});

formView.add(photoText);


imageHolder.addEventListener('click',function(e)
{

	var dialog = Titanium.UI.createOptionDialog({
        options: ['Take Photo or Video','Choose Existing', 'Cancel'],
        cancel:2
    });
 
    dialog.addEventListener('click', function(e) {
        if (e.index == 0) {
            
            
    Titanium.Media.showCamera({

	success:function(event)
	{
		var cropRect = event.cropRect;
		var image = event.media;

		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		{
			Ti.API.info("success! event: " + JSON.stringify(event));
			imageHolder.image = event.media;
			
					}
		
		else
		{
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function()
	{
	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Camera'});

		// set message
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
	},
	saveToPhotoGallery:true,
	allowEditing:false,
	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});

            
            
            
            
            
        } else if (e.index == 1) {
           
           
           
         Titanium.Media.openPhotoGallery({

	success:function(event)
	{
		var cropRect = event.cropRect;
		var image = event.media;

		Ti.API.debug('Our type was: '+event.mediaType);
		if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
		{
			imageHolder.image = event.media;
			
			Ti.API.info("success! event: " + JSON.stringify(event));
		}
		
		else
		{
			alert("got the wrong type back ="+event.mediaType);
		}
	},
	cancel:function()
	{
	},
	error:function(error)
	{
		// create alert
		var a = Titanium.UI.createAlertDialog({title:'Camera'});

		// set message
		if (error.code == Titanium.Media.NO_CAMERA)
		{
			a.setMessage('Please run this test on device');
		}
		else
		{
			a.setMessage('Unexpected error: ' + error.code);
		}

		// show alert
		a.show();
	},
	allowEditing:false,
	mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});
  
           
           
           
           
        }
    });
    dialog.show();





		

});



formView.add(imageHolder);


//
// CREATE BUTTON
//
var submitButton = Titanium.UI.createButton({
	title:'Submit my Entry',
	top:720,
	height:30,
	width:250,
	bottom:20,
		backgroundColor:'#000000',
	backgroundImage:'none'
});

submitButton.addEventListener('click',function(e)
{

	 if (Titanium.Network.online == false) {
        Titanium.UI.createAlertDialog({title:'OFFLINE', message:'No network connection detected.\n\nAre you connected to wifi or a mobile network?'}).show();
    }   
	
	else if(firstNameField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter your name'}).show();
	}

	else if(emailAddressField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter your email address'}).show();
	}

	else if(restaurantNameField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter the restaurant name'}).show();
	}

	else if(countryNameField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter your country'}).show();
	}

	else if(dishNameField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter the dish name'}).show();
	}

	else if(commentsNameField.value == ''){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please enter your comments'}).show();
	}
	
	

	else if(imageHolder.image == 'http://'){
		  Titanium.UI.createAlertDialog({title:'Incomplete Form', message:'Please choose a photo'}).show();
	}

	
	else{

		var blob = imageHolder.toBlob();
		var resizedimage = getnHeight(imageHolder, blob.width/2);

		upload(firstNameField.value,emailAddressField.value, mobileNumberField.value, restaurantNameField.value,countryNameField.value,dishNameField.value,commentsNameField.value,resizedimage.toImage());


	}
});

formView.add(submitButton);

form_scroll.add(formView);

win.add(form_scroll);


var overlay = Titanium.UI.createView({
	backgroundColor:'#000000',
	opacity:0.8
	
	
	});

win.add(overlay);

overlay.hide();

win.add(pb);

 	
 	
       
         
         
