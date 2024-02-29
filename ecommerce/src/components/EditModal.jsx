import React, { useState } from 'react';
import { useProducts } from '../useProducts';

const EditModal = ({ product, closeModal }) => {
  const [editedFields, setEditedFields] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
  });

const { updateProduct } = useProducts();

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "price" ? parseFloat(value) : value;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProduct = {
        ...product,
        ...editedFields,
    }
  
  await updateProduct(product.id, updatedProduct);
  closeModal();

};

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input type="text" name="title" value={editedFields.title} onChange={handleInputChange} />
          </label>
          <label>
            Precio:
            <input type="text" name="price" value={editedFields.price} onChange={handleInputChange} />
          </label>
          <label>
            Descripción:
            <input type="text" name="description" value={editedFields.description} onChange={handleInputChange} />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
        <button onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;
