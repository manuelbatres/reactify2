import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'
import { withRouter } from "react-router-dom";



class Register extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.regnombreRef = React.createRef()
        this.regid_usuarioRef= React.createRef()
        this.state = {
            nombre: null,
            archivo: null,
            id_loc:0,
            errors: {},
        
        }
        this.valor=0
    }
   

    createPost(data){
      const endpoint = '/api/files/' 
      const csrfToken = cookie.load('csrftoken')
      let thisComp = this
      if (csrfToken !== undefined) {
          let lookupOptions = {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
              },
              body: JSON.stringify(data),
              credentials: 'include'
          }

          fetch(endpoint, lookupOptions)
          .then(function(response){
              return response.json()
          }).then(function(responseData){
              console.log(responseData)
              if (thisComp.props.newPostItemCreated){
                  thisComp.props.newPostItemCreated(responseData)
              }
             
              thisComp.clearForm()
          }).catch(function(error){
              console.log("error", error)
              alert(error)
             // alert("An error occured, please try again later.")
          })
      } 
      this.state=data;
                this.valor = 1
  }

  updatePost(data){
    const {post} = this.props
    const endpoint = `/api/files/${post.slug}/` 
    const csrfToken = cookie.load('csrftoken')
    let thisComp = this
    if (csrfToken !== undefined) {
        let lookupOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            // console.log(responseData)
            if (thisComp.props.postItemUpdated){
                thisComp.props.postItemUpdated(responseData)
            }
           
        }).catch(function(error){
            console.log("error", error)
            alert("An error occured, please try again later.")
        })
    } 
    
}


    deletePost(){
      const {post} = this.props
      const endpoint = `/api/files/${post.slug}/` 
      const csrfToken = cookie.load('csrftoken')
      let thisComp = this
      if (csrfToken !== undefined) {
          let lookupOptions = {
              method: "DELETE",
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken
              },
             // body: JSON.stringify(data),
             // credentials: 'include'
          }

          fetch(endpoint, lookupOptions)
       
            
            .then( (response) => {
                if (response.status == 204){
                    console.log('delete')
                    this.valor=1
                    window.location.reload(); 
                }
            } )
            
            .then(data => console.log("La dta:",data))
            .catch(function(error){
              console.log("error", error)
              
              alert("An error occured, please try again later.")
             
          })
      }    
      
  }

    handleSubmit(event){
        event.preventDefault()
        let data = this.state
        
        const {post} = this.props
        
      
        
        if (post !== undefined){
           this.updatePost(data)
         } else {
           alert("warning")
           this.createPost(data)
         }
       
       
    }

   


    handleInputChange(event){
        event.preventDefault()
        let key = event.target.name
        let value = event.target.value
        if (key === 'nombre'){
            if (value.length > 120){
                alert("This title is too long")
            }
        }
        this.setState({
            [key]: value
        })
    }

   // handleDraftChange(event){
    //  this.setState({
     //   draft: !this.state.draft
     // })
   // }

    

    clearForm(event){
        if (event){
          event.preventDefault()
        }
        this.postCreateForm.reset()
        this.defaultState()
      }

    clearFormRefs(){
      this.regnombreRef.current=''
      this.regid_usuarioRef.current=''
    }


    defaultState(){
      this.setState({
        nombre: null,
        archivo: null,
        id_loc: 0,
        })
    }
    componentDidMount(){
      const {post} = this.props
      if (post !== undefined){
        this.setState({
            id_loc: post.id_loc,
            nombre: post.nombre,
            archivo: post.archivo,
        })
      } else {
        this.defaultState()
      }
      // this.postTitleRef.current.focus()
    }

    render(){
        
        const {nombre} = this.state
        const {id_loc} = this.state
        const {archivo} = this.state
       
        const cancelClass2 = this.props.post == undefined ? "d-none" : ""
        
       
        let thisComp = this
        return (
            
            <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="user_card">
                        <div class="d-flex justify-content-center">
                            <h3 id="form-title">REGISTRAR ARCHIVO</h3>
                        </div>
                        <form enctype="multipart/form-data" onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el} novalidate>
                        <fieldset>
                          <div className='form-group'>
                            <label for='nombre'>Nombre</label>
                            <input 
                            type='text' 
                            id='nombre' 
                            name='nombre' 
                            value={nombre}
                            className='form-control'
                            placeholder='nombre' 
                            ref = {this.regnombreRef}
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='archivo'>Archivo</label>
                            <input 
                            type='file' 
                            id='archivo' 
                            name='archivo' 
                            value={archivo}
                            className='form-control'
                            placeholder='file' 
                            ref = {this.regid_usuarioRef}
                            onChange={this.handleInputChange} 
                          />
                          </div>
                          <div className='form-group'>
                            <label for='id_loc'>Id_loc</label>
                            <input 
                            type='number' 
                            id='id_loc' 
                            name='id_loc' 
                            value={id_loc}
                            className='form-control'
                            placeholder='0' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>    
                          <div className='form-group'>
                            <label for='id_tipo_archivo'>ID Tipo</label>
                            <input 
                            type='number' 
                            id='id_tipo_archivo' 
                            name='id_tipo_archivo' 
                           
                            className='form-control'
                            placeholder='0' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>            
                          </fieldset>
                          <button type='submit' className='btn btn-primary'>Guardar</button>
                          <button  className={`btn btn-danger ${cancelClass2}`} onClick={this.deletePost}>Borrar</button>      
                         
                        </form>
                    </div>
		        </div>
	        </div>
        );
    }

}

export default withRouter(Register);