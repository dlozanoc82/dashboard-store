import { ClientsPrivider } from '../../context/ClientsPrivider'
import { Customers } from './components/Customers';

const CustomerView = () => {
  return (
    <ClientsPrivider>
      <Customers />
    </ClientsPrivider>
  )
}

export default CustomerView;
