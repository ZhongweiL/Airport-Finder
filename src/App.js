import Map from "./components/Map";
import airports from "./airports.json";

function App() {
    return (
        <div>
            <Map airports={airports} lat={40.73} lng={-73.935} zoom={8} />
        </div>
    );
}

export default App;
