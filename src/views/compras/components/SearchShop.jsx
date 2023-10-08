import { TableList } from "../../../components/TableList/TableList"

export const SearchShop = () => {
  return (
    <>
        <div className="bg-white rounded shadow-sm">
            <div>
                <form className="mt-3">

                    <div className="row p-3 mb-3 d-flex justify-content-center">
                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Fecha Inicial *</label>
                            <input type="date" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Fecha Final *</label>
                            <input type="date" className="form-control" required />
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn btn-primary" type="submit">Consultar</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>

        <TableList />

    </>
  )
}
