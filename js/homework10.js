/*******************************************************
* homework10.js
*
* This file contains processForm(), validateForm(), and calc functions to process price and taxes
* for The Beverage Company Build-Your-Own Box and displays form fields for user to see and verify.
*******************************************************/

function processForm(form) {
    alert("It worked! Submitting form..."); //alert message to show that processForm() works per assignment instructions

    /*form controls value from input*/
    var name = form.elements["first_name"].value + " " + form.elements["last_name"].value;
    var email = form.elements["email"].value;
    var password = form.elements["password"].value;
    var confirmPassword = form.elements["confirm_password"].value;
    var address = form.elements["address"].value;
    var phone = form.elements["phone"].value;
    var cardNum = form.elements["card_number"].value;
    var cardName = form.elements["name_on_card"].value;
    var expDate = form.elements["expiration_date"].value;
    var cvc = form.elements["cvc"].value;
    var chargeDate = form.elements["charge_date"].value;
    var chosenBeverage = document.getElementsByName("beverage");
    var cokeQty = parseInt(form.elements["coke_qty"].value);
    var dietQty = parseInt(form.elements["diet_qty"].value);
    var drPepperQty = parseInt(form.elements["dr_pepper_qty"].value);
    var beverageSize = form.elements["beverage_size"].value;
    var chosenSnack = form.elements["snacks"].value;
    var snackQty = parseInt(form.elements["snack_quantity"].value);
    var notes = form.elements["notes"].value;

    var isValid = validateForm(form);
    if (isValid === false) {
        alert("Invalid input(s). Please check fields.");
        return;
    }

    /* <output> element to display results in webpage */
    var results = calc(form);
    var message = "Beverages Qty: " + results.totalNumDrinks + " - Beverages Price Before Discount: $" + results.bevPrice + " - Discount Rate: " + results.bevDiscountRate + " - Discount: $" + results.bevDiscount + " -- Snack Qty: " + results.snackQty + " - Snacks Price Before Discount: $" + results.snackPrice + " - Discount Rate: " + results.snackDiscountRate + " - Discount: $" + results.snackDiscount + " -- TOTAL PRICE: $" + results.total; 

    document.getElementById("output").innerHTML = message; // outputs message to webpage using .innerHTML per assignment instructions
}

/* function that checks validity */
function validateForm(form) { //Calculates the number of beverage types selected (Coke, Diet Coke, Dr. Pepper)
    var chosenBeverages = document.getElementsByName("beverage");
    var cokeQty = form.elements["coke_qty"].value;
    var dietQty = form.elements["diet_qty"].value;
    var drPepperQty = form.elements["dr_pepper_qty"].value;

    if (form.checkValidity() == false) {//if something in form is invalid
        return false;
    }
    event.preventDefault();

    for (let i=0; i<chosenBeverages.length; i++) {
        if (chosenBeverages[i].checked) { // if a beverage is checked, then the quantity for that beverage can't be 0
            if (chosenBeverages[i].value === "coke" && cokeQty === 0) { // if beverage is Coke and the coke qty is 0, show an alert
                alert("Must have a Coke qty");
                return false;
            }
            else if (chosenBeverages[i].value === "diet_coke" && dietQty === 0) {// if beverage is Diet Coke and the diet coke qty is 0, show an alert
                alert("Must have a Diet Coke qty");
                return false;
            }
            else if (chosenBeverages[i].value === "dr_pper" && drPepperQty === 0) {// if beverage is Dr. Pepper and the qty is 0, show an alert
                alert ("Must have a Dr Pepper qty");
                return false;
            }
        } else { // if a bevverage is not selected, then the quantity can't be greater than 0
            if (chosenBeverages[i].value === "coke" && cokeQty > 0) { // if the beveraege is Coke and the Coke qty is greater than 0, show an alert
                alert("Can't have a Coke qty");
                return false;
            }
            else if (chosenBeverages[i].value === "diet_coke" && dietQty > 0) {// if the beveraege is Diet Coke and the Diet Coke qty is greater than 0, show an alert
                alert("Can't have a Diet Coke qty");
                return false;
            }
            else if (chosenBeverages[i].value === "dr_pper" && drPepperQty > 0) {// if the beveraege is Dr. Pepper and the Dr. Pepper qty is greater than 0, show an alert
                alert ("Can't have a Dr Pepper qty");
                return false;
            }        
        }
    }

    /* verifies if password is the same*/
    var password = form.elements["password"].value;
    var confirmPassword = form.elements["confirm_password"].value;
    if (password !== confirmPassword) {
        alert("Password does not match. Please try again!");
        return false;
    }

    return true;
}

/* function computes mathematical computations for product price vs quantity, taxes, and discount */
function calc(form) {
    const TAX_RATE = 0.087; //Tax is from the state of Kansas
    const SMALL_PRICE = 2.50; // price for small
    const MEDIUM_PRICE = 3.50; // price for medium
    const LARGE_PRICE = 7.50; // price for large
    var total = 0; // placeholder

    /*form controls value from input*/
    var beverageSize = form.elements["beverage_size"].value;
    var cokeQty = parseInt(form.elements["coke_qty"].value);
    var dietQty = parseInt(form.elements["diet_qty"].value);
    var drPepperQty = parseInt(form.elements["dr_pepper_qty"].value);
    var chosenSnack = form.elements["snacks"].value;
    var snackQty = parseInt(form.elements["snack_quantity"].value);

    /* Calculate the total number of beverage by adding quantity of each */
    var totalNumDrinks = cokeQty + dietQty + drPepperQty;

    console.log('total number of drinks', totalNumDrinks);
    /* Calculate the price of the drink by multiplying the total number of beverages by the price of their size */
    var bevPrice = 0;
    if (beverageSize === "small") {
        bevPrice = totalNumDrinks * SMALL_PRICE;
    }
    else if (beverageSize === "medium") {
        bevPrice = totalNumDrinks * MEDIUM_PRICE;

    }
    else if (beverageSize === "large") {
        bevPrice = totalNumDrinks * LARGE_PRICE;
    }

    /* discount computations */
    var bevDiscount = 0;
    var bevDiscountRate = "0";
    /* Discount computations */
    if (totalNumDrinks >= 30) { // 30% discount
        bevDiscount = bevPrice * .3;
        bevDiscountRate = "30%";
    } 
    else if (totalNumDrinks >= 20) { // 20% discount
        bevDiscount = bevPrice * .2;
        bevDiscountRate = "20%";
    } 
    else if (totalNumDrinks >= 10) { // 10% discount
        bevDiscount = bevPrice * .1;
        bevDiscountRate = "10%";
    }

    /* snack calculation */
    var snackPrice = 0;
    snackPrice = snackQty * 2; // price of all available snack products is $2.00
    
    /* Discount computations */
    var snackDiscount = 0;
    var snackDiscountRate = "0";
    if (snackQty >= 30) { // 30% discount
        snackDiscount = snackPrice * .3;
        snackDiscountRate = "30%";
    } 
    else if (snackQty >= 20) { // 20% discount
        snackDiscount = snackPrice * .2;
        snackDiscountRate = "20%";    
    }
    else if (snackQty >= 10) { // 10% discount
        snackDiscount = snackPrice * .1;
        snackDiscountRate = "10%";    
    }

    total = (bevPrice - bevDiscount) + (snackPrice - snackDiscount);
    total = total * (1 + TAX_RATE);
    total = total.toFixed(2) // two decimal points

    var results = {
        totalNumDrinks,
        snackQty,
        bevPrice,
        bevDiscount,
        bevDiscountRate,
        snackPrice,
        snackDiscount,
        snackDiscountRate,
        total
    };
    
    /* per assignment instructions, message to be displayed as alert to show values were passed */
    var message = 
        "Input provided for calculations:\n" + 
        "Beverage Size: " + beverageSize + 
        "\nCoke Qty: " + cokeQty +
        "\nDiet Coke Qty: " + dietQty + 
        "\nDr Pepper Qty: " + drPepperQty + 
        "\nChose Snack: " + chosenSnack + 
        "\nSnack Qty: " + snackQty +
        "\n\nBeverages Qty: " + results.totalNumDrinks + 
        "\nBeverages Price Before Discount: $" + results.bevPrice + 
        "\nDiscount Rate: " + results.bevDiscountRate + 
        "\nDiscount: $" + results.bevDiscount + 
        "\n\nSnack Qty: " + results.snackQty + 
        "\nSnacks Price Before Discount: $" + results.snackPrice + 
        "\nDiscount Rate: " + results.snackDiscountRate + 
        "\nDiscount: $" + results.snackDiscount + 
        "\n\nTOTAL PRICE: $" + results.total; 
    
    alert(message);
    return results;
}
