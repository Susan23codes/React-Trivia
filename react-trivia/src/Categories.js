import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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
        {/* not sure why Skeleton isn't working */}
        {!categoryList && <Skeleton />}
            <div className="categories">
                <h1>Click on a Category to Get Started!</h1>
                {categoryList && categoryList.map((category, index) => (
                    <h3 key={index} onClick={() => handleCategoryClick(category)}>{category.name}</h3>
                ))}
            </div>
        </>
    )

}