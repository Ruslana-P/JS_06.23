const formNewNote = document.querySelector("#newNote");
const formNewNoteTitle = formNewNote.querySelector(".newNote__title");
const formNewNoteText = formNewNote.querySelector(".newNote__text");
const formNewNoteSelect = document.querySelector(".newNote__select");
const notesNode = document.querySelector(".notes");
let isEditoring = false;
let cloneNode;

renderNotes(notesNode);

// function for input validation
function validation(inputNode, min, max) {
  const valueLenght = inputNode.value.trim().length;
  if (valueLenght < min || valueLenght > max) {
    inputNode.classList.add("invalid");
    inputNode.addEventListener(
      "input",
      (e) => {
        e.target.classList.remove("invalid");
      },
      { once: true }
    );
    return false;
  }
  return true;
}

function getActualDate() {
  function adjustDate(date) {
    return date < 10 ? `0${date}` : date;
  }
  const hour = adjustDate(new Date().getHours());
  const minutes = adjustDate(new Date().getMinutes());
  const date = adjustDate(new Date().getDate());
  const month = adjustDate(new Date().getMonth() + 1);
  return `${hour}:${minutes} ${date}.${month}.${new Date().getFullYear()}`;
}
function addNote(titleNode, textNode) {
  const newNote = {
    title: titleNode.value,
    text: textNode.value,
    date: getActualDate(),
    chanched: false,
    color: formNewNoteSelect.options[formNewNoteSelect.selectedIndex].value,
  };
  console.log(formNewNoteSelect.options[formNewNoteSelect.selectedIndex].value);

  let notes = localStorage.getItem("notes");
  if (!notes) {
    localStorage.setItem("notes", JSON.stringify([newNote]));
  } else {
    notes = JSON.parse(notes);
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  titleNode.value = "";
  textNode.value = "";
  renderNotes(notesNode);
}

function renderNotes(parentNode, arr) {
  const notes = arr ? arr : JSON.parse(localStorage.getItem("notes"));
  if (!notes) {
    return;
  }
  let result = "";
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    const newNote = `<div class='note ${note.color}' >
                  <h2 class='note__title'>${note.title}</h2>
                  <span class="note__date">
                  ${note.chanched ? "Updated" : "Created"} : ${note.date}
                  </span>
                  <p class='note__text'>${note.text}</p>
                  <img class="icon delete-icon"src='delete-icon.svg' />
                  <img class ="icon edit-icon" src='edit-icon.svg' />
                  </div>`;

    result += newNote;
  }
  parentNode.innerHTML = result;
}

function deleteNote(e) {
  if (!confirm("Are you sure you want to delete this note?")) {
    return;
  }
  const title = e.target.closest(".note").firstElementChild.textContent;
  const notes = JSON.parse(localStorage.getItem("notes"));
  let newNotes = notes.filter((item) => item.title != title);
  localStorage.setItem("notes", JSON.stringify(newNotes));
  renderNotes(notesNode);
}

function editNote(e) {
  //first check if there is another open editor. if yes, cancel it
  if (isEditoring) {
    cancelEdition();
  }

  //create form for note editoring
  const noteNode = e.target.closest(".note");
  const titleValue = noteNode.querySelector(".note__title").textContent;
  // console.log(titleValue);

  const textValue = noteNode.querySelector(".note__text").textContent;
  cloneNode = noteNode.cloneNode(true);
  isEditoring = true;

  const form = document.createElement("form");
  form.classList.add("edit-form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("edit-form__title");
  const textArea = document.createElement("textarea");
  textArea.classList.add("edit-form__text");
  const imgDone = document.createElement("img");
  imgDone.setAttribute("src", "done-icon.svg");
  imgDone.classList.add("done-icon");
  imgDone.classList.add("icon");
  const imgCancel = document.createElement("img");
  imgCancel.setAttribute("src", "cancel-icon.svg");
  imgCancel.classList.add("cancel-icon");
  imgCancel.classList.add("icon");
  form.appendChild(input);
  form.appendChild(textArea);
  form.appendChild(imgDone);
  form.appendChild(imgCancel);

  noteNode.replaceWith(form);
  const formTitle = document.querySelector(".edit-form__title");
  const formText = document.querySelector(".edit-form__text");
  formTitle.value = titleValue;
  formText.value = textValue;
  document.querySelector(".cancel-icon").onclick = () => cancelEdition();
  document.querySelector(".done-icon").onclick = () => {
    const valid1 = validation(formTitle, 5, 15);
    const valid2 = validation(formText, 5, 100);
    if (valid1 && valid2) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const index = notes.findIndex((item) => item.title === titleValue);
      // console.log(index);
      notes[index].title = document.querySelector(".edit-form__title").value;
      notes[index].text = document.querySelector(".edit-form__text").value;
      notes[index].date = getActualDate();
      notes[index].chanched = true;
      localStorage.setItem("notes", JSON.stringify(notes));
      renderNotes(notesNode);
    }
  };
}

function cancelEdition() {
  const formNode = document.querySelector(".edit-form");
  formNode.replaceWith(cloneNode);
  isEditoring = false;
  cloneNode = null;
}

document.body.addEventListener("click", (e) => {
  let target = e.target;
  //   console.log(target);
  if (target.classList.contains("newNote__submit")) {
    e.preventDefault();
    console.log(e.target);

    const firstVal = validation(formNewNoteTitle, 5, 15);
    const secondVal = validation(formNewNoteText, 5, 100);
    firstVal && secondVal && addNote(formNewNoteTitle, formNewNoteText);
  }
  if (target.classList.contains("delete-icon")) {
    deleteNote(e);
  }
  if (target.classList.contains("edit-icon")) {
    editNote(e);
  }
});

document.querySelector(".search__input").oninput = (e) => {
  let inputValue = e.target.value;
  searchNote(inputValue);
};

function searchNote(value) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  let newNotes = notes.filter((item) => item.title.includes(value));
  renderNotes(notesNode, newNotes);
}

const favoriteNotes = [];
