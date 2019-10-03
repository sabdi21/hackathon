import React from 'react';
import { Badge, Col, ListGroupItem, Row } from 'reactstrap'
import IndexNavbar from 'components/Navbars/IndexNavbar';
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import Movies from "views/marvel/Movies.js"


class MovieList extends React.Component {
    state = {
        items: [
          {text: "Walk the Dog", finished: false },
          {text: "Walk the Cat", finished: true },
          {text: "Walk the Bird", finished: false },
          {text: "Walk the Lizard", finished: false },
          {text: "Walk the Fish", finished: true }
        ]
      }

      add = (newItemText) => {
        this.setState({items: [...this.state.items, {text: newItemText, finished: false}]})
      }
      clear = () => {
        this.setState({items: []})
      }
      delete = (indexToDelete) => {
        console.log('Delete item', indexToDelete)
        let currentItems = [...this.state.items]
        currentItems.splice(indexToDelete, 1)
        this.setState({ items: currentItems })
      }
      markDone = (indexToChange) => {
        console.log('Mark Done item', indexToChange)
        let currentItems = [...this.state.items]
        currentItems[indexToChange].finished = !currentItems[indexToChange].finished
        this.setState({ items: currentItems })
      }
    render() {
        const displayItems = this.items.map((item, i) => {
            return <Movies 
            item={item} 
            key={i} 
            index={i} 
            delete={this.delete} 
            markDone={this.markDone}
            />
        })
        return (  
            <div>
            
                <LandingPageHeader />
                <IndexNavbar />
                <h1>Movies page</h1>
             

            </div>

        )
    }
}

export default MovieList