// Blog loading skeleton (T-023).
export default function BlogLoading() {
  return (
    <main>
      <div className="container mb-110 mt-5">
        <div className="row g-4 placeholder-glow">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="col-md-6" key={i}>
              <span className="placeholder d-block w-100" style={{ height: 220 }} />
              <span className="placeholder col-10 d-block mt-2" />
              <span className="placeholder col-6 d-block mt-1" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
