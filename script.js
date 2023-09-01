// get API data
const getCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  const tabs = document.getElementById("tabs");
  categories.forEach((category) => {
    const span = document.createElement("span");
    span.innerHTML = `<button onclick="singleData('${category.category_id}', this)" class="cat-btn btn m-4"> ${category.category} </button>`;
    tabs.appendChild(span);
  });
};

let catId = 1000;
let sort = false;

// get single data from API
const singleData = async (id, button) => {
  // Fetch data
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await response.json();
  const catData = data.data;

  // Active Button By Onclick
  if (button !== undefined) {
    const catBtns = document.querySelectorAll(".cat-btn");
    catBtns.forEach((catBtn) => {
      catBtn.classList.remove("active");
    });
    button.classList.add("active");
  }

  // Data sort
  catId = id;
  if (sort) {
    catData.sort((a, b) => {
      let aViews = nFormat(a.others.views);
      let bViews = nFormat(b.others.views);
      if (aViews > bViews) {
        return 1;
      }
      if (aViews < bViews) {
        return -1;
      }
      return 0;
    });
  }

  const cardContainer = document.getElementById("cards");
  cardContainer.innerHTML = "";
  if (catData.length === 0) {
    const div = document.createElement("div");
    div.classList.add("col-start-2", "col-span-2");
    div.innerHTML = `
      <div class="text-center ">  
        <img class="mx-auto pb-5" src="${`img/Icon.png`}" alt="">
      <h1 class="text-4xl">Oops!! Sorry, There is no content here</h1>
      </div>
      `;
    cardContainer.appendChild(div);
  }

  catData.forEach((card) => {
    const div = document.createElement("div");
    div.classList = `single-card`;
    div.innerHTML = `
    <div class="relative"> 
    <img class="w-full h-56 rounded-lg" src="${card.thumbnail}" alt="">
    <span>${
      card.others.posted_date
        ? `<span class="bg-black rounded-lg p-2 text-white absolute text-sm right-4 bottom-4">${
            secToHour(card.others.posted_date).hrs
          }hrs  
    ${secToHour(card.others.posted_date).min} min ago</span>`
        : ""
    }</span>
    
     </div>
    <div class="flex pt-8"> 
        <img class="w-16 h-16 rounded-full" src="${
          card.authors[0].profile_picture
        }" alt="Author"> 
        <div class="ps-4">
            <h2 class="font-bold text-lg">${card.title}</h2>
            <div class="flex">
                <span>${card.authors[0].profile_name}</span>
                <span class="ps-4"> ${
                  card.authors[0].verified
                    ? `<i class="fa-solid fa-circle-check text-blue-500"></i>`
                    : ""
                } </span>
            </div>
            <p>${card.others.views}</p>
        </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
};

// Second to hour and Minutes
const secToHour = (totalSeconds) => {
  const totalMin = Math.floor(totalSeconds / 60);
  const hour = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  return { hrs: hour, min: minutes };
};

// N Formatter
const nFormat = (num) => {
  return num.slice(0, -1) * 1000;
};

// Sort By view
const sortByViews = () => {
  const sortBtn = document.querySelectorAll(".sort-btn");
  sortBtn.forEach((btn) => {
    btn.classList.toggle("sort-active");
  });
  sort = !sort;
  singleData(catId);
};

singleData("1000");
getCategories();
