import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/planner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import mapboxgl from '!mapbox-gl';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(() => import('@mapbox/search-js-react').then((mod) => mod.SearchBox), {
    ssr: false,
});

export default function Planner() {
    const router = useRouter();
    const [cityList, setCityList] = useState([
        { city: '', startDate: '', endDate: '', latLng: [null, null] },
    ]);
    const [peopleCount, setPeopleCount] = useState(1);
    const [budgetLevel, setBudgetLevel] = useState(0);

    function addCity(index) {
        setCityList([
            ...cityList.slice(0, index + 1),
            { city: '', startDate: '', endDate: '', latLng: [null, null] },
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

    function setCoords(latLng, city, index) {
        setCityList([
            ...cityList.slice(0, index),
            { ...cityList[index], latLng: latLng, city: city },
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

    function handleSubmit() {
        if (cityList.length === 0) {
        	alert("Please add at least one city");
        	return;
        }
        for (let i = 0; i < cityList.length; i++) {
        	if (cityList[i].city === "") {
        		alert("Please fill in all the fields");
        		return;
        	} else if (cityList[i].latLng === "") {
        		alert("Please select the city from the selection box");
        		return;
        	} else if (cityList[i].startDate === "" || cityList[i].endDate === "") {
        		alert("Please select the start and end dates for the city");
        		return;
        	}
        }
        // console.log('/itinerary?cityList=' + JSON.stringify(cityList));
        router.push('/itinerary?cityList=' + JSON.stringify(cityList) + "&peopleCount=" + peopleCount + "&budgetLevel=" + budgetLevel, '/itinerary');
    }

    const mapContainer = useRef();
    const mapInstanceRef = useRef();
    useEffect(() => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';

        mapInstanceRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            center: [-74.5, 40],
            zoom: 7,
        });
    }, []);

    useEffect(() => {
        async function getRoute(start, end, index1, index2) {
            if (
                !start.city ||
                !start.latLng[0] ||
                !start.latLng[1] ||
                !end.city ||
                !end.latLng[0] ||
                !end.latLng[1]
            )
                return;
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${start.latLng[0]},${start.latLng[1]};${end.latLng[0]},${end.latLng[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: 'GET' }
            );

            if (!response.ok) {
                throw new Error(`Error fetching route: ${response.statusText}`);
            }

            const json = await response.json();
            const data = json.routes[0];

            if (!data) {
                console.error('No route data found');
                return;
            }

            const route = data.geometry.coordinates;
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route,
                },
            };

            if (mapInstanceRef.current.getSource(`route-${index1}-${index2}`)) {
                mapInstanceRef.current.getSource(`route-${index1}-${index2}`).setData(geojson);
            } else {
                mapInstanceRef.current.addLayer({
                    id: `route-${index1}-${index2}`,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: geojson,
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75,
                    },
                });
            }
        }
        getRoute(cityList[0], cityList[0], 0, 0);
        for (let i = 0; i < cityList.length - 1; i++) {
            getRoute(cityList[i], cityList[i + 1], i, i + 1);
        }
        getRoute(
            cityList[cityList.length - 1],
            cityList[cityList.length - 1],
            cityList.length - 1,
            cityList.length - 1
        );
    }, [cityList]);

    return (
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
                                    setCoords={setCoords}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    mapInstanceRef={mapInstanceRef}
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
                    <button type="button" className={styles.button} onClick={handleSubmit}>
                        Generate
                    </button>
                </div>
                <div
                    className={styles.halves}
                    style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                >
                    <div ref={mapContainer} className={styles.mapContainer} />
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
    setCoords,
    setStartDate,
    setEndDate,
    mapInstanceRef,
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
					alt="close"
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
                        if (length > 1) removeCity(index);
                    }}
                />
                {/* <input
                    type="text"
                    placeholder="Select a city"
                    value={item.city}
                    onChange={(e) => setCity(e.target.value, index)}
					/> */}
                <SearchBox
                    className={styles.cityInput}
                    accessToken={mapboxgl.accessToken}
                    map={mapInstanceRef.current}
                    mapboxgl={mapboxgl}
                    value={item.city}
                    onChange={(e) => setCity(e, index)}
                    marker
                    onRetrieve={(e) => {
                        setCoords(
                            e.features[0].geometry.coordinates,
                            e.features[0].properties.name,
                            index
                        );
                    }}
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
                Add {index != length - 1 && 'Intermediate'} Destination
            </div>
        </>
    );
};
