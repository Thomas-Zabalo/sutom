import {Link} from "react-router-dom";

export default function Home() {
    return (
        <>
            <ul className="menu bg-base-200 rounded-box w-56">
                <li><Link to="/daily">Daily</Link></li>
            </ul>
        </>
    )
}