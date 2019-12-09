const selectModals = document.querySelectorAll(".select-modal");

//convert select to divs
selectModals.forEach(el => {
  generateSelectModal(el);
});

//generate initial divs using select
function generateSelectModal(el) {
  const div = document.createElement("div");
  const label = document.createElement("div");
  label.setAttribute("class", "select-label");
  div.appendChild(label);
  const children = Array.from(el.children);
  const ul = document.createElement("ul");
  let li = "";

  if (children.length > 0) {
    label.innerText = children[0].innerText;
    label.addEventListener("click", openSelectModal);
    children.forEach(item => {
      li = document.createElement("li");
      li.setAttribute("class", "select-modal-option");
      li.setAttribute("data-value", item.value);
      li.innerText = item.innerText;
      if (item.hasAttribute("selected")) {
        li.setAttribute("class", "selected");
        label.innerText = item.innerText;
      }
      ul.appendChild(li);
      li.addEventListener("click", onListItemSelect);
    });
  }

  div.setAttribute("class", "select-modal-container");
  div.appendChild(ul);
  el.parentNode.insertBefore(div, el);
}

function openSelectModal(e) {
  const el = e.target.closest(".select-modal-container");
  document.querySelectorAll(".select-modal-container").forEach(item => {
    if (item === el) {
      item.classList.contains("active")
        ? item.classList.remove("active")
        : item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function onListItemSelect(e) {
  const div = e.target.closest(".select-modal-container");
  const label = div.firstChild;
  label.innerText = this.innerText;
  div.classList.remove("active");
  div.nextSibling.value = this.getAttribute("data-value");
}

//hide modal if clicked outside
document.addEventListener(
  "click",
  function(e) {
    if (e.target.closest(".select-modal-container.active")) {
      return;
    }

    const el = document.querySelector(".select-modal-container.active");
    if (el) {
      document
        .querySelector(".select-modal-container.active")
        .classList.remove("active");
    }
  },
  false
);
