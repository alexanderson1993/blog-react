let template;
let _getFileFromInput = ( event ) => event.target.files[0];
let _setPlaceholderText = ( string = "Click or Drag a File Here to Upload" ) => {
	document.getElementById('alert-area').innerText = string;
};
let _addUrlToDatabase = ( url ) => {
	Meteor.call( "storeUrlInDatabase", url, ( error ) => {
		if ( error ) {
			Bert.alert( error.reason, "warning" );
			_setPlaceholderText();
		} else {
			Bert.alert( "File uploaded to Amazon S3!", "success" );
			_setPlaceholderText();
		}
	});
};
let _uploadFileToAmazon = ( file ) => {
	Files.insert(file, function (err, fileObj) {
		if ( err ) {
			Bert.alert( err.message, "warning" );
			_setPlaceholderText();
		} else {
			Bert.alert( "File uploaded to Amazon S3!", "success" );
			_setPlaceholderText();
		}
	});
};
let upload = ( options ) => {
	let file = _getFileFromInput( options.event );
	template = options.template;
	_setPlaceholderText( `Uploading ${file.name}...` );
	_uploadFileToAmazon( file );
};

Modules.client.uploadToAmazonS3 = upload;
