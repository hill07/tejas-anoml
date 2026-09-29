import { Link } from 'react-router-dom';
import { Page, PageHeader } from '../components/Layout';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <Page>
      <PageHeader eyebrow="404" title="Page not found" intro="The page you're looking for doesn't exist or has been moved." />
      <div className="text-center">
        <Link to="/" className="btn-primary">
          Go home
        </Link>
      </div>
    </Page>
  );
}
