import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CASES } from '../data/cases';
import { NotFoundPage } from './NotFoundPage';

export function CaseStudyRoute() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caseItem = id ? CASES[id.toLowerCase()] : null;

  useEffect(() => {
    if (caseItem && id) {
      navigate(`/#case-${id.toLowerCase()}`, { replace: true });
    }
  }, [caseItem, id, navigate]);

  if (!caseItem) {
    return <NotFoundPage />;
  }

  return null;
}
