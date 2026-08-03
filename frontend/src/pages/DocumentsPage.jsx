import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import TextInput from "../components/ui/TextInput";

import documentGuides from "../data/documentGuides";

import {
  getDocuments,
  initializeDocuments,
  updateDocument,
  addDocument,
  deleteDocument,
} from "../services/documentService";

import { useAuth } from "../context/AuthContext";


export default function DocumentsPage() {

  const { user } = useAuth();

  const [documents, setDocuments] = useState([]);

  const [newName, setNewName] = useState("");

  const [newExpiry, setNewExpiry] = useState("");

  const [selectedDocument, setSelectedDocument] = useState(null);



  useEffect(() => {

    if(user){
      loadDocuments();
    }

  },[user]);





  async function loadDocuments(){

    try{

      const userId = user._id;

      console.log("User ID:", userId);


      await initializeDocuments(userId);


      const data = await getDocuments(userId);


      console.log(
        "Documents:",
        data
      );


      setDocuments(
        data.documents || []
      );


    }catch(error){

      console.error(
        "Loading documents failed:",
        error
      );

    }

  }





  function getGuide(documentName){

    return documentGuides[documentName];

  }





  async function handleDateChange(
    documentId,
    date
  ){

    try{


      const userId = user._id;


      await updateDocument(
        userId,
        documentId,
        date
      );


      await loadDocuments();


    }catch(error){

      console.error(error);

    }

  }







  async function handleAdd(){


    if(!newName || !newExpiry){
      return;
    }



    try{


      await addDocument(

        user._id,

        {
          name:newName,
          expiryDate:newExpiry,
        }

      );



      setNewName("");

      setNewExpiry("");



      await loadDocuments();



    }catch(error){

      console.error(error);

    }


  }







  async function handleDelete(
    documentId
  ){


    try{


      await deleteDocument(

        user._id,

        documentId

      );


      await loadDocuments();



    }catch(error){

      console.error(error);

    }


  }







  if(!user){

    return(

      <h3>
        Loading documents...
      </h3>

    );

  }






  return(

    <div
      style={{
        maxWidth:900,
        margin:"20px auto",
      }}
    >


      <h2>
        Document Reminders
      </h2>





      {
        documents.length === 0 && (

          <p>
            No documents found.
          </p>

        )
      }








      {
        documents.map((doc)=>(


          <Card

            key={doc._id}

            sx={{
              marginBottom:2,
              padding:2,
              cursor:"pointer",
            }}

            onClick={()=>
              setSelectedDocument(doc)
            }

          >


            <h3>
              {doc.name}
            </h3>



            <p>

              Expiry:

              {" "}

              {
                doc.expiryDate

                ?

                new Date(
                  doc.expiryDate
                )
                .toLocaleDateString()

                :

                "Not set"

              }

            </p>



          </Card>


        ))

      }









      <Card

        sx={{
          marginTop:3,
          padding:2,
        }}

      >


        <h3>
          Add Custom Document
        </h3>





        <TextInput

          label="Document Name"

          value={newName}

          onChange={(e)=>
            setNewName(
              e.target.value
            )
          }

        />





        <TextInput

          label="Expiry Date"

          type="date"

          shrinkLabel

          value={newExpiry}

          onChange={(e)=>
            setNewExpiry(
              e.target.value
            )
          }

        />





        <PrimaryButton
          onClick={handleAdd}
        >

          Add Document

        </PrimaryButton>



      </Card>









      {
        selectedDocument && (


          <div

            style={{

              position:"fixed",

              top:0,

              left:0,

              width:"100%",

              height:"100%",

              background:
                "rgba(0,0,0,0.5)",

              display:"flex",

              justifyContent:"center",

              alignItems:"center",

              zIndex:1000,

            }}


            onClick={()=>
              setSelectedDocument(null)
            }

          >





            <Card

              sx={{
                width:500,
                padding:3,
              }}


              onClick={(e)=>
                e.stopPropagation()
              }

            >



              <h2>
                {
                  selectedDocument.name
                }
              </h2>







              {
                getGuide(
                  selectedDocument.name
                )

                &&

                (

                  <>

                    <img

                      src={
                        getGuide(
                          selectedDocument.name
                        )
                        .image
                      }


                      alt={
                        selectedDocument.name
                      }


                      style={{

                        width:"100%",

                        maxHeight:"300px",

                        objectFit:"contain",

                        borderRadius:"12px",

                        marginBottom:"15px",

                      }}

                    />




                    <p>

                      {
                        getGuide(
                          selectedDocument.name
                        )
                        .instructions
                      }

                    </p>


                  </>

                )

              }








              <TextInput

                type="date"

                label="Expiry Date"

                shrinkLabel


                value={

                  selectedDocument.expiryDate

                  ?

                  new Date(
                    selectedDocument.expiryDate
                  )
                  .toISOString()
                  .split("T")[0]

                  :

                  ""

                }



                onChange={(e)=>{


                  handleDateChange(

                    selectedDocument._id,

                    e.target.value

                  );



                  setSelectedDocument({

                    ...selectedDocument,

                    expiryDate:
                      e.target.value

                  });


                }}


              />








              {
                !selectedDocument.isRequired && (


                  <PrimaryButton


                    onClick={()=>{


                      handleDelete(
                        selectedDocument._id
                      );


                      setSelectedDocument(null);


                    }}

                  >

                    Delete Document

                  </PrimaryButton>


                )
              }








              <PrimaryButton


                onClick={()=>
                  setSelectedDocument(null)
                }


              >

                Close

              </PrimaryButton>






            </Card>




          </div>


        )
      }





    </div>

  );

}