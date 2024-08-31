import { leaderboard } from '../server.js'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Leaderboard.css';
function Leaderboard() {
    const navigate = useNavigate();
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        leaderboard()
        .then(data => {
            setBoard(data);
            setLoading(false);
        })
        .catch();
    }, [])

    const goToHome = () => {
        navigate('/');
    };

    const champions = board.map(user => 
        <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.highscore}</td>
        </tr>);
    return (
        loading ? <p style={{color: "black"}}>Loading...</p>: <>
            <i onClick={goToHome} className="fa fa-home w3-xxxlarge"></i>
            <table>
            <caption>
                The Champions
            </caption>
            <thead>
            <tr>
                <th>Username</th>
                <th>Highscore</th>
            </tr>
            </thead>
            <tbody>{champions}</tbody>
        </table>
        </>
    )
}

export default Leaderboard;
