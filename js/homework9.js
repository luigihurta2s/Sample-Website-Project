/*******************************************************
*
* This file contains processForm() and runCSS() functions to process price and taxes
* for The Beverage Company subscriptions and displays form fields for user to see and verify.
* The second function does styling as per assignment instructions.
*******************************************************/

/* styling with JavaScript per assignment instructions */
function runCSS() {
    var textArea = document.getElementsByTagName("textarea")[0];
    var inputs = document.getElementsByTagName("input");
    var select = document.getElementById("tier");
    
    /* styling for inputs of type text, email, password and submit */
    for (const input of inputs) {
        if (input.type === "text" || input.type === "email" || input.type === "password") {
            input.style.width = "95%";
            input.style.padding = "10px";
            input.style.marginTop = "10px";
            input.style.border = "1px solid #ccc";
            input.style.borderRadius = "5px";
        }
        else if (input.type === "submit") {
            input.style.width = "100%";
            input.style.padding = "10px";
            input.style.marginTop = "10px";
            input.style.borderRadius = "10px";
            input.style.backgroundColor = "#4CAF50";
            input.style.color = "white";
            input.style.cursor = "pointer";
        }
    }

    /* styling for text area for notes */
    textArea.style.width = "95%";
    textArea.style.padding = "10px";
    textArea.style.marginTop = "10px";
    textArea.style.border = "1px solid #ccc";
    textArea.style.borderRadius = "5px";
    
    /* format for "Selection Tier" */
    select.style.width = "100%";
    select.style.padding = "10px";
    select.style.marginTop = "10px";
}

function processForm(form) {
    const TIER1 = 35.99;   //Value for option 1
    const TIER2 = 50.99;   //Value for option 2
    const TIER3 = 99.99;   //Value for option 3
    const TAX_RATE = 0.087; //Tax is from the state of Kansas
    var price = 0;
    var message = "";

    /* checks validity */
    if (form.checkValidity() == false) {//if something in form is invalid
        alert("Invalid input.");
        return;
    }
    else {//if validation passes, don't refresh
        event.preventDefault();
    }

    /* tax computation with const tier prices; takes into consideration number of subscriptions for final calculation */
    var tier = form.elements["tier"].value;
    var subsNum = form.elements["quantity"].value;
    if (tier == "1") {
        price = (TIER1 * TAX_RATE + TIER1) * subsNum;
    }
    else if (tier == "2") {
        price = (TIER2 * TAX_RATE + TIER2) * subsNum;
    }
    else if (tier == "3") {
        price = (TIER3 * TAX_RATE + TIER3) * subsNum;
    }

    var formattedPrice = price.toFixed(2);  //Fixes two decimal points (currency)   

    /* verifies if password is the same */
    var password = form.elements["password"].value;
    var confirmPassword = form.elements["confirmPassword"].value;
    if (password !== confirmPassword) {
        alert("Password does not match. Refresh the page and try again!");
    } 

    /* Form controls output */
    var name = form.elements["first_name"].value + " " + form.elements["last_name"].value;
    var email = form.elements["email"].value;
    var id = form.elements["user_id"].value;
    var address = form.elements["address"].value;
    var phone = form.elements["phone"].value;
    var cardNum = form.elements["card_number"].value;
    var cardName = form.elements["name_on_card"].value;
    var expDate = form.elements["expiration_date"].value;
    var cvc = form.elements["cvc"].value;
    var chargeDate = form.elements["charge_date"].value;
    var selectedMerch = form.elements["free"].value;
    var preferredColor = form.elements["color"].value;
    var notes = form.elements["notes"].value;

    message =
        "Subscription Summary: \n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "User ID: " + id + "\n" +  //output will be hidden as per instructions in homework 5 assignment
        "Password: " + password + "\n" +
        "Address: " + address + "\n" +
        "Phone Number: " + phone + "\n" +
        "Credit Card: " + cardNum + "\n" +
        "Name on Card: " + cardName + "\n" +
        "Exp. Date: " + expDate + "\n" +
        "3-Digit CVC: " + cvc + "\n" +
        "Date of Charge: " + chargeDate + "\n" +
        "Number of Subscriptions: " + subsNum + "\n" +
        "Subscription Tier: " + tier + "\n" +
        "One-Time Free Merchandise: " + selectedMerch + "\n" +
        "Preferred Color: " + preferredColor + "\n" + 
        "Notes: " + notes + "\n\n" +
        "FINAL MONTHLY SUBSCRIPTION PRICE WITH TAX: $" + formattedPrice; 

    form.elements["output"].value = "FINAL MONTHLY SUBSCRIPTION PRICE WITH TAX: $" + formattedPrice; //print out in webpage
    alert(message); //print out as alert box
}