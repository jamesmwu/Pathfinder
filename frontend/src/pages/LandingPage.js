import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import LandingNavbar from '../components/LandingNavbar';
import '../styles/landingPage.css';

// Helper function for online image vector assets
const url = (name, wrap = false) =>
    `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`;

export default function LandingPage() {
    const parallax = useRef(null);

    return (
        <div className='full landing'>
            <LandingNavbar />
            <Parallax ref={parallax} pages={3}>
                <ParallaxLayer offset={0} speed={0} factor={3} className='full'
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: url('stars', true),
                    }} />
                <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73', width: "100%", height: "100%" }} />
                <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE', width: "100%", height: "100%" }} />

                <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
                    <img src={url('satellite4')} style={{ width: '15%', marginLeft: '10%', marginTop: '0' }} alt="Satellite" />
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="Cloud" />
                </ParallaxLayer>

                <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="Cloud" />
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
                    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="Cloud" />
                </ParallaxLayer>

                <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} alt="Cloud" />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2.6}
                    speed={0.4}
                    style={{ opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} alt="Cloud" />
                    <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} alt="Cloud" />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2.5}
                    speed={-0.4}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
                >
                    <img src={url('earth')} style={{ width: '60%' }} alt="Earth" />
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={0.4}
                    className='whatWeDoDescContainer'
                >
                    <div className='whatWeDoDesc'>
                        <h2>If you've ever been curious about another field, we're here to help! Pathfinder allows you to explore your career interests by chatting with verified, experienced mentors and offering curated articles. </h2>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={0.1}
                    className='contactUsDescContainer'
                >
                    <div className='contactUsDescHeader'>
                        <h2>
                            We're always happy to hear from you! Feel free to reach out to us or let us know if you have any questions, feedback, or even just a friendly hello! We read every single message, we promise.
                        </h2>
                    </div>

                    <div className='contactUsDesc'>
                        <h2>pathfindersupp@gmail.com</h2>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={-0.3}
                    style={{
                        backgroundSize: '80%',
                        backgroundPosition: 'center',
                    }}
                />

                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(1)}
                    className='landingContent'
                >
                    <h1 className='hero'>Pathfinder</h1>
                    <h2 className='subHero'>Your career questions, answered.</h2>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={1}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(2)}
                    className='landingContent'
                >
                    <div className='whatWeDo'>
                        <h1>What we do</h1>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={-0}
                    onClick={() => parallax.current.scrollTo(0)}
                    className='landingContent'
                >
                    <div className='contactUs'>
                        <h1>Contact Us</h1>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div >
    );
}
