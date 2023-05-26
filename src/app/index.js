import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './product';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);




  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path='product/:id' element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </BrowserRouter>
  );
}

export default App;
