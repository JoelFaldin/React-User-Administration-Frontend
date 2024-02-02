import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../login/Login"
import AdminPage from "../admin/AdminPage"
import CreateUser from "../highAdmin/createUser/createUser"
import HighAdminPage from "../highAdmin/highAdminPage"
import UserPage from "../user/UserPage"
import RecoverPassword from "../login/RecoverPassword"

const RouterComponent = () => {
    const test = () => {
    }

    return (
        <div className="router">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/recoverPassword" element={<RecoverPassword />} />
                    <Route path="/data/superadmin" element={<HighAdminPage />} />
                    <Route path="/data/admin" element={<AdminPage />} />
                    <Route path="/data/user" element={<UserPage />} />
                    <Route path="/createUser" element={<CreateUser onFinish={test} />} />
                </Routes>
            </Router>
        </div>
    )
}

export default RouterComponent