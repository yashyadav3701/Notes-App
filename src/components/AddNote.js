import React,{useState} from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function AddNote(props) {
    const context=useContext(NoteContext);
  const {addNote} = context;

    const [note, setnote] = useState({title:"",description:"",tag:""});
    const handleChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully","success");
    }
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" required onChange={handleChange} value={note.title} name="title" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control"  required onChange={handleChange} value={note.description} id="description" name="description"/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" onChange={handleChange} value={note.tag} id="tag" name="tag"/>
        </div>
        
        <button disabled={note.title<5 || note.description<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>

  )
}

export default AddNote
