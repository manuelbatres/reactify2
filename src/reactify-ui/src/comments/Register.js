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
            id_usuario: 0,
            nombre: null,
            comentario: null,
            errors: {},
        
        }
        this.valor=0
    }
   

    createPost(data){
      const endpoint = '/api/comments/' 
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
    const endpoint = `/api/comments/${post.slug}/` 
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
      const endpoint = `/api/comments/${post.slug}/` 
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
        //   alert("warning")
           this.createPost(data)
         }
       
       
    }

   


    handleInputChange(event){
        event.preventDefault()
        let key = event.target.name
        let value = event.target.value
        if (key === 'comentario'){
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
        comentario: null,
        id_usuario: 0,
        })
    }
    componentDidMount(){
      const {post} = this.props
      if (post !== undefined){
        this.setState({
            id_usuario: post.id_usuario,
            nombre: post.nombre,
            comentario: post.comentario,
        })
      } else {
        this.defaultState()
      }
      // this.postTitleRef.current.focus()
    }

    render(){
        
        const {id_usuario} = this.state
        const {nombre} = this.state
        const {comentario} = this.state
       
        const cancelClass2 = this.props.post == undefined ? "d-none" : ""
        
       
        let thisComp = this
        return (
            
            <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="user_card">
                        <div class="d-flex justify-content-center">
                            <h3 id="form-title">REGISTRAR COMENTARIO</h3>
                        </div>
                        <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}>
                          <div className='form-group'>
                            <label for='id_usuario'>Id_usuario</label>
                            <input 
                            type='number' 
                            id='id_usuario' 
                            name='id_usuario' 
                            value={id_usuario}
                            className='form-control'
                            placeholder='0' 
                            ref = {this.regid_usuarioRef}
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='password'>Nombre</label>
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
                            <label for='comentario'>Comentario</label>
                            <input 
                            type='text' 
                            id='comentario' 
                            name='comentario' 
                            value={comentario}
                            className='form-control'
                            placeholder='comentario' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>            
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