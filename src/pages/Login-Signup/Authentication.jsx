import React, { useRef } from "react"
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore"

function Authentication (){

  console.log(firestore);

  const messageRef = useRef()
  const ref = collection(firestore, "messages")

  const handleSave = async(e) => {
    e.preventDefault();
    console.log(messageRef.current.value);

  let data = {
    message: messageRef.current.value,
  };

  try{
    addDoc(ref,data)
  }catch (e){
    console.error("Caught error",e)
  }

  };
  console.log(firestore); 

  return (
    <div>
      <form onSubmit={handleSave}>
        <label>Enter Message</label>
        <input type="text" ref={messageRef}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}


export default Authentication