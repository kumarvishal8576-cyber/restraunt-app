import React from 'react'
import Card from './Card'
import Chef from './Chef'

const MenuSection = () => {
  return (
    <div>
        <div className="menu">
            <div className="text">
                <h2 className='tittle'>MENU</h2>
               <h1 className='heading'> exquisite cuisine</h1>
               <h4 className='subtext'> A culinary joureny of delight</h4>
               <Card/>
               <Chef/>
            </div>
           
        </div>
       
    </div>
  )
}

export default MenuSection
