const serviceMock = [
    {
        "id": 1,
        "shopId": 2,
        "name": "corete de cosas ",
        "description": "LE cortan las cosas cortan las cosascortan las cosas cortan las cosas  cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas cortan las cosas ",
        "price": 223.45,
        "duration": "02:20:00",
        "status": "Active"
    },
    {
        "id": 2,
        "shopId": 2,
        "name": "LE pintan las cosas ",
        "description": "Le pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosas.Le pintan las cosasLe pintan las cosas. ",
        "price": 203.45,
        "duration": "02:20:00",
        "status": "Active"
    },
    {
        "id": 2,
        "shopId": 2,
        "name": "LE pintan las cosas ",
        "description": "Le pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosasLe pintan las cosas.Le pintan las cosasLe pintan las cosas. ",
        "price": 203.45,
        "duration": "02:20:00",
        "status": "Active"
    },
]

import React, { useContext } from 'react'
import { AuthenticationContext } from '../../services/authentication/AuthenticationContext'

const ServiceList = () => {
    const {shopId} = useContext(AuthenticationContext);
    console.log(shopId)

    return (
        <div>
            <h1>{shopId}</h1>
        </div>
    )
}

export default ServiceList
