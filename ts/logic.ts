/**
 * Javascript/Typescript class controlling the logic of the 
 * Safe-Buster game.
 * @author - Joshua Middleton.
 */

/** Variable declarations. */

//Variable holding amount of spins.
let spinAmount = 0;
//Array containing attainable safe numbers.
let safeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//Array containing numbers spun.
let spunNumbers = [];
//Array containing attainable safe bonuses.
let safeBonuses = [15, 16, 17, 18, 19];
//Array containing bonuses spun.
let spunBonuses = [];
//Boolean variable for (if) bonus has been found.
let bonusFound = false;
//Int variable containing (winning) bonus number.
let bonusNumber = null;
//Int variable containing (most recent) bonus number.
let bonusSpun;
//Map containing bonus numbers spun.
let bonusMap = new Map();
//Array containing winning spun numbers.
let winningNumbers = [];

/**
 * Function attaining a spin by:
 * 1. Attaining a random safe number, then removing said safe number
 * preventing it from being chosen again & pushing chosen safe number to numberSpun array.
 * 3. Attaining a random bonus number, then adding it to the
 * spunBonuses array.
 */
function getSpin() {
    let numberSpun = null;
    let randomSafeNumber = Math.floor(Math.random() * safeNumbers.length)
    numberSpun = safeNumbers[randomSafeNumber];
    spunNumbers.push(numberSpun);
    safeNumbers.splice(randomSafeNumber, 1);
    bonusSpun = safeBonuses[Math.floor(Math.random() * safeBonuses.length)];
    spunBonuses.push(bonusSpun);
}

/**
 * Function checking if a bonus has been achieved, this is achieved
 * through the bonusMap map, whereby the spunBonuses array is looped
 * to see if a bonus is an original number or a duplicate number
 * if it is original, it is added to the bonus map, if it 
 * is a duplicate, it's value in the bonus map is set to (2)
 * and the bonusFound variable is set to true aswell as the
 * bonusNumber variable is set to the achieved bonus.
 */
function checkBonus() {
    for (var i = 0; i < spunBonuses.length; i++) {
        if (bonusMap.has(spunBonuses[i]) && spunBonuses[i] == bonusSpun) {
            bonusMap.set(spunBonuses[i], 2);
            bonusNumber = spunBonuses[i];
            bonusFound = true;
        }
        else {
            bonusMap.set(spunBonuses[i], 1);
        }
    }
}

/**
 * Function looping through any given array to
 * search for duplicates, this is used to
 * find which spins achieved the bonus
 * if a bonus is achieved.
 */
Array.prototype.getDuplicates = function () {
    var duplicates = {};
    for (var i = 0; i < this.length; i++) {
        if(duplicates.hasOwnProperty(this[i])) {
            duplicates[this[i]].push(i);
        } else if (this.lastIndexOf(this[i]) !== i) {
            duplicates[this[i]] = [i];
        }
    }
    return duplicates;
};

/**
 * Function performing the 'spin', this is achieved by
 * adding one to the spinAmount, getting the spin and checking the bonus
 * providing the spinAmount variable is less than 4 (less than 4 spins have occured)
 * and also providing no bonus has been found. If a bonus has been found,
 * the winning safe numbers are stored in the winningNumbers variable preparing
 * the canvas to change accordingly.
 */
function spin() {
    if (spinAmount < 4) {
        if (bonusFound == false) {
            spinAmount += 1;
            getSpin();
            checkBonus();
        }
    }
    if (bonusNumber != null) {
        console.log("You have won a bonus! / Your bonus is: " + bonusNumber);
        winningNumbers = spunBonuses.getDuplicates();
        winningNumbers = winningNumbers[bonusNumber];
    }
}