import React from 'react';

class PortfolioGridSection extends React.Component {
  renderPortfolioItems = () => {
    const portfolioItems = [{
      href: '#portfolioModal1',
      imageSrc: 'assets/img/portfolio/01-thumbnail.jpg',
      heading: 'Threads',
      paragraphText: 'Illustration'
    }, {
      href: '#portfolioModal2',
      imageSrc: 'assets/img/portfolio/02-thumbnail.jpg',
      heading: 'Explore',
      paragraphText: 'Graphic Design'
    }, {
      href: '"#portfolioModal3',
      imageSrc: 'assets/img/portfolio/03-thumbnail.jpg',
      heading: 'Finish',
      paragraphText: 'Identity'
    }, {
      href: '#portfolioModal4',
      imageSrc: 'assets/img/portfolio/04-thumbnail.jpg',
      heading: 'Lines',
      paragraphText: 'Branding'
    }, {
      href: '#portfolioModal5',
      imageSrc: 'assets/img/portfolio/05-thumbnail.jpg',
      heading: 'Southwest',
      paragraphText: 'Website Design'
    }, {
      href: '#portfolioModal6',
      imageSrc: 'assets/img/portfolio/06-thumbnail.jpg',
      heading: 'Window',
      paragraphText: 'Photography'
    }];

    return portfolioItems.map((item, index) => {
      return (
        <div className="col-md-4 col-sm-6 portfolio-item" key={index}>
          <a className="portfolio-link" data-toggle="modal" href={`${item.href}`}>
            <div className="portfolio-hover">
              <div className="portfolio-hover-content">
                <i className="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img className="img-fluid" src={`${item.imageSrc}`} alt="" />
          </a>
          <div className="portfolio-caption">
            <h4>{item.heading}</h4>
            <p className="text-muted">{item.paragraphText}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="bg-light" id="portfolio">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Portfolio</h2>
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
            </div>
            <div className="row">
              {this.renderPortfolioItems()}
            </div>
          </div>
        </section>
    );
  }
}

export default PortfolioGridSection;