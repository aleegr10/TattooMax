import React, { useState, useEffect } from 'react';
import style from '../styles/Local.module.css';

const HorarioLocal = () => {
    const [horario, setHorario] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/horarioLocal')
            .then(res => res.json())
            .then(data => {
                setHorario(data);
            });
    }, []);

    return (
        <div>
            <table className={style.table}>
                <thead>
                    <tr>
                        {horario.map(hor => (
                            <>
                                {hor.dias.map(dia => (
                                    <th style={{ border: '1px solid black' }}><b>{dia}</b></th>
                                ))}
                                <th style={{ border: '1px solid black' }}>Domingo</th>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {horario.map(hor => (
                        <>
                            {hor.horas.map(hora => (
                                <tr>
                                    {hor.dias.map(() => (
                                        <td style={{ border: '1px solid black' }}>{hora}</td>
                                    ))}
                                    <td style={{ border: '1px solid black' }}>CERRADO</td>
                                </tr>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HorarioLocal;