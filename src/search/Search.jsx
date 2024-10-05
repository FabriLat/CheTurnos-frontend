import React from 'react'
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from "prop-types";
import "./search.css";

const Search = ({ onSearch }) => {
    const [shopSearched, setShopSearched] = useState("");

    const searchFormHandle = (event) => {
        const searchValue = event.target.value;
        setShopSearched(searchValue);
        onSearch(searchValue);
    };
    return (
        <Form className="search">
            <Form.Group controlId="formBasicSearch">
                <InputGroup>
                    <Form.Control style={{ width: '30rem' }}
                        type="text"
                        placeholder="Buscar Negocio"
                        value={shopSearched}
                        onChange={searchFormHandle}
                    />
                </InputGroup>
            </Form.Group>
        </Form>
    )
}

Search.propTypes = {
    onSearch: PropTypes.func,
}

export default Search
