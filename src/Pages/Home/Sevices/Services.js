import React from 'react';
import fluoride from "../../../assets/images/fluoride.png"
import cavity from "../../../assets/images/cavity.png"
import whitening from "../../../assets/images/whitening.png"
import Service from './Service';

const Services = () => {
    const serviceData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: "lorem ipsum dolor sit amet ,consectetur adipiscin elit.Integer et puluv ped",
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: "lorem ipsum dolor sit amet ,consectetur adipiscin elit.Integer et puluv ped",
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: "lorem ipsum dolor sit amet ,consectetur adipiscin elit.Integer et puluv ped",
            img: whitening
        },
    ]
    return (
        <div className='mt-16'>
            <div className='text-center'>
                <h4 className='text-xl font-bold text-primary uppercase'>Our Services</h4>
                <h2 className='text-3xl'>Services We Provide</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    serviceData.map(service => <Service
                        key={service.id}
                        service={service}></Service>)
                }

            </div>

        </div>
    );
};

export default Services;