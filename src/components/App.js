import React, {useState} from 'react';
import CurrencyInput from "./CurrencyInput"; 
import currencies from "../StaticData/Currencies";
import AppTitle from "./Title";
export default function App () {
  return (
    <div><AppTitle /><CurrencyInput currencies = {currencies}/></div>
  );
}

