var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Cookie",
  "__cfduid=d4f9812ecf9e98b8709081c7140a5cba71612528922"
);

async function deleteToDo(id) {
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const deleteTask = await fetch(
      `https://jsonbox.io/box_699e80f98a488f1b95c2/${id}`,
      requestOptions
    );
  } catch (error) {
    console.log("error", error);
  }
}

async function getToDo() {
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const getData = await fetch(
      "https://jsonbox.io/box_699e80f98a488f1b95c2",
      requestOptions
    );
    const jsonData1 = await getData.json();
    return jsonData1;
  } catch (error) {
    console.log("error", error);
  }
}

async function postToDo(input) {
  const raw = `{"description": "${input}", "done": false}`;
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const postData = await fetch(
      "https://jsonbox.io/box_699e80f98a488f1b95c2",
      requestOptions
    );
  } catch (error) {
    console.log("error", error);
  }
}

async function updateTodo(description, done, id) {
  const raw = `{"description": "${description}", "done": ${done}}`;
  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const updateData = await fetch(
      `https://jsonbox.io/box_699e80f98a488f1b95c2/${id}`,
      requestOptions
    );
  } catch (error) {
    console.log("error", error);
  }
}
