import { Loader } from '@/components';
import styles from '@/styles/itinerary.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Itinerary = () => {
    const router = useRouter();
    const cityList = router.query.cityList;
    const peopleCount = router.query.peopleCount;
    const budgetLevel = router.query.budgetLevel;
    console.log(cityList);
    console.log(peopleCount);
    console.log(budgetLevel);
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors',
            body: JSON.stringify({
                cityList: cityList,
                peopleCount: peopleCount,
                budgetLevel: budgetLevel,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setItinerary(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <>
            <div className={styles.background}></div>
            <div className={styles.header}>
                <Image
                    alt="itnry"
                    style={{ filter: 'invert(1)' }}
                    src="/home/itnry.svg"
                    width={120}
                    height={60}
                />
                <Link className={styles.headerButton} href="/planner">
                    Create New
                </Link>
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Trip{' '}
                    {itinerary.map((city, id) => {
                        return (
                            <>
                                {city.city}
                                {id != itinerary.length - 1 && (
                                    <>
                                        {' '}
                                        <Image
                                            alt=""
                                            src="/home/arrow.svg"
                                            width="20"
                                            height="20"
                                        />{' '}
                                    </>
                                )}
                            </>
                        );
                    })}
                </h1>
                <p className={styles.activityTime} style={{ backgroundColor: '#fbfbfb' }}>
                    {itinerary[0].startDate}{' '}
                    <Image alt="" src="/home/arrow.svg" width="15" height="15" />{' '}
                    {itinerary[itinerary.length - 1].endDate}
                </p>

                <div>
                    {itinerary.map((city) => {
                        return (
                            <>
                                <div className={styles.title}>{city.city}</div>
                                {city.itinerary.map((day, id) => (
                                    <DayCard key={id} day={day} />
                                ))}
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const DayCard = ({ day }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const d = new Date(day.day);
    let weekday = days[d.getDay()];
    let month = months[d.getMonth()];
    let sum = 0;
    for (let activity in day.activities) {
        sum += day.activities[activity].cost;
    }

    const [filteredData, setFilteredData] = useState(day.activities);

    const handleSearch = (searchValue) => {
        if (searchValue == '') {
            setFilteredData(day.activities);
        } else {
            const filtered = day.activities.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchValue) ||
                    item.description.toLowerCase().includes(searchValue)
            );
            setFilteredData(filtered);
        }
    };

    return (
        <>
            <div className={styles.dayCard}>
                <div className={styles.dayCardTitle}>
                    <div className={styles.title}>
                        <Image alt="" src="/home/location.svg" width="30" height="30" />
                        {weekday}, {month} {d.getDate()}
                    </div>
                    <div style={{ marginLeft: '8px' }}>
                        <Image alt="" src="/home/ticket.svg" width="15" height="15" />+
                        <Image alt="" src="/home/food.svg" width="15" height="15" /> ₹{sum}
                    </div>
                </div>
                <div style={{ width: '100%', backgroundColor: '#bbb', height: '1px' }} />
                <input
                    className={styles.searchBox}
                    type="text"
                    placeholder="Search your activities"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <section className={styles.activitySection}>
                {filteredData.map((activity, id) => (
                    <>
                        <ActivityCard key={id} activity={activity} />
                        {id != day.activities.length - 1 && (
                            <div
                                style={{
                                    height: '40px',
                                    backgroundColor: '#bbb',
                                    width: '1px',
                                    marginLeft: '25%',
                                }}
                            />
                        )}
                    </>
                ))}
            </section>
        </>
    );
};

const ActivityCard = ({ activity }) => {
    return (
        <>
            <div className={styles.activityCard}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
                <div>
                    <p className={styles.activityTime}>
                        {activity.startTime}{' '}
                        <Image alt="" src="/home/arrow.svg" width="15" height="15" />{' '}
                        {activity.endTime}
                    </p>

                    <p className={styles.activityCost}>• ₹{activity.cost}</p>
                </div>
            </div>
        </>
    );
};

export default Itinerary;
