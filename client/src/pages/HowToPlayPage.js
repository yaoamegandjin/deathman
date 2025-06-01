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
            <h2>How To Play Deathman</h2>
            <p>Deathman is a thrilling twist on the classic Hangman game. Your goal: guess the secret word before time runs out. But be warned &#9866; every guess counts!</p>
            <h3>Objective</h3>
            <p>Guess the hidden word by choosing one letter at a time</p>
            <h3>Rules</h3>
            <ul>
                <li>Guess the secret word before time runs out.</li>
                <li>Player gets up to six incorrect guesses.</li>
                <li>Player gains 20 points for each correct guess and loses 10 points for each incorrect guess.</li>
            </ul>
            <h3>Tip</h3>
            Use common vowels and consonants early on to maximize your chances!
        </div>
        </>
    )
}

export default HowToPlayPage;
