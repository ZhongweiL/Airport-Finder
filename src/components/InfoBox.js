import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect, useState } from "react";
import BaiscInfo from "./BasicInfo";
import Schedule from "./Schedule";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../index.css";

function InfoBox({ iata, lat, lng, onClick }) {
    const weatherApiKey = process.env.REACT_APP_WEATHER_KEY;
    const scheduleAppId = process.env.REACT_APP_SCHEDULE_APPID;
    const scheduleApikey = process.env.REACT_APP_SCHEDULE_KEY;
    const [airportName, setAirportName] = useState("");
    const [cityName, setCityName] = useState("");
    const [elevation, setElevation] = useState(0);
    const [temperatureCelsius, setTemperatureCelsius] = useState(0);
    const [temperatureFahrenheit, setTemperatureFahrenheit] = useState(0);
    const [weatherDescription, setWeatherDescription] = useState("");
    const [windSpeed, setWindSpeed] = useState(0);
    const [time, setTime] = useState("");
    const [arrivingFlights, setArrvingFlights] = useState([]);
    const [departingFlights, setDepartingFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [onScheduleTab, setOnScheduleTab] = useState(false);

    useEffect(
        function () {
            async function getInfo() {
                try {
                    //basic info
                    setLoading(true);
                    setOnScheduleTab(false);
                    const airportUrl = `https://airports-api.s3-us-west-2.amazonaws.com/iata/${iata.toLowerCase()}.json`;
                    const airportRes = await fetch(airportUrl);
                    const airportInfo = await airportRes.json();
                    const weatherUrl = `https://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${lat},${lng}`;
                    const weatherRes = await fetch(weatherUrl);
                    const weatherInfo = await weatherRes.json();
                    setTime(weatherInfo.location.localtime);
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
                    //schedule data
                    const [
                        year,
                        month,
                        day,
                        hour
                    ] = weatherInfo.location.localtime.split(/-| |:/, 4);
                    const scheduleArrUrl = `https://cors-anywhere.herokuapp.com/https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/${iata}/arr/${year}/${month}/${day}/${hour}?appId=${scheduleAppId}&appKey=+${scheduleApikey}&numHours=1&maxFlights=5`;
                    const scheduleArriveRes = await fetch(scheduleArrUrl);
                    const scheduleArriveInfo = await scheduleArriveRes.json();
                    const scheduleDepUrl = `https://cors-anywhere.herokuapp.com/https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/${iata}/dep/${year}/${month}/${day}/${hour}?appId=${scheduleAppId}&appKey=+${scheduleApikey}&numHours=1&maxFlights=5`;
                    const scheduleDepartureRes = await fetch(scheduleDepUrl);
                    const scheduleDepartureInfo = await scheduleDepartureRes.json();
                    setArrvingFlights([...scheduleArriveInfo.flightStatuses]);
                    setDepartingFlights([
                        ...scheduleDepartureInfo.flightStatuses
                    ]);
                } catch (e) {
                    console.log(e);
                }
            }
            getInfo();
        },
        [iata, lat, lng, scheduleApikey, scheduleAppId, weatherApiKey]
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
                    <Tabs
                        className="tab"
                        indicatorColor="primary"
                        textColor="primary"
                        value={onScheduleTab ? 1 : 0}
                    >
                        <Tab
                            label="Basic Info"
                            onClick={() => setOnScheduleTab(false)}
                        />
                        <Tab
                            label="Schedule"
                            onClick={() => setOnScheduleTab(true)}
                        />
                    </Tabs>
                    {onScheduleTab ? (
                        <Schedule
                            arrivingFlights={arrivingFlights}
                            departingFlights={departingFlights}
                        />
                    ) : (
                        <BaiscInfo
                            cityName={cityName}
                            elevation={elevation}
                            temperatureCelsius={temperatureCelsius}
                            temperatureFahrenheit={temperatureFahrenheit}
                            weatherDescription={weatherDescription}
                            windSpeed={windSpeed}
                        />
                    )}
                </div>
            )}
        </Card>
    );
}

export default InfoBox;
