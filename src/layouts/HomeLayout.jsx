import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar/Navbar';
import Loading from '../pages/Loading/Loading';


const HomeLayout = () => {

    return (
        <div>
            <Navbar></Navbar>
            <Suspense fallback={<Loading></Loading>}>
                <Outlet></Outlet>
            </Suspense>
        </div>
    );
};

export default HomeLayout;