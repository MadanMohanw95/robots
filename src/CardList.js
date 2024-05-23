import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
    return (
        <div>
            {
                robots.map(robo => {
                    return <Card key={robo.id} {...robo} />
                })
            }
        </div>
    )
}

export default CardList;