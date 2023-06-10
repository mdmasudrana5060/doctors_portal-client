import { format } from 'date-fns';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { Navigate } from "react-router-dom";

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    const { name: treatmentName, slots, price } = treatment; //treatment is another name of appointmentOptions
    const date = format(selectedDate, "PP");
    const { user } = useContext(AuthContext);
   
    console.log(user);

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patientName: name,
            slot,
            email,
            phone, price
        };
        fetch('https://doctors-portal-server-ten-sand.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking Confirmed');
                    refetch()
                }
                else {
                    toast.error(data.message)
                }

            })

        console.log(booking);
        setTreatment(null)

    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    {user?   <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 mt-8'>
                        <input type="text" disabled value={date} className="input input-bordered w-full " />
                        <select name='slot' className="select select-bordered w-full max-w-xs">

                            {
                                slots.map((slot, i) => <option value={slot} key={i}>{slot}</option>)
                                // in slot er option er vitore value select kore deya hoise karon jate konta select hoise ta bujha jai,ekhane i dia index bujhano hoise jehetu map function index o dei tai unique property hisabe i disi
                            }

                        </select>
                        <input type="text" defaultValue={user?.displayName} disabled placeholder="Your name" name="name" className="input input-bordered w-full " />
                        <input type="email" defaultValue={user?.email} disabled placeholder="Email" name="email" className="input input-bordered w-full" />
                        <input type="text" placeholder="Phone number" name="phone" className="input input-bordered w-full " />

                        <input type="submit" value="Submit" className='input input-bordered w-full bg-accent text-white ' />
                    </form>:     <Navigate to="/dashboard" replace={true} />}
                 
                </div>
            </div>

        </>
    );
};

export default BookingModal;