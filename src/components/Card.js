import React from "react";

const Card = ({id, name, email }) => {
    return (
        <div className='bg-light-green dib br3 pd3 ma2 grow bw2 shadow-5'>
            <img src={`https://robohash.org/${id}?200x200`} alt="robo"/>
            <div className='card-info'>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
}

export default Card;