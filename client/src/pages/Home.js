import "./Home.css";
import useSound  from "use-sound";
import backgroundMusic from "./sounds/background-music.mp3"
import { useEffect } from "react";
function Home() {
    const [play, {stop}] = useSound(backgroundMusic, {loop: true})

    useEffect(() => {
        play();
        return () => stop();
    })
    return (
        <section className="home-page-details">
            <section className="game-title">
                <h1>Deathman</h1>
            </section>
            <section className="game-routing-buttons">
                <a href="/howtoplay">HOW TO PLAY</a>
                <a href="/leaderboard">LEADERBOARD</a>
                <a href="/signin">SIGN IN</a>
                <a href="/signup">SIGN UP</a>
                <a href="/guestmode">PLAY AS GUEST</a>
            </section>
        </section>
    )
}
export default Home;
