import { apikey, endpoint } from "./settings.js";
import { $ } from "./dom.js";

export async function getRecipes() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}

export async function creatRecipes(recipe) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    serves: recipe.serves,
    allergens: recipe.allergens,
    diet: recipe.diet,
    studentFriendly: recipe.studentFriendly,
    origin: recipe.origin,
  });

  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();

  return data;
}

export async function removeRecipes(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    prefer: "return=representation",
  };

  await fetch(`${endpoint}?id=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  });
}

export async function patchRecipies(id, value) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    perfer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: value.name,
    description: value.description,
    ingredients: value.ingredients,
    serves: value.serves,
    allergens: value.allergens,
    diet: value.diet,
    studentFriendly: value.studentFriendly,
    origin: value.origin,
  });

  let data = await fetch(`${endpoint}?id=eq.${id}`, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  $("#btn-send").hidden = false;
  $("#btn-update").hidden = true;

  return data;
}
