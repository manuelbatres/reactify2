import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class AccountInline extends Component {
  render() {
      const {post} = this.props
      const {elClass} = this.props
      const showContent = elClass === 'card' ? 'd-block' : 'd-none'
    return (
      <div>
          {post !== undefined ? <div className={elClass}>
             
              <h1><Link maintainScrollPosition={false} to={{
                   pathname:`/accounts/${post.slug}`,
                   state: {fromDashboard: false}
               }}>{post.username}</Link></h1>
              <p className={showContent}>{post.correo}</p>
              </div>
              : ""}
      </div>
    );
  }
}

export default AccountInline;