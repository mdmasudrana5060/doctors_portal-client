import { createBrowserRouter } from "react-router-dom";
import Appointment from "../../Appointment/Appointment/Appointment";
import AddDoctor from "../../Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Dashboard/Dashboard/Dashboard";
import ManageDoctor from "../../Dashboard/ManageDoctor/ManageDoctor";
import Payment from "../../Dashboard/Payment/Payment";
import Home from "../../Home/Home/Home";
import Testimonial from "../../Home/Testimonial/Testimonial";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyAppointment from "../../MyAppointment/MyAppointment";
import DisplayError from "../../Shared/DisplayError/DisplayError";
import Signup from "../../Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            },
            {
                path: '/reviews',
                element: <Testimonial></Testimonial>
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctor></AddDoctor></AdminRoute>
            },
            {
                path: '/dashboard/managedoctor',
                element: <AdminRoute><ManageDoctor></ManageDoctor></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doctors-portal-server-ten-sand.vercel.app/bookings/${params.id}`)
            }


        ]
    }
]);
export default router;