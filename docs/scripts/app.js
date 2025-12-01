const form = document.getElementById('expenseForm');
const tableBody = document.getElementById('expenseBody');
const token = localStorage.getItem('token');

let expenses = [];

function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Use browser locale and formatting options
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function getAllExpenses() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}/expenses`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    expenses = data.expenses;
    displayExpenses();
}

function displayExpenses() {
    tableBody.innerHTML = "";
    expenses.forEach((exp, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${exp.amount}</td>
            <td>${exp.category}</td>
            <td>${formatDateTime(exp.date)}</td>
            <td>${exp.note}</td>
            <td><button onclick = "deleteExpense(${exp.id})">Delete</button></td>
            <td><button onclick = "editExpense(${exp.id})">Edit</button></td>
        `;
        tableBody.append(row);
    });
}

// add expense
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newExpense = {
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        date: new Date(document.getElementById("date").value).toISOString(),
        note: document.getElementById("note").value,
    };

    const res = await fetch(`${API_BASE}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if (res.ok) {
        alert("Expense saved!")
        form.reset();
    } else {
        alert(data.error || "Failed to save expense");
    }
}); 

async function deleteExpense(id) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        alert("Please log in first!");
        return;
    }

    const res = await fetch(`API_BASE/expenses/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (res.ok) {
        console.log("Expense deleted successfully!")
        getAllExpenses();
    } else {
        const data = await res.json();
        alert("Failed to delete expense:", data.error || res.StatusText);
    }
}

async function editExpense(id) {
    const amount = prompt("New amount?");
    const category = prompt("New category?");
    const date = prompt("New date? (dd/mm/yyyy) (HH:MM) (AM/PM)");
    const note = prompt("New note? (optional)");
    if (!amount && !content && !date && !note) return;

    const token = localStorage.getItem("token");

    const newExpense = {
        amount,
        category,
        date: new Date(date).toISOString(),
        note,
    };

    const res = await fetch(`${API_BASE}/reminders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newExpense),
    });

    const data = await res.json();
    if (res.ok) {
        alert("Reminder updated!");
        getAllReminders();
    } else {
        alert(data.error || "Failed to update expense");
    }
}