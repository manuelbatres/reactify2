import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'


import Register from './Register'

class AccountDetail extends Component {
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
      const endpoint = `/api/accounts/${slug}/` 
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
                <h3>{usuario.username}</h3>
                <p>{usuario.correo}</p>
                

                <p className='lead'><Link maintainScrollPosition={false} to={{
                    pathname: `/accounts`,
                    state: { fromDashboard: false }
                  }}>Usuarios</Link></p>

                    <Link maintainScrollPosition={false} to={{
                    pathname: `/accounts/register`,
                    state: { fromDashboard: false }
                  }}>Crear Usuario</Link>

                  {usuario.owner === true ? <Register post={usuario} postItemUpdated={this.handlePostItemUpdated} /> : ""}
                </div>
               }
           </div> : "Loading..."}</p>
          
        )
    }
}

export default AccountDetail