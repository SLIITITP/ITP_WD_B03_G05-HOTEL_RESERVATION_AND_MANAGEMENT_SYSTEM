import React, { useState } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Regtaxi() {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vrno, setVrno] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation rules
    const nameRegex = /^[a-zA-Z]+$/;
    const nicRegex = /^\d{12}$/;
    const phoneRegex = /^0\d{2}\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const vhregex=/^[a-zA-Z0-9]+$/;

    // Name validation
    if (!nameRegex.test(name)) {
      setError('Name must contain only alphabetic characters');
      return;
    }

    // NIC validation
    if (!nicRegex.test(nic)) {
      setError('Need to have 12 digits');
      return;
    }

    // Phone validation
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be in the format 0xx-xxxxxxx');
      return;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    //vehical registration 
    if(!vhregex.test(vrno)){
      setError('Invalid vehicle number');
      return;

    }

    const regtaxi = {
      name,
      nic,
      phone,
      email,
      vrno,
    };

    try {
      setLoading(true);
      const result = (await axios.post('/api/regtaxi', regtaxi)).data;
      setLoading(false);
      setSuccess('Registration success');

      setName('');
      setNic('');
      setPhone('');
      setEmail('');
      setVrno('');

      setError('');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Registration failed');
    }
  };

  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {success && <Success message={success} />}
          {error && <Error message={error} />}
          <div className='bs'>
            <h2>Taxi Registration</h2>
            <form onSubmit={handleRegister}>
              <b>
                <i></i>
              </b>
              <input
                type='text'
                className='form-control'
                placeholder='Enter vehicle owner Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <b>
                <i></i>
              </b>
              <input
                type='text'
                className='form-control'
                placeholder='Enter NIC No or Passport Number'
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />

              <b>
                <i></i>
              </b>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Contact Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

<b>
                <i></i>
              </b>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <b>
                <i></i>
              </b>
              <input
                type='text'
                className='form-control'
                placeholder='Enter vehicle Registration Number'
                value={vrno}
                onChange={(e) => setVrno(e.target.value)}
              />

              <button className='btn btn-primary mt-3' type='submit'>
                Register
              </button>
            </form>

            <section>
              <div className='reg-container'></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regtaxi;

