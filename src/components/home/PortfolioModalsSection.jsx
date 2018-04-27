import React from 'react';

class PortfolioModalsSection extends React.Component {
  renderPortfolioModals = () => {
    const portfolioModals = [{
      projectId: 'portfolioModal1',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/01-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }, {
      projectId: 'portfolioModal2',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/02-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }, {
      projectId: 'portfolioModal3',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/03-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }, {
      projectId: 'portfolioModal4',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/04-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }, {
      projectId: 'portfolioModal5',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/05-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }, {
      projectId: 'portfolioModal6',
      projectName: 'Project Name',
      projectSummary: 'Lorem ipsum dolor sit amet consectetur.',
      imageSrc: 'assets/img/portfolio/06-full.jpg',
      projectDescription: 'Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!',
      projectDetails: {
        Date: 'January 2017',
        Client: 'Threads',
        Category: 'Illustration'
      }
    }];

    return portfolioModals.map(portfolio => {
      return (
        <div className="portfolio-modal modal fade" id={`${portfolio.projectId}`} tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-modal" data-dismiss="modal">
                <div className="lr">
                  <div className="rl"></div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 mx-auto">
                    <div className="modal-body">
                      { /* Project Details Go Here */}
                      <h2 className="text-uppercase">{portfolio.projectName}</h2>
                      <p className="item-intro text-muted">{portfolio.projectSummary}</p>
                      <img className="img-fluid d-block mx-auto" src={`${portfolio.imageSrc}`} alt="" />
                      <p>{portfolio.projectDescription}</p>
                      <ul className="list-inline">
                        { Object.keys(portfolio.projectDetails).map(key => {
                          return (
                            <li>{`${key}: ${portfolio.projectDetails[key]}`}</li>
                          );
                        }) }
                      </ul>
                      <button className="btn btn-primary" data-dismiss="modal" type="button">
                        <i className="fa fa-times"></i>
                        Close Project</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section>
        {this.renderPortfolioModals()}
      </section>
    );
  }
}

export default PortfolioModalsSection;