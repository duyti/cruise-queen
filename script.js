// global variable
var notReturning = true;    //  to check if customer choose a return date

// update count on each +/-
function updateCount(idPart, isIncrease) {
    const caseCount = getCount(idPart + "Count");
    document.getElementById(idPart + "Count").value = caseCount + (isIncrease ? 1 : (caseCount <= 0) ? 0 : -1);     // set the count according to +/- and previous value

    updateCalculation();            // update the calculations each time event occurred 
}

// get value from input
function getCount(id) {
    const count = document.getElementById(id).value;
    if (count == "") {          // if NaN set to 0
        return 0;
    }
    else {
        return parseFloat(count);
    }
}

function updateCalculation() {
    const firstClassUnitPrice = 150;
    const economyClassUnitPrice = 100;
    const firstClassCount = getCount("firstClassCount");
    const economyClassCount = getCount("economyClassCount");
    const subtotalPrice = ((firstClassCount * firstClassUnitPrice) + (economyClassCount * economyClassUnitPrice)) * (notReturning ? 1 : 2);     //check if trip is 2-way to double the fare

    // updating new price
    document.getElementById("subtotalPrice").innerText = "$" + subtotalPrice;
    document.getElementById("vat").innerText = "$" + Math.round(subtotalPrice * .10);
    document.getElementById("totalPrice").innerText = "$" + (subtotalPrice + Math.round(subtotalPrice * .10));
}


// to calculate current date
var today = new Date();
var date = today.getDate();
var month = today.getMonth() + 1;
var day = today.getFullYear() + (month >= 10 ? "-" : "-0") + month + (date >= 10 ? "-" : "-0") + date;

document.getElementById("departureDate").min = day;         // set minimum departure date to today 

function setReturnDateMin() {
    document.getElementById("returnDate").min = document.getElementById("departureDate").value;     // set minimum return date to departure date
}

// set return date
function updateForReturn() {
    if (document.getElementById("departureDate").value == "") {         // cannot set return date without setting departure date
        document.getElementById("returnDate").value = "";
        alert("Please, First Choose A Departure Date ");
    }
    else {
        notReturning = false;
        updateCalculation();
    }
}

// Booking Button listener
document.getElementById("bookingBtn").addEventListener('click', function () {
    if (checkInputs() && this.innerText == "Book Now") {                  // checking booking complete
        document.getElementById("bookingForm").style.display = "none";          // hiding the form
        document.getElementById("invoice").style.display = "block";             // displaying invoice which was hidden
        setInvoice();                                                           // setting invoice to show it
        this.innerText = "Book Another Cruise Trip";
    }
    else if (this.innerText == "Book Another Cruise Trip") {                    // only while invoice is showing
        location.reload();                                                      // clicking the button wil reload the page
    }
});


// check for all necessary inputs. if empty show alert and booking will not proceed
function checkInputs() {
    if (document.getElementById("from").value == "") {
        alert("Please, Enter Your Departure Location");
    }
    else if (document.getElementById("to").value == "") {
        alert("Please, Enter Your Destination");
    }
    else if (document.getElementById("departureDate").value == "") {
        alert("Please, First Choose A Departure Date ");
    }
    else if (getCount("firstClassCount") == 0 && getCount("economyClassCount") == 0) {
        alert("Please Choose Minimum One Cruise Class To Continue");
    }
    else {
        return true;
    }
    return false;
}


// setting the invoice
function setInvoice() {
    let bookingType = document.getElementById("booking-Type");
    let cruiseRoute = document.getElementById("cruise-route");
    let invoiceDepartureDate = document.getElementById("invoice-departure-date");
    let invoiceReturnDate = document.getElementById("invoice-return-date");
    let invoiceFirstClassCount = document.getElementById("first-class-count");
    let invoiceEconomyClassCount = document.getElementById("economy-count");

    let startFrom = document.getElementById("from");
    let destination = document.getElementById("to");
    let departureDate = document.getElementById("departureDate");
    let returnDate = document.getElementById("returnDate");
    let firstClassCount = getCount("firstClassCount");
    let economyClassCount = getCount("economyClassCount");

    cruiseRoute.innerHTML = '<h3>' + startFrom.value + '</h3>to<h3>' + destination.value + '</h3>';
    invoiceDepartureDate.innerHTML = '<p>Departure Date : <strong>' + departureDate.value + '</strong></p>';

    if (returnDate.value == "") {
        bookingType.innerHTML = '<h3>1-WAY CRUISE TRIP</h3>';
    }
    else {
        bookingType.innerHTML = '<h3>2-WAY CRUISE TRIP</h3>';
        invoiceReturnDate.innerHTML = '<p>Return Date : <strong>' + returnDate.value + '</strong></p>';
    }
    if (firstClassCount > 0) {
        invoiceFirstClassCount.innerHTML = '<p>No. of Booked First Class Cabin : ' + firstClassCount + '</p>';
    }
    if (economyClassCount > 0) {
        invoiceEconomyClassCount.innerHTML = '<p>No. of Booked Economy Class Cabin : ' + economyClassCount + '</p>';
    }
}