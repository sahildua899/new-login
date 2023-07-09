// Selecting the sidebar and buttons
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
const tableBody  = document.getElementById('table-body');
const API_URL ='https://64aaac817518600008f0c47e--eloquent-buttercream-026535.netlify.app/api/users';


// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  // If the sidebar is not locked
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
};

// Function to show the sidebar when the mouse enter
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
};

// Function to show and hide the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
};

// If the window width is less than 800px, close the sidebar and remove hoverability and lock
if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
}

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);


function fetchingUsers() {
    fetch(`${API_URL}`, {
        method:'post',
        headers:{'content-type': 'application/json'}
      }).then((response) => response.json()).then((json)=>addingUsers(json))
    
    const addingUsers = (response) =>{
        for(let i of response) {
            tableBody.innerHTML += `<tr>
            <td>${i.firstname}</td>
            <td>${i.lastname}</td>
            <td>${i.email}</td>
            <td>${i.phone}</td>
            <td>${i.customerType}</td>
            <td>${i.isVerified}</td>
            <td><i id="${i._id}" title="Remove User" class='bx bx-message-alt-x'></i> <i id="${i._id}" title="Send New Password Link" class='bx bx-lock-alt'></i> <i id="${i._id}" title="Account Verification mail" isVerified="check" verified="${i.isVerified}" data='${i.email}' class='bx bxs-user-check' ></i></td>
        </tr>`
        }
        document.body.addEventListener('click', clickButtons)
    
        function clickButtons(evt){
            const from = evt.target
            if(from.title === "Remove User") {
                deleteUser(from.id)
            }else if(from.title === "Send New Password Link"){
                updatePass(from.id)
            }else if(from.title === "Account Verification mail") {
                verifyUser(from.id)
            }
        }
        
    }
}

fetchingUsers()

const deleteUser = (userId) =>{
    fetch(`${API_URL}/delete/${userId}`, {
        method:'delete',
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>printingData(json))
    function printingData(data) {
        alert(data.message);
        location.reload()
    }
}

const updatePass = (userId) =>{
    const value = {
        id:userId
    }
    fetch(`${API_URL}/forgot`, {
        method:'post',
        body:JSON.stringify(value),
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>alert(json.message))
}

const verifyUser = (userId) => {
    const value = {
        id:userId
    }
    fetch(`${API_URL}/verifyAccount`, {
        method:'post',
        body:JSON.stringify(value),
        headers:{'content-type': 'application/json'}
    }).then((response) => response.json()).then((json)=>alert(json.message))
}
