import React, { useState, useEffect } from 'react';
import style from '/styles/Local.module.css';

const HorarioLocal = () => {
    const [horario, setHorario] = useState([]);

    useEffect(() => {
        fetch('https://tattoomaxbackend.onrender.com/horarioLocal')
            .then(res => res.json())
            .then(data => {
                setHorario(data);
            });
    });

    return (
        <div>
            <table className={style.table}>
                <thead>
                    <tr>
                        {horario.map(hor => (
                            <>
                                {hor.dias.map(dia => (
                                    <th key={dia} className={style.th}><b>{dia}</b></th>
                                ))}
                                <th className={style.th}>Domingo</th>
                            </>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {horario.map(hor => (
                        <>
                            {hor.horas.map(hora => (
                                <tr key={hora}>
                                    {hor.dias.map(() => (
                                        <td key={hora} className={style.td}>{hora}</td>
                                    ))}
                                    <td className={style.td}>CERRADO</td>
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
