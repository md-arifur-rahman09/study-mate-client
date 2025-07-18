import React from 'react';
import Banner from './Banner';
import StudySession from '../StudySessions/StudySession';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    useTitle('Home')
    return (
        <div>
           <Banner></Banner>
         <div>
           
              <StudySession></StudySession>
         </div>
        </div>
    );
};

export default Home;