import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Categories, UpdateProduct, CreateProduct, CreateCategory, Header, Products} from './components/components';
import './App.css';

function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
        <Route exact path='/' element={<><Header tab={"Products"}/> <Products /></>} /> 
        <Route exact path='/categories' element={<><Header tab={"Categories"}/> <Categories /></>} /> 
        <Route exact path='/add/product' element={<><Header tab={"Add Product"} /><CreateProduct /></>} />
        <Route exact path='/update/product/:_productId' element={<><Header tab={"Update Product"}/><UpdateProduct  /></>} />
        <Route exact path='/add/category' element={<><Header tab={"Add Category"} /><CreateCategory /></>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;