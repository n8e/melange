import React from 'react';

class ServicesSection extends React.Component {
  renderServices = () => {
    const serviceItems = [{
      faClass: 'fa-shopping-cart',
      heading: 'E-Commerce',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
    }, {
      faClass: 'fa-laptop',
      heading: 'Responsive Design',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
    }, {
      faClass: 'fa-lock',
      heading: 'Web Security',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
    }];

    return serviceItems.map(item => {
      return (
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <i className={`fa ${item.faClass} fa-stack-1x fa-inverse`}></i>
          </span>
          <h4 className="service-heading">{item.heading}</h4>
          <p className="text-muted">{item.text}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Services</h2>
              <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
          </div>
          <div className="row text-center">
            {this.renderServices()}
          </div>
        </div>
      </section>
    );
  }
}

export default ServicesSection;