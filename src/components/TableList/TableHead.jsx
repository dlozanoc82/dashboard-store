import useDashborad from "../../hooks/useDashborad";

export const TableHead = () => {

  const {tableHeaders} = useDashborad();
  
  return (
    <thead>
        <tr>
          {tableHeaders.length === 0 ? 
            <>
              <th scope="col" width="50">Documento</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Correo</th>
              <th scope="col">Celular</th>
              <th scope="col">Direccion</th>
              <th scope="col">Estado</th>
              <th scope="col">Fecha Registro</th>
              <th>Actions</th>
            </>
            :
            <>
              {tableHeaders.map((header) => <th scope="col">{header}</th>)}
            </>
          }
        </tr>
    </thead>
  )
}
