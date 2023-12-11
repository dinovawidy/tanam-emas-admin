import React from "react";
import Base from "./pages/base/Base";

function App() {
  document.title = process.env.REACT_APP_NAME;
  return <Base />;
}

export default App;
