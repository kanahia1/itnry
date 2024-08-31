import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';

const Poppins_ = Poppins({
    style: 'normal',
    subsets: ['latin-ext'],
    weight: '500',
    display: 'swap',
});
export default function App({ Component, pageProps }) {
    const router = useRouter();
    return (
        <main className={Poppins_.className}>
            <Component {...pageProps} />
        </main>
    );
}
