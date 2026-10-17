import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/ui/Button';
import { SEOHead } from '../components/ui/SEOHead';
import { get404SEO } from '../lib/seo';

export function NotFoundPage() {
  const seo = get404SEO();

  return (
    <main className="page cover active" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <SEOHead seo={seo} />
      <div className="wrap">
        <div className="pg" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow it" style={{ justifyContent: 'center' }}>
            Error 404
          </span>
          <h1 className="grad it" style={{ marginTop: '20px' }}>
            Page not found
          </h1>
          <p className="t it" style={{ margin: '20px auto 30px' }}>
            The case study or section you are looking for does not exist or has been moved.
          </p>
          <div className="cta-row it" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn p">
              Return to Homepage <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
