function Footer() {
  return (
    <footer className="footer footer-transparent d-print-none">
      <div className="container">
        <div className="row text-center align-items-center">
          <div className="col-12 col-lg-auto mt-3 mt-lg-0">
            <ul className="list-inline list-inline-dots mb-0">
              <li className="list-inline-item">
                <a href="http://www.sci.rmutt.ac.th/comsci/">
                  สาขาวิทยาการคอมพิวเตอร์
                </a>{" "}
                <a href="http://www.sci.rmutt.ac.th/">
                  คณะวิทยาศาสตร์และเทคโนโลยี
                </a>{" "}
                <a href="https://www.rmutt.ac.th/">
                  มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี
                </a>
              </li>
              <li className="list-inline-item">
                <span>
                  v1.0.0
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
