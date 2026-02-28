import type { JSX } from "react";
import { useState } from "react";
import FormularioContacto from "../components/FormularioContacto";

// ─── Datos de la empresa ────────────────────────────────────────────────────
// TODO: reemplaza con los datos reales del cliente
const EMPRESA = {
  nombre: "EuroAsia Fruits",
  direccion: " 427 Calle de Corullón, 28  <br> 28947 Fuenlabrada <br> España",
  telefono: "+34 910692998",
  email: "contacto@euroasiafruits.com",
  whatsapp: "https://wa.me/34600000000",
  instagram: "https://instagram.com/euroasiafruits",
  wechat: "https://weixin.qq.com",
  // TODO: reemplaza con tu API Key de Google Maps y las coordenadas reales
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed/v1/place?key=TU_API_KEY_AQUI&q=Madrid,España&zoom=15",
};

export default function Contacto(): JSX.Element {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="contacto">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="contactoHero">
        <h1 className="contactoHero__title">Contáctanos</h1>
        <p className="contactoHero__subtitle">
          Estamos aquí para ayudarte. Escríbenos, llámanos o visítanos.
        </p>
      </div>

      {/* ── CUERPO PRINCIPAL ────────────────────────────────────────────── */}
      <div className="contactoBody">

        {/* Columna izquierda: info + mapa */}
        <div className="contactoLeft">

          {/* Tarjeta de información */}
          <div className="contactoInfo">
            <h2 className="contactoInfo__heading">Información de contacto</h2>

            <div className="contactoInfo__item">
              <span className="contactoInfo__icon">📍</span>
              <span>{EMPRESA.direccion}</span>
            </div>

            <div className="contactoInfo__item">
              <span className="contactoInfo__icon">📞</span>
              <a href={`tel:${EMPRESA.telefono}`} className="contactoInfo__link">
                {EMPRESA.telefono}
              </a>
            </div>

            <div className="contactoInfo__item">
              <span className="contactoInfo__icon">✉️</span>
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
            {/*
              TODO: sustituye el src por tu URL real con API Key:
              https://www.google.com/maps/embed/v1/place?key=TU_KEY&q=TU_DIRECCION&zoom=15
            */}
            <div className="contactoMapa__wrapper">
              <iframe
                title="Ubicación EuroAsia Fruits"
                src={EMPRESA.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="contactoMapa__note">
              ⚠️ Requiere una <strong>Google Maps Embed API Key</strong> válida.
              Actualiza <code>EMPRESA.googleMapsEmbedUrl</code> en este archivo.
            </p>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="contactoRight">
          <h2 className="contactoInfo__heading">Envíanos un mensaje</h2>
          <p className="contactoForm__desc">
            ¿Tienes una consulta, quieres hacer un pedido o simplemente quieres
            saber más? Rellena el formulario y te respondemos en menos de 24h.
          </p>

          {/* 
            Reutilizamos FormularioContacto en modo "inline" (open=true, onClose no-op).
            showProductoFields=false porque aquí no hay producto seleccionado.
          */}
          <div className="contactoForm__inline">
           <FormularioContacto
  open={true}
  onClose={() => {}}
  productoNombre=""
  productoReferencia=""
  showProductoFields={false}
  showCloseButton={false}        // 1. sin botón cerrar
  titulo="Formulario de contacto" // 2. título cambiado
  cancelClearsForm={true}        // 3. "Borrar" que limpia el form
/>
          </div>
        </div>

      </div>
    </div>
  );
}
