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

        document.getElementById("departureDate").min = today.getFullYear() + (month >= 10 ? "-" : "-0") + month + (date >= 10 ? "-" : "-0") + date;

        function setReturnDateMin() {
            document.getElementById("returnDate").min = document.getElementById("departureDate").value;
        }

        function updateForReturn() {
            if (document.getElementById("departureDate").value == "") {
                document.getElementById("returnDate").value = "";
                alert("First Select Your Departure Date.");
            }
            else {
                notReturning = false;
                updateCalculation();
            }
        }

        // Booking Button
        document.getElementById("bookingBtn").addEventListener('click', function () {
            console.log("Booking");
        });
