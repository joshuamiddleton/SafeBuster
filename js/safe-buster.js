/**
 * Class controlling the visual aspect of the Safe-Buster
 * Game. (Canvas)
 * 
 * @author - Joshua Middleton.
 */

//Variable holding window Width (cross-platform)
var w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

//Variable holding window Height (cross-platform)
var h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

//Variables used for dial manipulation.
var nextSpinNumber, currentDegrees, targetDegrees, degreesToSpin;
var dialSpinning = false;
var bonusWonDegrees = 0;
var degreesSpan = 0;
var spinNumber = 2;

//Variable holding Spin Button animated image index.
var spinButtonCurrentIndex = 11;

//Bonus image array (holding which bonus images to display).
var bonusImages = [];

//Safe Image X and Y Array variables.
var safeXValue = [315, 485, 655, 315, 485, 655, 315, 485, 655],
    safeYValue = [220, 220, 220, 360, 360, 360, 500, 500, 500],
    numXValue = [385, 555, 725, 382, 553, 722, 385, 552, 723],
    numYValue = [305, 305, 305, 445, 447, 445, 585, 585, 585];

//Spark Animation X and Y Array variables.
var sparkX = [910, 845, 825, 855, 925, 1010, 1074, 1081, 1024];
var sparkY = [313, 365, 450, 530, 572, 564, 504, 394, 321];

//Ensuring Window width is 1920 and height is above 900 and equal to or less than 1080.
if (w == 1920 && h > 900 && h <= 1080) {
    function safeBuster() {
        // Get canvas
        canvas = document.getElementById("safeBusterCanvas");
        //Sets the Canvas Width.
        canvas.width = window.innerWidth * .75;
        //Sets the Canvas Height.
        canvas.height = window.innerHeight * .75;
        c = canvas.getContext("2d");

        //Animated images array.
        var animatedImages = [],
            canvas;

        /**
         * Function looping animated images, ensuring that they are
         * re-drawn on a loop (providing an animated effect).
         */
        function animationLoop() {
            window.requestAnimationFrame(animationLoop);

            //Used to determine how fast the dial should spin.
            if (dialSpinning == true) {
                if (degreesSpan == degreesToSpin) {
                    dialSpinning = false;
                } else {
                    if (spinAmount == 1) {
                        degreesSpan += 8; //4
                    } else if (spinAmount == 2) {
                        degreesSpan += 4; //2
                    } else if (spinAmount == 3) {
                        degreesSpan += 2; //2
                    } else if (spinAmount == 4) {
                        degreesSpan += 2;
                    }
                }
            }

            //Determines how fast the 'winning' dial animation should spin.
            if (dialSpinning == false && bonusFound == true) {
                if (spinAmount > 2) {
                    bonusWonDegrees += 2.5;
                } else {
                    bonusWonDegrees += 5;
                }
            }

            //Displays the 'winAnimation' images depending on what
            //bonus value has been achieved.
            if (bonusFound == true) {
                if (spunBonuses[spinAmount - 1] == 15) {
                    winAnimation(imgOneX, imgOneY, coin);
                    winAnimation(imgTwoX, imgTwoY, coin);
                } else if (spunBonuses[spinAmount - 1] == 16) {
                    winAnimation(imgOneX, imgOneY, diamond);
                    winAnimation(imgTwoX, imgTwoY, diamond);
                } else if (spunBonuses[spinAmount - 1] == 17) {
                    winAnimation(imgOneX, imgOneY, note);
                    winAnimation(imgTwoX, imgTwoY, note);
                } else if (spunBonuses[spinAmount - 1] == 18) {
                    winAnimation(imgOneX, imgOneY, gold);
                    winAnimation(imgTwoX, imgTwoY, gold);
                } else if (spunBonuses[spinAmount - 1] == 19) {
                    winAnimation(imgOneX, imgOneY, ring);
                    winAnimation(imgTwoX, imgTwoY, ring);
                }
            }

            //Draws the canvas, this ensures that the animation is cleared and re-drawn.
            drawCanvas();

            //Removes spin button.
            if (bonusFound == true || spinAmount >= 4 || bonusNumber != null) {
                animatedImages.splice(2, 1);
            }

            //Updates and renders the animation, for each image in the animatedImage array.
            for (i = 0; i < animatedImages.length; i++) {
                animatedImages[i].update();
                animatedImages[i].render();
            }
        }

        /**
         * Function animating any given image,
         * this function allows you to specify which part
         * of an image should be animated, this is determined through
         * designating the width and heigh of the image, and how many frames
         * the image has.
         * @param {*} img - Image to animate.
         */
        function animateImage(img) {

            var image = {},
                frameIndex = 0,
                tickCounter = 0,
                ticksPerFrame = img.ticksPerFrame || 0,
                numberOfFrames = img.numberOfFrames || 1;

            image.context = img.context;
            image.width = img.width;
            image.height = img.height;
            image.x = 0;
            image.y = 0;
            image.image = img.image;
            image.scaleRatio = 1;

            image.update = function () {

                tickCounter += 1;

                if (tickCounter > ticksPerFrame) {

                    tickCounter = 0;

                    // If the current frame index is in range
                    if (frameIndex < numberOfFrames - 1) {
                        // Go to the next frame
                        frameIndex += 1;
                    } else {
                        frameIndex = 0;
                    }
                }
            };

            image.render = function () {

                // Draw the animation
                image.context.drawImage(
                    image.image,
                    frameIndex * image.width / numberOfFrames,
                    0,
                    image.width / numberOfFrames,
                    image.height,
                    image.x,
                    image.y,
                    image.width / numberOfFrames * image.scaleRatio,
                    image.height * image.scaleRatio);
            };

            image.getFrameWidth = function () {
                return image.width / numberOfFrames;
            };
            return image;
        }

        //LEDAnimation animated image function.
        function LEDAnimation(x, y, scale) {
            var ledIndex;
            ledIndex = animatedImages.length;

            // Create sprite
            animatedImages[ledIndex] = animateImage({
                context: canvas.getContext("2d"),
                width: 354,
                height: 44,
                image: LED,
                numberOfFrames: 3,
                ticksPerFrame: 25
            });

            animatedImages[ledIndex].x = x;
            animatedImages[ledIndex].y = y;
            animatedImages[ledIndex].scaleRatio = scale;
        }

        //SpinButton animated image function.
        function spinButtonAnimate(x, y, scale) {
            var spinButtonIndex;
            spinButtonIndex = animatedImages.length;

            // Create sprite
            animatedImages[spinButtonIndex] = animateImage({
                context: canvas.getContext("2d"),
                width: 144,
                height: 61,
                image: spinButton,
                numberOfFrames: 2,
                ticksPerFrame: 25
            });

            animatedImages[spinButtonIndex].x = x;
            animatedImages[spinButtonIndex].y = y;
            animatedImages[spinButtonIndex].scaleRatio = scale;
        }

        //Safe Spark animated image function.
        function safeSparkAnimation(x, y, scale) {
            var safeSparkIndex;
            safeSparkIndex = animatedImages.length;

            // Create sprite
            animatedImages[safeSparkIndex] = animateImage({
                context: canvas.getContext("2d"),
                width: 498,
                height: 249,
                image: safeSpark,
                numberOfFrames: 2,
                ticksPerFrame: 25
            });

            animatedImages[safeSparkIndex].x = x;
            animatedImages[safeSparkIndex].y = y;
            animatedImages[safeSparkIndex].scaleRatio = scale;
        }

        //Winning bonus animated image function.
        function winAnimation(x, y, winImage) {
            var winIndex;
            winIndex = animatedImages.length;

            // Create sprite
            animatedImages[winIndex] = animateImage({
                context: canvas.getContext("2d"),
                width: 400,
                height: 164,
                image: winImage,
                numberOfFrames: 2,
                ticksPerFrame: 25
            });

            animatedImages[winIndex].x = x;
            animatedImages[winIndex].y = y;
            animatedImages[winIndex].scaleRatio = .66;
        }

        /**
         * Function calculating how many degrees the safe dial
         * should spin from its given position to the degrees
         * in which the next spun number is.
         */
        function calculateDegrees() {
            nextSpinNumber = spunNumbers[spinAmount - 1];
            currentDegrees = 360 / 9 * spinNumber;
            targetDegrees = 360 / 9 * nextSpinNumber;
            degreesToSpin = currentDegrees - targetDegrees + 720;
            console.log("Current Degrees: " + currentDegrees + " | Target Degrees: " + targetDegrees);
            console.log("Next Spin Number: " + nextSpinNumber + " | Degrees to Spin: " + degreesToSpin);
        }

        /**
         * Function rotating an image.
         * 
         * @param {*} image - Image to rotate.
         * @param {*} x - X value of image on canvas.
         * @param {*} y - Y value of image on canvas.
         * @param {*} width - Width of image.
         * @param {*} height - Height of image.
         * @param {*} degrees - Degrees to rotate.
         */
        function rotateImage(image, x, y, width, height, degrees) {
            var rad = degrees * Math.PI / 180;
            c.translate(x + width / 2, y + height / 2);
            c.rotate(rad);
            c.drawImage(image, width / 2 * (-1), height / 2 * (-1), width, height);
            c.rotate(rad * (-1));
            c.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
        }

        /**
         * Function pushing appropiate bonus
         * image to bonusImages array depending on which
         * bonus was chosen upon spinning.
         */
        function drawBonuses() {
            if (spunBonuses[spinAmount - 1] == 15) {
                bonusImages.push(coin);
            } else if (spunBonuses[spinAmount - 1] == 16) {
                bonusImages.push(diamond);
            } else if (spunBonuses[spinAmount - 1] == 17) {
                bonusImages.push(note);
            } else if (spunBonuses[spinAmount - 1] == 18) {
                bonusImages.push(gold);
            } else if (spunBonuses[spinAmount - 1] == 19) {
                bonusImages.push(ring);
            }
        }

        /**
         * Function drawing the canvas, and all associated assets onto the canvas.
         */
        function drawCanvas() {
            c.drawImage(backgroundImage, canvas.width / 2 - backgroundImage.width / 2, canvas.height / 2 - backgroundImage.height / 2);

            c.save();
            c.fillStyle = 'BLACK';
            if (dialSpinning == false) {
                if (bonusFound == false) {
                    if (spinAmount == 0) {
                        c.font = '28px TitanOne';
                        c.fillText('Match a pair of symbols for a safe busting multiplier!', 320, 105);
                        c.fillText('TOUCH THE DIAL TO SPIN YOUR 4 DIGIT COMBINATION', 335, 135);
                    } else if (spinAmount > 0 && spinAmount < 4) {
                        c.font = '22px TitanOne';
                        c.fillText("CLICK THE SPIN BUTTON TO SPIN AGAIN! - (YOU HAVE " + (4 - spinAmount) + " SPINS LEFT)", 350, 155);
                        c.font = '50px TitanOne';
                        c.fillStyle = 'BLACK';
                        c.fillText("YOU HAVE OPENED SAFE " + spunNumbers[spunNumbers.length - 1] + "!", 383, 120);
                    } else {
                        c.font = '38px TitanOne';
                        c.fillText('YOU ARE UNLUCKY!', 525, 110);
                        c.fillText("YOU HAVE NOT FOUND A BONUS!", 420, 145);
                    }
                } else if (bonusFound == true) {
                    c.font = '40px TitanOne';
                    c.fillText(bonusNumber + "X BONUS MULTIPLIER!!!", 455, 110);
                    c.fillText("YOU HAVE WON £" + (bonusNumber * 5) + ".00", 478, 145);
                }
            } else if (dialSpinning == true) {
                c.font = '78px TitanOne';
                c.fillText('SPINNING!', 520, 140);
            }

            c.restore();

            c.font = '45px TitanOne';
            c.fillStyle = 'WHITE';

            var safeNum = 1;

            for (i = 0; i < 9; i++) {
                if (!spunNumbers.includes(safeNum)) {
                    c.drawImage(safeImage, safeXValue[i], safeYValue[i]);
                    c.fillText(safeNum, numXValue[i], numYValue[i]);
                } else {
                    if (dialSpinning == true && safeNum == spunNumbers[spunNumbers.length - 1]) {
                        c.drawImage(safeImage, safeXValue[i], safeYValue[i]);
                        c.fillText(safeNum, numXValue[i], numYValue[i]);
                    } else {
                        c.drawImage(safeOpenImage, safeXValue[i] - 35, safeYValue[i] - 25);
                        if (spinAmount == 1) {
                            c.drawImage(bonusImages[0], 0, 0, 200, 164, safeXValue[spunNumbers[0] - 1] + 10, safeYValue[spunNumbers[0] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[0], safeXValue[spunNumbers[0] - 1] + 45, safeYValue[spunNumbers[0] - 1] + 130);
                        } else if (spinAmount == 2) {
                            c.drawImage(bonusImages[0], 0, 0, 200, 164, safeXValue[spunNumbers[0] - 1] + 10, safeYValue[spunNumbers[0] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[0], safeXValue[spunNumbers[0] - 1] + 45, safeYValue[spunNumbers[0] - 1] + 130);
                            if (dialSpinning == false) {
                                c.drawImage(bonusImages[1], 0, 0, 200, 164, safeXValue[spunNumbers[1] - 1] + 10, safeYValue[spunNumbers[1] - 1] + 10, 132, 108);
                                c.fillText("X" + spunBonuses[1], safeXValue[spunNumbers[1] - 1] + 45, safeYValue[spunNumbers[1] - 1] + 130);
                            }
                        } else if (spinAmount == 3) {
                            c.drawImage(bonusImages[0], 0, 0, 200, 164, safeXValue[spunNumbers[0] - 1] + 10, safeYValue[spunNumbers[0] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[0], safeXValue[spunNumbers[0] - 1] + 45, safeYValue[spunNumbers[0] - 1] + 130);
                            c.drawImage(bonusImages[1], 0, 0, 200, 164, safeXValue[spunNumbers[1] - 1] + 10, safeYValue[spunNumbers[1] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[1], safeXValue[spunNumbers[1] - 1] + 45, safeYValue[spunNumbers[1] - 1] + 130);
                            if (dialSpinning == false) {
                                c.drawImage(bonusImages[2], 0, 0, 200, 164, safeXValue[spunNumbers[2] - 1] + 10, safeYValue[spunNumbers[2] - 1] + 10, 132, 108);
                                c.fillText("X" + spunBonuses[2], safeXValue[spunNumbers[2] - 1] + 45, safeYValue[spunNumbers[2] - 1] + 130);
                            }
                        } else if (spinAmount == 4) {
                            c.drawImage(bonusImages[0], 0, 0, 200, 164, safeXValue[spunNumbers[0] - 1] + 10, safeYValue[spunNumbers[0] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[0], safeXValue[spunNumbers[0] - 1] + 45, safeYValue[spunNumbers[0] - 1] + 130);
                            c.drawImage(bonusImages[1], 0, 0, 200, 164, safeXValue[spunNumbers[1] - 1] + 10, safeYValue[spunNumbers[1] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[1], safeXValue[spunNumbers[1] - 1] + 45, safeYValue[spunNumbers[1] - 1] + 130);
                            c.drawImage(bonusImages[2], 0, 0, 200, 164, safeXValue[spunNumbers[2] - 1] + 10, safeYValue[spunNumbers[2] - 1] + 10, 132, 108);
                            c.fillText("X" + spunBonuses[2], safeXValue[spunNumbers[2] - 1] + 45, safeYValue[spunNumbers[2] - 1] + 130);
                            if (dialSpinning == false) {
                                c.drawImage(bonusImages[3], 0, 0, 200, 164, safeXValue[spunNumbers[3] - 1] + 10, safeYValue[spunNumbers[3] - 1] + 10, 132, 108);
                                c.fillText("X" + spunBonuses[3], safeXValue[spunNumbers[3] - 1] + 45, safeYValue[spunNumbers[3] - 1] + 130);
                            }
                        }
                    }
                }
                safeNum += 1;
            }

            c.drawImage(dialBackground, 850, 315);

            if (dialSpinning == true) {
                if (degreesSpan != degreesToSpin) {
                    rotateImage(safeDial, 859, 353, 275, 275, degreesSpan);

                } else if (degreesSpan == degreesToSpin) {
                    dialSpinning = false;
                    safeBuster();
                }
            } else if (dialSpinning == false) {
                if (spinAmount < 4 && bonusFound == false) {
                    rotateImage(safeDial, 859, 353, 275, 275, degreesToSpin);
                } else if (spinAmount == 4 && bonusFound == false) {
                    rotateImage(safeDialRed, 859, 353, 275, 275, degreesToSpin);
                } else if (bonusFound == true) {
                    rotateImage(safeDialGreen, 859, 353, 275, 275, bonusWonDegrees);
                }
            }

            c.drawImage(safeScreen, 838, 215);
            c.save();
            if (spinAmount == 0) {
                c.fillStyle = 'WHITE';
                c.font = '74px TitanOne';
                c.fillText('- - - -', 890, 285);
            } else {
                c.fillStyle = 'WHITE';
                c.font = '70px TitanOne';
                if (spinAmount == 1 && dialSpinning == false) {
                    c.fillText(spunNumbers[0] + ' - - -', 890, 285);
                } else if (spinAmount == 2 && dialSpinning == false) {
                    c.fillText(spunNumbers[0] + ' ' + spunNumbers[1] + ' - -', 890, 285);
                } else if (spinAmount == 3 && dialSpinning == false) {
                    c.fillText(spunNumbers[0] + ' ' + spunNumbers[1] + ' ' + spunNumbers[2] + ' -', 890, 285);
                } else if (spinAmount == 4 && dialSpinning == false) {
                    c.fillText(spunNumbers[0] + ' ' + spunNumbers[1] + ' ' + spunNumbers[2] + ' ' + spunNumbers[3], 890, 285);
                } else {
                    c.fillStyle = 'WHITE';
                    c.font = '42px TitanOne';
                    c.fillText("SPINNING!", 884, 274);
                }
            }
            c.restore();
        }

        /**
         * Function attaining the X and Y position of a given element.
         * @param {*} element - Element to attain position of.
         */
        function getElementPosition(element) {

            var parentOffset,
                pos = {
                    x: element.offsetLeft,
                    y: element.offsetTop
                };

            if (element.offsetParent) {
                parentOffset = getElementPosition(element.offsetParent);
                pos.x += parentOffset.x;
                pos.y += parentOffset.y;
            }
            return pos;
        }

        /**
         * Function attaining the distance in which a (click) is away from a given element.
         * @param {*} p1
         * @param {*} p2 
         */
        function distance(p1, p2) {

            var dx = p1.x - p2.x,
                dy = p1.y - p2.y;

            return Math.sqrt(dx * dx + dy * dy);
        }

        /**
         * Event function controlling what happens
         * when the user clicks the mouse, particularly on
         * the spinButton (animated) image.
         * @param {*} e 
         */
        function click(e) {

            if (spinAmount < 4 && bonusFound == false) {
                var loc = {},
                    tapDistance,
                    canvasPosition = getElementPosition(canvas),
                    tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
                    tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;

                loc.x = (tapX - canvasPosition.x);
                loc.y = (tapY - canvasPosition.y);

                // Distance between tap and spin button
                tapDistance = distance({
                    x: (animatedImages[spinButtonCurrentIndex].x + animatedImages[spinButtonCurrentIndex].getFrameWidth() / 2 * animatedImages[spinButtonCurrentIndex].scaleRatio),
                    y: (animatedImages[spinButtonCurrentIndex].y + animatedImages[spinButtonCurrentIndex].getFrameWidth() / 2 * animatedImages[spinButtonCurrentIndex].scaleRatio)
                }, {
                    x: loc.x,
                    y: loc.y
                });

                // Check for click of spin button.	
                if (tapDistance < animatedImages[spinButtonCurrentIndex].getFrameWidth() / 2 * animatedImages[spinButtonCurrentIndex].scaleRatio) {
                    canvas.removeEventListener("touchstart", click);
                    canvas.removeEventListener("mousedown", click);
                    degreesSpan = 0;
                    dialSpinning = true;
                    spin();
                    calculateDegrees();
                    drawBonuses();
                }
            }
        }

        //Animate LEDs above safe dial.
        LEDAnimation(850, 300, 1);
        LEDAnimation(1025, 300, 1);

        //Set winning bonus image, and x and y values accordingly.
        winningImage = spunBonuses[spinAmount - 1];
        imgOneX = safeXValue[spunNumbers[winningNumbers[0]] - 1] + 10;
        imgOneY = safeYValue[spunNumbers[winningNumbers[0]] - 1] + 10;
        imgTwoX = safeXValue[spunNumbers[winningNumbers[1]] - 1] + 10;
        imgTwoY = safeYValue[spunNumbers[winningNumbers[1]] - 1] + 10;

        //Animate sparks around safe dial.
        if (sparkX.length == sparkY.length) {
            for (i = 0; i < sparkX.length; i++) {
                safeSparkAnimation(sparkX[i], sparkY[i], .4);
            }
        }

        //Animate spin button.
        spinButtonAnimate(966, 462, .84);

        //Add mouse click event listeners.
        canvas.addEventListener("touchstart", click);
        canvas.addEventListener("mousedown", click);

        //Call animation loop.
        animationLoop();

    }

} else {
    //Display message explaining that Safe-Buster is only supported in 1920x1080 resolution.
    var resMessage = document.getElementsByClassName("resolutionMessage");
    resMessage[0].style.display = "block";
    document.getElementById("safeBusterCanvas").style.display = "none";
}