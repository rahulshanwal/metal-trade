import React from 'react';
import classes from './Ticker.css';

const Ticker = (props) => {
  let metals = null;
  if(props.data){
    metals = props.data.map((metal, index) => (
      <span className={classes.TickerText} key={metal.name+index}>{metal.name + ' : '+ metal.price}</span>
    ));
  }
  return (
    <div className={classes.TickerParent}>
      <div className={classes.Ticker + ' Ticker'}>
        <div className={classes.TickerAnimation}>
          {metals}
        </div>
      </div>
    </div>
  )
}
export default Ticker;