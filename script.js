// global variables
var notReturning = true;    //  to check if customer choose a return date

// update count
function updateCount(idPart, isIncrease) {
    const caseCount = getCount(idPart + "Count");
    document.getElementById(idPart + "Count").value = caseCount + (isIncrease ? 1 : (caseCount <= 0) ? 0 : -1);

    updateCalculation();
}

// get value from input
function getCount(id) {
    const count = document.getElementById(id).value;
    if (count == "") {
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
    const subtotalPrice = ((firstClassCount * firstClassUnitPrice) + (economyClassCount * economyClassUnitPrice)) * (notReturning ? 1 : 2);
    document.getElementById("subtotalPrice").innerText = "$" + subtotalPrice;
    document.getElementById("vat").innerText = "$" + Math.round(subtotalPrice * .10);
    document.getElementById("totalPrice").innerText = "$" + (subtotalPrice + Math.round(subtotalPrice * .10));
}


// date function
var today = new Date();
var date = today.getDate();
var month = today.getMonth() + 1;

var day = today.getFullYear() + (month >= 10 ? "-" : "-0") + month + (date >= 10 ? "-" : "-0") + date;
document.getElementById("departureDate").min = day;

function setReturnDateMin() {
    document.getElementById("returnDate").min = document.getElementById("departureDate").value;
}

function updateForReturn() {
    if (document.getElementById("departureDate").value == "") {
        document.getElementById("returnDate").value = "";
        alert("Please, First Choose A Departure Date ");
    }
    else {
        notReturning = false;
        updateCalculation();
    }
}

// Booking Button
document.getElementById("bookingBtn").addEventListener('click', function () {
    if (checkAndSetValues() && this.innerText == "Book Now") {
        document.getElementById("bookingForm").style.display = "none";
        document.getElementById("invoice").style.display = "block";
        setInvoice();
        this.innerText = "Book Another Cruise Trip";
    }
    else if (this.innerText == "Book Another Cruise Trip") {
        location.reload();
    }
});

function checkAndSetValues() {
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