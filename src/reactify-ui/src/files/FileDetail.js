import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'


import Register from './Register'

class FileDetail extends Component {
    constructor(props){
        super(props)
        this.handlePostItemUpdated= this.handlePostItemUpdated.bind(this)
        this.state = {
             slug: null,
             usuario: null,
             doneLoading: false,
        }}
        
    

    handlePostItemUpdated(usuarioItemData){
        this.setState({
            usuario: usuarioItemData
        })
    }
    loadPost(slug){
      const endpoint = `/api/files/${slug}/` 
      let thisComp = this
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }

      /*const csrfToken = cookie.load('csrftoken')
      if (csrfToken !== undefined) {
          lookupOptions['credentials'] = 'include'
          lookupOptions['headers']['X-CSRFToken'] = csrfToken
       }*/

      fetch(endpoint, lookupOptions)
      .then(function(response){
          if (response.status == 404){
              console.log('Page not found')
          }
          return response.json()
      }).then(function(responseData){
        if (responseData.detail){
            thisComp.setState({
                doneLoading: true,
                usuario: null
            })
        } else {
         thisComp.setState({
                doneLoading: true,
                usuario: responseData,
            })
        
        }
     
      }).catch(function(error){
          console.log("error", error)
      })
  }
    componentDidMount(){
        this.setState({
                slug: null,
                usuario: null
            })
        if (this.props.match){
            const {slug} = this.props.match.params
            this.setState({
                slug: slug,
                doneLoading: false
            })
           
            this.loadPost(slug)
        }
      
    }
    render(){
        const {doneLoading} = this.state
        const {usuario} = this.state
        return(
          
            
            <p>{(doneLoading === true) ? <div>
                {usuario === null ? "Delete": 
                <div>
                <h1>{usuario.nombre}</h1>
                {usuario.slug}

                <p className='lead'><Link maintainScrollPosition={false} to={{
                    pathname: `/files`,
                    state: { fromDashboard: false }
                  }}>Archivos</Link></p>

                    <Link maintainScrollPosition={false} to={{
                    pathname: `/files/register`,
                    state: { fromDashboard: false }
                  }}>Subir archivo</Link>

                  {usuario.owner === true ? <Register post={usuario} postItemUpdated={this.handlePostItemUpdated} /> : ""}
                </div>
               }
           </div> : "Loading..."}</p>
          
        )
    }
}

export default FileDetail