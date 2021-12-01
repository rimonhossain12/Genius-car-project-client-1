import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Booking = () => {
    const { serviceId } = useParams();
    const [service,setService] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/services/${serviceId}`)
        .then(res => res.json())
        .then(data => setService(data));
    },[])
    return (
        <div>
            <h2>Load specific data</h2>
            <div className="container mt-5 border">
                <img src={service.IMG} className="img-fluid" alt="" />
                <h4>{service.name}</h4>
                <h4><small>{service.price}</small></h4>
                <p>{service.description}</p>
            </div>
        </div>
    );
};

export default Booking;