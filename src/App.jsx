import Header from "./components/Header";
import { TaskWrapper } from "./components/TaskWrapper";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <TaskWrapper />
      </main>
    </>
  );
}

export default App;
