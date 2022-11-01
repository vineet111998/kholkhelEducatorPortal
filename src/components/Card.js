import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';
// import { BsPlayFill } from 'react-icons/bs';

class Card extends Component {
    constructor(props) {
        super(props);
    }
    state={
        flip:false
    }
    setflip=(gameStatus)=>{
            this.setState({flip:!this.state.flip})
        }
    render() { 
        
        return (

            <div className={`flipCard ${this.state.flip ? 'flip' : ''}`} onClick={()=>{this.setState({flip:!this.state.flip})}}>
                <div className="flipCardInner" >
                        <div className="flipCardFront">
                            <h2 className="cardcontent">?</h2>
                        </div>
                        <div className="flipCardBack">
                            <h4 className="cardcontent">this.props.outcome.outcome_name</h4>
                        </div>
                    </div>
                </div>

            
          );
    }
}
 
export default Card;