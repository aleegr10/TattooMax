import HorarioLocal from "../components/horarioLocal";
import Nav from "../components/nav";
import Login from "../components/login";
import Footer from '../components/footer';
import style from '../styles/Local.module.css';
import Link from 'next/link';
import Popup from "reactjs-popup";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import flecha from '../public/iconos/flecha.png';



export default function Local(){
    const [userLog, setUserLog] = useState();
    let userId = ''

    useEffect(() => {
        recibeUserLog()
    }, [])
    
    async function recibeUserLog(){
        userId = localStorage.getItem('token')
        const data = await fetch('http://localhost:5000/users').then(res => res.json()).then(data => {setUserLog(data.find(user => user._id === userId))})
        return data;
    }

    const pedirCita = () => {
        var datos = {name: document.getElementById('nombre').value, user: userLog._id, telefono: document.getElementById('tel').value, email: document.getElementById('email').value, consulta: document.getElementById('consulta').value}

        fetch('http://localhost:5000/consultas/add', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datos)})

        document.getElementById('nombre').value = '';
        document.getElementById('tel').value = '';
        document.getElementById('email').value = '';
        document.getElementById('consulta').value = '';

        var modalCita = document.getElementById("modalCita");

        modalCita.style.display = "block";

        setTimeout(function(){
            var modalCita = document.getElementById("modalCita");

            modalCita.style.display = "none";
        },2000);
    }

    const comprobarLog = () => {
        setUserLog(localStorage.getItem('token'))
        if(userLog == undefined){
            var modal = document.getElementById("myModal");

            modal.style.display = "block";

            setTimeout(function(){
                var modal = document.getElementById("myModal");
    
                modal.style.display = "none";
            },2000);
        }else if(userLog != undefined){
            pedirCita()
        }
        
    }

    // const pedirCita = () => {
    //     var datos = {user: }
    // }

    return (
        <div>
            <div>
                <Login/>
                <Nav />
            </div>
            <div>
                <div>
                    <p className={style.p}>TattooMax es un estudio fundado en 1994 en Jerez (Cádiz).

                    TattooMax es un espacio abierto al arte, al buen gusto y a la interpertación de ideas. Además de nuestro equipo fijo, disfrutamos de una variedad de tatuadores de estilos bien diferenciados que periodicamente vienen a deleitarnos con su trabajo.
                    Situado en una de las avenidas principales de Jerez, disponemos de un local de más de cien metros cuadrados donde prima la comodidad de nuestros clientes y tatuadores, y dondes nuestro lema es:<br/> <b>&lt;&lt;La calidad antes que la cantidad&gt;&gt;</b><br/> Seáis todos bienvenidos.</p>
                </div><br/>
                <HorarioLocal /><br/><br/><br/>
                <div className={style.contenedor}>
                    
                    <div className={style.containerMapa}>
                        <h1 className={style.h1}>Localización</h1>
                        <div>
                            <div>
                                <iframe className={style.mapa} id="gmap_canvas" src="https://maps.google.com/maps?q=Avenida%20Amsterdam,%20C.%20Estocolmo,%2011405%20Jerez%20de%20la%20Frontera,%20C%C3%A1diz&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                                <a href="https://www.whatismyip-address.com"></a><br/>
                            </div>
                        </div>
                    </div>
                    
                    <div className={style.containerPedirCita}>
                        <h3 className={style.h3}>Para pedir cita o hacer cualquier consulta</h3><Image className={style.img} src={flecha} width="20px" height="20px"/>
                        <div className={style.pedirCita}>
                            <div> 
                                    <div className={style.form}>
                                        <label>Nombre y apellidos: *</label>
                                        <input type="text" id="nombre" name="nombre" className={style.input}/><br/><br/>
                                        <label>Teléfono</label>
                                        <input type="tel" id="tel" name="tel" className={style.input}/><br/><br/>
                                        <label>Email: *</label>
                                        <input type="email" id="email" name="email" className={style.input}/><br/><br/>
                                        <label>Consulta</label>
                                        <textarea id="consulta" name="consulta" rows="3" className={style.textarea}/><br/><br/>
                                        <button type="button" className={style.button} onClick={comprobarLog}>Enviar</button>
                                    </div>
                            </div>

                            <div id="modalCita" className={style.modalContainer}>
                                <div id="modalContentCita" className={style.modalContent}>
                                    <p>SE HA REALIZADO TU CONSULTA CORRECTAMENTE, ESPERE A SER LOCALIZADO POR EMAIL O TELEFONO POR ALGUNO DE NUESTROS RECEPCIONISTAS. GRACIAS.</p>
                                </div>
                            </div>

                            <div id="myModal" className={style.modalContainer}>
                                <div id="modalContent" className={style.modalContent}>
                                    <p>PARA PODER PEDIR CITA O HACER UNA CONSULTA DEBES ESTAR LOGUEADO</p>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}