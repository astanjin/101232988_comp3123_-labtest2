import './App.css';
import { RiCelsiusLine} from 'react-icons/ri';
import {SiAircanada} from 'react-icons/si';
import{FiWind} from 'react-icons/fi'
import {WiHumidity} from'react-icons/wi'

import react,{useState,useEffect} from 'react';
import Loading from './Loading';
import { Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const url ='http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=b7290afdfa6b91af3270bf52785bd7f7&units=metric&cnt=3' 

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
function App() {
  const[loading,setLoading] =useState(true)
  const[weathers,setweathers] =useState("")
  const[des,setDes]=useState("")
  const[icon,setIcon] =useState("")
  const[temp,setTemp]=useState(0)
  const[feel,setFeel]=useState(0)
  const[country,setCountry]=useState("")
  const[city,setCity]=useState("")
  const[wind,setWind]=useState(0)
  const[humid,setHumid]=useState(0)
  const fetchWeather =async ()=>{
    setLoading (true)
    try {
        const response = await fetch(url)
        const weathers = await response.json()
        
        //console.log(weathers)
         setLoading(false)
         setweathers(weathers.weather[0].main)
         setDes(weathers.weather[0].description)
         setIcon(weathers.weather[0].icon)
         setTemp(weathers.main.temp)
         setFeel(weathers.main.feels_like)
         setCountry(weathers.sys.country)
         setCity(weathers.name)
         setWind(weathers.wind.speed)
         setHumid(weathers.main.humidity)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  
  }
  useEffect(()=>{
   fetchWeather()
  },[])
  if(loading){
    return(
      <div>
        <Loading/>
      </div>
    )
  }
   
  return (
  <div className="App-header">
     
  <Container className="app">
  <Container>
  <Row xs={4} md={6} lg={6}>
    <Col></Col>
    <Col className="date">{dateBuilder(new Date())}</Col>
  </Row>
  <Row xs={1} md={2}>
    <Col>{weathers} <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/></Col>
    <Col className="temp">{Math.round(temp)}<RiCelsiusLine/></Col>
    <Col>{des}</Col>
  </Row>
  <Row xs="auto">
    <Col></Col>
    <Col></Col>
    <Col >feels like {Math.round(feel)}<RiCelsiusLine/></Col>
  </Row>
</Container>
<Container>
  <Row xs={2} md={4} lg={6}>
    <Col className="location-box"><SiAircanada/>{country}</Col>
    <Col className="location-box">{city}</Col>
  </Row>
   <Row xs={2} md={4} lg={6}>
    <Col className="humid"><FiWind/>{wind}</Col>
    <Col  className="humid"><WiHumidity/>{humid}%</Col>
  </Row>
  
</Container>
</Container>

    </div>    
  );
}

export default App;
