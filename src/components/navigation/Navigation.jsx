import React from 'react';

class Navigation extends React.Component {
  renderNavigationItems = () => {
    const navItems = [
      { name: 'Services', href: '#services' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'About', href: '#about' },
      { name: 'Team', href: '#team' },
      { name: 'Contact', href: '#contact' },
      { name: 'Login', href: 'login' }
    ];

    return navItems.map((item, index) => {
      return (
        <li className="nav-item" key={index}>
          <a className="nav-link js-scroll-trigger" href={item.href}>{item.name}</a>
        </li>
      )
    })
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">Melangerie</a>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ml-auto">
              {this.renderNavigationItems()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;