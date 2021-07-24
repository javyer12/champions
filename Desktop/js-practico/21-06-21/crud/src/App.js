import React, { useState } from 'react';
import Search from './components/Search';
import Audio from './components/Audio'
import Footer from './components/Footer';
import './assets/App.css';
// import 'bootstrap/dist/css/boostrap.min.css'
import {DATABASE} from './data';
import 'bootstrap/dist/css/bootstrap.css'
import {
  Button,
  Modal, 
  ModalBody, 
  ModalHeader, 
   ModalFooter} from 'reactstrap';



function App() {
  
  

  const [data, setData] = useState(DATABASE)
  const [ modalEditar, setModalEditar ] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalInsert, setModalInsert] = useState(false)
  const [modalOpenDesc, setModalOpenDesc] = useState(false)
  const [ countryChecked, setCountryChecked ] = useState({
    id: '',
    winnerName: '',
    winnerCountry: '',
    runnerUp: '',
    runnerUpCountry: '',
    score: '',
    season: '',
    description: ''
  })
 
  const checkCountry = (el, cases) => {
    setCountryChecked(el);
    (cases === 'Edit')?setModalEditar(true):setModalDelete(true)
  }
  const handleInfo = e => {
    const {name, value}= e.target
    setCountryChecked((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(value)
  }

  const edit = () => {
    const dataChanged = data;
    dataChanged.map(team => {
      if (team.id === countryChecked.id) {
        team.winnerName = countryChecked.winnerName
        team.winnerCountry = countryChecked.winnerCountry
        team.runnerUp = countryChecked.runnerUp
        team.runnerUpCountry = countryChecked.runnerUpCountry
        team.score = countryChecked.score
        team.season = countryChecked.season
        team.description = countryChecked.description
      }
    })
    setData(dataChanged)
    setModalEditar(false)
  }
  const handleOpenDesc = () => {
    setData(data.filter(team => team.id !== countryChecked.winnerName))
    setModalOpenDesc(true)
  }
  const deleted = () => {
    setData(data.filter(team => team.id !== countryChecked.id))
    setModalDelete(false)
  }
  const openModalInsert = () => {
    setCountryChecked(null)
    setModalInsert(true)
  }
  const insert = () => {
    const newValue = countryChecked
    newValue.id = data[ data.length-1 ].id + 1
    const newData = data
    newData.push(newValue)
    setData(newData)
    setModalInsert(false)
  }
  return (
    <>
      <div className='App'>
        <Audio/>
        <h2>The Champion League Winners</h2>
        <div className='up-bar'>
          <div>
         <Search/>
          </div>
          <div className='div-btn'>
        <button
            className='btn btn-warning'
            onClick={openModalInsert}
        >Add a new team</button><br />
          </div>
        </div>

        <table className='table table-bordered mt-3'>
          <thead>
            <tr className='theader'>
              <th>ID</th>
              <th>WinnerName</th>
              <th>WinnerCountry</th>
              <th>RunnerUp</th>
              <th>RunnerUpCountry</th>
              <th>Score</th>
              <th>Season</th>
              <th>Description</th>
              <th>Edit the table</th>
            </tr>
          </thead>
          <tbody>
            {data.map(el => (
              <tr className= 'tbody'>
                <td>
                  <button
                   onClick={handleOpenDesc}>
                  {el.id}
                  </button>
                </td>
                <td>{el.winnerName}</td>
                <td>{el.winnerCountry}</td>
                <td>{el.runnerUp}</td>
                <td>{el.runnerUpCountry}</td>
                <td>{el.score}</td>
                <td>{el.season}</td>
                <td>
                  <button
                       class="descri-button"
                        type="button" 
                        >
                       {el.description}
                    </button>
                </td>
                <td>
                  <button className='btn btn-primary' onClick={() => checkCountry(el,'Edit' )}>Edit</button> {" "}
                  <button  className='btn btn-danger' onClick={() => checkCountry(el,'Delete' )}>Delete</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>

        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Add a new Champion </h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='id'
                value={countryChecked && countryChecked.id}
                onChange={ handleInfo}
              />
              <br />
              <label>Winner Name</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='winnerName'
                value={countryChecked && countryChecked.winnerName}
                onChange={ handleInfo}

              />
              <br />
              <label>Winner Country</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='winnerCountry'
                value={countryChecked && countryChecked.winnerCountry}
                onChange={ handleInfo}

              />
              <br />
              <label>Runner-Up</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='runnerUp'
                value={countryChecked && countryChecked.runnerUp}
                onChange={ handleInfo}
                />
              <br />
              <label>Runner-Up Country</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='runnerUpCountry'
                value={ countryChecked && countryChecked.runnerUpCountry}
                onChange={ handleInfo}
              />
              <br />
              <label>Score</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='score'
                value={countryChecked && countryChecked.score}
                onChange={ handleInfo}
              />
              <br />
              <label>Season</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='season'
                value={countryChecked && countryChecked.season}
                onChange={ handleInfo}
              />
              <br />
              <label>Description</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='description'
                value={ countryChecked && countryChecked.description}
                onChange={ handleInfo}
              />
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick= {edit}>
              Update
            </button>
            <button className='btn btn-danger' onClick= {()=>setModalEditar(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalDelete}>
          <ModalBody>
            Make you sure you want to delete the right item
            ({countryChecked && countryChecked.winnerName}-
            {countryChecked && countryChecked.runnerUp})
          </ModalBody>
          <ModalFooter>
            <button
              className='btn btn-danger'
              onClick={deleted}>
              Yes
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => setModalDelete(false)}
            >
              Back
              </button>
          </ModalFooter>



          
        </Modal>

        <Modal isOpen={modalInsert}>
          <ModalHeader>
            <div>
             <h3>Add the Champion Winners</h3> 
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label>ID</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='id'
                value={data[data.length-1].id+1}
                onChange={ handleInfo}
              />
              <br />
              <label>Winner Name</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='winnerName'
                value={countryChecked ? countryChecked.winnerName:''}
                onChange={ handleInfo}

              />
              <br />
              <label>Winner Country</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='winnerCountry'
                value={countryChecked ? countryChecked.winnerCountry: ''}
                onChange={ handleInfo}

              />
              <br />
              <label>Runner-Up</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='runnerUp'
                value={countryChecked ? countryChecked.runnerUp: ''}
                onChange={ handleInfo}
                />
              <br />
              <label>Runner-Up Country</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='runnerUpCountry'
                value={ countryChecked ? countryChecked.runnerUpCountry: ''}
                onChange={ handleInfo}
              />
              <br />
              <label>Score</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='score'
                value={countryChecked ? countryChecked.score:''}
                onChange={ handleInfo}
              />
              <br />
              <label>Season</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='season'
                value={countryChecked ? countryChecked.season:''}
                onChange={ handleInfo}
              />
              <br />
              <label>Description</label>
              <input
                className="form-control"
                readoOnly
                type='text'
                name='description'
                value={ countryChecked ? countryChecked.description: ''}
                onChange={ handleInfo}
              />
              <br/>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className='btn btn-primary'
              onClick={insert}>
              Update
            </button>
            <button
              className='btn btn-danger' 
              onClick={() => setModalInsert(false)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={modalOpenDesc} className=' modal-fullscreen'>
        {/* <div className='modal_desc' > */}
          <ModalHeader>
          <h1 >You selected ({countryChecked && countryChecked.winnerName}-
            {countryChecked && countryChecked.runnerUp})</h1>
          </ModalHeader>
          <ModalBody>
            <div>
              <h3>{countryChecked && countryChecked.winnerName}</h3>
              <theader>
                <tr className='theader'>
                  <th>casa</th>
                  <th>casa</th>
                  <th>casa</th>
               </tr>
              </theader>
              <tbody>
                <td>dedo</td>
                <td>dedo</td>
                <td>dedo</td>
              </tbody>
            </div>
            <div>
             <h3>{countryChecked && countryChecked.runnerUp}</h3> 
            </div>
          </ModalBody>
          <ModalFooter>
            
            <button
              className='btn btn-primary' 
              onClick={() => setModalOpenDesc(false)}>
              ok
            </button>
          </ModalFooter>
        </Modal>
    </div>
        
    <Footer/>
    </>
  );
}

export default App;


