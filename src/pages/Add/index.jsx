import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './add.scss'
import { Link } from 'react-router-dom';

function Add() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')

    async function getFetch() {
        await fetch("http://localhost:4200/")
            .then(res => res.json())
            .then(data =>
                setProducts(data))
    }
    
    useEffect(() => {
        getFetch()
    }, [])

    async function handleSubmit(item) {
        await fetch("http://localhost:4200/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        getFetch()
    }

    async function deleteItem(id) {
        await fetch("http://localhost:4200/" + id, { method: "DELETE" })
        await getFetch()
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const filteredProduct = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLocaleLowerCase())
    )


    return (
        <>
            <section id='addpage'>
                <Link to={"/"}>Home</Link>
                <div className="form">
                    <Formik
                        initialValues={{ title: '', about: '', price: '' }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .required('Required'),
                            about: Yup.string()
                                .required('Required'),
                            price: Yup.number()
                                .required('Required'),
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setTimeout(() => {
                                handleSubmit(values)
                                setSubmitting(false);
                            }, 400);
                            resetForm();

                        }}
                    >
                        <Form>
                            <label htmlFor="title">Title</label>
                            <Field name="title" type="text" />
                            <ErrorMessage name="title" />

                            <label htmlFor="about">About</label>
                            <Field name="about" type="text" />
                            <ErrorMessage name="about" />

                            <label htmlFor="price">Price</label>
                            <Field name="price" type="text" />
                            <ErrorMessage name="price" />

                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
                <input type="text" value={search} onChange={handleSearch}/>
                <table id="customers">
                    <tr>
                        <th>Title</th>
                        <th>About</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                    {filteredProduct.map((product) => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>{product.about}</td>
                            <td>{product.price}</td>
                            <td onClick={() => deleteItem(product._id)}><button>Delete</button></td>
                        </tr>
                    ))}
                </table>
            </section>
        </>
    )
}

export default Add