import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP')
    const { data: appointmentOptions = [], refetch } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    })

    // useEffect(() => {
    //     fetch('https://doctors-portal-server-ten-sand.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])
    return (
        <section className='mt-16'>
            <p className='text-secondary font-bold text-center'>Available appointments on :{format(selectedDate, 'PP')} </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-12'>
                {
                    appointmentOptions.map(appointmentOption => <AppointmentOption
                        key={appointmentOption._id}
                        appointmentOption={appointmentOption}
                        setTreatment={setTreatment}

                    ></AppointmentOption>)
                }
            </div>
            {
                treatment && <BookingModal
                    treatment={treatment}
                    setTreatment={setTreatment}
                    selectedDate={selectedDate}
                    refetch={refetch}
                >

                </BookingModal>
            }

        </section>
    );
};

export default AvailableAppointments;