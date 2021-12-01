import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MangeService = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [services])

    const handleDeleteButton = id => {
        const processed = window.confirm('Are your sure you want to delete?.')
        if (processed) {
            const url = `http://localhost:5000/services/${id}`
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('data is deleted');
                        const remaining = services.filter(service => services._id !== id);
                        setServices(remaining);
                    }
                })
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Loaded data from your background: {services.length}</h2>
            <div className="row row-cols-1 row-cols-md-2">
                {
                    services.map(service => <div key={service._id}>
                        <img src={service.IMG} alt="" />
                        <h4>{service.name}</h4>
                        <h4>{service.price}</h4>
                        <p className="text-start">{service.description}</p>
                        <p className="mb-5">
                            <button onClick={() => handleDeleteButton(service._id)} className="btn btn-warning">delete</button>
                            <Link to={`/updated/service/${service._id}`}>
                                <button className="btn btn-warning ms-2">updated</button>
                            </Link>
                        </p>

                    </div>)
                }
            </div>

        </div>
    );
};

export default MangeService;