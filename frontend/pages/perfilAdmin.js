import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/nav';
import Footer from '../components/footer';
import style from '../styles/PerfilAdmin.module.css';

export default function PerfilAdmin() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    } else {
      router.push('/pagError');
    }
    recibeId();
  }, []);

  const recibeId = () => {
    const userId = sessionStorage.getItem('token');
    fetchUser(userId);
  };

  const fetchUser = async (userId) => {
    const response = await fetch('http://localhost:5000/users');
    const data = await response.json();
    setUser(data.find((usuario) => usuario._id === userId));
  };

  if (!isAdmin) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className={style.user}>
        <div className={style.imgUser}>
          <img src={user.imagen} width="150px" />
        </div>
        <div className={style.datosUser}>
          <p>User: <b>{user.username}</b></p>
          <p>Email: <b>{user.email}</b></p>
          <p>Teléfono: <b>{user.telefono}</b></p>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
