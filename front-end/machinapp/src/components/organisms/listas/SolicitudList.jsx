import { PaginateTable } from "../table/PaginateTable";

import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchComponent,Icons, V,PDFvistaSolicitud } from "../../../index.js";
import { useTranslation } from "react-i18next";

/* eslint-disable-next-line react/prop-types */
export const SolicitudList = ({ DataSolicitud }) => {
  const [filteredData, setFilteredData] = useState([]);
  const { t } = useTranslation();

  const COLUMNAS = [
    "ID",
    t("Prioridad"),
    t("Costo"),
    t("Estado"),
    t("Fecha de la solicitud"),
    t("Acciones"),
  ];


  /* eslint-disable-next-line react/prop-types */
  const newArrayDataSolicitud = DataSolicitud.map((item) => {
    const formattedDate = new Date(item.fecha_solicitud).toLocaleDateString(
      "es-ES",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

    return {
      idSolicitud:item.idSolicitud,
      prioridad: item.soli_prioridad,
      costo: item.soli_costo_estimado,
      estado: item.soli_estado,
      fecha: formattedDate,
    };
  });

  const handleSearSolicitud = (search) => {
    const filtered = newArrayDataSolicitud.filter((item) =>
      item.costo.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <div className="min-h-screen p-6 flex flex-col gap-8 ">
        <SearchComponent onSearch={handleSearSolicitud} />
        <div className="w-full overflow-x-auto">
          <PaginateTable
            columns={COLUMNAS}
            data={filteredData.map((fila) => ({
              ...fila,
              acciones: (
                <>
                <Link
                  to={`/editar/solicitud/${fila.idSolicitud}`}
                  className="flex justify-center items-center h-full w-full"
                >
                  <Icons icon={V.PencilIcon} />
                </Link>
                            <div
                              className="flex space-x-2"
                            >
                              <PDFvistaSolicitud item={fila}/>
                            </div>

                </>
              ),
            }))}
          />
        </div>
      </div>
    </>
  );
};
