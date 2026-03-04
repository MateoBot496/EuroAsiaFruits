import type { JSX } from "react";
import FormularioContacto from "../components/FormularioContacto";

// Datos de la empresa
const EMPRESA = {
  nombre: "EuroAsia Fruits",
  direccion: "Calle de Corullón, 28, 28947 Fuenlabrada, Madrid",
  telefono: "+34 910692998",
  email: "contacto@euroasiafruits.com",
  whatsapp: "https://wa.me/34600000000",
  instagram: "https://instagram.com/euroasiafruits",
  wechat: "https://weixin.qq.com",

  // Embed sin API key:
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6089.625320941658!2d-3.746872724007734!3d40.25769456530352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418aa81728f103%3A0xfd03577299bf51e4!2sEuro%20Asia%20Fruit!5e0!3m2!1ses!2ses!4v1772390825332!5m2!1ses!2ses",
};

export default function Contacto(): JSX.Element {
  return (
    <div className="contacto">
      {/* HERO */}
      <div className="contactoHero">
        <h1 className="contactoHero__title">Contáctanos</h1>
        <p className="contactoHero__subtitle">
          Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos.
        </p>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="contactoBody">
        {/* Columna izquierda: info + mapa */}
        <div className="contactoLeft">
          {/* Tarjeta de información */}
          <div className="contactoInfo">
            <h2 className="contactoInfo__heading">Información de contacto</h2>

            <div className="contactoInfo__item">
              <span className="contactoInfo__label">Dirección:</span>
              <span>{EMPRESA.direccion}</span>
            </div>

            <div className="contactoInfo__item">
              <span className="contactoInfo__label">Teléfono:</span>
              <a href={`tel:${EMPRESA.telefono}`} className="contactoInfo__link">
                {EMPRESA.telefono}
              </a>
            </div>

            <div className="contactoInfo__item">
              <span className="contactoInfo__label">Email:</span>
              <a href={`mailto:${EMPRESA.email}`} className="contactoInfo__link">
                {EMPRESA.email}
              </a>
            </div>

            {/* Redes sociales */}
            <div className="contactoInfo__socials">
              <a
                href={EMPRESA.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialBtn footer__socialBtn--whatsapp"
              >
                WhatsApp
              </a>
              <a
                href={EMPRESA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialBtn footer__socialBtn--instagram"
              >
                Instagram
              </a>
              <a
                href={EMPRESA.wechat}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__socialBtn footer__socialBtn--wechat"
              >
                WeChat
              </a>
            </div>
          </div>

          {/* Mapa Google Maps */}
          <div className="contactoMapa">
            <h2 className="contactoInfo__heading">Dónde estamos</h2>

            <div className="contactoMapa__wrapper">
              <iframe
                title="Ubicación EuroAsia Fruits"
                src={EMPRESA.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              className="contactoMapa__link"
              href="https://maps.app.goo.gl/3eTuTxwb1kbrGDWt9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Google Maps
            </a>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="contactoRight">
          <h2 className="contactoInfo__heading">Envíanos un mensaje</h2>
          <p className="contactoForm__desc">
            ¿Tienes una consulta, quieres hacer un pedido o simplemente quieres
            saber más? Rellena el formulario y te respondemos en menos de 24h.
          </p>

          {/* Formulario inline sin campos de producto */}
          <div className="contactoForm__inline">
            <FormularioContacto
              open={true}
              onClose={() => { }}
              productoNombre=""
              productoReferencia=""
              showProductoFields={false}
              showCloseButton={false}
              titulo="Formulario de contacto"
              cancelClearsForm={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}