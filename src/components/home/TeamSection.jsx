import React from 'react';

class TeamSection extends React.Component {
  renderTeamItems = () => {
    const teamMembers = [{
      imageSrc: 'assets/img/team/1.jpg',
      fullName: 'Kay Garland',
      role: 'Lead Designer',
      twitterLink: '#',
      facebookLink: '#',
      linkedinLink: '#'
    }, {
      imageSrc: 'assets/img/team/2.jpg',
      fullName: 'Larry Parker',
      role: 'Lead Marketer',
      twitterLink: '#',
      facebookLink: '#',
      linkedinLink: '#'
    }, {
      imageSrc: 'assets/img/team/3.jpg',
      fullName: 'Diana Pertersen',
      role: 'Lead Developer',
      twitterLink: '#',
      facebookLink: '#',
      linkedinLink: '#'
    }];

    return teamMembers.map((member, index) => {
      return (
        <div className="col-sm-4" key={index}>
          <div className="team-member">
            <img className="mx-auto rounded-circle" src={`${member.imageSrc}`} alt="" />
            <h4>{member.fullName}</h4>
            <p className="text-muted">{member.role}</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href={`${member.twitterLink}`}>
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href={`${member.facebookLink}`}>
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href={`${member.linkedinLink}`}>
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="bg-light" id="team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
              <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
          </div>
          <div className="row">
            {this.renderTeamItems()}
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default TeamSection;