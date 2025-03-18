import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from '../../assets/logo-01.png';
import titleLogin from '../../assets/title-login.png';

const Login = () => {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro(null);

        try {
            const response = await axios.post("http://127.0.0.1:3000/login", { usuario, password });
            const data = response.data;

            console.log("Resposta do backend:", data); // Verifique no console

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.usuario); // Salva o nome do usuário
                navigate("/registrar");


            } else {
                setErro(data.message || "Erro ao fazer login");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);

            // Verifica se o erro contém uma resposta do backend
            if (error.response && error.response.data && error.response.data.message) {
                setErro(error.response.data.message);
            } else {
                setErro("Erro ao conectar ao servidor.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="left-side">
                    <img src={logo} alt="Logo" className="logo" />
                    <h2>Bem-vindo</h2>
                    <p>Faça login para acessar sua conta</p>
                </div>

                <div className="right-side">
                    <img src={titleLogin} alt="Logo" className="title-login" />


                    <form onSubmit={handleLogin} className="forms-login">
                        <div className="form-group" >
                            <input type="text" placeholder="Digite seu Usuário" value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required>
                            </input>
                            <label className="form-label">Usuário</label>
                        </div>
                        <div className="form-group" >
                            <input type="password" placeholder="Digite sua senha" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required>
                            </input>
                            <label className="form-label">Senha</label>
                        </div>


                        {erro && <p className="error-message">{erro}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg"
                            disabled={loading}
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <div className="forgot-password">
                        <a href="/cadastro" className="text-blue-500 hover:underline">
                            Trocar Senha
                        </a>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;
