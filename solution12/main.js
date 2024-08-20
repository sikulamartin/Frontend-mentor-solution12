document.addEventListener("DOMContentLoaded", (event) => {
    const billAmount = document.getElementById("tip-form-bill");
    const resetButton = document.getElementById("reset-button");
    const fivePercentButton = document.getElementById("fivePercent");
    const tenPercentButton = document.getElementById("tenPercent");
    const fifteenPercentButton = document.getElementById("fifteenPercent");
    const twentyFivePercentButton = document.getElementById("twentyFivePercent");
    const fiftyPercentButton = document.getElementById("fiftyPercent");
    const customPercentButton = document.getElementById("custom");
    const peopleAmount = document.getElementById("tip-form-people");
    const errorMessage = document.getElementById("error-message");
    const tipAmount = document.getElementById("tip-amount");
    const totalAmount = document.getElementById("tip-total");
    let totalTip = 0;
    let billValue = 0;
    let peopleValue = 1;
    let selectedPercent = 0;

    function updateTable() {
        const tipPerPerson = totalTip / peopleValue;
        tipAmount.textContent = "$" + tipPerPerson.toFixed(2);
        totalAmount.textContent = "$" + (billValue / peopleValue + tipPerPerson).toFixed(2);
    }

    function calculateTip() {
        totalTip = selectedPercent * billValue / 100;
        updateTable();
    }


    billAmount.addEventListener("input", () => {
        billValue = parseFloat(billAmount.value) || 0;
        if (billValue > 0) {
            resetButton.classList.add("active");
            resetButton.addEventListener("click", () => {
                location.reload();
            });
        } else {
            resetButton.classList.remove("active");
        }
        calculateTip();
    });



    peopleAmount.addEventListener("input", () => {
        peopleValue = parseInt(peopleAmount.value);
        if (peopleValue > 0) {
            errorMessage.classList.remove("shown");
            peopleAmount.classList.remove("errorBorder");
        } else {
            console.log("input wertz");
            errorMessage.classList.add("shown");
            peopleAmount.classList.add("errorBorder");
        }
        calculateTip();
    });

    function handlePercentButtonClick(percent, button) {
        selectedPercent = percent;
        calculateTip();
        document.querySelectorAll('.clicked').forEach(btn => btn.classList.remove('clicked'));
        button.classList.add('clicked');
        clearInput();
    }

    fivePercentButton.addEventListener("click", () => handlePercentButtonClick(5, fivePercentButton));
    tenPercentButton.addEventListener("click", () => handlePercentButtonClick(10, tenPercentButton));
    fifteenPercentButton.addEventListener("click", () => handlePercentButtonClick(15, fifteenPercentButton));
    twentyFivePercentButton.addEventListener("click", () => handlePercentButtonClick(25, twentyFivePercentButton));
    fiftyPercentButton.addEventListener("click", () => handlePercentButtonClick(50, fiftyPercentButton));

    customPercentButton.addEventListener("input", () => {
        selectedPercent = parseFloat(customPercentButton.value) || 0;
        calculateTip();
        document.querySelectorAll('.clicked').forEach(btn => btn.classList.remove('clicked'));
    });

    function clearInput() {
        customPercentButton.value = "";
    }

});
