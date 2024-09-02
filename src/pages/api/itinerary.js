import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default async function handler(req, res) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const p = [
        {
            city: '',
            startDate: '',
            endDate: '',
            hotel: '',
            hotelCost: 0,
            itinerary: [
                {
                    day: '',
                    activities: [
                        {
                            name: '',
                            description:
                                '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                    ],
                },
                {
                    day: '',
                    activities: [
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                    ],
                },
            ],
            totalCost: 0,
        },
        {
            city: '',
            startDate: '',
            endDate: '',
            hotel: '',
            hotelCost: 0,
            itinerary: [
                {
                    day: '',
                    activities: [
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                    ],
                },
                {
                    day: '',
                    activities: [
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                        {
                            name: '',
                            description: '',
                            startTime: '',
                            endTime: '',
                            cost: 0,
                        },
                    ],
                },
            ],
            totalCost: 0,
        },
    ];
    try {
		const body = JSON.parse(req.body);
        const prompt =
            'Generate a personalized trip itinerary for this JSON data with fields city, startDate and endDate, with an optimum budget (Currency:INR).\n' +
            body.cityList +
            `\n with a budget level of ${body.budgetLevel} out of 4 and a total count of ${body.peopleCount} people. Also suggest the hotels to stay at\n` +
            "And don't provide any text, only provide result in JSON format such as " +
            JSON.stringify(p);

        console.log(prompt);
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        /* const text = `json
[
	{
		"city": "Bihta",
		"startDate": "2024-09-11",
		"endDate": "2024-09-12",
		"hotel": "Hotel Shree",
		"hotelCost": 1500,
		"itinerary": [
			{
				"day": "2024-09-11",
				"activities": [
					{
						"name": "Explore Bihta",
						"description": "Visit local markets, historical sites, and enjoy the natural beauty of Bihta.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 500
					},
					{
						"name": "Dinner at a local restaurant",
						"description": "Experience the authentic flavors of Bihta.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 300
					}
				]
			},
			{
				"day": "2024-09-12",
				"activities": [
					{
						"name": "Visit Bihta Fort",
						"description": "Explore the historical significance of the fort.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 200
					},
					{
						"name": "Lunch at a local eatery",
						"description": "Enjoy a delicious meal at a local eatery.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 200
					},
					{
						"name": "Departure from Bihta",
						"description": "Travel to Patna.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 300
					}
				]
			}
		],
		"totalCost": 2800
	},
	{
		"city": "Patna",
		"startDate": "2024-09-13",
		"endDate": "2024-09-24",
		"hotel": "Hotel Maurya",
		"hotelCost": 2500,
		"itinerary": [
			{
				"day": "2024-09-13",
				"activities": [
					{
						"name": "Check in to Hotel Maurya",
						"description": "Settle in at a comfortable hotel.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 0
					},
					{
						"name": "Explore Patna Museum",
						"description": "Discover the rich history and culture of Patna.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 100
					},
					{
						"name": "Dinner at a local restaurant",
						"description": "Enjoy a delicious meal at a local restaurant.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 300
					}
				]
			},
			{
				"day": "2024-09-14",
				"activities": [
					{
						"name": "Visit Golghar",
						"description": "Explore the unique architectural wonder.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 100
					},
					{
						"name": "Lunch at a local eatery",
						"description": "Enjoy a delicious meal at a local eatery.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 200
					},
					{
						"name": "Explore Patna Sahib",
						"description": "Visit the sacred Sikh shrine.",
						"startTime": "10:00 AM",
						"endTime": "3:00 PM",
						"cost": 100
					}
				]
			}
		],
		"totalCost": 6750
	}
]

`; */
        console.log(text);
        res.send(text.slice(8, -3));
        // res.send(text.slice(5, -1));
        // res.send(prompt);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while generating content.');
    }
}
