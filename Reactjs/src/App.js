import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  return (
    <div className="container">
      <Header />
      <Form onAdd={addToDB} />
    </div>
  );
}

const addToDB = async (form) => {
  console.log(form);
  const res = await fetch("http://localhost:5000/", {
    mode: "no-cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

export default App;
