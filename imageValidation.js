
function imageProportionByResolution(imgUrl, asset, ratioExpected,imageCode){
	const requestImageSize = require('request-image-size');
 	var x = requestImageSize(imgUrl+imageCode)
	.then(size => {
			var proporcion = size.width/ size.height;
			var resolutionTest = 'fail'
			var resolutionExpected = 'fail'
			var resolution = size.width + ' x ' + size.height + ' px';
			var resolution16x9 = '1920 x 1080 px'
			var resolution4x3 = '1440 x 108 px'
			var resolution3x4 = '540 x 720 px'
			var resolution2x3Big = '960 x 1440 px'
			var resolution2x3Small = '480 x 720 px'

			switch(ratioExpected) {
			  case '16x9':
			    resolutionExpected = resolution16x9
				if(resolution == resolution16x9)	
					resolutionTest = 'success'
			    break;
			  case '4x3':
			    resolutionExpected = resolution4x3
				if(resolution == resolution4x3)	
					resolutionTest = 'success'
			    break;

			  case '3x4':
			    resolutionExpected = resolution3x4
				if(resolution == resolution3x4)	

					resolutionTest = 'success'
			    break; 
			    case '2x3':
			    resolutionExpected = resolution2x3Big +'" or "'+resolution2x3Small
				if(resolution == resolution2x3Big || resolution == resolution2x3Small )	
					resolutionTest = 'success'
			    break;  
			   
			} 
	    	console.log(asset+";" +imageCode + ";"+ ratioExpected +";" + resolutionExpected +";"+ resolution+ ";" + resolutionTest);
		})
	.catch(err => console.error(err));
}


'use strict';

const fs = require('fs');

fs.readFile('images_IDs.json', (err, data) => {  
    if (err) throw err;
    let content = JSON.parse(data);
    var assetCount
    var ratioFail
    console.log("Asset;imageCode;ImageRatio;ResolutionExpected;CurrentResolution;ResolutionTest");
    for(var i in content) {
    	var name = content[i]['name'];
    	var values = Object.values(content[i])
    	var keys = Object.keys(content[i])
    	for (var j = 1; j < keys.length; j++) {
    		if (values[j] != null){ 
				imageProportionByResolution('http://us-west-2.pictures.boxxspring.net/realms/115efeb6b8a6f46f01d54c0863e08f77/pictures/',name, keys[j],values[j]);  		
    		}
    	}
    }
    
});
