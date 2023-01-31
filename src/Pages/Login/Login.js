import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState([]);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || '/';



    if (token) {
        navigate(from, { replace: true });
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log(result);
            })
            .catch(error => {
                console.log(error.message);
            })
    }



    const handleLogin = data => {
        console.log(data);
        setLoginError('')

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);

            })
            .catch(error => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoginError(errorMessage)
            })
    }
    return (
        <div className='h-[800px] flex justify-center mt-40'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-bold text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>

                        </label>
                        <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}


                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>

                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password did not match" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        {loginError && <p className='text-red-600'>{loginError}</p>}

                        <label className="label">
                            <span className="label-text">Forget Password ?</span>

                        </label>


                    </div>

                    <input type="submit" className='btn btn-accent mt-4 w-full max-w-xs ' value="Login" />
                </form>
                <p>New to Doctors Portal ? <Link to="/signup" className='text-secondary'>Create New Account</Link> </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full font-bold'>Continue With Google</button>

            </div>

        </div>
    );
};

export default Login;