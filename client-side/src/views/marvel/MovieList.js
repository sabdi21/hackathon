import React from 'react';
import { Badge, Col, ListGroupItem, Row } from 'reactstrap'
import IndexNavbar from 'components/Navbars/IndexNavbar';
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import Movies from "views/marvel/Movies.js"


const MovieList = (props) => {
    const displayItems = props.items.map((item, i) => {
        return <Movies 
        item={item} 
        key={i} 
        index={i} 
        />
        
    })
        return (  
            <div>
            
                <LandingPageHeader />
                <IndexNavbar />
                <h1>Movies page</h1>
                {displayItems}
                
                {/* <Movies movies={displayItems} /> */}


            </div>

        )
}

export default MovieList