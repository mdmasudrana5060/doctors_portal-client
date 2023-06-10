
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctor = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const closeModal = () => {
        setDeleteDoctor(null)
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['/doctor'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/doctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;


            }
            catch (error) {

            }


        }
    });
    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Doctor ${doctor.name} Deleted Successfully`);
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <progress className="progress w-56"></progress>
    }

    return (
        <div>
            <h3 className="text-3xl m-4">Manage Doctor</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr className="hover" key={doctor._id} >
                                <th>{i + 1}</th>
                                <th><div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div></th>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.speciality}</td>
                                <td>   <label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmationModal" className="btn btn-xs btn-error">Delete</label>
                                </td>

                            </tr>)
                        }




                    </tbody>
                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                    title={`Are You Sure You Want to Delete?`}
                    description={`If You delete ${deleteDoctor.name} will be deleted from the database`}
                    closeModal={closeModal}
                    successAction={handleDeleteDoctor}
                    modalData={deleteDoctor}
                    buttonAction='delete'
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctor;