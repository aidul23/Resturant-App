import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('meal');

    console.log(query);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, type);
    };


  return (
    <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="meal">Meals</option>
                    <option value="drink">Drinks</option>
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
  )
}
