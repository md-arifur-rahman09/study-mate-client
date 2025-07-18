import React, { useEffect } from 'react';

const useTitle = (pageName) => {
    useEffect(() => {
        document.title = `StudyMate | ${pageName}`
    }, [pageName])

};

export default useTitle;