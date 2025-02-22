// To check if the script.js is connected
console.log("✅ Script is running!");

// Take values of user inputs
let inputDate = document.getElementById('expenseDate');
let inputCategory = document.getElementById('expenseCategory');
let inputAmount = document.getElementById('expenseAmount');

let totalSum = 0;
let total = document.getElementById('totalExpenses');

// Function to prevent free text in category input
let cList = ["Rent", "Groceries", "Eating Out", "Savings", "Shopping", "Bills"];

function validList(event) {
    console.log("validList function is running!");  // ✅ Check if function runs
    console.log("User entered:", event.target.value);
    if (!cList.includes(event.target.value)) {
        alert("Please choose a category from the list");
        event.target.value = "";
    };
};

let categoryList = document.getElementById('expenseCategory');
categoryList.addEventListener("change", validList);

// Add new expense when clocking the button
let addExpense = document.getElementById('expenseButton');
addExpense.addEventListener("click", addNewExpense);

// Function to add a new expense in a row from user input
function addNewExpense() {
    let inputAll = document.querySelectorAll('.inputAll');
    console.log('Button is working');
    for (let i = 0; i < inputAll.length; i++) {
        if (inputAll[i].value.trim() === '') {
            alert('Please fill in all inputs!');
            return false;
        }
    }

    //Create new row in the table
    let newRow = document.createElement('tr');

    // Populate new row with user input
    let td1 = document.createElement('td');
    td1.innerHTML = inputDate.value;
    newRow.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = inputCategory.value;
    newRow.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerHTML = `€ ${inputAmount.value}`;
    newRow.appendChild(td3);

    let td4 = document.createElement('td');
    let btn = document.createElement('button');
    btn.innerHTML = '\u00D7';
    newRow.appendChild(td4);
    td4.appendChild(btn);

    // Turns string value to a number
    let expenseTotal = parseFloat(inputAmount.value);
    if (!isNaN(expenseTotal)) {
        totalSum += expenseTotal;
        total.innerText = `€ ${totalSum.toFixed(2)}`;
    }

    // Append the new row to the table
    expenseTable.appendChild(newRow);

    // To delete an expense & minus from total
    btn.addEventListener("click", function () {
        removeExpense(newRow, expenseTotal);
    });

    saveData(inputDate.value, inputCategory.value, parseFloat(inputAmount.value));
    console.log('working!');
    // Clear inputs after adding an expense
    inputDate.value = "";
    inputCategory.value = "";
    inputAmount.value = "";
};

// Save data to localStorage
function saveData(date, category, amount) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ date, category, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load data from localStorage when the page loads
function loadData() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    totalSum = 0; // Reset total sum

    expenses.forEach(expense => {
        let newRow = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.innerHTML = expense.date;
        newRow.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerHTML = expense.category;
        newRow.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerHTML = `€ ${expense.amount.toFixed(2)}`;
        newRow.appendChild(td3);

        let td4 = document.createElement('td');
        let btn = document.createElement('button');
        btn.innerHTML = '\u00D7';
        newRow.appendChild(td4);
        td4.appendChild(btn);

        // Append the new row to the table
        expenseTable.appendChild(newRow);

        // Update total sum
        totalSum += expense.amount;
        total.innerText = `€ ${totalSum.toFixed(2)}`;

        // Delete expense & update total
        btn.addEventListener("click", function () {
            removeExpense(newRow, expense.amount);
        });
    });
}

// Function for deleting a new expense
function removeExpense(row, amount) {
    totalSum -= amount;
    total.innerText = `€ ${totalSum.toFixed(2)}`;
    row.remove();

    // Remove from localStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses = expenses.filter(expense => expense.amount !== amount);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load data when page is refreshed
window.onload = loadData;


// TODO
/*
// Function for creating a chart 
let xValues = cList;
let yValues = [inputDate.value, inputCategory.value, inputAmount.value];
let barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#242424"
];

expenseChart = new Chart("expenseChart", {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        title: {
            display: true,
            text: "Categories Breakdown"
        }
    }
});
*/