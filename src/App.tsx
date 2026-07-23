import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import { connection } from "./services/signalr";

function App() {
  useEffect(() => {
    connection.start();
  }, []);
  return <Dashboard />;
}

export default App;
