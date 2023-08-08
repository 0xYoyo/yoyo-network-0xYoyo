import { useEffect, useState } from "react";
import "./styles/App.css";
import Nav from "./components/parts/Nav";
import { Outlet } from "react-router-dom";
import { useInterceptor } from "./utils/useInterceptor";

function App() {
  const [loading, setLoading] = useState(true);
  useInterceptor();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      <Nav />
      <Outlet className="Outlet" />
    </div>
  );
}

export default App;
