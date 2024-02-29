import React, { useState } from 'react';

const Modal = ({ createProduct, closeModal }) => {

  const [newProduct, setNewProduct] = useState({
     title: "", 
     price: 0 ,
     description: "",
     category: "",
     image: "",
     ratig: {
      rate: 0,
      count: 0,
},
});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ 
      ...prevProduct, [name]: value
     }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(newProduct);
   closeModal();
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-over-lay")){
      closeModal();
    }
  }

  return (

  <div className="modal-overlay" onClick={handleModalClick}>
  <div className="modal-content">
    <h2>Añadir Nuevo Producto!!</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
      </label>
      <label>
        Precio:
        <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} />
      </label>
      <label>
        Descripcion:
        <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
      </label>
      <button type="submit">Añadir Producto</button>
    </form>
    <button onClick={closeModal}>Cancelar</button>
  </div>
</div>
);
};


export default Modal;
