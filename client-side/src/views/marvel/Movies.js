import React from 'react';
import { Badge, Col, ListGroupItem, Row } from 'reactstrap'
import IndexNavbar from 'components/Navbars/IndexNavbar';
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import MovieList from 'views/marvel/MovieList.js'


const Movies = props => {
    const displayItems = props.items.map((item, i) => {
        return <TodoListItem 
        item={item} 
        key={i} 
        index={i} 
        delete={props.delete} 
        markDone={props.markDone}
        />
    })

    return(
        <div>
            <h3>TodoList: My Current List</h3>
            {/* todoListitems: below  */}
            <ul>
                {displayItems}
            </ul>
        </div>
    )
}

export default Movies