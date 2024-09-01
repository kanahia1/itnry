import React, { useState } from 'react';
import styles from '@/styles/planner.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Planner() {
    const [cityList, setCityList] = useState([
        { city: '', startDate: '', endDate: '' },
        { city: '', startDate: '', endDate: '' },
    ]);
    const [peopleCount, setPeopleCount] = useState(1);
    const [budgetLevel, setBudgetLevel] = useState(0);

    function addCity(index) {
        setCityList([
            ...cityList.slice(0, index + 1),
            { city: '', startDate: '', endDate: '' },
            ...cityList.slice(index + 1),
        ]);
    }

    function removeCity(index) {
        setCityList([...cityList.slice(0, index), ...cityList.slice(index + 1)]);
    }

    function setCity(city, index) {
        setCityList([
            ...cityList.slice(0, index),
            { ...cityList[index], city: city },
            ...cityList.slice(index + 1),
        ]);
    }

    function setStartDate(date, index) {
        setCityList([
            ...cityList.slice(0, index),
            { ...cityList[index], startDate: date },
            ...cityList.slice(index + 1),
        ]);
    }

    function setEndDate(date, index) {
        setCityList([
            ...cityList.slice(0, index),
            { ...cityList[index], endDate: date },
            ...cityList.slice(index + 1),
        ]);
    }

    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.header}>
                <Image
                    style={{ filter: 'invert(1)' }}
                    src="/home/itnry.svg"
                    width={120}
                    height={60}
                />
            </div>
            <div className={styles.container}>
                <div className={styles.halves}>
                    <h1 className={styles.title}>Plan your next adventure!</h1>
                    <div>
                        {cityList.map((item, index) => {
                            return (
                                <CityItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    cityList={cityList}
                                    length={cityList.length}
                                    addCity={addCity}
                                    removeCity={removeCity}
                                    setCity={setCity}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.options}>
                        <div className={styles.people}>
                            <p>How many people are going?</p>
                            <div>
                                <span className={styles.count}>{peopleCount}</span>
                                <span>Person</span>
                                <div>
                                    <span
                                        className={styles.decrement}
                                        onClick={() =>
                                            setPeopleCount((current) =>
                                                current == 1 ? 1 : current - 1
                                            )
                                        }
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 18 2"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 1L17 1"
                                                stroke="#1359EC"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </span>
                                    <span
                                        className={styles.increment}
                                        onClick={() =>
                                            setPeopleCount((current) =>
                                                current == 10 ? 10 : current + 1
                                            )
                                        }
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 1V17"
                                                stroke="#1359EC"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                            <path
                                                d="M1 9L17 9"
                                                stroke="#1359EC"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.budget}>
                            <p>Budget Level</p>
                            <div>
                                <div style={{ marginLeft: '15px' }}>
                                    <input
                                        type="range"
                                        min="1"
                                        max="4"
                                        value={budgetLevel}
                                        onChange={(e) => setBudgetLevel(e.target.value)}
                                        className={styles.slider}
                                    />
                                    <svg
                                        width="227"
                                        height="8"
                                        viewBox="0 0 227 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M1 4H226" stroke="#868686" />
                                        <path d="M76 0V8" stroke="#868686" />
                                        <path d="M1 0V8" stroke="#868686" />
                                        <path d="M151 0V8" stroke="#868686" />
                                        <path d="M226 0V8" stroke="#868686" />
                                    </svg>
                                </div>
                                <div className={styles.sliderLabels}>
                                    <p>Cheap</p>
                                    <p>Mid</p>
                                    <p>High</p>
                                    <p>Premium</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className={styles.button}>
                        Generate
                    </button>
                </div>
                <div
                    className={styles.halves}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                >
                    
                </div>
            </div>
        </>
    );
}

const CityItem = ({
    item,
    index,
    cityList,
    length,
    addCity,
    removeCity,
    setCity,
    setStartDate,
    setEndDate,
}) => {
    return (
        <>
            {index != 0 && (
                <div
                    style={{
                        marginLeft: '20%',
                        height: '40px',
                        width: '1px',
                        backgroundColor: '#0F67FE',
                    }}
                />
            )}
            <div className={styles.cityItem}>
                <Image
                    width={26}
                    height={26}
                    src={
                        index == 0
                            ? '/home/travel_start.svg'
                            : index == length - 1
                            ? '/home/travel_end.svg'
                            : '/home/travel_transit.svg'
                    }
                    onClick={() => {
                        if (index != 0 && index != length - 1) removeCity(index);
                    }}
                />
                <input
                    className={styles.cityInput}
                    type="text"
                    placeholder="Select a city"
                    value={item.city}
                    onChange={(e) => setCity(e.target.value, index)}
                />
                <input
                    className={styles.datesInput}
                    value={item.startDate}
                    min={index != 0 ? cityList[index - 1].endDate : ''}
                    max={item.endDate}
                    onChange={(e) => setStartDate(e.target.value, index)}
                    type="date"
                    placeholder="Select Start Date"
                />
                <input
                    className={styles.datesInput}
                    value={item.endDate}
                    min={item.startDate}
                    max={index != length - 1 ? cityList[index + 1].startDate : ''}
                    onChange={(e) => setEndDate(e.target.value, index)}
                    type="date"
                    placeholder="Select End Date"
                />
            </div>
            {index != length - 1 && (
                <>
                    <div
                        style={{
                            marginLeft: '20%',
                            height: '40px',
                            width: '1px',
                            backgroundColor: '#0F67FE',
                        }}
                    />
                    <div className={styles.addButton} onClick={() => addCity(index)}>
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.34247 1V11.5"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                            <path
                                d="M1.09247 6.25L11.5925 6.25"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                            />
                        </svg>
                        Add Intermediate Destination
                    </div>
                </>
            )}
        </>
    );
};
