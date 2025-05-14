const toggleBtnText = document.querySelector('[data-toggleBtnText]');
const toggleBtnIcon = document.querySelector('[data-toggleBtnIcon]');
const toggleBtn = document.querySelector('#toggle-btn');

const searchForm = document.querySelector('[data-searchForm]');
const searchInput = document.querySelector('[data-searchInput]')
const gitProfileImg = document.querySelector('[data-gitProfileImg]');
const gitName = document.querySelector('[data-gitName]')
const joinDate = document.querySelector('[data-joinDate]')
const gitUserName = document.querySelector('[data-gitUserName]')
const gitBio = document.querySelector('[data-gitBio]')
const repos = document.querySelector('[data-repos]')
const followers = document.querySelector('[data-followers]')
const following = document.querySelector('[data-following]')
const gitLocation = document.querySelector('[data-location]')
const website = document.querySelector('[data-website]')
const twitterId = document.querySelector('[data-twitterId]')
const company = document.querySelector('[data-company]')

const root = document.documentElement.style;

let user_name = "sagarpjpt";

toggleBtn.addEventListener('click', ()=>{
    if(toggleBtnText.innerText === "Dark"){
        toggleBtnText.innerText = "Light";
        toggleBtnIcon.src = "./images/sun-icon.svg";
        // activate dark mode css prop
        darkModeProperty();
        return;
    }
    if(toggleBtnText.innerText === "Light") {
        toggleBtnText.innerText = "Dark";
        toggleBtnIcon.src = "./images/moon-icon.svg";
        lightModeProperty();
        // activate light mode css prop
    }
})


getGitUser();

async function getGitUser(){
    try{

        const response = await fetch(
            `https://api.github.com/users/${user_name}`
        );

        if(response.ok){
            const data = await response.json();
            console.log(data);
            renderGitUserInfo(data);
        }
        else{
            alert('User Not Found !');
        }

    }
    catch(e) {
        alert('Error In Fetching API !');
    }
}

function renderGitUserInfo(data) {
    gitProfileImg.src = data?.avatar_url;
    
    gitName.innerText = data?.name;
    joinDate.innerText = setDate(data?.created_at);

    gitUserName.innerText = `@${data?.login}`;
    gitUserName.href = `${data?.html_url}`;
    gitUserName.target = '_blank';
    
    gitBio.innerText = data?.bio;

    repos.innerText = data?.public_repos;

    followers.innerText = data?.followers;

    following.innerText = data?.following;

    if(data?.location === null){
        gitLocation.innerText = "Not Available"
    }
    else {
        gitLocation.innerText = data?.location;
    }

    if(data?.blog === "") {
        website.innerText = "Not Available"
    }
    else{
        website.innerText = data?.blog;
        website.href = `${data?.blog}`;
        website.target = '_blank';
    }

    if(data?.twitter_username === null){
        twitterId.innerText = "Not Available"
    }
    else {
        twitterId.innerText = data?.twitter_username;
        twitterId.href = `${data?.twitter_username}`
        twitterId.target = '_blank';
    }

    if(data?.company === null){
        company.innerText = "Not Available"
    }
    else{
        company.innerText = data?.company;
    }

}

function setDate(createdAt) {
    const date = new Date(createdAt);
    
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // "Sep"
    const year = date.getFullYear();

    const formattedDate = `Joined ${day} ${month} ${year}`;

    return formattedDate;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    user_name = searchInput.value;
    if(user_name === "") alert('please enter a user name');
    else getGitUser();
})

function darkModeProperty(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow", "0px 16px 30px -10px rgba(70, 88, 109, 0.5)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
}

function lightModeProperty(){
    root.setProperty("--lm-bg", "#f6f8ff");
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-text", "#4b6a9b");
    root.setProperty("--lm-text-alt", "#2b3442");
    root.setProperty("--lm-shadow", "0px 16px 30px -10px rgba(70, 96, 187, 0.2)");
    root.setProperty("--lm-icon-bg", "brightness(100%)");
}

