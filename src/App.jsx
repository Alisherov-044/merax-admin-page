import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { AuthCheck } from "./components/AuthCheck";

function App() {
    return (
        <Routes>
            {routes.public.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                />
            ))}
            <Route element={<AuthCheck />}>
                {routes.private.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Route>
        </Routes>
    );
}

export default App;
