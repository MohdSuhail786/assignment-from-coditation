import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import {Categories, CategoryForm,Header,ProductForm,Products} from './components/components';

function App() {
  return (
    <div className='app'>
    <Router>
      <Routes>
        <Route exact path='/' element={<><Header tab={"Products"}/> <Products /></>} /> 
        <Route exact path='/categories' element={<><Header tab={"Categories"}/> <Categories /></>} /> 
        <Route exact path='/add/product' element={<><Header tab={"Add Product"} /><ProductForm /></>} />
        <Route exact path='/add/category' element={<><Header tab={"Add Category"} /><CategoryForm /></>} />
        <Route exact path='/update/product/:_productId' element={<><Header tab={"Update Product"}/><ProductForm  /></>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;