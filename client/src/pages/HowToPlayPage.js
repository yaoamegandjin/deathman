import { useNavigate } from 'react-router-dom';

function HowToPlayPage() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };

    return(
        <>
         <i onClick={goToHome} className="fa fa-home w3-xxxlarge"></i>
        <div style={{color: "black", background: "yellow", padding: "20px", boxShadow: "10px 5px 5px black"}}>
            <h2 style={{textAlign: "center"}}>How To Play</h2>
            <ul>
                <li>Guess the secret word before time runs out.</li>
                <li>Player gets up to six incorrect guesses.</li>
                <li>Player gains 20 points for each correct guess and loses 10 points for each incorrect guess.</li>
            </ul>
        </div>
        </>
    )
}

export default HowToPlayPage;
