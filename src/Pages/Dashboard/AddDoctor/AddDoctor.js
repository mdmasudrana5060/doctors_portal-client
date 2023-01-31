import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgbbHostKey = process.env.REACT_APP_imgbb_apiKey;
    const navigate = useNavigate();


    const { data: specialities, isLoading } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpeciality`);
            const data = await res.json();
            return data;

        }
    });
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    const handleAddDoctor = data => {

        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: result.data.url,
                    }
                    fetch('http://localhost:5000/doctors', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(data);
                            if (result.insertedId) {
                                toast.success(`${data.name} added successfully`);
                                navigate('/dashboard/managedoctor')
                            }
                        })
                }
            })
            .catch((error) => {
                console.log(error, 'error');

            })




    }
    return (
        <div>

            <div className='w-96 p-7'>
                <h3 className="text-3xl">Add Doctor</h3>
                <form onSubmit={handleSubmit(handleAddDoctor)}>


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
                            <span className="label-text">Speciality</span>
                        </label>

                        <select {...register('speciality')} className="select select-bordered w-full max-w-xs">


                            {
                                specialities.map(speciality => <option
                                    key={speciality._id}
                                    value={speciality.name}
                                >{speciality.name}</option>)
                            }
                        </select>

                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Photo</span>

                        </label>
                        <input type="file" {...register("image", { required: "image is required" })} className="input input-bordered w-full max-w-xs p-2" />
                        {errors.img && <p className='text-red-600'>{errors.img?.message}</p>}
                    </div>

                    <input type="submit" className='btn btn-accent mt-4 w-full max-w-xs ' value="Add Doctor" />

                </form>


            </div>


        </div>
    );
};

export default AddDoctor;