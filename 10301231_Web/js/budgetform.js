// Get form input elements on submit action
const budgetForm = document.getElementById('budget-form');
const submitButton = document.getElementById('submit-button');  /* กดปุ่ม submit แล้วเกิดอะไรขึ้น */
const resetButton = document.getElementById('reset-button');
const incomelist = document.getElementById('income-list');
const expenselist = document.getElementById('expense-list');
const totalIncome = document.getElementById('total-income');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const totalAmount = document.getElementById('total-amount');

// budgetData --> Array
    let budgetData = [];

budgetForm.addEventListener('submit', function(event) {
    event.preventDefault(); // เบรคการส่งฟอร์มเพื่อให้สามารถจัดการข้อมูลได้ด้วย JavaScript
    // Get input values
    const name = document.getElementById('name').value;  /* เก็บข้อมูลจาก input ชื่อรายการ */
    const amount = parseFloat(document.getElementById('amount').value);  // parseFloat อ่านข้อความและแปลงให้กลายเป็น "ตัวเลขที่มีทศนิยม
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value;

    if (amount === 0) {
        alert("ระบบแจ้งเตือน: ไม่สามารถกรอกจำนวนเงินเป็น 0 ได้");
        return; // Stop further execution if amount is 0
    }

    if (amount < 0) {
        alert("ระบบแจ้งเตือน: ไม่สามารถกรอกจำนวนเงินเป็นค่าลบได้");
        return; // Stop further execution if amount is negative
    }

    const budgetDataItem = {
        name: name,
        amount: amount,
        date: date,
        time: time,
        reason: reason
    };

    budgetData.push(budgetDataItem);
    budgetForm.reset();
    renderTransactions();
    updateSummary();

});

function renderTransactions() {
    // Clear existing lists
    incomelist.innerHTML = '';
    expenselist.innerHTML = '';

    // Loop through budgetData array and create list items
    budgetData.forEach(function(transaction, index) {
        const listItem = document.createElement('li');
        let sign = '';
        if (transaction.reason === 'รายรับ') {
            sign = '+';
        }
        else if (transaction.reason === 'รายจ่าย') {
            sign = '-';
        }
        listItem.textContent = `${transaction.name} ${sign} ${transaction.amount} บาท (${transaction.date} ${transaction.time})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'ลบ';
        deleteButton.addEventListener('click', function() {
            budgetData.splice(index, 1);
            renderTransactions();
            updateSummary();
        });
        listItem.appendChild(deleteButton);
        if (transaction.reason === 'รายรับ') {
            listItem.style.color = 'green';
            incomelist.appendChild(listItem);
        } else if (transaction.reason === 'รายจ่าย') {
            listItem.style.color = 'red';
            expenselist.appendChild(listItem);
        }
    });
}

function updateSummary() {
    const totalIncomeValue = budgetData
    .filter(function(transaction) {
        return transaction.reason === 'รายรับ';
    })
    .reduce(function(total, transaction) {
        return total + transaction.amount;
    }, 0);

    const totalExpenseValue = budgetData
    .filter(function(transaction) {
        return transaction.reason === 'รายจ่าย';
    })
    .reduce(function(total, transaction) {
        return total + transaction.amount;
    }, 0);

    incomeAmount.textContent = totalIncomeValue.toFixed(2);
    expenseAmount.textContent = totalExpenseValue.toFixed(2);
    totalAmount.textContent = (totalIncomeValue - totalExpenseValue).toFixed(2);
}