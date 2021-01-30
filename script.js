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
let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;

let day = today.getFullYear() + (month >= 10 ? "-" : "-0") + month + (date >= 10 ? "-" : "-0") + date;
document.getElementById("departureDate").min = day;
document.getElementById("departureDate").value = day;
setReturnDateMin();

function setReturnDateMin() {
    document.getElementById("returnDate").min = document.getElementById("departureDate").value;
}

function updateForReturn() {
    notReturning = false;
    updateCalculation();
}

// Booking Button
document.getElementById("bookingBtn").addEventListener('click', function () {
    if (checkSetFields() && this.innerText == "Book Now") {
        document.getElementById("bookingForm").style.display = "none";
        document.getElementById("invoice").style.display = "block";
        this.innerText = "Book Another Cruise";
    }
    else {
        location.reload();
    }
});

function checkSetFields() {
    if (getCount("firstClassCount") == 0 && getCount("economyClassCount") == 0) {
        alert("Please Select a Cruise Class");
        return false;
    } else {
        let fromInput = document.getElementById("from");
        let toInput = document.getElementById("to");
        if (fromInput.innerText == "") {
            fromInput.innerText = fromInput.placeholder;
        }
        if (toInput.innerText == "") {
            toInput.innerText = toInput.placeholder;
        }
        return true;
    }
}
