import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contacts/${id}`);
      fetchContacts(); // Refresh contacts after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, newData);
      fetchContacts(); // Refresh contacts after update
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calculate the next available ID
      const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
      const newContactData = { ...formData, id: newId };
      const response = await axios.post('http://localhost:3001/contacts', newContactData);
      const newContact = response.data;
      fetchContacts();
      setFormData({ id: '', name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          </div>
          <div className="col-md-4">
            <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          </div>
          <div className="col-md-12">
            <button className="btn btn-primary" type="submit">Add Contact</button>
          </div>
        </div>
      </form>

      <h2 className="text-2xl font-semibold mt-5 mb-4 text-center">Contact List</h2>
      <ul className="list-group w-50 mx-auto">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item mb-4">
            <div className="bg-light p-4 rounded-lg d-flex justify-content-between align-items-center">
              <div>
                <p className="text-lg font-semibold">{contact.name}</p>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <div>
                <button className="btn btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
