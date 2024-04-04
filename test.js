import { creatRecipes } from "./moduels/crud";

function handleSubmit() {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    creatRecipes({
      name: form.get("name"),
    });
  });
}
