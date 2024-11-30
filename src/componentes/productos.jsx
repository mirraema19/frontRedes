import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productos.css'; // Importamos el CSS externo

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', precio: '', descripcion: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://codepro.servebeer.com/productos', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await axios.delete(`https://codepro.servebeer.com/productos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (editingId) {
            await axios.put(
                `https://codepro.servebeer.com/productos/${editingId}`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } else {
            await axios.post('https://codepro.servebeer.com/productos', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }

        setFormData({ nombre: '', precio: '', descripcion: '' });
        setEditingId(null);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setFormData({ nombre: product.nombre, precio: product.precio, descripcion: product.descripcion });
        setEditingId(product.id_producto);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <h2 className='titulo'>Gestión de Productos</h2>
            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                ></textarea>
                <button type="submit">{editingId ? 'Actualizar' : 'Agregar'}</button>
            </form>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id_producto}>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.descripcion}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(product)}>
                                    Editar
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(product.id_producto)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsPage;
