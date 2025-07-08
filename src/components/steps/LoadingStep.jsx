import React from 'react';
import targobankLogo from '../../assets/targobank.jpg';
import ingLogo from '../../assets/ing.jpg';
import santanderLogo from '../../assets/santander.jpg';

const LoadingStep = ({ animationClass }) => (
    <div className={`form-content ${animationClass}`}>
        <h1 className="form-title" style={{ color: '#054F9C', textAlign: 'center', marginBottom: '60px', fontSize: '30px' }}>Bitte haben Sie einen Augenblick Geduld!</h1>

        <div className="bank-offers-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            maxWidth: '650px',
            margin: '0 auto'
        }}>
            {/* Targobank */}
            <div className="bank-offer" style={{
                background: 'white',
                padding: '35px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '35px'
                }}>
                    <img
                        src={targobankLogo}
                        alt="Targobank"
                        style={{ height: '55px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '60%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '40%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ING */}
            <div className="bank-offer" style={{
                background: 'white',
                padding: '35px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '35px'
                }}>
                    <img
                        src={ingLogo}
                        alt="ING"
                        style={{ height: '55px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '50%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '70%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Santander */}
            <div className="bank-offer" style={{
                background: 'white',
                padding: '35px',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '35px'
                }}>
                    <img
                        src={santanderLogo}
                        alt="Santander"
                        style={{ height: '55px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>Monatliche Rate</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '65%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#054F9C', fontWeight: 'bold', fontSize: '16px' }}>eff. Jahreszins</span>
                        <div style={{
                            width: '220px',
                            height: '28px',
                            background: '#eaeaea',
                            borderRadius: '6px',
                            position: 'relative',
                            overflow: 'hidden',
                            marginLeft: '40px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '55%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.1)',
                                animation: 'loading 1.5s infinite'
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style jsx>{`
            @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </div>
);

export default LoadingStep;
