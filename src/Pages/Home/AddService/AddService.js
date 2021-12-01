import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './AddService.css';

const AddService = () => {
    const { register, handleSubmit,reset } = useForm();
    // const [service,setService] = useState('');
    const onSubmit = data => {
        fetch('http://localhost:5000/services',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert('data is added successfully');
                reset();
            }
        })
    };
    return (
        <div className="form-style">
            <h2>This Add Service</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="product name" />
                <input type="number" {...register("price")} placeholder="price" />
                <textarea {...register("description")} placeholder="description" />

                <input type="name" {...register("IMG")} placeholder="IMG URL" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddService;