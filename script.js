const users = document.getElementsByClassName("users")[0];
const filter = document.getElementById("search");

console.log(users);
/* User syntax 
            <div class="user">
                <img src="https://randomuser.me/api/portraits/men/62.jpg">
                <div class="info">
                    <h4>Mikslayla Reid</h4>
                    <h5>At A Boon, Dead By Daylight</h5>
                </div>
            </div>
*/

/* Functions*/ 
let getData = async() => {
    const res = await fetch('https://randomuser.me/api?results=50') ;
    const data = await res.json();

    const results = data.results;
    users.innerHTML = ''; // Clear HTML 

    results.forEach( (user) => {
    users.innerHTML += `<div class="user">
        <img src="${user.picture.thumbnail}">
        <div class="info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <h5>${user.location.city}, ${user.location.country}</h5>
        </div>
    </div>`
    });
}

let filterUsers = (e) => { 
    const input = e.target.value; 
    let children = users.childNodes;
    console.log(children[0]);
    // If input is empty, then show all: 
    if (!input) {
        for (let i = 0; i<children.length; i++){
            children[i].classList.remove("hide");
        }
        return;
    }

    for (let i = 0; i<children.length; i++){
        const name = children[i].children[1].children[0].innerHTML; 
        const loc = children[i].children[1].children[1].innerHTML;
        
        // Hide those that don't match, show those that match 
        if (!name.includes(input) && !loc.includes(input))
            children[i].classList.add("hide");
        else 
            children[i].classList.remove("hide"); 
    }

}
getData(); 
filter.addEventListener("input", filterUsers)