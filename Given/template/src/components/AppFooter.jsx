import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <img src={about.logo} alt="logo" width="24" height="24" className="me-2" />
        <strong>{about.appName}</strong>
        <div className="mt-1 small">{about.copyright}</div>
        <div className="small text-muted">{about.version}</div>
        <div className="small text-muted">{about.course}</div>
      </div>
    </footer>
  )
}
