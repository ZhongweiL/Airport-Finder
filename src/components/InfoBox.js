import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import BaiscInfo from "./BasicInfo";
import "../index.css";

function InfoBox({ iata, lat, lng, onClick }) {
    const weatherApiKey = process.env.REACT_APP_WEATHER_KEY;
    const [airportName, setAirportName] = useState("");
    const [cityName, setCityName] = useState("");
    const [ICAO, setICAO] = useState("");
    const [elevation, setElevation] = useState(0);
    const [temperatureCelsius, setTemperatureCelsius] = useState(0);
    const [temperatureFahrenheit, setTemperatureFahrenheit] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState("");
    const [windSpeed, setWindSpeed] = useState(0);
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(
        function () {
            async function getInfo() {
                try {
                    //basic info
                    setLoading(true);
                    const airportUrl = `http://airports-api.s3-us-west-2.amazonaws.com/iata/${iata.toLowerCase()}.json`;
                    const airportRes = await fetch(airportUrl);
                    const airportInfo = await airportRes.json();
                    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${lat},${lng}`;
                    const weatherRes = await fetch(weatherUrl);
                    const weatherInfo = await weatherRes.json();
                    setTime(weatherInfo.location.localtime);
                    setICAO(airportInfo.icao);
                    setAirportName(airportInfo.airport_name);
                    setCityName(airportInfo.city);
                    setElevation(airportInfo.elevation);
                    setTemperatureCelsius(weatherInfo.current.temperature);
                    setTemperatureFahrenheit(
                        Math.round(
                            weatherInfo.current.temperature * (9 / 5) + 32
                        )
                    );
                    setWeatherDescription(
                        weatherInfo.current.weather_descriptions[0]
                    );
                    setWindSpeed(weatherInfo.current.wind_speed);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }
            getInfo();
        },
        [iata, lat, lng, weatherApiKey]
    );
    return (
        <Card className="infoBox">
            <div className="closebtn">
                <IconButton onClick={onClick} color="secondary">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>
            {loading ? (
                <div className="loading-screen">Loading...</div>
            ) : (
                <div>
                    <div className="header">
                        <div className="airport-name">{airportName}</div>
                        <div className="time">Local Time: {time}</div>
                    </div>
                    <BaiscInfo
                        iata={iata}
                        icao={ICAO}
                        cityName={cityName}
                        elevation={elevation}
                        temperatureCelsius={temperatureCelsius}
                        temperatureFahrenheit={temperatureFahrenheit}
                        weatherDescription={weatherDescription}
                        windSpeed={windSpeed}
                    />
                </div>
            )}
        </Card>
    );
}

export default InfoBox;
