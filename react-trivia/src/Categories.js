import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Categories(props) { 
    const { handleCategoryClick } = props
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then(res => {
                const categoryList = res.data.trivia_categories
                setCategoryList(categoryList)
            })
    }, [])

    return (
        <>
            <div className="categories">
                <h1>Click on a Category to Get Started!</h1>
                {categoryList && categoryList.map((category, index) => (
                    <h3 key={index} onClick={() => handleCategoryClick(category)}>{category.name}</h3>
                ))}
            </div>
        </>
    )

}