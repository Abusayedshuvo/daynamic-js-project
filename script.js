// get API data
const getCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  const categories = data.data;
  const tabs = document.getElementById("tabs");
  categories.forEach((category) => {
    const a = document.createElement("button");
    a.classList = `btn mx-4 active:bg-rose-500`;
    a.innerText = `${category.category}`;
    tabs.appendChild(a);
    // console.log(category);
  });
};

// get single data from API
const singleData = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await response.json();
  const singleData = data.data;
  console.log(singleData);

  const cardContainer = document.getElementById("cards");
  singleData.forEach((card) => {
    console.log(card.authors[0].verified);
    const div = document.createElement("div");
    div.classList = `single-card`;
    div.innerHTML = `
    <img src="${card.thumbnail}" alt="">
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

singleData();
getCategories();
