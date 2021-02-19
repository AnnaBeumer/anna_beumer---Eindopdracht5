const todoButton = document.getElementById("add-to-do");
const todoInput = document.getElementById("typeToDo");
const todoList = document.getElementById("todoList");

const addToHtml = () => {
  getToDo().then((result) => {
    result.map((entry) => {
      if (document.getElementById(entry._id) !== null) {
        return;
      }
      //create <i> element
      let newI = document.createElement("i");
      newI.className = "fas fa-trash-alt";

      //Create <button> element
      let newBtn = document.createElement("button");
      newBtn.className = "delete";
      newBtn.addEventListener("click", () => {
        let liElement = document.activeElement.parentElement;
        requestAnimationFrame(() => {
          liElement.classList.replace("fadeIn", "fadeOut");
        });

        // Delete li element
        setTimeout(() => {
          todoList.removeChild(liElement);
        }, 1500);
        deleteToDo(liElement.id);
      });

      // Create new checkbox element
      let newCheckbox = document.createElement("input");
      newCheckbox.type = "checkbox";

      let newText = document.createElement("text");
      //Create new <li> element
      let newli = document.createElement("li");
      newli.classList.add("todoLi");
      newli.id = entry._id;
      newli.appendChild(newCheckbox);
      newText.textContent = entry.description;
      newli.appendChild(newText);
      //append <i> to <button>
      newBtn.appendChild(newI);
      //append <button> to <li>
      newli.appendChild(newBtn);

      if (entry.done === true) {
        newText.classList.add("strike-through");
        newCheckbox.checked = true;
      }

      newCheckbox.addEventListener("change", () => {
        if (newCheckbox.checked === true) {
          newText.classList.add("strike-through");
          entry.done = true;
        } else {
          newText.classList.remove("strike-through");
          entry.done = false;
        }
        updateTodo(entry.description, entry.done, entry._id);
      });

      newText.addEventListener("click", () => {
        if (entry.done === true) {
          return;
        }
        let newTextInput = document.createElement("input");
        newTextInput.value = entry.description;
        newText.parentNode.replaceChild(newTextInput, newText);
        newTextInput.focus();
        let keyEnterDoneState = false;
        newTextInput.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            keyEnterDoneState = true;
            swapInput();
          }
        });
        newTextInput.addEventListener("blur", () => {
          if (keyEnterDoneState != true) {
            swapInput();
          } else {
            keyEnterDoneState = false;
          }
        });
        function swapInput() {
          entry.description = newTextInput.value;
          newText.textContent = entry.description;
          newTextInput.parentNode.replaceChild(newText, newTextInput);
          updateTodo(entry.description, entry.done, entry._id);
        }
      });

      /*
       * append <li> to <ul> (the todolist)
       * not cleaning the list and filling it from the server
       * But check if the element exists, and if not add it
       */
      requestAnimationFrame(() => {
        newli.classList.add("fadeIn");
      });
      todoList.appendChild(newli);
    });
  });
};

todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (event.target.value != "") {
      /*
       * remove the value before adding it to prevent double entries
       */
      let val = event.target.value;
      event.target.value = "";
      postToDo(val).then(() => {
        addToHtml();
      });
    }
  }
});

todoButton.addEventListener("click", () => {
  if (todoInput.value != "") {
    /*
     * remove the value before adding it to prevent double entries
     */
    let val = todoInput.value;
    todoInput.value = "";
    postToDo(val).then(() => {
      addToHtml();
    });
  }
});

addToHtml();
