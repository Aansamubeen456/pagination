const fetchUsers = async () => {
  try {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

let index = 0;
let pages = [];
const btnContainer = document.querySelector(".btn-container");

const setupUI = () => {
  displayUsers(pages[index]);
  displayButtons();
};
const displayButtons = () => {
  let btns = pages.map((_, pageIndex) => {
    return `<button class="page-btn ${
      index === pageIndex ? "active-btn" : "null "
    }" data-index="${pageIndex}">
${pageIndex + 1}
</button>`;
  });
  btns.push(`<button class="next-btn">next</button>`);
  btns.unshift(`<button class="prev-btn">prev</button>`);
  btns = btns.join("");

  btnContainer.innerHTML = btns;
  console.log(btns);
};
const init = async () => {
  const titlte = document.querySelector(".section-title h1");
  const users = await fetchUsers();
  titlte.innerText = "Pagination";
  pages = paginate(users);
  setupUI();
};
init();

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-container")) {
    return;
  }
  if (e.target.classList.contains("page-btn")) {
    index = parseInt(e.target.dataset.index);
  }

  if (e.target.classList.contains("next-btn")) {
    index++;
    if (index > pages.length - 1) {
      index = 0;
    }
  }

  if (e.target.classList.contains("prev-btn")) {
    index--;
    if (index < 0) {
      index = pages.length - 1;
    }
  }

  setupUI();
});

const containerDOM = document.querySelector(".container");
const displayUsers = (users) => {
  const titlte = document.querySelector(".section-title h1");
  //   const users = await fetchUsers();/
  titlte.innerText = "Pagination";

  containerDOM.innerHTML = users
    .map((user) => {
      const { login, avatar_url: img, html_url: url } = user;
      return `
       <article class='card'>
         <img src="${img}" alt='person' />
           <h4>${login}</h4>
         <a href="${url}" class="btn">view profile</a>
       </article>
       `;
    })
    .join("");
  const numberOfPersons = paginate(users);
};

const paginate = (followers) => {
  const itemsPerPage = 8;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);

  const newFollowers = [...Array(numberOfPages)].map((_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });
  return newFollowers;
};
