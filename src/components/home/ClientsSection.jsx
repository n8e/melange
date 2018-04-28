/* eslint-disable */
import React from 'react';

class ClientsSection extends React.Component{
  renderClientItems = () => {
    const clientLogos = ['envato', 'designmodo', 'themeforest', 'creative-market'];

    return clientLogos.map((logo, index) => {
      return (
        <div className="col-md-3 col-sm-6" key={index}>
          <a href="#">
            <img className="img-fluid d-block mx-auto" src={`assets/img/logos/${logo}.jpg`} alt="" />
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="py-5">
        <div className="container">
          <div className="row">
            {this.renderClientItems()}
          </div>
        </div>
      </section>
    );
  }
}

export default ClientsSection;