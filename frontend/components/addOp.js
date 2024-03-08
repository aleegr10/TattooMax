import style from '../styles/Artista.module.css';

const validateForm = () => {
    var titulo = document.getElementById("titulo").value;
    var opinion = document.getElementById("opinion").value;

    var errors = {};

    if (titulo.trim() === "") {
        errors.tituloError = "INGRESE UN TÍTULO";
    } else {
        errors.tituloError = "";
    }

    if (opinion.trim() === "") {
        errors.opinionError = "INGRESE UNA OPINIÓN";
    } else {
        errors.opinionError = "";
    }

    for (var errorId in errors) {
        if (errors.hasOwnProperty(errorId)) {
            document.getElementById(errorId).innerHTML = errors[errorId];
            document.getElementById(errorId).style = "font-size: 10px; color: red";
        }
    }

    var isValid = Object.keys(errors).every(key => errors[key] === "");
    return isValid;
}

const EditaPass = ({ user, artist, onClose }) => {
    async function submit() {
        if (validateForm()) {
            try {
                let datos = {
                    artist: artist.name,
                    imgArtist: artist.imagen,
                    user: user.username,
                    imgUser: user.imagen,
                    titulo: document.getElementById('titulo').value,
                    opinion: document.getElementById('opinion').value
                }

                const response = await fetch('http://localhost:5000/opiniones/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) {
                    throw new Error('ERROR AL AÑADIR OPINIÓN');
                }

                var modalOpOk = document.getElementById("modalOpOk");

                modalOpOk.style.display = "block";

                setTimeout(function () {
                    var modalOpOk = document.getElementById("modalOpOk");

                    modalOpOk.style.display = "none";
                    onClose();
                }, 2000);
            } catch (error) {
                document.getElementById("addError").innerHTML = error.message;
                document.getElementById("addError").style = "font-size: 15px; color: red";
            }
        };
    }

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <span className={style.close} onClick={onClose}><b>x</b></span>
                <div>
                    <span id='addError'></span>
                    <h1>CAMBIAR CONTRASEÑA</h1>
                    <span id="tituloError"></span>
                    <p>Título: <input id="titulo" /></p>
                    <span id="opinionError"></span>
                    <p>Opinión: <textarea id="opinion" /></p>
                    <button onClick={submit}>Aceptar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
            <div id="modalOpOk" className={style.modalContainer}>
                <div className={style.modalContent}>
                    <p>SE HA AÑADIDO LA OPINIÓN CORRECTAMENTE</p>
                </div>
            </div>
        </div>
    );
};

export default EditaPass;
