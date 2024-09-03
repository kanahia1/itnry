import React from 'react';
import styles from '@/styles/home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className={styles.background}>
                <video autoPlay muted loop className={styles.myVideo}>
                    <source src="/home/landing_bg.mp4" type="video/mp4" />
                </video>
            </div>
            <div className={styles.header}>
                <Image alt="itnry" src="/home/itnry.svg" width={120} height={60} />
                <Link href={'https://in.linkedin.com/in/kanahia-9850bb253'} target="_blank">
                    LinkedIn
                </Link>
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>Travel around the world</h1>
                <p className={styles.desc}>
                    Effortlessly plan and customize your entire travel experience with{' '}
                    <span style={{ textDecoration: 'underline' }}>itnry</span>. From personalized
                    itineraries to seamless scheduling, we turn your dream trip into reality.
                </p>
                <Link href="/planner" className={styles.button}>
                    <div>
                        Create itinerary
                        <svg
                            width="36"
                            height="16"
                            viewBox="-10 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z"
                                fill="#000000"
                            />
                        </svg>
                    </div>
                </Link>
            </div>
        </>
    );
}
