import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link as LinkRouter} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import api from "../../axios";
import {loginUser} from "../../actions/AuthActions";
import InputPassword from "../../components/Input/InputPassword";
import { GRAY_LABEL_UX, RED_ERROR_UX, SECONDARY, styleYellowButton, GRAY_BORDER_TABLE, LINE_TABLE, GRAY_BG_BODY } from "../../shared/utils";
import "./Login.css";
import { showSnackMessage } from "../../actions/SnackActions";
import loginImage from '../../assets/images/login.png';
import logo from "../../assets/images/logo.png";


const Login = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);


    const handleSubmit = () => {
        const data = {
            username: name,
            password,
        };
        setLoading(true);
        api.GetLogin(data).then(response => {
            let token = response.data.access;
            setLoading(false);
            dispatch(loginUser(token));
            window.location.reload();
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401 || error.response.status === 422) {
                setPasswordError(true);
                dispatch(showSnackMessage({message: "O nome ou a senha informados estão incorretos!", severity: "error"}));
            }
        });
    };

    return (
        <Grid container sx={{ minHeight: "100vh", overflow: "hidden" }}>
            <Grid item xs={6} sx={{backgroundColor: "#9780E5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "start"}}>
                <img src={logo} style={{width: "7vh", alignSelf: "start", marginLeft: 30, marginTop: 30}} />
                <img src={loginImage} style={{width: "75%"}} />
            </Grid>
            <Grid item xs={6} sx={{backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2}}>
                <h1 style={{fontWeight: "bold"}}>LOGIN</h1>
                <TextField
                    size="small"
                    label="Nome"
                    autoComplete="nome"
                    autoFocus
                    onChange={(e) => {setName(e.target.value.trim());}}
                    value={name}
                    variant="filled"
                    sx={{
                        "& .MuiFilledInput-root": {
                            color: "black",
                            width: "60vh"
                        },
                        "& .MuiInputLabel-root": {
                            color: "gray"
                        }
                    }}
                />
                <InputPassword label="Senha" password={password} error={passwordError} handleChange={(e) => setPassword(e.target.value)} />
                {
                    passwordError && (
                        <p style={{color: RED_ERROR_UX, fontSize: "14px"}}>O email ou senha informados estão incorretos!</p>
                    )
                }
                <Grid container sx={{marginTop: 2, marginBottom: 2}}>
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <LinkRouter to='/create_account' variant="body2" style={{textDecoration: "none", color: GRAY_LABEL_UX, fontWeight: "600", fontSize: "14px"}}>
                            Criar uma conta
                        </LinkRouter>
                    </Grid>
                </Grid>
                <React.Fragment>
                    { ((name === "") || (password === "")) ? (
                        <Button
                            disabled
                            data-testid="unabled-submit-button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ ...styles.buttonSubmit }}
                            style={{fontWeight: "600", color: "gray"}}
                        >
                            Entrar
                        </Button>
                    ) : (
                        <Button
                            data-testid="submit-button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ ...styles.buttonSubmit }}
                            onClick={() => handleSubmit()}
                            style={styleYellowButton}
                        >
                            Entrar
                        </Button>
                    )
                    }
                </React.Fragment>
            </Grid>
        </Grid>
    );
};

export default Login;

const styles = {
    center: {
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    logo: {
        userDrag: "none",
        userSelect: "none",
        pointerEvents: "none",
        width: "191px",
        height: "36px"
    },
    header: {
        width: "398px",
        height: "15px",
        fontWeight: "bold",
        fontSize: "36px",
        lineHeight: "32px",
        color: "black",
        textAlign: "center",
    },
    text: {
        width: "411px",
        height: "50px",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "20px",
        color: "gray",
        textAlign: "center",
    },
    copyright: {
        textAlign: "center",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "end",
        paddingBottom: "40px"
    },
    buttonSubmit: {
        marginTop: 3,
        marginBottom: 2,
        width: "auto",
        paddingX: "30px",
        paddingY: "10px",
    }
};