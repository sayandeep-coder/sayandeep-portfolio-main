import { useParams } from 'react-router-dom';
import { getCaseStudyById } from '../data/projects';
import { CaseStudyPage } from '../features/case-studies/CaseStudyPage';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyRoute() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <NotFoundPage />;
  }

  const caseStudy = getCaseStudyById(id.toLowerCase());

  if (!caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <main id="case" style={{ display: 'block' }}>
      <CaseStudyPage caseStudy={caseStudy} />
    </main>
  );
}
