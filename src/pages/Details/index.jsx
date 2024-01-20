import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';

function Details() {
    let { id } = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`http://localhost:4200/${id}`)
            .then(res => res.json())
            .then(data => { setProduct(data) })
    }, [])

    return (
        <>
            <section id='details'>
                <Helmet>
                    <title>Details</title>
                </Helmet>
                <Link to={"/"}>Home</Link>
                <h1>{product.title}</h1>
                <p>{product.about}</p>
                <p>{product.price}</p>
            </section>
        </>
    )
}

export default Details