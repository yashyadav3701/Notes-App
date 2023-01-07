import React from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
function NoteItem(props) {
    const context=useContext(NoteContext);
  const {deleteNote} = context;
    const {note,updatenote}=props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <h5 className="card-title">{note.title}</h5>
                    <div className="d-flex">
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully","success"); }}></i>
                    </div>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
