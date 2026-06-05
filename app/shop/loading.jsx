// Shop loading skeleton (T-023).
export default function ShopLoading() {
  return (
    <main>
      <div className="container mb-100 mt-5">
        <div className="row g-4 placeholder-glow">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="col-xl-4 col-md-6" key={i}>
              <span className="placeholder d-block w-100" style={{ height: 280 }} />
              <span className="placeholder col-8 d-block mt-2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
