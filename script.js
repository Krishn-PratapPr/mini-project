// script.js

// Show the registration form
function showRegisterForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Show the login form
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}
// Open the modal with a message
function openModal(message, buttonText) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${message}</h2>
            <button onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close the modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Register user by storing data in localStorage
function register() {
    const name = document.getElementById('registerName').value;
    const rollNo = document.getElementById('registerRollNo').value;
    
    if (name && rollNo) {
        const userData = { name, rollNo };
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Show success message in modal
        openModal('Registration successful! Now, please login.');
        showLoginForm();
    } else {
        openModal('Please fill out both fields!');
    }
}

// Login user by validating credentials from localStorage
function login() {
    const name = document.getElementById('loginName').value;
    const rollNo = document.getElementById('loginRollNo').value;

    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.name === name && storedUserData.rollNo === rollNo) {
        // Login successful
        showStudentCard(storedUserData);
    } else {
        alert('Invalid login credentials!');
    }
}

// Show student card after successful login
function showStudentCard(user) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('studentContent').style.display = 'block';
    document.getElementById('studentName').innerText = user.name;
    document.getElementById('studentRollNo').innerText = user.rollNo;
}

// Logout user
function logout() {
    localStorage.removeItem('userData');
    document.getElementById('studentContent').style.display = 'none';
    showLoginForm();
}

// Pay Now Button Handler
// Pay Now Button Handler (Updated to show payment page)
function payNow() {
    const studentName = document.getElementById('studentName').innerText;
    const rollNumber = document.getElementById('studentRollNo').innerText;
    const totalFee = 35000;

    // Show mini payment page
    document.getElementById('paymentPage').style.display = 'block';

    // Hide student card and other UI
    document.getElementById('studentContent').style.display = 'none';
}

// Handle payment status (success or failure)
// Handle payment status (success or failure)
// Handle payment status (success or failure)
function paymentStatus(status) {
    const studentName = document.getElementById('studentName').innerText;
    const rollNumber = document.getElementById('studentRollNo').innerText;
    const totalFee = 35000;

    if (status === 'success') {
        // Generate Transaction ID and Current Date/Time
        const transactionID = generateTransactionID();
        const currentDateTime = getCurrentDateTime();

        // Hide the payment page
        document.getElementById('paymentPage').style.display = 'none';

        // Close the modal if it's open
        closeModal();

        // Generate invoice HTML
        const invoiceHTML = `
        <div class="invoice-cont">
            <div class="invoice-header" style="display:flex;align-items:center;justify-content:center; flex-direction:row">
            <div style="padding:10px"><img style="height:100px;width:100px;"src="logo.png" alt="College Logo" /> </div>
            <div style="padding:10px"> 
                <h3>Institute Of Engineering And Technology</h3>
                <h4>Swami Vivekanand Campus, Khandari, Agra </h4>
                <p>Dr. Bhimrao Ambedkar University Agra</p></div>  
            </div>
            <h2>Student Fee Receipt</h2>
            <div class="invoice-details">
                <p><strong>Name:</strong> ${studentName}</p>
                <p><strong>Roll Number:</strong> ${rollNumber}</p>
                <p><strong>Course:</strong>B.E ( Computer Science Engineering )</p> <!-- Added Course -->
                <p><strong>Total Fee:</strong> ₹${totalFee.toFixed(2)}</p>
                <p><strong>Transaction ID:</strong> ${transactionID}</p>
                <p><strong>Date & Time:</strong> ${currentDateTime}</p>
            </div>
        </div>
        <button onclick="printInvoice()">Print Invoice</button>
        `;

        // Display the invoice container with generated invoice
        const invoiceContainer = document.getElementById('invoiceContainer');
        invoiceContainer.innerHTML = invoiceHTML;
        
        // Show the invoice container
        invoiceContainer.style.display = 'flex';
        
        // Show the student content again
        document.getElementById('studentContent').style.display = 'block';
    } else {
        // Payment failed, show modal with the message
        openModal('Make a successful payment to generate an invoice.', "Try Again");

        // Hide the payment page and show student content again
        document.getElementById('paymentPage').style.display = 'none';
        document.getElementById('studentContent').style.display = 'block';
    }
}

// Generate Transaction ID
function generateTransactionID() {
    const txnPrefix = "TXN";
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return txnPrefix + randomNumber;
}

// Get current Date and Time
function getCurrentDateTime() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleString('en-IN', options);
}

// Print invoice function
function printInvoice() {
    const invoiceContent = document.getElementById('invoiceContainer').innerHTML;
    const printWindow = window.open('', '', 'height=400,width=600');
    
    // Define styles for the print version of the page
    const printStyles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            #invoiceContainer {
                width: 100%;
                padding: 20px;
                background-color: #fff;
                box-sizing: border-box;
                justify-content: center;
                align-items: center;
                display: flex;
                flex-direction: column;
                border: 1px solid black;
            }

                #invoiceContainer p{
                    margin: 10px 20px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9; 
                }

            @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                #invoiceContainer {
                    width: 100%;
                    padding: 20px;
                    background-color: #fff;
                    page-break-before: always;
                }
                .no-print {
                    display: none;
                }
            }
        </style>
    `;
    
    // Open the print window and write the content along with styles
    printWindow.document.write('<html><head><title>Invoice</title>' + printStyles + '</head><body>');
    printWindow.document.write('<div id="invoiceContainer">' + invoiceContent + '</div>');
    printWindow.document.write('</body></html>');
    
    // Close the document and trigger print
    printWindow.document.close();
    printWindow.print();
}

