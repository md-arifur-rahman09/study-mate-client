import React from 'react';
import Banner from './Banner';
import StudySession from '../StudySessions/StudySession';
import useTitle from '../../hooks/useTitle';
import StudentTestimonials from './StudentTestimonials';
import PlatformStats from './PlatformStats';
import WhyChooseStudyMate from './WhyChooseStudyMate';
import HowItWorks from './HowItWorks';

const Home = () => {
    useTitle('Home')
    return (
        <div className='bg-gradient-to-b from-blue-50 to-white'>
           <Banner></Banner>
         <div className='py-16'>
           
              <StudySession></StudySession>
         </div>
        <section className='py-16'>
            <StudentTestimonials></StudentTestimonials>
        </section>
        <section>
            <PlatformStats></PlatformStats>
        </section>
        <section>
            <WhyChooseStudyMate></WhyChooseStudyMate>
        </section>
        <section>
            <HowItWorks></HowItWorks>
        </section>
        </div>
    );
};

export default Home;