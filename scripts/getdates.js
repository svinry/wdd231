
const today = new Date();
const currentYear = document.querySelector("#currentYear");
currentYear.textContent = today.getFullYear();

const lastModifiedDate = new Date(document.lastModified);
const lastModifiedDisplay = document.querySelector("#lastModified");
lastModifiedDisplay.textContent = `Last Modification: ${lastModifiedDate.toLocaleString("en-ZW", {
	dateStyle: "medium",
	timeStyle: "short"
})}`;
