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
  const valueLength = inputNode.value.trim().length;
  if (valueLength < min || valueLength > max) {
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

// function gets actual time + date and returns as a string
function getActualDate() {
  const now = new Date();
  function adjustDate(date) {
    return date < 10 ? `0${date}` : date;
  }
  const hour = adjustDate(now.getHours());
  const minutes = adjustDate(now.getMinutes());
  const date = adjustDate(now.getDate());
  const month = adjustDate(now.getMonth() + 1);
  return `${hour}:${minutes} ${date}.${month}.${now.getFullYear()}`;
}

//function ads new note to localeStorage, and invoke  function renderNotes;
function addNote(titleNode, textNode) {
  const newNote = {
    title: titleNode.value,
    text: textNode.value,
    date: getActualDate(),
    chanched: false,
    color: formNewNoteSelect.options[formNewNoteSelect.selectedIndex].value,
  };

  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));

  titleNode.value = "";
  textNode.value = "";
  renderNotes(notesNode);
}

//function render all notes
function renderNotes(parentNode, arr) {
  const notes = arr ? arr : JSON.parse(localStorage.getItem("notes"));
  if (!notes) {
    return;
  }
  let result = "";
  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    const noteStatus = note.chanched ? "Updated" : "Created";
    const newNote = `<div class='note ${note.color}' >
                  <h2 class='note__title'>${note.title}</h2>
                  <span class="note__date">
                  ${noteStatus} : ${note.date}
                  </span>
                  <p class='note__text'>${note.text}</p>
                  <img class="icon delete-icon"src='delete-icon.svg' />
                  <img class ="icon edit-icon" src='edit-icon.svg' />
                  </div>`;

    result += newNote;
  }
  parentNode.innerHTML = result;
}

//function delete choosed note
function deleteNote(e) {
  if (!confirm("Are you sure you want to delete this note?")) {
    return;
  }
  const noteElement = e.target.closest(".note");
  const title = noteElement.firstElementChild.textContent;
  const notes = JSON.parse(localStorage.getItem("notes"));
  let newNotes = notes.filter((item) => item.title != title);
  localStorage.setItem("notes", JSON.stringify(newNotes));
  noteElement.remove();
}

//function first create a form for editing, replave nodeElem with form
// and does reverce action when editing is done
function editNote(e) {
  //first check if there is another open editor. if yes, cancel it
  if (isEditoring) {
    console.log(isEditoring);
    cancelEdition();
  }

  //create form for note editoring
  const noteNode = e.target.closest(".note");
  const titleValue = noteNode.querySelector(".note__title").textContent;
  const textValue = noteNode.querySelector(".note__text").textContent;

  //create copy of exiting noteNode
  cloneNode = noteNode.cloneNode(true);

  //create form
  const form = document.createElement("form");
  form.classList.add("edit-form");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.classList.add("edit-form__title");

  const textArea = document.createElement("textarea");
  textArea.classList.add("edit-form__text");

  //function creates img node
  function createImageElement(src, classNames) {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    classNames.forEach((className) => img.classList.add(className));
    return img;
  }

  const imgDone = createImageElement("done-icon.svg", ["done-icon", "icon"]);
  const imgCancel = createImageElement("cancel-icon.svg", [
    "cancel-icon",
    "icon",
  ]);

  form.appendChild(input);
  form.appendChild(textArea);
  form.appendChild(imgDone);
  form.appendChild(imgCancel);

  //replace exiting node with recently created form
  noteNode.replaceWith(form);

  //fillful form with date from recently replced note node
  const formTitle = document.querySelector(".edit-form__title");
  const formText = document.querySelector(".edit-form__text");
  formTitle.value = titleValue;
  formText.value = textValue;

  //add eventlistener to icons: cancel and done
  document.querySelector(".cancel-icon").onclick = () => cancelEdition();
  document.querySelector(".done-icon").onclick = () => {
    const valid1 = validation(formTitle, 5, 15);
    const valid2 = validation(formText, 5, 100);
    if (valid1 && valid2) {
      const notes = JSON.parse(localStorage.getItem("notes"));
      const index = notes.findIndex((item) => item.title === titleValue);

      notes[index].title = document.querySelector(".edit-form__title").value;
      notes[index].text = document.querySelector(".edit-form__text").value;
      notes[index].date = getActualDate();
      notes[index].chanched = true;

      localStorage.setItem("notes", JSON.stringify(notes));

      renderNotes(notesNode);

      isEditoring = false;
    }
  };
}

//function cancel note editining
function cancelEdition() {
  const formNode = document.querySelector(".edit-form");
  formNode.replaceWith(cloneNode);
  cloneNode = null;
  isEditoring = false;
}

//add eventListener for click
document.body.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("newNote__submit")) {
    e.preventDefault();

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

//add eventListener for input
document.querySelector(".search__input").oninput = (e) => {
  let inputValue = e.target.value;
  searchNote(inputValue);
};

//function finds elements that contain in the title
// value passed as an argument and invoke renderNotes for rerendering
function searchNote(value) {
  const notes = JSON.parse(localStorage.getItem("notes"));
  let newNotes = notes.filter((item) => item.title.includes(value));
  renderNotes(notesNode, newNotes);
}
