import useDashborad from "../../hooks/useDashborad";

export const TableHead = () => {

  const {tableHeaders} = useDashborad();
  
  return (
    <thead>
        <tr>
          {tableHeaders.length == 0 ? 
            <>
              <th scope="col" width="50"><center>Documento</center></th>
              <th scope="col"><center>Nombres</center></th>
              <th scope="col"><center>Apellidos</center></th>
              <th scope="col"><center>Correo</center></th>
              <th scope="col"><center>Celular</center></th>
              <th scope="col"><center>Direccion</center></th>
              <th scope="col"><center>Estado</center></th>
              <th scope="col"><center>Fecha Registro</center></th>
              <th>Actions</th>
            </>
            :
            <>
              {tableHeaders.map((header) => <th key={header} scope="col"><center>{header}</center></th>)}
            </>
          }
        </tr>
    </thead>
  )
}
