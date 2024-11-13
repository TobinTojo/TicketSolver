import React from 'react';
import ReactDOM from 'react-dom/client';
import Hero from "./components/hero";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {
  return (
    <div>
      <Hero />
      <Body />
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />); 