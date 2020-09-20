import deriveMap from "../StaticData/RateDerivationMap";
import rates from "../StaticData/FxRates";
import React from "react";
import fxutils from "../RateConversionUtil";
import ReactDOM from 'react-dom';
class CurrencyResult extends React.Component {
    state = {
      result : ""
    };
     render() {
        const mystyle = {
            color: "black",
            backgroundColor: "lightblue",
            padding: "10px",
            fontFamily: "Arial",
            textAlign: "center"
          };
       const onClickHandler = (e) => {
         let fromCurrency = this.props.input.fromccy;
         let toCurrency = this.props.input.toccy;
         let enteredAmount = this.props.input.amount;
         let conversionAmount = 0;
         conversionAmount = fxutils.convert(fromCurrency, toCurrency, enteredAmount);
         this.setState({  
            result:  conversionAmount
          });
     
    };
        const handleChange = (e) => {
          this.setState({  
            result:  e.target.value
          });
        };
      return (
      <div>
          <div><button onClick ={onClickHandler}>Convert</button></div>
          <div style={mystyle}><span>Result : </span><input name="result" onChange={handleChange}  value={this.state.result}/></div>
      </div>
      );
    }
  }

  export default CurrencyResult;