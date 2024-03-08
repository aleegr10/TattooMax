import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import Nav from '../components/nav';
import Footer from '../components/footer';
import EditaDatos from '../components/editaDatos';
import EditaPass from '../components/editaPass';
import style from '../styles/Perfil.module.css';

export default function Perfil() {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState([]);
  const [citas, setCitas] = useState([]);
  const [opiniones, setOpiniones] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isEditaDatosOpen, setIsEditaDatosOpen] = useState(false);
  const [isEditaPassOpen, setIsEditaPassOpen] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'user') {
      setIsUser(true);
    } else {
      router.push('/pagError');
    }
    recibeId();
  }, []);

  const recibeId = () => {
    const userId = sessionStorage.getItem('token');
    fetchUser(userId);
    fetchCitas(userId);
    fetchOpiniones(userId);
    fetchArtists();
  };

  const fetchUser = async (userId) => {
    const response = await fetch(`http://localhost:5000/users`);
    const data = await response.json();
    setUser(data.find((usuario) => usuario._id === userId));
  };

  const fetchCitas = async (userId) => {
    const response = await fetch(`http://localhost:5000/citas`);
    const data = await response.json();
    const userCitas = data.filter((cita) => cita.user === user.username);
    setCitas(userCitas);
  };

  const fetchOpiniones = async (userId) => {
    const response = await fetch(`http://localhost:5000/opiniones`);
    const data = await response.json();
    const userOpiniones = data.filter((opinion) => opinion.user === user.username);
    console.log(opiniones)
    setOpiniones(userOpiniones);
  };

  const fetchArtists = async () => {
    const response = await fetch(`http://localhost:5000/artists`);
    const data = await response.json();
    setArtists(data);
  };

  const openEditaDatos = () => {
    setIsEditaDatosOpen(true);
  };

  const openEditaPass = () => {
    setIsEditaPassOpen(true);
  };

  const closeEditaDatos = () => {
    setIsEditaDatosOpen(false);
  };

  const closeEditaPass = () => {
    setIsEditaPassOpen(false);
  };

  if (!isUser) {
    return <div style={{ textAlign: 'center' }}>Cargando...</div>;
  }

  let size = 0;
  let opinionHtml = `<div>`;
  for (const op in opiniones) {
    opinionHtml += `<div class=${style.containerOp}>
                      <div id="artist" class=${style.divOp}><Image class=${style.imgArtistOp} src=${opiniones[op].imgArtist} width="30px"/><b class=${style.ArtistOp}/>${opiniones[op].artist}</b></div>
                      <div id="titulo"class=${style.divOp}><p class=${style.tituloOp}><b>${opiniones[op].titulo}</b></p></div>
                      <div id="opinion"class=${style.divOp}><p class=${style.opinionOp}>${opiniones[op].opinion}</p></div>
                    </div>`;
    size++;
  }
  if (size === 0) {
    opinionHtml += `<h3>El usuario no ha hecho ninguna opinión</h3>`;
  }
  opinionHtml += `</div>`;

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className={style.datosUser}>
        <div className={style.user}>
          <div className={style.img}>
            <img src={user.imagen} width="150px" />
          </div>
          <div className={style.datos}>
            <p>User: <b>{user.username}</b></p>
            <p>Email: <b>{user.email}</b></p>
            <p>Teléfono: <b>{user.telefono}</b></p>
          </div>
        </div>
        <div>
          <Popup trigger={<button className={style.popupButton} onClick={openEditaDatos}>Editar información</button>} modal>{isEditaDatosOpen && <EditaDatos user={user} onClose={closeEditaDatos} />}</Popup>
          <Popup trigger={<button className={style.popupButton} onClick={openEditaPass}>Editar contraseña</button>} modal>{isEditaPassOpen && <EditaPass user={user} onClose={closeEditaPass} />}</Popup>

          
          
        </div>
      </div>
      <div className={style.containerOp}>
        <h2>Opiniones realizadas a nuestros artistas</h2>
        <div className={style.opiniones}>
          {opiniones.map(opinion => {console.log(opinion)})}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
