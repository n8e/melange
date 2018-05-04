import React from 'react';

import './Home.css';

import Navigation from '../navigation/Navigation';
import PortfolioGridSection from './PortfolioGridSection';
import Header from './Header';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import ClientsSection from './ClientsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import PortfolioModalsSection from './PortfolioModalsSection';

class Home extends React.Component {
  render() {
    return (
      <div>
        { /* Navigation */ }
        <Navigation />

        { /* Header */ }
        <Header />

        { /* Services */ }
        <ServicesSection />

        { /* Portfolio Grid */ }
        <PortfolioGridSection />

        { /* About */ }
        <AboutSection />

        { /* Team */ }
        <TeamSection />

        { /* Clients */ }
        <ClientsSection />

        { /* Contact */ }
        <ContactSection />

        { /* Footer */ }
        <Footer />

        { /* Portfolio Modals */ }

        { /* Modal 1 */ }
        <PortfolioModalsSection />
      </div>
    )
  }
};

export default Home;