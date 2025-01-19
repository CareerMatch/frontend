import { Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage.tsx";
import LoginPage from "@/app/login/page.tsx";
import SignUpPage from "@/app/signup/page.tsx";
import DashboardPage from "@/app/dashboard/page.tsx"
import 'vanilla-cookieconsent/dist/cookieconsent.css';


function App() {



    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
    );
}

export default App;