# Global requirements:

* ionic cli
* native run
* cordova-res

***Use "npm install -g @ionic/cli native-run cordova-res"
to install all of these***

## Android:

* android sdk (preferably installed Android Studio)
* ***Probably not needed because of capacitor, but don't know for sure:***
    * java 8
    * gradle
* Real device with enabled USB debugging or virtual device "Pixel 4 XL"

## IOS:

* Xcode

### Command to run on android emulator:

ionic capacitor run android --target=Pixel_4_XL_API_29 -l --external

### Command to run on ios emulator

ionic capacitor run ios --target=E64DBDBC-1F72-4609-A285-794BDADC20F0 -l --external

Target is equals to virtual device id, current id is Iphone 12 Pro Max
