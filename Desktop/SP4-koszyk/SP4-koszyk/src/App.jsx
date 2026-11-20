import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const products = [
    { id: 1, nazwa: 'Notes', cena: 12.50 },
    { id: 2, nazwa: 'Długopis', cena: 3.20 },
    { id: 3, nazwa: 'Plecak', cena: 89.00 },
    { id: 4, nazwa: 'Kalkulator', cena: 45.90 },
    { id: 5, nazwa: 'Zakreślacz', cena: 4.75 },
  ];

  const [Koszyk, setKoszyk] = useState([]);

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.cena * item.ilosc, 0);

  const logKoszykState = (updatedKoszyk) => {
    const sum = calculateTotal(updatedKoszyk);
    console.log(`Koszyk: ${updatedKoszyk.length} pozycji; suma: ${sum.toFixed(2)}`);
  };

  const addToKoszyk = (product) => {
    const exists = Koszyk.some((item) => item.id === product.id);
    const updatedKoszyk = exists
      ? Koszyk.map((item) =>
          item.id === product.id ? { ...item, ilosc: item.ilosc + 1 } : item
        )
      : [...Koszyk, { ...product, ilosc: 1 }];

    setKoszyk(updatedKoszyk);
    logKoszykState(updatedKoszyk);
  };

  const removeFromKoszyk = (productId) => {
    const updatedKoszyk = Koszyk.filter((item) => item.id !== productId);
    setKoszyk(updatedKoszyk);
    logKoszykState(updatedKoszyk);
  };

  const totalSum = calculateTotal(Koszyk);

  return (
    <div className="container mt-4">
      <h2>Sklepik szkolny</h2>
      <ul className="list-group mb-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="list-group-item d-flex justify-content-between align-items-center">
            {product.nazwa} – {product.cena.toFixed(2)} zł
            <button type="button" className="btn btn-sm btn-primary" onClick={() => addToKoszyk(product)}>Do koszyka</button>
          </li>
        ))}
      </ul>
    <h3>Koszyk ({Koszyk.length} pozycji)</h3>
      {Koszyk.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
              <th scope="col">Produkt</th>
              <th scope="col">Ilość</th>
              <th scope="col">Cena</th>
              <th scope="col">Suma</th>
              <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {Koszyk.map((item) => (
                <tr key={item.id}>
                  <td>{item.nazwa}</td>
                  <td>{item.ilosc}</td>
                  <td>{item.cena.toFixed(2)} zł</td>
                  <td>{(item.cena * item.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeFromKoszyk(item.id)}>Usuń</button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fw-bold">Suma: {totalSum.toFixed(2)} zł</p>
        </>
      )}
    </div>
  )
}

export default App
