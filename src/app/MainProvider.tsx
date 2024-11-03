'use client'
import { persistor, store } from '@/redux/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

const MainProvider = ({children}:{children:ReactNode}) => {
    return (
        <div>
            <Provider store={store}>
                <PersistGate persistor={persistor}>

            {children}
            <Toaster/>
                </PersistGate>
            </Provider>
        </div>
    );
};

export default MainProvider;