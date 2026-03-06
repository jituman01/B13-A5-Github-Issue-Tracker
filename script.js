// console.log('hello jitu');

const signupPage = document.getElementById('signup-page')
const signupBtn = document.getElementById('signup-btn');
const mainPage = document.getElementById('main-page');
const userName = document.getElementById('username');
const password = document.getElementById('password');


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
