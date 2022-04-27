import { useEffect, useState } from 'react';
import './App.css';
import FormUser from './components/FormUser';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const API_URL = "https://3001-ljavierrodr-fetchapimet-r3j9o4iquxr.ws-us42.gitpod.io";
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    active: false
  })

  const [action, setAction] = useState('create');

  const [search, setSearch] = useState('');

  useEffect(() => {
    listUsers(`${API_URL}/users`);
  }, [])

  const cleanForm = () => setUser({
    name: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    active: false
  })

  const listUsers = (url, options = {}) => {
    fetch(url+"?_page=2&_limit=3", options)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
  }

  const createUser = (url, options = {}) => {
    //console.log(url, options);
    fetch(url, options)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          cleanForm();
          listUsers(url);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The user has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "The user hasn't been saved",
            showConfirmButton: false,
            timer: 1500
          })
        }
        //setUsers(data);
      })
  }

  const updateUser = (url, id, options = {}) => {
    console.log(url, options);
    fetch(url + `/${id}`, options)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.id) {
          cleanForm();
          setAction('create');
          listUsers(url);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'The user has been updated',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "The user hasn't been updated",
            showConfirmButton: false,
            timer: 1500
          })
        }
        //setUsers(data);
      })
  }

  const deleteUser = (url, id, options = {}) => {
    console.log(url, options);
    fetch(url + `/${id}`, options)
      .then((response) => {
        console.log(response)
        if (!response.status) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "The user hasn't been deleted",
            showConfirmButton: false,
            timer: 1500
          })
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        listUsers(url);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'The user has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  const handleSubmit = e => {
    e.preventDefault();

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    createUser(`${API_URL}/users`, options)

  }

  const handleEdit = e => {
    e.preventDefault();
    let id = user.id;
    delete user.id;
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }

    updateUser(`${API_URL}/users`, id, options)

  }

  const handleDelete = (user) => {
    let id = user.id;
    let options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    Swal.fire({
      title: 'Do you want to delete this user?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteUser(`${API_URL}/users`, id, options)
      } else if (result.isDenied) {
        Swal.fire('Action Canceled', '', 'info')
      }
    })

  }

  let styles = {
    actions: {
      width: '70px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 py-5">
          <FormUser user={user} setUser={setUser} handleSubmit={handleSubmit} handleEdit={handleEdit} action={action} />
        </div>
        <div className="col-md-6 py-5">
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              id="search"
              placeholder="Search..."
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <ul className="list-group">
            {
              users.length > 0 &&
              users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase())).map((user, index) => {
                return (
                  <li key={index} className='list-group-item list-group-item-action d-flex justify-content-between'>
                    <span>{user.name} {user.lastname}</span>
                    <span style={styles.actions}>
                      <button className="btn btn-info btn-sm" onClick={() => { setUser(user); setAction('edit') }}><FaEdit /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => { handleDelete(user) }}><FaTrash /></button>
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
