import { TransitionProvider } from "./contexts/transition";
import ZoomAndPan from "./components/ZoomAndPan";
import ZoomTools from "./components/ZoomToolbar";
import "./App.css";

function App() {
  return (
    <TransitionProvider>
      <header>
        <ZoomTools />
      </header>
      <section>
        <ZoomAndPan src="sky.jpg" speed={0.1} />
      </section>{" "}
    </TransitionProvider>
  );
}

export default App;
