import React, {useState} from 'react';
import axios from 'axios';

const ModalCreateAcc = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("regular");
    const [password, setPassword] = useState('password123');
    const roles = ['regular', 'admin', 'quality'];
    const [msg, setMsg] = useState('');

    const refreshPage = ()=>{
        window.location.reload();
    }

    const Register = async (event) => {
        event.preventDefault();
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
    }

  return (
    <div className='modalOptionsContainer'>
            <form onSubmit={Register} className="box">
            <table class="table ">
              <tr>
              <th>Name</th>
              <td>
              <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Username</th>
              <td>
              <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Role</th>
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
              <td>
              <input type="text" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)}   placeholder="...." />
                </td>
              </tr>
            </table>
            <p className="has-text-centered">{msg}</p>

        <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" >Create Account</button>
        </div>
        </form>
    </div>
  )
}

export default ModalCreateAcc