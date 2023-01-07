import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host="http://localhost:5000"
  const initialnotes = [];

  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      }, 
    });
    const json=await response.json();
    // console.log(json);
    setnotes(json);
  }
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}) 
    });
    const note=await response.json();
    setnotes(notes.concat(note));
  }
  const deleteNote = async(id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token'),
      },
    });
    const json= response.json(); 
    // console.log("deleteing with id :"+id);
    const newnode = notes.filter((note) => { return note._id !== id })
    setnotes(newnode);
  }
  const editNote = async (id, title, description, tag) => {
    // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const json= response.json(); 

    // logic to edut in client 
    const newNote=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      let element = newNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setnotes(newNote);
  }
  const [notes, setnotes] = useState(initialnotes);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote}}>
      {props.children};
    </NoteContext.Provider>
  )
}

export default NoteState;