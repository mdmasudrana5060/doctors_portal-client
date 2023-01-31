import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext)
    const error = useRouteError();
    const navigate = useNavigate()
    const handleLogOut = () => {
        logOut()
            .then(() => {

            }).catch((error) => {
                console.log(error);
            });
        navigate('/login')
    }
    return (
        <div className=' text-center'>
            <p className="text-red-600 text-3xl">Something Went Wrong!!!</p>
            <p className="text-red-600 text-2xl">{error.statusText || error.message}</p>
            <p className="text-3xl mb-4">Please Login again </p>
            <button className="btn btn-primary" onClick={handleLogOut}> Log Out</button>

        </div>
    );
};

export default DisplayError;