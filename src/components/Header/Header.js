import React from 'react'
import "./Header.css"

import Card from '../Cards/Card'

import { useSelector } from 'react-redux'
import numeral from "numeral";

const Header = () => {
  const state = useSelector(state => state)
  const {worldCurratedData} = state
  
  return (
    <header>
      <div className='wrapper'>
        <div>
        <p className='heading'> Covid<span>19</span> Dashboard</p>
        </div>
        <div>
        <p className='sub-heading'> <span>Global</span> Data</p>
        </div>
      
        < div className='cards'>
          <div className='card'>
            <h1>{numeral(worldCurratedData.cases).format("0,0")}</h1>
            <h3>Cases</h3>
          </div>

          <div className='card'>
            <h1>{numeral(worldCurratedData.recovered).format("0,0")}</h1>
            <h3>Recovered</h3>
          </div>

          <div className='card'>
            <h1>{numeral(worldCurratedData.deaths).format("0,0")}</h1>
            <h3>Deaths </h3>
          </div>

          <div className='card'>
            <h1>{numeral(worldCurratedData.tests).format("0,0")}</h1>
            <h3>Tests</h3>
          </div>
          
        </div>
        
      </div>
      
    </header>
  )
}

export default Header
