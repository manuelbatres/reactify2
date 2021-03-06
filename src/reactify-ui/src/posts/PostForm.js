import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import moment from 'moment'
import { withRouter } from "react-router-dom";



class PostForm extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleDraftChange = this.handleDraftChange.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.handleSubmit2 = this.handleSubmit2.bind(this)
        this.postTitleRef = React.createRef()
        this.postContentRef = React.createRef()
        this.state = {
            draft: false,
            title: null,
            content: null,
            publish: null,
            errors: {},
        
        }
        this.valor=0
    }
   

    createPost(data){
      const endpoint = '/api/posts/' 
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
              alert("An error occured, please try again later.")
          })
      } 
      this.state=data;
                this.valor = 1
  }

  updatePost(data){
    const {post} = this.props
    const endpoint = `/api/posts/${post.slug}/` 
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


    deletePost(post){
    // alert("wow")
      //let thisComp = this
     
    

         
    // const {post} = this.props
     
      
     
      const endpoint = `/api/posts/${post.slug}/` 
      const csrfToken = cookie.load('csrftoken')
    
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
              //  alert(response)
                if (response.status == 204){
                    console.log('delete')
                  
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
           this.createPost(data)
         }
       
       
    }

    handleSubmit2(event){
        event.preventDefault()
        

        const {post} = this.props
        
      this.deletePost(post)
       
       
    }

   


    handleInputChange(event){
        event.preventDefault()
        let key = event.target.name
        let value = event.target.value
        if (key === 'title'){
            if (value.length > 120){
                alert("This title is too long")
            }
        }
        this.setState({
            [key]: value
        })
    }

    handleDraftChange(event){
      this.setState({
        draft: !this.state.draft
      })
    }

    

    clearForm(event){
        if (event){
          event.preventDefault()
        }
        this.postCreateForm.reset()
        this.defaultState()
      }

    clearFormRefs(){
      this.postTitleRef.current=''
      this.postContentRef.current=''
    }


    defaultState(){
      this.setState({
            draft: false,
            title: null,
            content: null,
            publish: moment(new Date()).format('YYYY-MM-DD'),
        })
    }
    componentDidMount(){
      const {post} = this.props
      if (post !== undefined){
        this.setState({
            draft: post.draft,
            title: post.title,
            content: post.content,
            publish: moment(post.publish).format('YYYY-MM-DD'),
        })
      } else {
        this.defaultState()
      }
      // this.postTitleRef.current.focus()
    }

    render(){
        const {slug}=this.state
        const {publish} = this.state
        const {title} = this.state
        const {content} = this.state
        const cancelClass = this.props.post !== undefined ? "d-none" : ""
        const cancelClass2 = this.props.post == undefined ? "d-none" : ""
        let thisComp = this
        return (
            <div> 
           
            <form onSubmit={this.handleSubmit} ref={(el) => this.postCreateForm = el}>
                <div className='form-group'>
                    <label for='title'>Post Titulo</label>
                    <input 
                      type='text' 
                      id='title' 
                      name='title' 
                      value={title}
                      className='form-control'
                      placeholder='Blog post title' 
                      ref = {this.postTitleRef}
                      onChange={this.handleInputChange} 
                      required='required'/>
                </div>
                 <div className='form-group'>
                    <label for='content'>Contenido</label>
                    <textarea 
                    id='content' 
                    ref = {this.postContentRef} 
                    name='content' 
                    value={content}
                    className='form-control' 
                    placeholder='Post content' 
                    onChange={this.handleInputChange} 
                    required='required'/>
                   
                </div>
                <div className='form-group'>
                    <label for='draft'>
                    <input type='checkbox' checked={this.state.draft} id='draft' name='draft' className='mr-2' onChange={this.handleDraftChange}/>
                     Draft </label>
                     <button onClick={(event)=>{event.preventDefault();this.handleDraftChange()}}>Toggle Draft</button>
                </div>
                <div className='form-group'>
                    <label for='publish'>Dia de publicacion</label>
                    <input 
                    type='date' 
                    id='publish' 
                    name='publish' 
                    className='form-control' 
                    onChange={this.handleInputChange}
                     value={publish}
                     required='required'/>
                </div>
                <button type='submit' className='btn btn-primary'>Guardar</button>
                <button className={`btn btn-secondary ${cancelClass}`} onClick={this.clearForm}>Limpiar</button>
                <button  className={`btn btn-danger ${cancelClass2}`} onClick={this.handleSubmit2}>Borrar</button>              
            </form>
            </div>
        );
    }

}

export default withRouter(PostForm);