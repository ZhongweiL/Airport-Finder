import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "../index.css";

function BasicInfo(props) {
    return (
        <List>
            <ListItem className="item">
                <div>City: {props.cityName}</div>
            </ListItem>
            <Divider />
            <ListItem className="item">
                <div>Weather: {props.weatherDescription}</div>
            </ListItem>
            <Divider />
            <ListItem className="item">
                <div>
                    Temperature: {props.temperatureCelsius}°C/
                    {props.temperatureFahrenheit}°F
                </div>
            </ListItem>
            <Divider />
            <ListItem className="item">
                <div>Windspeed: {props.windSpeed} mph</div>
            </ListItem>
            <Divider />
            <ListItem className="item">
                <div>Elevation: {props.elevation} ft</div>
            </ListItem>
        </List>
    );
}

export default BasicInfo;
