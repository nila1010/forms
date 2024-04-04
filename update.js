import { patchRecipies } from "./moduels/crud.js";
import { showRecipes } from "./script.js";
import { $, $$ } from "./moduels/dom.js";
import { apikey, endpoint } from "./moduels/settings.js";

async function editRecipe(data, id) {
  $("#btn-send").hidden = true;
  $("#btn-update").hidden = false;

  $("#form_name").focus();
  data.forEach((e) => {
    $("#form_name").value = e.name;
    $("#form_description").value = e.description;
    $("#form_origin").value = e.origin;
    $("#form_serves").value = e.serves;
    $("#form_ingredients").value = e.ingredients.join("\n");
    $("#form_allerges").value = e.allergens.join("\n");
    $(`input[value=${e.diet}]`).checked = true;
    e.studentFriendly ? ($("#form_studentFriendly_yes").checked = true) : ($("#form_studentFriendly_no").checked = true);
  });

  $("#btn-update").addEventListener("click", async (e) => {
    e.preventDefault();
    $("button").textContent = "Indsend opskrift";
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
    await patchRecipies(id, value);
    showRecipes();
    await $("form").reset();
  });
}

export async function updateRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();

  await editRecipe(data, id);
}
