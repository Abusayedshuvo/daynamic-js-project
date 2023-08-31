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
    console.log(category);
  });
};

getCategories();
