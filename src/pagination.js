import React from "react"
import './App.css';

export default function pagination(props){

    let numPages= []

    let propertyLength= props.totalProperties.length+1

    for (let i=1 ; i<=Math.ceil(propertyLength/props.postsPerPage); i++){
        numPages.push(i)
    }

    function changeCurrentPage(page){
        props.setCurrentPage(page)
    }


    return(
        <div className='pageCounterContainer'>
            <div className='pageCounterStart'><p>Prev</p></div>

            <div className='pageCounterCenter'>
                {numPages.map((page) => {
                    
                    return (
                    <p className={page===props.currentPage ? 'pageCounterCenterNumbersActive' : "pageCounterCenterNumbersNotActive"} 
                    onClick={() => changeCurrentPage (page)}
                    >
                    {page}
                    </p>
                    )
                })}
            </div>

            <p className='pageCounterEnd'>Next</p>
        </div>
    )
}