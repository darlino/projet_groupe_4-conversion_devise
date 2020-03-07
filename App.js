import React,{useEffect,useState} from 'react' 
import 'tachyons'
import Conversion from './Conversion'
import './App.css'
import Plot from 'react-plotly.js';


const BASE_URL = "https://api.exchangeratesapi.io/latest"


function App(){

        const[deviseOptions, setDeviseOptions] = useState([])
        const [deDevise, setDeDevise] = useState()
        const [aDevise, setAdevise] = useState()
        const [montant , setMontant] = useState(1)
        const [deMontantDevise, setDeMontantDevise] = useState(true)
        const [exchangeRate , setExchangeRate] = useState()
        
        
        
        let aMontant , deMontant
        if (deMontantDevise){
            deMontant = montant
            aMontant = montant * exchangeRate
        }
        else{
            aMontant = montant
            deMontant = montant / exchangeRate
        }





    useEffect( () => {
        fetch(BASE_URL)
        .then(res => res.json())
        .then(data =>{ 
            const premiereDevise = Object.keys(data.rates)[0]
            setDeviseOptions([data.base, ...Object.keys(data.rates)])
            setDeDevise(data.base)
            setAdevise(premiereDevise) 
            setExchangeRate(data.rates[premiereDevise])
        })
    } ,[])

    useEffect( () => {
        if(deDevise != null && aDevise != null){
             fetch(`${BASE_URL}?base=${deDevise}&symbols=${aDevise}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[aDevise]))
        }
       
    },[deDevise,aDevise])

   function changeDeMontant(e){
       setMontant(e.target.value)
       setDeMontantDevise(true)
   }
      function changeAMontant(e){
       setMontant(e.target.value)
       setDeMontantDevise(false)
   }
        return(
            <div className="body">
            <h1> Convertir</h1>
            <Conversion deviseOptions = {deviseOptions} deviseSelectionner = {deDevise} 
            onChangeDevise = {e => setDeDevise(e.target.value) }
            montant = {deMontant}
            onChangeMontant= {changeDeMontant}
            />
            <span  className="equal">
                =
            </span>
            <Conversion deviseOptions = {deviseOptions} deviseSelectionner = {aDevise}
            onChangeDevise = {e => setAdevise(e.target.value)}
            montant = {aMontant}
             onChangeMontant= {changeAMontant}
            />
            <div className='plot'>
            <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
            </div>
            </div>

        )
    
}
    export default App