import React from "react";
import ReactDOM from 'react-dom';
import CurrencyResult from './CurrencyResult';
class CurrencyInput extends React.Component {
    state = {
      amount : ""
    };
        render() {
            const mystyle = {
                color: "black",
                backgroundColor: "lightblue",
                padding: "10px",
                fontFamily: "Arial",
                textAlign: "center"
              };
        const handleChange = (e) => {
          this.setState({
            [e.target.name]:  e.target.value
          });
        };
      return (
      <div>
          <div style={mystyle}><span>Enter Amount</span><input name="amount" onChange={handleChange} /></div>
          <div style={mystyle}><span>From Currency</span><select name="fromccy" onChange={handleChange} >{this.props.currencies.map((ccy) => <option key={ccy} value={ccy}>{ccy}</option>)}</select></div>
          <div style={mystyle}><span>To Currency</span><select name="toccy" onChange={handleChange} >{this.props.currencies.map((ccy) => <option key={ccy} value={ccy}>{ccy}</option>)}</select></div>
          <div style={mystyle}> <CurrencyResult input={this.state} /> </div>
      </div>
      );
    }
  }

  export default CurrencyInput;