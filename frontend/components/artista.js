import { useState, useEffect, Fragment } from 'react';
import style from '../styles/Artista.module.css';
import AddCom from './addOp';

const URL_BASE = 'http://localhost:5000';

const Artista = ({ name }) => {
    const [artista, setArtista] = useState({});
    const [horario, setHorario] = useState({});
    const [opiniones, setOpiniones] = useState([]);
    const [userLog, setUserLog] = useState(null);
    const [isComOpen, setIsComOpen] = useState(false);

    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const openCom = () => setIsComOpen(true);
    const closeCom = () => setIsComOpen(false);

    const fetchHorario = async () => {
        const data = await fetch(`${URL_BASE}/horarios`)
            .then(res => res.json());
        setHorario(data.find(horario => horario.artist === name));
    };

    const fetchOpiniones = async () => {
        const data = await fetch(`${URL_BASE}/opiniones`)
            .then(res => res.json());
        const artistOpiniones = data.filter(opinion => opinion.artist === artista.name);
        setOpiniones(artistOpiniones);
    };

    const fetchArtist = async () => {
        const data = await fetch(`${URL_BASE}/artists`)
            .then(res => res.json());
        setArtista(data.find(artist => artist.name === name));
    };

    const recibeUserLog = async () => {
        const userId = sessionStorage.getItem('token');
        const data = await fetch(`${URL_BASE}/users`)
            .then(res => res.json());
        setUserLog(data.find(user => user._id === userId));
    };

    useEffect(() => {
        recibeUserLog();
        fetchArtist();
        fetchHorario();
        fetchOpiniones();
    }, []);

    const compruebaIsLog = () => {
        if (userLog === null) {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            setTimeout(() => {
                var modal = document.getElementById("myModal");
                modal.style.display = "none";
            }, 2000);
        } else {
            openCom();
        }
    };

    return (
        <div className={style.container}>
            <div>
                <img alt={artista.name} src={artista.imagen} className={style.img} width="100px" height="100px" />
                <h1>{artista.name}</h1>
                <p>Edad: {artista.edad}</p>
                <p>Email: {artista.email}</p>
                <p>{artista.descripcion}</p>
                <h />
            </div>

            <div>
                <h2 className={style.h2}>Horario</h2>
                {horario && horario.horas && (
                    <table className={style.tabla}>
                        <tbody>
                            {dias.map((dia, index) => (
                                <tr key={dia}>
                                    <th className={style.dias}>{dia}</th>
                                    {horario.horas[index][dia].map((hora, i) => (
                                        <Fragment key={i}>
                                            <td className={style.horas}>{hora}</td>
                                        </Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className={style.container}>
                <h2 className={style.h2}>Opiniones</h2>
                <div className={style.opiniones}>
                    {opiniones.map(opinion => (
                        <div key={opinion.id} className={style.containerOp}>
                            <div id="user" className={style.divOp}><img alt='imgUser' src={opinion.imgUser} className={style.imgUserOp} width="30px" height="30px" /><b className={style.userOp}>{opinion.user}</b></div>
                            <div id="titulo" className={style.divOp}><p className={style.tituloOp}><b>{opinion.titulo}</b></p></div>
                            <div id="opinion" className={style.divOp}><p className={style.opinionOp}>{opinion.opinion}</p></div>
                        </div>
                    ))}
                </div>

                <div>
                    <button onClick={compruebaIsLog} className={style.button}>Escribir un comentario</button>
                    {isComOpen && <AddCom user={userLog} artist={artista} onClose={closeCom} />}
                    <div id="myModal" className={style.modalContainer}>
                        <div id="modalContent" className={style.modalContent}>
                            <p>PARA PODER AÑADIR UN COMENTARIO DEBES ESTAR LOGUEADO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artista;
