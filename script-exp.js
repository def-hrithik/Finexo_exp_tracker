let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let currency = 'INR';
let currencySymbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};
let categoryChart, dailyChart;

function updateCurrency() {
    currency = document.getElementById('currency').value;
    document.querySelectorAll('#currency-symbol').forEach(el => {
        el.textContent = currencySymbols[currency];
    });
    updateFinance();
    updateCharts();
}

function updateFinance() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const budget = parseFloat(document.getElementById('budget').value) || 0;
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = income - totalExpenses;
    
    document.getElementById('total-amount').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
    
    const dailyTotals = {};
    expenses.forEach(exp => {
        dailyTotals[exp.date] = (dailyTotals[exp.date] || 0) + exp.amount;
    });
    const highestSpending = Math.max(...Object.values(dailyTotals), 0);
    document.getElementById('highest-spending').textContent = highestSpending.toFixed(2);
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];
    const description = document.getElementById('expense-description').value;
    const category = document.getElementById('expense-category').value;

    if (name && amount) {
        const expense = { name, amount, date, description, category };
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        updateFinance();
        updateCharts();
        clearForm();
    }
}

function displayExpenses(filteredExpenses = expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    filteredExpenses.forEach((exp, index) => {
        const li = document.createElement('li');
        li.classList.add('animate__animated', 'animate__fadeIn');
        li.innerHTML = `
            ${exp.name} - ${currencySymbols[currency]}${exp.amount.toFixed(2)} 
            (${exp.date}) [${exp.category}] 
            ${exp.description ? '- ' + exp.description : ''}
            <button onclick="deleteExpense(${index})" class="delete-btn animate__animated animate__fadeIn">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    updateFinance();
    updateCharts();
}

function filterExpenses() {
    const category = document.getElementById('filter-category').value;
    const startDate = document.getElementById('date-start').value;
    const endDate = document.getElementById('date-end').value;

    let filtered = expenses;
    if (category !== 'All') {
        filtered = filtered.filter(exp => exp.category === category);
    }
    if (startDate) {
        filtered = filtered.filter(exp => exp.date >= startDate);
    }
    if (endDate) {
        filtered = filtered.filter(exp => exp.date <= endDate);
    }
    displayExpenses(filtered);
    updateCharts(filtered);
}

function updateCharts(filteredExpenses = expenses) {
    // Category Distribution Pie Chart
    const categoryTotals = {};
    filteredExpenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    if (categoryChart) categoryChart.destroy();
    categoryChart = new Chart(document.getElementById('categoryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Daily Spending Trend Line Chart
    const dailyTotals = {};
    filteredExpenses.forEach(exp => {
        dailyTotals[exp.date] = (dailyTotals[exp.date] || 0) + exp.amount;
    });

    if (dailyChart) dailyChart.destroy();
    dailyChart = new Chart(document.getElementById('dailyChart'), {
        type: 'line',
        data: {
            labels: Object.keys(dailyTotals).sort(),
            datasets: [{
                label: 'Daily Spending',
                data: Object.values(dailyTotals),
                borderColor: '#36A2EB',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Amount' } }
            }
        }
    });
}

function exportToCSV() {
    const csv = ['Name,Amount,Date,Category,Description']
        .concat(expenses.map(exp => 
            `${exp.name},${exp.amount},${exp.date},${exp.category},${exp.description || ''}`
        )).join('\n');
    downloadFile('expenses.csv', 'text/csv', csv);
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Expense Report', 10, 10);
    let y = 20;
    expenses.forEach((exp, i) => {
        doc.text(`${i + 1}. ${exp.name}: ${currencySymbols[currency]}${exp.amount.toFixed(2)} (${exp.date}) [${exp.category}]`, 10, y);
        if (exp.description) {
            y += 10;
            doc.text(`Description: ${exp.description}`, 10, y);
        }
        y += 10;
    });
    doc.save('expenses.pdf');
}

function downloadFile(filename, type, content) {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function clearForm() {
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-description').value = '';
}

function resetExpenses() {
    expenses = [];
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    updateFinance();
    updateCharts();
}

function logout() {
    // Add logout logic here
    alert('Logged out');
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    updateCurrency();
    displayExpenses();
    updateFinance();
    updateCharts();
});