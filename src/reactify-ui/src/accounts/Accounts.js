import React, { Component } from 'react';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import AccountInline from './AccountInline'

class Accounts extends Component {

    constructor(props){
        super(props)
        this.togglePostListClass = this.togglePostListClass.bind(this)
        this.handleNewPost = this.handleNewPost.bind(this)
        this.loadMorePosts =this.loadMorePosts.bind(this)
        this.state = {
            posts: [],
            postsListClass: "card",
            next: null,
            previous: null,
            author: false,
            count: 0
        }
    }

    loadMorePosts(){
        const {next} = this.state 
        if (next !== null || next !== undefined) {
             this.loadPosts(next)
        }
       
    }
    
  loadPosts(nextEndpoint){
      let endpoint = '/api/accounts/' 
      if (nextEndpoint !== undefined) {
          endpoint = nextEndpoint
      }
      let thisComp = this
      let lookupOptions = {
          method: "GET",
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const csrfToken = cookie.load('csrftoken')
      if (csrfToken !== undefined) {
          lookupOptions['credentials'] = 'include'
          lookupOptions['headers']['X-CSRFToken'] = csrfToken
       }

      fetch(endpoint, lookupOptions)
      .then(function(response){
          return response.json()
      }).then(function(responseData){
          console.log(responseData)
          // let currentPosts = thisComp.state.posts
          // let newPosts = currentPosts.concat(responseData.results)
          // console.log(currentPosts)
          
           thisComp.setState({
                  posts: thisComp.state.posts.concat(responseData.results),
                  next: responseData.next,
                  previous: responseData.previous,
                  author: responseData.author,
                  count: responseData.count
              })
      }).catch(function(error){
          console.log("error", error)
      })
  }

  handleNewPost(postItemData){
      // console.log(postItemData)
      let currentPosts = this.state.posts
      currentPosts.unshift(postItemData) // unshift
      this.setState({
          posts: currentPosts
      })
  }

  

  togglePostListClass(event){
      event.preventDefault()
      let currentListClass = this.state.postsListClass
      if (currentListClass === ""){
          this.setState({
              postsListClass: "card",
          })
      } else {
          this.setState({
              postsListClass: "",
          })
      }
      
  }

  componentDidMount(){
      this.setState({
          posts: [],
          postsListClass: "card",
          next: null,
          previous: null,
          author: false,
          count: 0
      })
      this.loadPosts()
      
  }
  render() {
      const {posts} = this.state
      const {postsListClass} = this.state
      const {author} = this.state
      const {next} = this.state 
      
      
      
    return (
      <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"><p><Link maintainScrollPosition={false} to={{
                   pathname:`/posts`,
                   state: {fromDashboard: false}
               }}>Home</Link></p> </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#"> <p><Link maintainScrollPosition={false} to={{
                   pathname:`/posts`,
                   state: {fromDashboard: false}
               }}>Posts</Link></p> <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><p><Link maintainScrollPosition={false} to={{
                   pathname:`/accounts`,
                   state: {fromDashboard: false}
               }}>Usuarios</Link></p></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><p><Link maintainScrollPosition={false} to={{
                   pathname:`/comments`,
                   state: {fromDashboard: false}
               }}>Comentarios</Link></p></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"><p><Link maintainScrollPosition={false} to={{
                   pathname:`/files`,
                   state: {fromDashboard: false}
               }}>Archivos</Link></p></a>
      </li>
   
     
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
          {author === true ? <Link className='mr-2' maintainScrollPosition={false} to={{
                    pathname: `/accounts/register/`,
                    state: { fromDashboard: false }
                  }}>Crear Usuario</Link> : ""}
          
          <button onClick={this.togglePostListClass}>Mostrar mas</button>
          {posts.length > 0 ? posts.map((postItem, index)=>{
              return (
                      <AccountInline post={postItem} elClass={postsListClass} />
              )
          }) : <p>Delete</p>}
          {next !== null ? <button onClick={this.loadMorePosts}>Cargar mas</button> : ''}
      </div>
  

	
    );
  }
}

export default Accounts;