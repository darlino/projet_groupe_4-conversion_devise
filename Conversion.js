import React from 'react'

function Conversion(props){
    const {
        deviseOptions,
        deviseSelectionner,
        onChangeDevise,
        montant,
        onChangeMontant
    } = props
    return (
        <div>
            <input type="number" name="" id="" value={montant} onChange={onChangeMontant}/>
            <select name="" id="" value={deviseSelectionner} onChange = {onChangeDevise}>
            {deviseOptions.map(option => (
            <option key = {option}value = {option}>{option}</option>
            ))}
                
            
            </select>
        </div>
    )
}
export default Conversion