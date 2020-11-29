import "../index.css";

function Airport({ onClick }) {
    return (
        <div className="airport">
            <i
                className="fas fa-plane fa-2x fa-rotate-270"
                onClick={onClick}
            ></i>
        </div>
    );
}
export default Airport;
