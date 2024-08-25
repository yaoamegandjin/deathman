import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import {theWord} from '../server';
import { useNavigate} from "react-router-dom";
import useSound from 'use-sound';
import correctAnswer from './sounds/correct-answer.mp3'
import wrongAnswer from './sounds/wrong-answer.mp3';
import winSound from './sounds/win.mp3';
import loseSound from './sounds/lose.mp3';
import highScoreSound from './sounds/highscore.mp3';
import "./hangman.css";

function HangmanGuess() {

    const [correct] = useSound(correctAnswer);
    const [wrong] = useSound(wrongAnswer);
    const [win] = useSound(winSound, {interrupt: true});
    const [lose] = useSound(loseSound, {interrupt: true});
    const [highscoreMusic] = useSound(highScoreSound, {interrupt: true});

    const navigate = useNavigate();
    const onSignout = () => {
        navigate('/');
    }
    const [word, setWord] = useState("HANGMAN");
    const [isPlaying, setIsPlaying] = useState(true);
    const getWord = () => {
        theWord()
        .then((data) => {
            setWord(data[0])
        })
        .catch()
    }
    useEffect(() => {
        getWord();
    }, [])

    useEffect(() => {
        const welcomeMessage = () => {
            toast(`Welcome to guest mode`, {
                position: "top-right",
            })
        }
        welcomeMessage();
    }, [])
    const letters = ["A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [numOfGuesses, setNumOfGuesses] = useState(0);
    
    let maskedWord = word.toUpperCase().split("").map((letter, index) => correctGuesses.includes(letter) ? <span key={index}>{letter}</span> : <span key={index}></span>);
    let copyOfmaskedWord = word.toUpperCase().split("").map((letter) => correctGuesses.includes(letter) ? letter: "_").join("");
    const [timer, setTimer] = useState(120);
    const [timeUp, setTimeUp] = useState(false);
    const [message, setMessage] = useState("");
    const [clicked, setClicked] = useState([]);
    const [guesses, setGuesses] = useState([]);
    const [score, setScore] = useState(0);
    const [highscore, setHighScore] = useState(0);
    const [showScoreCard, setShowScoreCard] = useState(false);
    const [showWord, setShowWord] = useState("");
    const [hint, setHint] = useState(0);
    const [showCard, setShowCard] = useState(false);
    useEffect(() => {
        let interval; 
        if (!timeUp && isPlaying) {
            interval = setInterval(() => {
                setTimer(timer => timer - 1);
            }, 1000)
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timeUp, isPlaying]);

    useEffect(() => {
        if (timer < 0 && isPlaying) {
            setTimeUp(true);
            setTimer(120);
            setIsPlaying(false);
        }
    }, [timer, timeUp, isPlaying])

    const formatTime = (timer) => {
        const minutes = Math.floor(timer / 60);
        const remainingSeconds = timer % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (!copyOfmaskedWord.includes("_")) {
            setMessage("You Win");
            win();
            setShowCard(true);
            setIsPlaying(false);
        }
        else if (timeUp || numOfGuesses >= 6) {
            setMessage("You lose");
            lose()
            setShowCard(true);
            setShowWord(`The word was ${word.toUpperCase()}`)
            setIsPlaying(false);
        }
    }, [copyOfmaskedWord, timeUp, numOfGuesses, word, showWord, lose, win])

    const playGame = () => {
        setTimeUp(false);
        setShowCard(false);
        setIsPlaying(true);
        setNumOfGuesses(0);
        setCorrectGuesses([]);
        setTimer(120);
        getWord();
        setGuesses([]);
        setClicked([]);
        setShowCard(false);
        setHint(0);
    }


    const handleQuit = () => {
        if (score > highscore) {
            setHighScore(score);
            highscoreMusic();
            setShowScoreCard(true);
        }
        else {
            navigate("/");
        }
    }
    const navigateToHome = () => {
        setShowScoreCard(false);
        navigate("/");
    }

    const getHint = () => {
        if (hint < 2) {
            for (let i = 0; i < word.length; i++) {
                if (copyOfmaskedWord[i] === "_") {
                   let letter = word[i].toUpperCase();
                   setCorrectGuesses([...correctGuesses, letter]);
                   let index = letters.indexOf(letter.toUpperCase())
                   clicked[index] = "green";
                   setHint(hint => hint + 1);
                   break;
                }
            }
        }
    }
    return (
        <>
            <div className='hangman-game'>
                <i onClick={onSignout} className="fa fa-home w3-xxxlarge"></i>
                <div className="game-info">
                    <h2>{numOfGuesses}/6</h2>
                    <h2>{formatTime(timer)}</h2>
                    <h2 className="hint" onClick={getHint}>CLICK FOR HINT: <i class="fa fa-lightbulb-o"></i> {hint}/2</h2>
                    <h2>HIGHSCORE: {highscore}</h2>
                </div>
                <h2 className="score">SCORE: {score}</h2>
                <div className="word">{maskedWord}</div>
                <div className="game-keyboard">
                    {letters.map((letter, index) =>
                    <button key={index} style={{backgroundColor: clicked[index]}} onClick={
                        () => {
                            setGuesses([...guesses, letter])
                            if (word.toUpperCase().includes(letter) && isPlaying) {
                                setCorrectGuesses([...correctGuesses, letter]);
                                setScore(score => score + 20)
                                clicked[index] = "green";
                                correct();
                            } else if (numOfGuesses < 6 && !guesses.includes(letter) && isPlaying) {
                                setNumOfGuesses(numOfGuesses => numOfGuesses + 1)
                                wrong()
                                if (score > 0) {
                                    setScore(score => score - 10)
                                }
                                clicked[index] = "red";
                            }
                    }}>{letter}</button>)}
                </div>
            </div>
            <div className="gameover-container" style={{display: showCard ? "block" : "none", height: "350px"}}>
                <h1>{message}</h1>
                <p>{showWord}</p>
                <p>Sign up to save highscore</p>
                <div className="gameover-button">
                    <button onClick={playGame}>CONTINUE</button>
                    <button onClick={handleQuit}>QUIT GAME</button>
                </div>
            </div>
            <div className="highscore-container" style={{display: showScoreCard ? "block": "none"}}>
                <i className="fa fa-close w3-xlarge" onClick={navigateToHome}></i>
                <h1>NEW HIGHSCORE!</h1>
                <h2>{score}</h2>
            </div>
            <ToastContainer />
        </>

    )
};

export default HangmanGuess;
