import React from 'react';
import quote from "../../../assets/icons/quote.svg"
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import Review from './Review';

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: 'Winson Herry',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et pulvinar ipsum. Phasellus arcu elit, placerat id semper ac, ornare in purus. Nullam blandit diam a facilisis gravida.',
            location: 'California',
            img: people1
        },
        {
            id: 2,
            name: 'Lionel Ronaldo',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et pulvinar ipsum. Phasellus arcu elit, placerat id semper ac, ornare in purus. Nullam blandit diam a facilisis gravida.',
            location: 'Saudi Arabia',
            img: people2
        },
        {
            id: 3,
            name: 'Christiano Messi',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et pulvinar ipsum. Phasellus arcu elit, placerat id semper ac, ornare in purus. Nullam blandit diam a facilisis gravida.',
            location: 'Paris',
            img: people3
        },
    ]
    return (
        <section className='my-16'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='text-xl text-primary font-bold'>Testimonial</h4>
                    <h3 className='text-4xl'>What Our Patients Says</h3>
                </div>
                <figure>
                    <img className='w-24 lg:w-48' src={quote} alt="" />
                </figure>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    reviews.map(review => <Review
                        key={review.id}
                        review={review}
                    ></Review>)

                }
            </div>

        </section>
    );
};

export default Testimonial;