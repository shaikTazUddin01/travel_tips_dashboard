'use client'
import { store } from '@/redux/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

const MainProvider = ({children}:{children:ReactNode}) => {
    return (
        <div>
            <Provider store={store}>
            {children}
            </Provider>
        </div>
    );
};

export default MainProvider;