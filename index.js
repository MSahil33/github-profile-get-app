const user_profile = document.querySelector('.profile');
const error_box = document.querySelector('.error-box')

const APIURL = 'https://api.github.com/users/';

const getUserProfile = async(username) => {
    const response = await fetch(APIURL+username);
    let userdata = await response.json();
    // console.log(userdata);
    if(userdata.message == 'Not Found'){
        error_box.innerHTML = `<div class="error">Invalid username</div>`;
        user_profile.innerHTML='';
        console.log('Not VAlid');
    }
    else{
        user_profile.innerHTML = `
            <section class="user-section">
                <div class="user-details">
                    <div class="user-avatar">
                        <img src="${userdata.avatar_url}" alt="${userdata.username}">
                </div>
                <div class="user-info">
                        <h3 class="usr-name">${userdata.name}</h3>
                        <h4 class="usr-bio">${userdata.bio==null?'-':userdata.bio}</h4>
                    </div>
                </div>
                <div class="follows">
                    <div class="followers follow-data">
                        <h3>Followers</h3>
                        <h4 class="follower-num num">${userdata.followers}</h4>
                    </div>
                    <div class="following follow-data">
                        <h3>Followings</h3>
                        <h4 class="following-num num">${userdata.following}</h4>
                    </div>
                    <div class="repos-count follow-data">
                        <h3>Repos</h3>
                        <h4 class="respos-num num">${userdata.public_repos}</h4>
                    </div>
                </div>
            </section>
            <div class="repos">
                <div class="repos-head" >
                    <h3 class="repo-heading">Repositories</h3>
                </div>

                <ol class="repos-list">
                </ol>
            </div>
            <div class="profile-visit">
                <a href="${userdata.html_url}" target="_blank">
                <button class="btn">Visit Github Profile <span class="profile-visit-icon">&#10138</span></button>
                </a>
            </div>
    `;

    error_box.innerHTML=''
    getUserRepos(username);
    }
}
//Getting user repositories
const getUserRepos = async(username)=>{
    // console.log(username)
    const response = await fetch(APIURL+username+"/repos");
    const data = await response.json();
    console.log(data)
    data.forEach((currItem,index)=>{
        const repos_list = document.querySelector('.repos-list');
        const newLiElem = document.createElement('li');
       
        newLiElem.innerHTML = `
        <a href="${currItem.html_url}" class="repos-data" target="_blank">${index+1} . ${currItem.name} <span class="repo-stars">&#9734 ${currItem.stargazers_count}</span></a>
        ` ;
        repos_list.appendChild(newLiElem);
    })

}

//After clicking the search button
const btn = document.getElementById('submit-btn');
btn.addEventListener('click',()=>{
    let userInput = document.getElementById('inp');let inp = userInput.value;
    console.log(inp);
    getData();
    getUserProfile(inp);
    userInput.value = '';
})
const getData = ()=>{
    const form = document.querySelector('form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
    })
}
