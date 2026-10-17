import { CONTACT_INFO } from '../../data/navigation';
import { ArrowRightIcon } from '../ui/Button';

export function Footer() {
  return (
    <footer className="contact page" id="contact">
      <div className="wrap">
        <div className="pg">
          <div className="it" style={{ marginBottom: '24px' }}>
            <img
              src="/sayandeep.png"
              alt="Sayandeep Purkait Logo"
              className="footer-logo"
            />
          </div>
          <span className="eyebrow it">Contact</span>
          <h2 className="grad it">
            Building something that has to <mark>work in production</mark>?
          </h2>
          <p className="t it" style={{ margin: '24px auto 0', textAlign: 'center' }}>
            I am happy to talk architecture, AI infrastructure and engineering leadership.
          </p>

          <div className="cta-row it" style={{ justifyContent: 'center', marginTop: '36px' }}>
            <a className="btn p" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email} <ArrowRightIcon />
            </a>
          </div>

          <div className="links it">
            <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={CONTACT_INFO.agentforgeRepo} target="_blank" rel="noopener noreferrer">
              AgentForge ↗
            </a>
          </div>

          <div className="copy it">
            &copy; 2026 {CONTACT_INFO.name} &middot; {CONTACT_INFO.location}
          </div>
        </div>
      </div>
    </footer>
  );
}
