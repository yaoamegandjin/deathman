import axios from 'axios';
export const signin = user => {
    return axios.post("https://world-best-hangman-game.onrender.com/api/signin", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}

export const forgotPassword = (email) => {
    return axios.post("https://world-best-hangman-game.onrender.com/api/forgotpassword", JSON.stringify(email), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}

export const updatePassword = (newPassword) => {
    const resetToken = window.location.pathname.split("/").pop();
    return axios.post(`https://world-best-hangman-game.onrender.com/api/resetpassword/${resetToken}`, JSON.stringify(newPassword),{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetToken}`,
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
};
export const signup = user => {
    return axios.post("https://world-best-hangman-game.onrender.com/api/signup", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}
export const updateUserData = (id, data) => {
    const accessToken = JSON.parse(localStorage.getItem('jwt')).token;
    return axios.patch(`https://world-best-hangman-game.onrender.com/api/${id}`, JSON.stringify(data), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw Error(response.status || response.statusText);
        }
        const isJson = response.headers.get("content-type")?.includes("application/json");
        return isJson ? response.json(): null;
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error)
    })
}

export const userData = (id) => {
    const accessToken = JSON.parse(localStorage.getItem('jwt')).token;
    return axios.get(`https://world-best-hangman-game.onrender.com//api/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}
export const leaderboard = () => {
    return axios.get("https://world-best-hangman-game.onrender.com//api/leaderboard", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}

export const theWord = () => {
    return axios.get('https://random-word-api.vercel.app/api?words=1&length=6', {
        headers: {
            "Content-Type": 'application/json', 
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(err => {
        return err.response.data;
    })
}
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}


export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        axios.get("https://world-best-hangman-game.onrender.com//api/signout")
        .then(response => {
            console.log(response.data);
            next();
        })
        .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else {
        return false;
    }
}
