/**
 * Class controlling the loading of assets for the Safe-Buster game.
 * 
 * @author - Joshua Middleton.
 */

//Image path variables.
var imageSources = {
    backgroundPath: './graphics/background_safe_minigame.png',
    safePath: './graphics/safe_minigame.png',
    safeOpenPath: './graphics/safe_open_minigame.png',
    dialBackgroundPath: './graphics/support_safe_dial_minigame.png',
    safeDialPath: './graphics/safe_dial.png',
    safeDialRedPath: './graphics/safe_dial_red.png',
    safeDialGreenPath: './graphics/safe_dial_green.png',
    safeScreenPath: './graphics/screen_safe_minigame.png',
    ledPath: './graphics/leds_safe_dial_minigame.png',
    spinButtonPath: './graphics/text_spin_safe_dial_minigame.png',
    safeSparkPath: './graphics/spark_safe.png',
    coinPath: './graphics/coins.png',
    diamondPath: './graphics/diamond.png',
    notePath: './graphics/notes.png',
    goldPath: './graphics/gold.png',
    ringPath: './graphics/ring.png'
};

//Asset Count Variable
var assetCount = 0;
//Expected Asset Count Variable.
var assetCountExpected = 18;

//Image Decleration Variables
var backgroundImage = new Image(),
    safeImage = new Image(),
    safeOpenImage = new Image(),
    dialBackground = new Image(),
    safeDial = new Image(),
    safeDialRed = new Image(),
    safeDialGreen = new Image(),
    safeScreen = new Image(),
    LED = new Image(),
    spinButton = new Image(),
    safeSpark = new Image(),
    coin = new Image(), //15
    diamond = new Image(), //16
    note = new Image(), //17
    gold = new Image(), //18
    ring = new Image(); //19

/**
* (Anonymous) function incrementing asset count variable
* providing asset is loaded accordingly (through given loading functions).
*/
(function () {

    document.fonts.load('1rem "TitanOne"').then(() => {
        console.log("Font: TitanOne Loaded");
        assetCount += 1;
    })

    document.fonts.load('1rem "DimboItalic"').then(() => {
        console.log("Font: DimboItalic Loaded");
        assetCount += 1;
    })

    backgroundImage.onload = function () {
        console.log("Background Image Loaded");
        assetCount += 1;
    }

    safeImage.onload = function () {
        console.log("Safe Image Loaded");
        assetCount += 1;
    }

    safeOpenImage.onload = function () {
        console.log("Safe (Open) Image Loaded");
        assetCount += 1;
    }

    dialBackground.onload = function () {
        console.log("Dial Image Loaded");
        assetCount += 1;
    }

    safeDial.onload = function () {
        console.log("Safe Dial Image Loaded");
        assetCount += 1;
    }

    safeDialRed.onload = function () {
        console.log("Safe Dial (Red) Image Loaded");
        assetCount += 1;
    }

    safeDialGreen.onload = function () {
        console.log("Safe Dial (Green) Image Loaded");
        assetCount += 1;
    }

    safeScreen.onload = function () {
        console.log("Safe Screen Image Loaded");
        assetCount += 1;
    }

    LED.onload = function () {
        console.log("LED Image Loaded");
        assetCount += 1;
    }

    spinButton.onload = function () {
        console.log("Spin Button Image Loaded");
        assetCount += 1;
    }

    safeSpark.onload = function () {
        console.log("Safe Spark Image Loaded");
        assetCount += 1;
    }

    coin.onload = function () {
        console.log("Coin Image Loaded");
        assetCount += 1;
    }

    diamond.onload = function () {
        console.log("Diamond Image Loaded");
        assetCount += 1;
    }

    note.onload = function () {
        console.log("Note Image Loaded");
        assetCount += 1;
    }

    gold.onload = function () {
        console.log("Gold Image Loaded");
        assetCount += 1;
    }

    ring.onload = function () {
        console.log("Ring Image Loaded");
        assetCount += 1;
    }

    //Variables assigning source paths to given Image variables.
    backgroundImage.src = imageSources.backgroundPath;
    safeImage.src = imageSources.safePath;
    safeOpenImage.src = imageSources.safeOpenPath;
    dialBackground.src = imageSources.dialBackgroundPath;
    safeDial.src = imageSources.safeDialPath;
    safeDialRed.src = imageSources.safeDialRedPath;
    safeDialGreen.src = imageSources.safeDialGreenPath;
    safeScreen.src = imageSources.safeScreenPath;
    LED.src = imageSources.ledPath;
    spinButton.src = imageSources.spinButtonPath;
    safeSpark.src = imageSources.safeSparkPath;
    coin.src = imageSources.coinPath;
    diamond.src = imageSources.diamondPath;
    note.src = imageSources.notePath;
    gold.src = imageSources.goldPath;
    ring.src = imageSources.ringPath;
}());

/**
 * Function ensuring that the browser has had enough time to
 * pre-load all assets, If all the assets haven't been loaded,
 * the game will display a message saying that the assets are
 * still being loaded, and delay the safeBuster game from being initiated for 5 seconds
 * else, if all assets are loaded, the game is initiated instantly.
 */
(function () {
    window.onload = function () {
        if (assetCount != assetCountExpected && w == 1920 && h > 900) {
            var loadingMessage = document.getElementsByClassName("loadingAssetsMessage");

            loadingMessage[0].style.display = "block";
            document.getElementById("safeBusterCanvas").style.display = "none";

            setTimeout(function () {
                safeBuster();
                loadingMessage[0].style.display = "none";
                document.getElementById("safeBusterCanvas").style.display = "block";
            }, 5000);
        } else {
            safeBuster();
        }
    };
}());