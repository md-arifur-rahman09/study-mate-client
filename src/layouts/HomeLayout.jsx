import React, { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/Navbar/Navbar';
import Loading from '../pages/Loading/Loading';
import Footer from '../pages/Footer/Footer';


const HomeLayout = () => {

    return (
        <div>
           <nav>
             <Navbar></Navbar>
           </nav>
            <Suspense fallback={<Loading></Loading>}>
                <main className='max-w-7xl mx-auto min-h-screen'>
                    <Outlet></Outlet>
                </main>
            </Suspense>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;