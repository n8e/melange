import React from 'react';

class AboutSection extends React.Component {
  renderAboutItems = () => {
    const aboutItems = [{
      listItemClassName: '',
      imageSrc: 'assets/img/about/1.jpg',
      timelineHeading: '2009-2011',
      timelineSubHeading: 'Our Humble Beginnings',
      timelineBodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!'
    }, {
      listItemClassName: 'timeline-inverted',
      imageSrc: 'assets/img/about/2.jpg',
      timelineHeading: 'March 2011',
      timelineSubHeading: 'An Agency is Born',
      timelineBodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!'
    }, {
      listItemClassName: '',
      imageSrc: 'assets/img/about/3.jpg',
      timelineHeading: 'December 2012',
      timelineSubHeading: 'Transition to Full Service',
      timelineBodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!'
    }, {
      listItemClassName: 'timeline-inverted',
      imageSrc: 'assets/img/about/4.jpg',
      timelineHeading: 'July 2014',
      timelineSubHeading: 'Phase Two Expansion',
      timelineBodyText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!'
    }];

    return aboutItems.map(item => {
      return (
        <li className={`${item.listItemClassName}`}>
          <div className="timeline-image">
            <img className="rounded-circle img-fluid" src={`${item.imageSrc}`} alt="" />
          </div>
          <div className="timeline-panel">
            <div className="timeline-heading">
              <h4>{item.timelineHeading}</h4>
              <h4 className="subheading">{item.timelineSubHeading}</h4>
            </div>
            <div className="timeline-body">
              <p className="text-muted">{item.timelineBodyText}</p>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <section id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">About</h2>
              <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="timeline">
                {this.renderAboutItems()}

                <li className="timeline-inverted">
                  <div className="timeline-image">
                    <h4>Be Part
                      <br/>Of Our
                      <br/>Story!
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AboutSection;