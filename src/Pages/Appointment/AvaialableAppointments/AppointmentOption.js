import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, slots, price } = appointmentOption;
    return (
        <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-center text-secondary font-bold">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p >Price:$ {price}</p>
                <div className="card-actions justify-center">

                    <label
                        htmlFor="booking-modal"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(appointmentOption)} className="btn btn-primary text-white">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;