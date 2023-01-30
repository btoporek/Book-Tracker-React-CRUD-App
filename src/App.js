import React from "react";
import Footer from "./components/Footer";
import BookList from "./components/BookList";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div>
      <BookList />
      <Footer />
    </div>
  );
}

export default App;
