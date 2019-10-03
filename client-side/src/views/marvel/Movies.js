import React from 'react';
import { Badge, Col, ListGroupItem, Row } from 'reactstrap'
import IndexNavbar from 'components/Navbars/IndexNavbar';
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import MovieList from 'views/marvel/MovieList.js'


class Movies extends React.Component {

    render() {

        return (  
            <div>
                <IndexNavbar />
                {/* <Counter items={this.state.items} /> */}
                {/* <Controls add={this.add} clear={this.clear} /> */}
                <MovieList items={this.state.items} delete={this.delete} markDone={this.markDone} add={this.add} clear={this.clear} items={this.state.items}/>
            </div>
        )
    }
}

export default Movies