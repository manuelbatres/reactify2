import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class FilesInline extends Component {
  render() {
      const {post} = this.props
      const {elClass} = this.props
      const showContent = elClass === 'card' ? 'd-block' : 'd-none'
    return (
      <div>
          {post !== undefined ? <div className={elClass}>
             
              <h1><Link maintainScrollPosition={false} to={{
                   pathname:`/files/${post.slug}`,
                   state: {fromDashboard: false}
               }}>{post.nombre}</Link></h1>
              <p className={showContent}>{post.archivo}</p>
              </div>
              : ""}
      </div>
    );
  }
}

export default FilesInline;