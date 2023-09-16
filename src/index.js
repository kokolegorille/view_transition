import "./css/app.scss"

console.log("Application is starting...")

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { 
    createBrowserRouter,
    RouterProvider,  
} from "react-router-dom"

import App from "./js/App"

const router = createBrowserRouter([
    {
      path: "/*",
      element: <App />,
    }
  ])

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)