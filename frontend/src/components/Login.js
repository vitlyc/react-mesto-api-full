import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ onLog, ...props }) => {
    const [emailInput, setEmailInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const history = useHistory();

    useEffect(() => {
        return () => {
            if (localStorage.getItem("jwt")) {
                history.push("/main");
            }
        }
    }, [history]);

       function handleChangeEmailInput(e) {
        setEmailInput(e.target.value);
    }
    function handleChangePasswordInput(e) {
        setPasswordInput(e.target.value);
    }
    const resetInputs = () => {
        setEmailInput('');
        setPasswordInput('');
    };
    function handleSubmit(e) {
        e.preventDefault();

        onLog({ passwordInput, emailInput })
            .then(resetInputs)
            .then(() => {
                history.push("/main");
            })
            .catch((err) => {
                console.log(err);
            });
    };

       return (
                   <form className="auth" onSubmit={handleSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input className="auth__input" type="email"
                    placeholder="Email"
                    required value={emailInput} onChange={handleChangeEmailInput}
                    minLength="8" maxLength="40"
                     />
                <input className="auth__input" type="text"
                    placeholder="Пароль"
                    minLength="8" maxLength="40"
                    required value={passwordInput} onChange={handleChangePasswordInput} />
                <button className="auth__confirm-button" type="submit">Войти</button>
                {props.children}
            </form>
           );
};

export default Login;