import React from 'react';
import Banner from './Banner';
import StudySession from '../StudySessions/StudySession';

const Home = () => {
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