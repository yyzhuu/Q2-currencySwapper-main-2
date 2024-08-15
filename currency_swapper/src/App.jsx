import "./App.css";
import CurrencySwapper from "./components/CurrencySwapper";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container">
        <CurrencySwapper />
      </div>
    </div>
  );
}

export default App;
