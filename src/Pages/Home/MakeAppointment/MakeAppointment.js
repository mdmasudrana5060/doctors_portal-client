import React from 'react';
import doctor from '../../../assets/images/doctor.png'
import appointment from '../../../assets/images/appointment.png'
import PrimaryButton from '../../../components/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{
            background: `url(${appointment})`
        }} className='mt-32'>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} alt='' className="lg:w-1/2 rounded-lg hidden md:block -mt-32" />
                    <div>
                        <h4 className='text-lg text-primary font-bold'>Appointment</h4>
                        <h1 className="text-4xl  text-white">Make an Appointment Today</h1>
                        <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButton>Get Started</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;