const formNewNote = document.querySelector("#newNote");
const formNewNoteTitle = formNewNote.querySelector("#newNote__title");
const formNewNoteText = formNewNote.querySelector("#newNote__text");

//function for input validation
function validation(inputNode, min, max) {
  const inputValue = inputNode.value.trim();
  if (inputValue < min || inputValue > max) {
    // console.log("invalid");
    inputNode.classList.add("invalid");
    inputNode.addEventListener(
      "change",
      (e) => {
        e.target.classList.remove("invalid");
      },
      { once: true }
    );
    return false;
  }
  return true;
}

function adjustDate(date) {
  return date < 10 ? `0${date}` : date;
}
function addNote(titleNode, textNode) {
  const noteTitle = titleNode.value;
  const noteText = textNode.value;
  const hour = adjustDate(new Date().getHours());
  const minutes = adjustDate(new Date().getMinutes());
  const date = adjustDate(new Date().getDate());
  const month = adjustDate(new Date().getMonth() + 1);
  const time = `${hour}:${minutes} ${date}.${month}.${new Date().getFullYear()}`;
  const unicId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
  let noteObject = {
    title: noteTitle,
    text: noteText,
    date: time,
    id: unicId,
  };
  localStorage.setItem(unicId, JSON.stringify(noteObject));
  renderNotes();
}

function renderNotes() {}

document.body.addEventListener("click", (e) => {
  let target = e.target;
  //   console.log(target);
  if (target.classList.contains("newNote__submit")) {
    e.preventDefault();
    validation(formNewNoteTitle, 5, 15) &&
      validation(formNewNoteText, 5, 100) &&
      addNote(formNewNoteTitle, formNewNoteText);
  }
});
