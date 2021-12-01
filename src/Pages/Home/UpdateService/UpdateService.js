import { setPersistence } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Services from '../Services/Services';

const UpdateService = () => {
    const [service, setService] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/services/${id}`)
            .then(res => res.json())
            .then(data => setService(data));
    }, [id])

    const nameHandle = e => {
        const updateName = e.target.value;
        const setName = { name: updateName, price: service.price, description: service.description };
        setService(setName);
    }

    const descriptionHandle = e => {
        const updatedDescription = e.target.value;
        const setDescription = { name: service.name, description: updatedDescription, price: service.price }
        setService(setDescription);
    }

    const priceHandle = e => {
        const updatePrice = e.target.value;
        const serPrice = { name: service.name, description: service.description, price: updatePrice };
        setService(serPrice);
    }

    const handleSubmitButton = e => {
        fetch(`http://localhost:5000/services/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(service)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0){
                    alert('update successfully');
                    setService({});
                }
            })
        console.log('button is click');
        e.preventDefault();
    }

    return (
        <div className="form-style container">
            <h2 className="mb-3">Update your product: {id}</h2>
            <p>{service.name}:: {service.price}:: {service.description}</p>
            <form>
                <input onChange={nameHandle} type="text" value={service.name || ' '} />
                <textarea onChange={descriptionHandle} type="text" value={service.description || ''} />
                <input onChange={priceHandle} type="number" value={service.price} />
                <button onClick={handleSubmitButton} className="btn btn-warning">submit</button>

            </form>
        </div>
    );
};

export default UpdateService;