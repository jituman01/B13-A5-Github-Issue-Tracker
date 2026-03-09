// console.log('hello jitu');
const signupPage = document.getElementById('signup-page')
const signupBtn = document.getElementById('signup-btn');
const mainPage = document.getElementById('main-page');
const userName = document.getElementById('username');
const password = document.getElementById('password');
const issuesContainer = document.getElementById('issues-container');
const issueCount = document.getElementById('issue-count');
const loadingSpinner = document.getElementById("loadingSpinner");
const modalContent = document.getElementById("modal-content");
const modalBody = document.getElementById("modal-content");
const issueModal = document.getElementById("issue-modal");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let allIssue = [];

// -----Loading spinner---//
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  issuesContainer.innerHTML = "";
}

function hideLoading() {
  loadingSpinner.classList.add("hidden");
}


//--------- login logic--------//
signupBtn.addEventListener('click', () => {
  // console.log('clicked');
  const userNameValue = userName.value;
  const passwordValue = password.value;

  if (userNameValue === 'admin' && passwordValue === 'admin123') {
    signupPage.classList.add('hidden')
    mainPage.classList.remove('hidden');
    
  }
  else {
    alert('Sign Up Unsuccessful')
  }
  
});

// ----fetching card---//
async function fetchCard() {
  showLoading();

  const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await res.json();
  allIssue = data.data;
  // console.log(allCards);
  displayIssues(allIssue);
  hideLoading();
}
fetchCard();


  //---display isue logic----//
function displayIssues(issues) {
  issuesContainer.innerHTML = '';

  issueCount.innerText = issues.length;

  issues.forEach((issue) => {
    const issueCard = createIssueCard(issue);
    issuesContainer.appendChild(issueCard)
  })
}
 

// --------create card------//
function createIssueCard(issue) {
    const { id, title, description, status, author, priority, labels, createdAt } = issue;
    
    let statusImg = '';
    let borderCol = '';

    if (status === 'open') {
        statusImg = './assets/Open-Status.png';
        borderCol = 'border-t-green-400';
    } else {
        statusImg = './assets/Closed-Status.png';
        borderCol = 'border-t-purple-500';
    }
  
    let priorityStatus = "";
    
    const priorityValue = priority?.toUpperCase(); 

    if (priorityValue === 'HIGH') {
        priorityStatus = "bg-red-100 text-red-500";
    } else if (priorityValue === 'MEDIUM') {
        priorityStatus = "bg-orange-100 text-orange-500";
    } else {
        priorityStatus = "bg-gray-100 text-gray-500";
    }

    const card = document.createElement("div");
    card.className = `bg-white border border-gray-100 border-t-4 ${borderCol} rounded-2xl p-6 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between `;

    card.onclick = () => showModal(id);

    card.innerHTML = `
        <div>
            <div class="flex justify-between items-center mb-4">
            <div class="flex items-center gap-2">
              <img src="${statusImg}" alt="${status}" class="w-5 h-5"> 
            </div>

            <span class="px-2 py-1 rounded-xl text-[10px] font-bold uppercase ${priorityStatus}">
            ${priority ?? 'Low'}
            </span>
                
        </div>

            <h3 class="font-semibold text-2 mb-2 text-black">${title}</h3>
            <p class="text-2 text-gray-500 mb-4 line-clamp-2">${description}</p>
            
          
           <div class="flex flex-wrap gap-2 mb-4">
                ${labels.map(label => `
                    <span class="bg-blue-100 text-blue-500 badge badge-outline uppercase font-medium text-[10px] px-3 py-1">
                        ${label}
                    </span>
                `).join('')}
            </div>

         </div>
           <hr>
            <div class="flex pt-4  border-gray-200 text-[10px] text-gray-400 font-medium">
            <span class="text-[10px] text-gray-400 font-bold mr-1">#${id} </span>
            
            <p>by ${author}</p>
          </div>

          <div class="text-[10px] text-gray-400 font-bold"><p>${new Date(createdAt).toLocaleDateString('en-GB')}</p></div>
    `;
    return card;
}

// ---------button toggling-----------//
function toggleStyle(status, btn) {
  showLoading(); 

  const allBtn = document.querySelectorAll(".tab");
  for (const tab of allBtn) {
    tab.classList.remove("tab-active");
  }

  btn.classList.add("tab-active");

  //-- button filtering---//
  setTimeout(function() {
    
    let selectBtn = [];

    if (status === "all") {
      selectBtn = allIssue;
    } else {
      selectBtn = allIssue.filter(issue => issue.status === status);
    }

    displayIssues(selectBtn);

    hideLoading();

  }, );
}

// --modal logic----//
function showModal(id) {
  // console.log(id);
    const item = allIssue.find(issue => issue.id === id);

    modalBody.innerHTML = `
        <div class="p-4">
            <h2 class="text-6 font-bold mb-2 text-black">${item.title}</h2>
            
            <div class="flex items-center gap-3 mb-6">
                <span class="badge ${item.status === 'open' ? 'bg-[#10B981]' : 'bg-[#ab5def]'} text-white border-none px-4 py-3 text-3 font-medium uppercase rounded-xl">${item.status}
                </span>

                <p class=" text-gray-400 font-medium">
                    • Opened by <span class="text-gray-400">${item.author}</span> • ${new Date(item.createdAt).toLocaleDateString('en-GB')}
                </p>
            </div>

            <div class="flex flex-wrap gap-2 mb-6">
                ${item.labels.map(label => `
                    <span class="bg-blue-100 text-blue-500 badge badge-outline uppercase font-medium text-[10px] px-3 py-1">${label}</span>
                `).join('')}
            </div>

            <p class="text-4 text-gray-500 mb-6">
                ${item.description}
            </p>

            <div class="grid grid-cols-2 gap-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                    <p class=" uppercase text-gray-400 mb-1">Assignee:</p>
                    <p class="text-6 text-gray-800 font-semibold">${item.author}</p>
                </div>
                <div>
                    <p class=" uppercase text-gray-400 mb-2">Priority:</p>
                    
                    <span class="badge bg-red-500 text-white font-semibold px-4 py-3 text-3 border-none">
                         ${item.priority?.toUpperCase() ?? 'LOW'}</span>
                </div>
            </div>
        </div>
    `;
    issueModal.showModal();
}

// ---search logic--//

document.getElementById("search-btn").addEventListener("click", async () => {
    const searchValue = searchInput.value.trim();

    showLoading();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);
    const data = await res.json();
    const searchCard = data.data;

    if (searchCard && searchCard.length > 0) {
        displayIssues(searchCard);
    } else {
        issuesContainer.innerHTML = `
            <div class="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm px-10">
                <div class="text-center bg-gray-100 col-span-full rounded-xl py-20 px-10 space-y-6">
                   <h2 class="text-4xl font-medium text-gray-400">
                   Opps ! No Issue Found
                    </h2>
                    <p class="font-bold text-xl text-gray-600">Try Again</p>
                </div>
            </div>`;
        issueCount.innerText = 0;
    }

    hideLoading();
});

searchInput.addEventListener("click", (issue) => {
    if (issue.key === "Enter") {
        searchBtn.click();
    }
});