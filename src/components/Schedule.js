import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function Schedule({ arrivingFlights, departingFlights }) {
    function getSchedule(flights, status) {
        return flights.map((flight, ind) => {
            const flightTime = flight[status].dateLocal.split(/T|\./);
            return (
                <TableRow key={ind}>
                    <TableCell align="left">{flight.flightNumber}</TableCell>
                    <TableCell align="right">
                        {flightTime[0]} {flightTime[1]}
                    </TableCell>
                </TableRow>
            );
        });
    }

    const arrivals = getSchedule(arrivingFlights, "arrivalDate");
    const departures = getSchedule(departingFlights, "departureDate");
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Flight ID</TableCell>
                    <TableCell align="right">Arrival Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{arrivals}</TableBody>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Flight ID</TableCell>
                    <TableCell align="right">Departure Time</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{departures}</TableBody>
        </Table>
    );
}
export default Schedule;
