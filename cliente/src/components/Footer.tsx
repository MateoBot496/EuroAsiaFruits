import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Franja superior decorativa */}
      <div className="footer__topBar" />

      <div className="footer__inner">

        {/* Columna 1: Marca + info de empresa */}
        <div className="footer__col footer__col--brand">
          <img src={logo} alt="EuroAsia Fruits logo" className="footer__logo" />
          <p className="footer__companyName">EuroAsia Fruits Imp Exp, S.L.</p>
          <address className="footer__address">
            <span>📍  427 Calle de Corullón, 28, 28947 Fuenlabrada</span>
            <span>📞 <a href="tel:+34910692998" className="footer__link">+34 910692998</a></span>
            <span>📧 <a href="mailto:euroasia@euroasia.es" className="footer__link">proveedores@euroasiafruit.com</a></span>
          </address>
        </div>

        {/* Columna 2: Navegación */}
        <div className="footer__col">
          <h4 className="footer__heading">Empresa</h4>
          <nav className="footer__nav">
            <Link to="/about" className="footer__link">Sobre Nosotros</Link>
            <Link to="/contacto" className="footer__link">Contacto</Link>
          </nav>
        </div>

        {/* Columna 3: Categorías */}
        <div className="footer__col">
          <h4 className="footer__heading">Productos</h4>
          <nav className="footer__nav">
            <Link to="/productos?categoria=frutas-exoticas" className="footer__link">Frutas Exóticas</Link>
            <Link to="/productos?categoria=verduras" className="footer__link">Verduras</Link>
            <Link to="/productos?categoria=temporada" className="footer__link">De Temporada</Link>
          </nav>
        </div>

        {/* Columna 4: Redes sociales */}
        <div className="footer__col">
          <h4 className="footer__heading">Síguenos</h4>
          <div className="footer__socials">
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__socialBtn footer__socialBtn--whatsapp"
              aria-label="WhatsApp"
            >
              <WhatsappIcon />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/euroasiafruits"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__socialBtn footer__socialBtn--instagram"
              aria-label="Instagram"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://weixin.qq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__socialBtn footer__socialBtn--wechat"
              aria-label="WeChat"
            >
              <WechatIcon />
              WeChat
            </a>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} EuroAsia Fruits · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

/* ── Iconos SVG inline ── */

function WhatsappIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WechatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-3.99-6.348-8.601-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.49.49 0 01.176-.554 6.027 6.027 0 002.5-4.616c0-3.625-3.22-6.127-7.058-6.127zm-2.569 2.894c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}
