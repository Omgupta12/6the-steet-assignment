import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import RequireAuth from "./hoc/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <RequireAuth>
              <Products />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
