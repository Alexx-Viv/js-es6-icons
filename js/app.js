// ? FUNCTION
const renderIcons = (iconsArray, targetElement) => {
  let iconsTemplate = "";
  iconsArray.forEach((icon, index) => {
    let hasOffset = "";
    if (index == 0 || index % 5 === 0) {
      hasOffset = "offset-md-1";
    }

    iconsTemplate += `
    <div class="col col-sm-4 col-md-2 ${hasOffset}">
        <div class="card">
            <div class="card-body ${icon.type}">
                <i class="${icon.family} ${icon.prefix}${icon.name} fa-2x"></i>
                <h2 class="h6">${icon.name.toUpperCase()}</h2>
            </div>
        </div>
    </div>
    `;
  });
  targetElement.innerHTML = iconsTemplate;
};

const renderOptions = (iconsArray, targetElement) => {
  const iconTypes = [];
  iconsArray.forEach((icon) => {
    if (!iconTypes.includes(icon.type)) {
      iconTypes.push(icon.type);
    }
  });

  const firstOption = '<option selected value="all">All</option>';
  const options = iconTypes.reduce((optionsList, type) => {
      return (optionsList += `<option value="${type}">${type}</option>`);
  }, firstOption);

  targetElement.innerHTML = options;
};

// ? STAMPO IN PAGINA
const iconsSection = document.querySelector("#icons .row");
renderIcons(icons, iconsSection);

const selectField = document.getElementById("type-filter");

// ? FILTRO DINAMICO
renderOptions(icons, selectField);

// ? LOGICA FILTRI
selectField.addEventListener("change", () => {
  const filterValue = selectField.value;

  if (filterValue === "all") {
    renderIcons(icons, iconsSection);
    return;
  }

  const filteredIcons = icons.filter((icon) => filterValue === icon.type);
  renderIcons(filteredIcons, iconsSection);
  return;
});
