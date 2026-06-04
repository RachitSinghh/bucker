'use client';
import React from 'react';
import Image from 'next/image';
import DynamicSlider from '../components/DynamicSlider';
import Breadcrumbs from '../components/Breadcrumbs';
import Brands from '../components/Brands';
import Services from '../components/Services';

const teamMembers = [
  { name: 'Kianna Pham', role: 'Team Member', img: '/img/others/team1.webp' },
  { name: 'Kianna Pham', role: 'Team Member', img: '/img/others/team2.webp' },
  { name: 'Kianna Pham', role: 'Team Member', img: '/img/others/team3.webp' },
];

const testimonials = [
  {
    name: 'Kianna Pham',
    role: 'Customer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicingl elit, sed do eiusmod tempor incididunt ut laboredolor magna aliqua. Ut enim ad minim veniam, quis nostru exercitation ullamco laboris',
    img: '/img/others/testimonial-shap-thumb.webp'
  },
  {
    name: 'Kianna Pham',
    role: 'Customer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicingl elit, sed do eiusmod tempor incididunt ut laboredolor magna aliqua. Ut enim ad minim veniam, quis nostru exercitation ullamco laboris',
    img: '/img/others/testimonial-shap-thumb.webp'
  }
];

export default function AboutPage() {
  const testimonialSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    speed: 300,
    infinite: true,
  };

  return (
    <main>
      <Breadcrumbs title="About Us" />

      {/* About Video Section */}
      <div className="about_video-section wow fadeInUp mb-110" data-wow-delay="0.1s" data-wow-duration="1.1s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="about_video_thumb">
                <Image 
                  src="/img/bg/about-bg.webp" 
                  alt="About Video Background" 
                  width={1170} 
                  height={550} 
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="video_paly_icon">
                  <a className="video_popup" href="https://www.youtube.com/watch?v=2Zt8va_6HRk" target="_blank" rel="noopener noreferrer">
                    <Image src="/img/others/video-play.webp" alt="Play Video" width={140} height={140} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="about_description_section mb-105">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="about_desc wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                <h2>Our Vision</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmoddll tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veni quis nostrud exercit ullamco laboris
                  nisi ut aliquip ex ea commodo conseql Duis aute irure dolor in reprehendergg in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="about_desc wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="1.1s">
                <h2>Our Mission</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmoddll tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veni quis nostrud exercit ullamco laboris
                  nisi ut aliquip ex ea commodo conseql Duis aute irure dolor in reprehendergg in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brands */}
      <Brands />

      {/* Team Member Section */}
      <div className="team_member_section mb-110">
        <div className="container">
          <div className="section_title text-center wow fadeInUp mb-50" data-wow-delay="0.1s" data-wow-duration="1.1s">
            <h2>Team Member</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod <br /> tempor incididunt
              ut labore et dolore magna</p>
          </div>
          <div className="team_member_inner">
            <div className="row">
              {teamMembers.map((member, idx) => (
                <div className="col-lg-4 col-md-4 col-sm-6" key={idx}>
                  <div className="single_team_member wow fadeInUp" data-wow-delay={`${0.1 * (idx + 1)}s`} data-wow-duration={`${1.0 + 0.1 * (idx + 1)}s`}>
                    <div className="team_thumb">
                      <a href="#">
                        <Image 
                          src={member.img} 
                          alt={member.name} 
                          width={370} 
                          height={410} 
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </a>
                      <div className="team_text">
                        <h3>{member.name}</h3>
                        <h4>{member.role}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div 
        className="testimonial_section mb-110 wow fadeInUp" 
        style={{ backgroundImage: 'url(/img/others/testimonial-bg.webp)' }}
        data-wow-delay="0.1s" 
        data-wow-duration="1.1s"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="testimonial_wrapper">
                <DynamicSlider {...testimonialSettings}>
                  {testimonials.map((testi, idx) => (
                    <div key={idx}>
                      <div className="testimonial_inner d-flex align-items-center">
                        <div className="testimonial_thumb">
                          <Image src={testi.img} alt="Testimonial Thumb" width={279} height={339} />
                        </div>
                        <div className="testimonial_content">
                          <div className="testimonial_rating">
                            <ul>
                              {[...Array(5)].map((_, i) => (
                                <li key={i}><a href="#"><i className="ion-ios-star"></i></a></li>
                              ))}
                            </ul>
                          </div>
                          <div className="testimonial_author">
                            <h3>{testi.name}</h3>
                            <h4>{testi.role}</h4>
                          </div>
                          <div className="testimonial_desc">
                            <p>{testi.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </DynamicSlider>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <Services />
    </main>
  );
}
