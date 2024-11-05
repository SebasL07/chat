import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Chat from "../components/Chat";
import RegisterPage from "../pages/RegisterPage";
import Authenticator from "../components/Authenticator";

const router = createRoutesFromElements([
    <Route path="/" element={<Authenticator />}>
        <Route path = "/register" element = {<RegisterPage />} />
        <Route path = "/chat" element = {<Chat />} />
        <Route path = "*" element = {<div>Not found</div>} />
    </Route>
])

export const routes = createBrowserRouter(router);