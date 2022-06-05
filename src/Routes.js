import { useRoutes } from "react-router-dom"
import { ProtectedRoute } from "./utils/Global"
import Signin from "./components/Signin"
import Home from "./components/Home"

const RoutesasObj = () => {
    let element = useRoutes([
        { path: "/signin", element: <Signin /> },
        { path: "/", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      ])

    return element;
}

export default RoutesasObj; 