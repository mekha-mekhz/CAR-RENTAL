import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Cardetails() {
    const { carId } = useParams()
    const [car, setCar] = useState(null)

    useEffect(() => {
        axios.get("/cars.json")
            .then((response) => {
                // find the car by ID
                const selectedCar = response.data.find((c) => c.id === parseInt(carId))
                setCar(selectedCar)
            })
            .catch((error) => console.log(error))
    }, [carId])

    if (!car) {
        return <h2 className="text-center text-gray-500 mt-6">Loading car details...</h2>
    }

    return (
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <img src={car.image} alt={car.name} className="w-full h-60 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
            <p className="text-gray-700"><strong>Brand:</strong> {car.brand}</p>
            <p className="text-gray-700"><strong>Type:</strong> {car.type}</p>
            <p className="text-gray-700"><strong>Seats:</strong> {car.seats}</p>
        </div>
    )
}

export default Cardetails
