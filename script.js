// console.log('hello jitu');

const signupPage = document.getElementById('signup-page')
const signupBtn = document.getElementById('signup-btn');
const mainPage = document.getElementById('main-page');
const userName = document.getElementById('username');
const password = document.getElementById('password');
const issuesContainer = document.getElementById('issues-container');
const issueCount = document.getElementById('issue-count');



//--------- login logic--------//
signupBtn.addEventListener('click', () => {
  // console.log('clicked');
  const userNameValue = userName.value;
  const passwordValue = password.value;

  if (userNameValue === 'admin' && passwordValue === 'admin123') {
    signupPage.classList.add('hidden')
    mainPage.classList.remove('hidden');
    
    alert('Sign Up Successful')
  }
  else {
    alert('Sign Up Unsuccessful')
  }
  
});

// ----fetching card---//
async function fetchCard() {
  const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
  const data = await res.json();
  allIssue = data.data;
  // console.log(allCards);
  displayIssues(allIssue)
}
fetchCard();

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
    


    card.innerHTML = `
        <div>
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    <img src="${statusImg}" alt="${status}" style="width: 18px; height: 18px; object-fit: contain;" class="shrink-0"> 
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

