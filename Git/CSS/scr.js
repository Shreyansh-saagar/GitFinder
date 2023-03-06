const APIURL = "https://api.github.com/users/";

const main = document.querySelector('#main');
const searchBox = document.querySelector('#search')

const getUser = async(username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json()
    // console.log(data)

    const card = `
        <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="Pop" class="profile">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <hr>

                <ul class="info">
                    <li>|| ${data.followers}  &nbsp;<strong>Followers</strong> ||</li>
                    <li>  &nbsp;${data.following}  &nbsp;<strong>Following</strong> ||</li>
                    <li>  &nbsp; ${data.public_repos}  &nbsp;<strong>Repos</strong> ||</li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>
    `
    main.innerHTML = card;
    getRepos(username)
}

const getRepos = async (username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            const ele = document.createElement("a");
            ele.classList.add("repo");
            ele.href = item.html_url;
            ele.innerText = item.name;
            ele.target = "_blank";
            repos.appendChild(ele);
            repos.appendChild(document.createTextNode(' ')); // add space between elements
    });
  };

const formSubmit = () => {
    if(searchBox.value != ""){
        getUser(searchBox.value)
        searchBox.value = ""
    }
    return false;
}

searchBox.addEventListener(
    "focusout",
    function(){
        formSubmit()
})