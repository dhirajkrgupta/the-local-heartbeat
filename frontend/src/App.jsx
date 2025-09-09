import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes/routes";

export default function App() {
  let router = createBrowserRouter(routes);
  return (
    <RouterProvider router={router} />
  );
}
