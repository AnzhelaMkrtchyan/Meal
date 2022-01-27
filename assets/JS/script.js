const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const random = document.querySelector("#random");
const mealsEl = document.querySelector("#meals");
const resultHeading = document.querySelector("#result-heading");
const single_mealEl = document.querySelector("#single-meal");

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  let inpVal = search.value;
  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
  single_mealEl.innerHTML = "";
  if (inpVal.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inpVal}`)
      .then((res) => res.json())
      .then((newRes) => {
        console.log(newRes);
        if (newRes.meals == null) {
          resultHeading.innerHTML = `
                <p>Invalid value, try again</p>
            `;
        } else {
          resultHeading.innerHTML = `
                <p>Results for ${inpVal}</p>
            `;
          newRes.meals.map((item) => {
            const meal = document.createElement("div");
            meal.className = "meal";
            meal.addEventListener("click", () => {
              single_mealEl.innerHTML = `
                <div class="single-meal-info">
                  <img src="${item.strMealThumb}" />
                  <p>${item.strInstructions}</p>
                  <ul class="ingredientUl"></ul>
                </div>
              `;
              const ul = document.querySelector(".ingredientUl");
              for (let i = 1; i <= 20; i++) {
                if (item[`strIngredient${i}`] !== "") {
                  ul.innerHTML += `
                    <li>${item[`strIngredient${i}`]}</li>
                  `;
                }
              }
            });
            mealsEl.appendChild(meal);

            meal.innerHTML = `
              <h3 class="meal-info">${item.strMeal}</h3>
              <img src="${item.strMealThumb}" />`;
          });
          search.value = "";
        }
      });
  } else {
    confirm("Try Again");
  }
});

random.addEventListener("click", () => {
  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
  single_mealEl.innerHTML = "";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((newRes) => {
      console.log(newRes.meals);
      resultHeading.innerHTML = "<p>Random Result</p>";
      newRes.meals.map((item) => {
        const meal = document.createElement("div");
        meal.className = "meal";
        meal.addEventListener("click", () => {
          single_mealEl.innerHTML = `
                <div class="single-meal-info">
                  <img src="${item.strMealThumb}" />
                  <p>${item.strInstructions}</p>
                  <ul class="ingredientUl"></ul>
                </div>
              `;
          const ul = document.querySelector(".ingredientUl");
          for (let i = 1; i <= 20; i++) {
            if (item[`strIngredient${i}`] !== "") {
              ul.innerHTML += `
                    <li>${item[`strIngredient${i}`]}</li>
                  `;
            }
          }
        });
        mealsEl.appendChild(meal);

        meal.innerHTML = `
              <h3 class="meal-info">${item.strMeal}</h3>
              <img src="${item.strMealThumb}" />`;
      });
    })
    .catch((err) => console.log(err));
});
