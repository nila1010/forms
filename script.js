import { getRecipes, removeRecipes, creatRecipes } from "./moduels/crud.js";
import { $, $$ } from "./moduels/dom.js";
import { updateRecipe } from "./update.js";
import { countries } from "./moduels/countries.js";

$("#btn-update").hidden = true;

$("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  let value = {};
  const formData = new FormData($("form"));
  value.name = formData.get("name");
  value.description = formData.get("description");
  value.ingredients = formData.get("ingredients").split("\n");
  value.serves = formData.get("serves");
  value.allergens = formData.get("allerges").split("\n");
  value.diet = formData.get("diet");
  value.studentFriendly = formData.get("studentFriendly");
  value.origin = formData.get("origin");
  await creatRecipes(value);
  showRecipes();
  await $("form").reset();
});

export async function showRecipes() {
  const response = await getRecipes();
  const temp = document.querySelector("template").content;
  const parent = document.querySelector("section");
  parent.innerHTML = "";

  response.forEach((recipe) => {
    const clone = temp.cloneNode(true);
    clone.querySelector("[data-name]").textContent = recipe.name;
    clone.querySelector("[data-description]").textContent = recipe.description;
    clone.querySelector("[data-origin]").textContent = recipe.origin;
    clone.querySelector("[data-diet]").textContent = recipe.diet;
    clone.querySelector("[data-serves]").textContent = recipe.serves;

    if (recipe.studentFriendly) {
      clone.querySelector("[data-studenFriendly]").hidden = false;
    } else {
      clone.querySelector("[data-studenFriendly]").hidden = true;
    }

    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      clone.querySelector("[data-ingridiens]").appendChild(li);
    });

    recipe.allergens.forEach((allerge) => {
      const li = document.createElement("li");
      li.textContent = allerge;
      clone.querySelector("[data-allerges]").appendChild(li);
    });

    clone.querySelectorAll("[data-id]").forEach((btn) => {
      btn.dataset.id = recipe.id;
    });
    clone.querySelector("button[data-action='delete']").addEventListener("click", async () => {
      await removeRecipes(recipe.id);
      await showRecipes();
    });
    clone.querySelector("button[data-action='update']").addEventListener("click", async () => {
      await updateRecipe(recipe.id);
    });

    parent.appendChild(clone);
  });
}

function setContries() {
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.name;
    option.textContent = country.name;
    $("#form_origin").appendChild(option);
  });
}
setContries();
showRecipes();
