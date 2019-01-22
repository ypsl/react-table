export default class FakeService {
  _url = 'http://localhost:3000/tableData';

  getData = async () => {
    const response = await fetch(this._url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${this._url}, received ${response.status}`);
    }
    const json = await response.json();
    return json;
  }

  createRow = async (row) => {
    const response = await fetch(`${this._url}/`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body:  JSON.stringify(row)
    });
    if (!response.ok) {
      throw new Error(`Could not create row ${this._url}/, received ${response.status}`);
    }
    const json = await response.json();
    return json;
  }

  deleteRow = async (id) => {
    const response = await fetch(`${this._url}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Could not delete ${this._url}/${id}, received ${response.status}`);
    }
    const json = await response.json();
    return json;
  }

  updateRow = async (row) => {
    const { id } = row;
    const response = await fetch(`${this._url}/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
      body:  JSON.stringify(row)
    });
    if (!response.ok) {
      throw new Error(`Could not update row ${this._url}/${id}, received ${response.status}`);
    }
    const json = await response.json();
    return json;
  }
}