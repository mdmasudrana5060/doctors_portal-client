import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import useToken from '../hooks/useToken';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/')
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


    const handleSignUp = data => {
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                toast('User Created Successfully')
                const userInfo = {
                    displayName: data.name,
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(user.displayName, user.email)
                    })
                    .catch(error => console.log(error))
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSignUpError(errorMessage)

            });
    }
    // this function is used for user data to mongodb
    const saveUser = (name, email) => {

        const user = { name, email };

        fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)

                console.log(data);

            })
    }
    // getting jwt token from client side
    // const getUserToken = (email) => {
    //     console.log(email, 'from token function');
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             localStorage.setItem('accessToken', data.accessToken);
    //             navigate('/')
    //         })
    // }


    return (
        <div className='h-[800px] flex justify-center mt-40'>
            <div className='w-96 p-7'>
                <h2 className='text-xl font-bold text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>


                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>

                        </label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}


                    </div>
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
                            minLength: { value: 8, message: "Password must be 8 characters or longer" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}




                    </div>

                    <input type="submit" className='btn btn-accent mt-4 w-full max-w-xs ' value="Sign Up" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account! <Link to="/login" className='text-secondary'>Please Login</Link> </p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full font-bold'>Continue With Google</button>

            </div>

        </div>
    );
};

export default Signup;