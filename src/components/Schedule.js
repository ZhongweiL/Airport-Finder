import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function Schedule({ arrivingFlights, departingFlights }) {
    const arrivals = arrivingFlights.map((arrivingFlight, ind) => {
        const arrivingTime = arrivingFlight.arrivalDate.dateLocal.split(/T|\./);
        return (
            <TableRow key={ind}>
                <TableCell align="left">
                    {arrivingFlight.flightNumber}
                </TableCell>
                <TableCell align="right">
                    {arrivingTime[0]} {arrivingTime[1]}
                </TableCell>
            </TableRow>
        );
    });
    const departures = departingFlights.map((departingFlight, ind) => {
        const departingTime = departingFlight.departureDate.dateLocal.split(
            /T|\./
        );
        return (
            <TableRow key={ind}>
                <TableCell align="left">
                    {departingFlight.flightNumber}
                </TableCell>
                <TableCell align="right">
                    {departingTime[0]} {departingTime[1]}
                </TableCell>
            </TableRow>
        );
    });
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
