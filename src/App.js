import React from "react";
import Footer from "./components/Footer";
import BookTracker from "./components/BookTracker";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div>
      <BookTracker />
      <Footer />
    </div>
  );
}

export default App;
