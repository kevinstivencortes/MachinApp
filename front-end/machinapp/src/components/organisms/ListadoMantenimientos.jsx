import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';
import GenerarPdf from './FichasGenerarPDF.jsx';
import MantenimientoGeneral from './MantenimientoGeneral.jsx';
import Modal from '../molecules/ModalMant.jsx';
import FormularioMantenimiento from '../molecules/FormularioMantenimiento.jsx';
import Boton from '../atoms/Boton.jsx';

const ListadoMantenimientos = () => {
    const [mantenimientos, setMantenimientos] = useState([]);

    const fetchMantenimientos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/mantenimiento/listar');
            setMantenimientos(response.data); 
        } catch (error) {
            console.error('Error obteniendo los mantenimientos:', error);
        }
    };

    useEffect(() => {
        fetchMantenimientos();
        const intervalId = setInterval(() => {
            fetchMantenimientos();
        }, 60000); 
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <div className="bg-green-500 h-32"></div>
                    <div className="p-4">
                        <div className="flex">
                            <Boton 
                                texto="Crear ficha de mantenimiento"
                                className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 inline-block ml-2"
                                onClick={() => document.getElementById('my_modal_1').showModal()}
                            />
                            <span style={{ margin: '0 10px' }}></span>
                            <Modal id="my_modal_1" titulo="Crear Ficha de Mantenimiento">
                                <FormularioMantenimiento />
                            </Modal>
                        </div>
                        <div className="flex">
                            <Boton 
                                texto="Mantenimiento general"
                                onClick={() => document.getElementById('my_modal_2').showModal()}
                                className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 inline-block ml-2"
                            />
                            <span style={{ margin: '0 10px' }}></span>
                            <Modal id="my_modal_2" titulo="Mantenimiento General" className="modal-box" >
                                <MantenimientoGeneral />
                            </Modal>
                        </div>

                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-300" />
            <h1 className="text-xl font-bold mb-4 text-black text-center justify-center">Listado de Mantenimientos</h1>
            <div className="flex flex-wrap justify-center">
                {mantenimientos.map(mantenimiento => (
                    <div key={mantenimiento.idMantenimiento} className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <div className="p-4">
                            <div className="mb-4">
                                <span className="font-bold text-black">Código:</span> {mantenimiento.mant_codigo_mantenimiento}
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-black">Fecha Realiz.:</span> {new Date(mantenimiento.mant_fecha_realizacion).toLocaleDateString()}
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-black">Fecha Próx.:</span> {new Date(mantenimiento.mant_fecha_proxima).toLocaleDateString()}
                            </div>
                            <div>
                                <PDFDownloadLink
                                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-3 inline-block ml-2"
                                    document={<GenerarPdf data={mantenimiento} />}
                                    fileName={`mantenimiento_${mantenimiento.mant_codigo_mantenimiento}.pdf`}
                                >
                                    {({ loading }) => (loading ? 'Generando PDF...' : 'Ir a ficha')}
                                </PDFDownloadLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListadoMantenimientos;