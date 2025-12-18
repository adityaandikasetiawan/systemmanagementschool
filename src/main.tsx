
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./i18n";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);
let renderKey = 0;

const renderApp = () => {
  root.render(<App key={renderKey++} />);
};

renderApp();
i18n.onLocaleChange(() => renderApp());
