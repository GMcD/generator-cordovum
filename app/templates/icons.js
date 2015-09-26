var fs = require('fs');
var im = require('imagemagick');
var ncp = require('ncp').ncp;
var spawn = require('child_process').spawn;

var imgFolder = __dirname + '/app/img/';
var iosImgFolder = imgFolder + 'ios';
var iosIconFolder = iosImgFolder + '/icons';
var iosSplashFolder = iosImgFolder + '/splash';

var iconPng = imgFolder + 'icon.png';
if (!fs.existsSync(iconPng)){
 	return console.log('Please provide an icon file, at least...');
}

var splashPng = imgFolder + 'splash.png';
if (!fs.existsSync(splashPng)){
 	splashPng = iconPng;
}

if (!fs.existsSync(iosImgFolder)){
 	fs.mkdirSync(iosImgFolder);
}
if (!fs.existsSync(iosIconFolder)){
	fs.mkdirSync(iosIconFolder);
}
if (!fs.existsSync(iosSplashFolder)){
	fs.mkdirSync(iosSplashFolder);
}

/* iOS Icon Images */
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-40.png', width: 40 }, function(err, stdout, stderr) {
    if(err)
      console.log(err)
    else {
      console.log('Created ' + iosIconFolder + '/icon-40.png');
    }
});
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-40@2x.png', width: 80 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-50.png', width: 50 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-50@2x.png', width: 100 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-60.png', width: 60 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-60@2x.png', width: 120 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-76.png', width: 76 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-76@2x.png', width: 152 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-small.png', width: 29 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-small@2x.png', width: 58 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-72.png', width: 72 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon-72@2x.png', width: 144 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon.png', width: 57 });
im.resize({ srcPath: iconPng, dstPath: iosIconFolder + '/icon@2x.png', width: 114 });

ncp(iosIconFolder, 'cordovum/platforms/ios/society/Resources/icons', function (err) {
 	if (err) {
   		return console.error(err);
 	}
 	console.log('Copied iOS icons...');
});

// im.resize({ srcData : splashPng, strip : false, width : 173, height : "173^", customArgs: [ "-gravity", "center", "-extent", "173x173"] };	
// im.resize({ srcData : splashPng, dstPath: iosSplashFolder + '/Default-568h@2x~iphone.png', width: 640, customArgs: [ "-gravity", "center", "-extent", "640x1136"] });

spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '640x1136', iosSplashFolder + '/Default-568h@2x~iphone.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent', '2048x1496', iosSplashFolder + '/Default-Landscape@2x~ipad.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '1024x748', iosSplashFolder + '/Default-Landscape~ipad.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent', '1536x2008', iosSplashFolder + '/Default-Portrait@2x~ipad.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '768x1004', iosSplashFolder + '/Default-Portrait~ipad.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',   '640x960', iosSplashFolder + '/Default@2x~iphone.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',   '320x480', iosSplashFolder + '/Default~iphone.png']);

ncp(iosSplashFolder, 'cordovum/platforms/ios/<%= _.slugify(appName) %>/Resources/splash', function (err) {
 	if (err) {
   		return console.error(err);
 	}
 	console.log('Copied iOS splash...');
});

/* ================================================ */

var androidImgFolder = imgFolder + '/android';

/* Make Folders */
if (!fs.existsSync(androidImgFolder)){
 	fs.mkdirSync(androidImgFolder);
}
var androidImgSubFolder = androidImgFolder + '/drawable';
if (!fs.existsSync(androidImgSubFolder)){
	fs.mkdirSync(androidImgSubFolder);
}
if (!fs.existsSync(androidImgSubFolder + '-ldpi')){
	fs.mkdirSync(androidImgSubFolder + '-ldpi');
	fs.mkdirSync(androidImgSubFolder + '-port-ldpi');
	fs.mkdirSync(androidImgSubFolder + '-land-ldpi');
}
if (!fs.existsSync(androidImgSubFolder + '-mdpi')){
	fs.mkdirSync(androidImgSubFolder + '-mdpi');
	fs.mkdirSync(androidImgSubFolder + '-port-mdpi');
	fs.mkdirSync(androidImgSubFolder + '-land-mdpi');
}
if (!fs.existsSync(androidImgSubFolder + '-hdpi')){
	fs.mkdirSync(androidImgSubFolder + '-hdpi');
	fs.mkdirSync(androidImgSubFolder + '-port-hdpi');
	fs.mkdirSync(androidImgSubFolder + '-land-hdpi');
}
if (!fs.existsSync(androidImgSubFolder + '-xhdpi')){
	fs.mkdirSync(androidImgSubFolder + '-xhdpi');
	fs.mkdirSync(androidImgSubFolder + '-port-xhdpi');
	fs.mkdirSync(androidImgSubFolder + '-land-xhdpi');
}

/* Android Icon Images */
im.resize({ srcPath: iconPng, dstPath: androidImgFolder + '/drawable/icon.png', width: 96 });
im.resize({ srcPath: iconPng, dstPath: androidImgFolder + '/drawable-hdpi/icon.png', width: 72 });
im.resize({ srcPath: iconPng, dstPath: androidImgFolder + '/drawable-ldpi/icon.png', width: 36 });
im.resize({ srcPath: iconPng, dstPath: androidImgFolder + '/drawable-mdpi/icon.png', width: 48 });
im.resize({ srcPath: iconPng, dstPath: androidImgFolder + '/drawable-xhdpi/icon.png', width: 96 });
/* Android Portrait Splash */
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '720x960', androidImgFolder + '/drawable-port-xhdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '480x640', androidImgFolder + '/drawable-port-hdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '320x470', androidImgFolder + '/drawable-port-mdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '320x426', androidImgFolder + '/drawable-port-ldpi/screen.png']);
/* Android Landscape Splash */
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '960x720', androidImgFolder + '/drawable-land-xhdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '640x480', androidImgFolder + '/drawable-land-hdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '470x320', androidImgFolder + '/drawable-land-mdpi/screen.png']);
spawn('convert', [splashPng, '-gravity', 'center', '-extent',  '426x320', androidImgFolder + '/drawable-land-ldpi/screen.png']);

/* Copy into Project */
ncp(androidImgFolder, 'cordovum/platforms/android/res', function (err) {
 	if (err) {
   		return console.error(err);
 	}
 	console.log('Copied Android icons and splash...');
});


