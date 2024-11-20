import axios from '../lib/axios';

class InventoryService {
  getAll = () => {
    return axios.get(`/inventories`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  getById = (id) => {
    return axios.get(`/inventories/${id}`)
    .then((response) => {
      return response.data || null;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
  };

  insert = (request) => {
    return axios.post('/inventories', request);
  };

  edit = (request) => {
    return axios.put('/inventories', request);
  };

  deleteById = (id) => {
    return axios.delete(`/inventories/${id}`);
  };
}

const inventoryService = new InventoryService();

export default inventoryService;