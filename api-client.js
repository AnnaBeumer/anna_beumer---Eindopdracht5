const myHeaders = new Headers();
const jsonboxLocal = "http://localhost:3000/box_d69abf0f1a479a48bb57";
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
    await fetch(`${jsonboxLocal}/${id}`, requestOptions);
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
    const getData = await fetch(jsonboxLocal, requestOptions);
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
    await fetch(jsonboxLocal, requestOptions);
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
    await fetch(`${jsonboxLocal}/${id}`, requestOptions);
  } catch (error) {
    console.log("error", error);
  }
}
