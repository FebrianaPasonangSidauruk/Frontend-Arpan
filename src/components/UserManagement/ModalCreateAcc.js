import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ModalCreateAcc = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("regular");
    const [initPass, setInitPass] = useState('password123');
    const [password, setPassword] = useState('password123');
    const roles = ['regular', 'admin', 'quantity'];
    const [msg, setMsg] = useState('');

    const refreshPage = ()=>{
        window.location.reload();
    }

    const Register = async (event) => {
        event.preventDefault();
        // setPassword(initPass)
        console.log(name);
        console.log(username);
        console.log(role);
        console.log(password);
        try {
            await axios.post(`userAccount`, {
                name: name,
                username: username,
                role: role,
                password: password
            });
            console.log('bisa')
            refreshPage();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
        // refreshPage();

        // try {
        //     await axios.post('http://localhost:5001/users', {
        //         name: name,
        //         username: username,
        //         email: email,
        //         password: password,
        //         confirmPassword: confirmPassword
        //     });
        //     navigate("/");
        // } catch (error) {
        //     if (error.response) {
        //         setMsg(error.response.data.msg);
        //     }
        // }
    }

  return (
    <div className='modalOptionsContainer'>
        {/* <div className="card-header">
              <h3 className="card-title">User Account</h3>
            </div> */}
            <form onSubmit={Register} className="box">
            <table class="table ">
              <tr>
              <th>Name</th>
              {/* <td>{name}</td> */}
              <td>
              <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Username</th>
              {/* <td>{username}</td> */}
              <td>
              <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Role</th>
              {/* <td>{role}</td> */}
              {/* <td>
              <input type="text" className="form-control" value={role} onChange={(event) => setRole(event.target.value)} placeholder="...." />
                </td> */}
                <td>
                <select
                    className="custom-select"
                                            name="example"
                                                placeholder='pilih'
                                                onChange={(event) => setRole(event.target.value)}
                                                style={{  }}
                                            >
                                                {roles.map((roleVal) => (
                                                    <option value={roleVal}
                                                    >
                                                        {roleVal}
                                                    </option>
                                                ))}
                                                
                                            </select>
                                            </td>
              </tr>
              <tr>
              <th>Password</th>
              {/* <td>{password}</td> */}
              <td>
              <input type="text" className="form-control" value={password}  placeholder="...." />
                </td>
              </tr>
            </table>
            <p className="has-text-centered">{msg}</p>

        <div class="modal-footer justify-content-between">
                            {/* <button type="button" class="btn btn-default" onClick={dataProjectHandler}>Save</button> */}
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" >Create Account</button>
        </div>
        </form>
    </div>
  )
}

export default ModalCreateAcc