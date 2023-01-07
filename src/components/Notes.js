import { getByTitle } from '@testing-library/react';
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  let {showAlert}=props;
  const context = useContext(NoteContext);
  const { notes, getNote, editNote} = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    getNote();
    else
    navigate('/login');
  }, []);

  const ref = useRef(null);
  const refclose =useRef(null);
  const [note, setnote] = useState({ etitle: "", edescription: "", etag: "" });
  const updatenote = (note) => {
    ref.current.click();
    setnote({ id:note._id,etitle: note.title, edescription: note.description, etag: note.tag });
  }

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    setnote({etitle:"",edescription:"",etag:""})
    refclose.current.click();
    props.showAlert("Note Updated Successfully","success");
    // addNote(note.title,note.description,note.tag);
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Your Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.etitle} id="etitle" required onChange={handleChange} name="etitle" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" value={note.edescription} required onChange={handleChange} id="edescription" name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} onChange={handleChange} id="etag" name="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  disabled={note.edescription<5 || note.etitle<5} onClick={handleSubmit} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
        {notes.length===0 && "No Notes to Display!!"}
        </div>
        {
          notes.map((note) => {
            return <NoteItem key={note._id} showAlert={showAlert} updatenote={updatenote} note={note} />;
          })
        }
      </div>
    </>
  )
}

export default Notes
