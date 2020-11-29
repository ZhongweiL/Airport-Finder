import { useState } from "react";
import GoogleMapReact from "google-map-react";
import Airport from "./Airport";
import InfoBox from "./InfoBox";
import "../index.css";

function Map({ airports, lat, lng, zoom }) {
    const [IATA, setIATA] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const allAirports = airports.map(airport => {
        if (airport.size === "large" && airport.iso === "US") {
            return (
                <Airport
                    key={airport.iata}
                    lat={airport.lat}
                    lng={airport.lon}
                    onClick={() => {
                        setIATA(airport.iata);
                        setLatitude(airport.lat);
                        setLongitude(airport.lon);
                    }}
                />
            );
        } else {
            return null;
        }
    });
    return (
        <>
            <div className="map">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_MAPS_KEY
                    }}
                    defaultCenter={{ lat, lng }}
                    defaultZoom={zoom}
                >
                    {allAirports}
                </GoogleMapReact>
            </div>
            {IATA !== "" && (
                <InfoBox
                    iata={IATA}
                    lat={latitude}
                    lng={longitude}
                    onClick={() => {
                        setIATA("");
                    }}
                />
            )}
        </>
    );
}

export default Map;
