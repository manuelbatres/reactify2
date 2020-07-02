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
        this.regUsernameRef = React.createRef()
        this.regPasswordRef = React.createRef()
        this.state = {
            username: null,
            password: null,
            correo: null,
            Almdisp: 0,
            id_H_descargas :0,
            errors: {},
        
        }
        this.valor=0
    }
   

    createPost(data){
      const endpoint = '/api/accounts/' 
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
    const endpoint = `/api/accounts/${post.slug}/` 
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
      alert("delete")
      const {post} = this.props
      const endpoint = `/api/accounts/${post.slug}/` 
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
        if (key === 'username'){
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
      this.postUsernameRef.current=''
      this.postPasswordref.current=''
    }


    defaultState(){
      this.setState({
        username: null,
        password: null,
        correo: null,
        Almdisp: 0,
        id_H_descargas :0,
        })
    }
    componentDidMount(){
      const {post} = this.props
      if (post !== undefined){
        this.setState({
            username: post.username,
            password: post.password,
            correo: post.correo,
            Almdisp: post.Almdisp,
            id_H_descargas :post.id_H_descargas,
        })
      } else {
        this.defaultState()
      }
      // this.postTitleRef.current.focus()
    }

    render(){
        
        const {correo} = this.state
        const {username} = this.state
        const {password} = this.state
        const {Almdisp} = this.state
        const {id_H_descargas} = this.state
        
        const cancelClass2 = this.props.post == undefined ? "d-none" : ""

       
        let thisComp = this
        return (
            
            <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="user_card">
                        <div class="d-flex justify-content-center">
                            <h3 id="form-title">Registrar Usuario</h3>
                        </div>
                        <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}>
                          <div className='form-group'>
                            <label for='username'>Nombre</label>
                            <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            value={username}
                            className='form-control'
                            placeholder='User name' 
                            ref = {this.regUsernameRef}
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='password'>Contraseña</label>
                            <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            value={password}
                            className='form-control'
                            placeholder='Password' 
                            ref = {this.regPasswordRef}
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='email'>Correo</label>
                            <input 
                            type='email' 
                            id='correo' 
                            name='correo' 
                            value={correo}
                            className='form-control'
                            placeholder='Correo' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='Almdisp'>Capacidad</label>
                            <input 
                            type='number' 
                            id='Almdisp' 
                            name='Almdisp' 
                            value={Almdisp}
                            className='form-control'
                            placeholder='ALmacenamiento' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='id_H_descargas'>Id_H_descargas</label>
                            <input 
                            type='number' 
                            id='id_H_descargas' 
                            name='id_H_descargas' 
                            value={id_H_descargas}
                            className='form-control'
                            placeholder='Descargas' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='id_publicacion'>Id_publicacion</label>
                            <input 
                            type='number' 
                            id='id_publicacion' 
                            name='id_publicacion' 
                           
                            className='form-control'
                            placeholder='0' 
                            onChange={this.handleInputChange} 
                            required='required'/>
                          </div>
                          <div className='form-group'>
                            <label for='id_PDR'>Id_PDR</label>
                            <input 
                            type='number' 
                            id='id_PDR' 
                            name='id_PDR' 
                           
                            className='form-control'
                            placeholder='0' 
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