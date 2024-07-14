import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello from the home pages!</h1>,
  },
  {
    path:"/about",
    element: <h1>Hello from the about pages!</h1>,
    
  }
]);
export default router;
