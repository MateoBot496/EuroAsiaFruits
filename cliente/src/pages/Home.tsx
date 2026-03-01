import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import tomate from "../assets/tomate2.jpg";
import fresa from "../assets/fresa1.jpg";
import homevideo from "../assets/homevideo.mp4";
import ProductoCard from "../components/ProductoCard";
import useProductosDestacados from "../hooks/useProductosDestacados";
import { Link } from "react-router-dom";



function Home(): JSX.Element {
  const { productos: productosDestacados, loading: loadingDestacados } =
    useProductosDestacados();

    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
      if (videoRef.current) {
        const newMuted = !muted;
        videoRef.current.muted = newMuted;
        setMuted(newMuted);
      }
    };

  useEffect(() => {
    // Garantiza que el vídeo arranca silenciado
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);
  // Protección mientras carga los productos
  if (loadingDestacados) {
    return <p className="text-center mt-10">Cargando productos...</p>;
  }
  return (
    <>
      <div className="home">

        {/* ── VIDEO HERO ───────────────────────────────────────────────── */}
        <div className="homeHero">

          {/* Vídeo de fondo */}
          <video
            ref={videoRef}
            className="homeHero__video"
            autoPlay
            muted
            loop
            playsInline
            poster={tomate}
          >
            <source src={homevideo} type="video/mp4" />
          </video>
          {/* Botón unmute — esquina inferior derecha del hero */}
          <button className="homeHero__muteBtn" onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"}>
          {muted ? "🔇" : "🔊"}
          </button>
          {/* Overlay oscuro para legibilidad del texto */}
          <div className="homeHero__overlay" />

          {/* Contenido sobre el vídeo */}
          <div className="homeHero__content">
            <h1 className="homeHero__title">Bienvenidos a EuroAsia Fruits</h1>
            <p className="homeHero__subtitle">
              Tu tienda de verduras y frutas exóticas en línea
            </p>
            <div className="homeHero__buttons">
              <Link to="/about">
                <button className="saberMasButton">Saber más</button>
              </Link>
              <button className="saberMasButton negro">Otro botón</button>
            </div>
          </div>

        </div>

        <div className="companyBrief justify-center items-center ">
          <div className="companyBriefContainer flex-col xl:flex-row ">
            <div className="flex justify-center items-center flex-col gap-4 ">
              <h2 className="font-bold text-2xl text-center">Sobre Nosotros</h2>
              <p className="text-center">
                Trabajamos para llevar productos frescos y de calidad a mercados
                internacionales, garantizando la satisfacción de nuestros
                clientes y el bienestar de nuestros productores.
              </p>
            </div>
            <img src={fresa} alt="imagen de fresa" className="w-100" />
          </div>

          <div className="companyBrief_cards w-[80%] ">
            <div className="companyBrief_card">
              <h3 className="font-bold text-xl">Calidad</h3>
              <p className="textoCard">
                Nos comprometemos a ofrecer solo los mejores productos,
                seleccionados cuidadosamente para garantizar su frescura y
                sabor.
              </p>
            </div>
            <div className="companyBrief_card">
              <h3 className="font-bold text-xl">Sostenibilidad</h3>
              <p className="textoCard">
                Apoyamos prácticas agrícolas sostenibles que protegen el medio
                ambiente y promueven el bienestar de las comunidades locales.
              </p>
            </div>
            <div className="companyBrief_card">
              <h3 className="font-bold text-xl">Compromiso</h3>
              <p className="textoCard">
                Nuestro equipo está dedicado a brindar un servicio excepcional,
                asegurando que cada experiencia de compra sea satisfactoria.
              </p>
            </div>
          </div>
        </div>

        <div className="homeFinal flex-col xl:flex-row gap-10 ">
          <div className="flex flex-col gap-10 justify-center items-center xl:!w-[80vh]">
            <h2 className="font-bold text-2xl text-center">
              ¿Quieres conocernos?
            </h2>
            <p>
              Trabajamos para llevar productos frescos y de calidad a mercados
              internacionales, garantizando la satisfacción de nuestros clientes
              y el bienestar de nuestros productores.
            </p>
            <button className="saberMasButton rosa !w-60 xl:!w-80">
              {" "}
              Saber más
            </button>
          </div>
          <div className="flex flex-col gap-5 justify-center items-center xl:!w-[80vh]">
            <h2 className="font-bold text-2xl text-center">
              Nuestros productos
            </h2>
            <p>
              Trabajamos para llevar productos frescos y de calidad a mercados
              internacionales, garantizando la satisfacción de nuestros clientes
              y el bienestar de nuestros productores.
            </p>
            
            <div className="flex gap-5 flex-col xl:flex-row justify-center items-center">
              {productosDestacados.slice(0, 2).map((producto, index) => (
              <Link
                to={`/producto/${producto.id_producto}`}
                key={producto.id_producto}
                className="destacadosCard__wrapper block"
    >
              <div className="destacadosCard__badge">✦ Destacado</div>
              <ProductoCard key={index} producto={producto} simple />
              </Link>
))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
