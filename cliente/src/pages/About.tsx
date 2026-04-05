import type { JSX } from "react";
import SedeCard from "../components/SedeCard";
import type { Sede } from "../interfaces/sedeInterface";

import spainFlag from "../assets/flags/spain.svg";
import netherlandsFlag from "../assets/flags/netherlands.svg";

function About(): JSX.Element {

    // Configuración de las sedes 
    const sedes: Sede[] = [
        {
            city: "Fuenlabrada",
            country: "España",
            flagSrc: spainFlag,
            description: "Nuestra sede principal logística en Madrid, enfocada en la distribución nacional.",
            addressLine1: "C. de Corullón, 28",
            addressLine2: "28947 Fuenlabrada, Madrid",
            phone: "910 69 29 98",
        },
        {
            city: "Poeldijk",
            country: "Países Bajos",
            flagSrc: netherlandsFlag,
            description: "Euro Asia Fruit Dutch B.V. Especialistas en el mercado mayorista de verduras y frutas en el hub logístico europeo.",
            addressLine1: "ABC Westland 246",
            addressLine2: "2685 DC Poeldijk, Países Bajos",
            phone: "Contacto Internacional",

        }
    ];

    const valores = [
        { title: "Calidad garantizada", desc: "Seleccionamos proveedores confiables y realizamos estrictos controles en cada etapa del proceso." },
        { title: "Transparencia y confianza", desc: "Construimos relaciones duraderas basadas en la honestidad y la comunicación clara." },
        { title: "Eficiencia logística", desc: "Optimizamos la cadena de suministro para asegurar tiempos de entrega rápidos." },
        { title: "Pasión cultural", desc: "Promovemos los sabores y tradiciones que hacen única la gastronomía asiática." }
    ];

    return (
        <div className="about">
            {/* 1. SECCIÓN HERO: SOBRE NOSOTROS */}
            <div className="about1" style={{ backgroundColor: 'rgba(37, 143, 150)', color: 'white' }}>
                <div className="w-full md:w-2/5 gap-5">
                    <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
                    <p className="text-lg mb-4 text-justify w-full md:w-4/5">
                        EURO ASIA nació con la misión de facilitar el acceso a productos asiáticos auténticos dentro del mercado europeo.
                        Lo que comenzó como un pequeño proyecto de importación se ha transformado en una empresa en constante crecimiento,
                        impulsada por la confianza de nuestros clientes y por un equipo dedicado que comparte la misma visión: llevar lo mejor de Asia a Europa.
                    </p>
                    <p className="text-lg mb-6 text-justify w-full md:w-4/5">
                        Gracias a nuestra red de colaboradores en China, Japón, Corea, Tailandia y Vietnam, introducimos productos tradicionales e innovadores que representan la riqueza culinaria asiática.
                    </p>
                </div>
                <img src="https://media.istockphoto.com/id/543212762/es/foto/tractor-en-el-campo-de-primavera-relaciones-sean.jpg?s=612x612&w=0&k=20&c=ua9ZJb046xHKUDsRW2okFfKYJyNd12RMXZ8vESdjUHc=" alt="Campo EuroAsia" />
            </div>

            {/* 2. SECCIÓN: MISIÓN Y VALORES */}
            <section className="bg-white py-16 px-8 border-y border-gray-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            Proporcionar a nuestros clientes productos auténticos y de alta calidad, fomentando el intercambio cultural y permitiendo que cada consumidor disfrute de una experiencia culinaria completa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valores.map((v, i) => (
                            <div key={i} className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-blue-900 mb-3 leading-tight">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SECCIÓN: SEDES */}
            <section className="py-16 px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nuestras Sedes</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {sedes.map((s, i) => (
                        <SedeCard key={i} sede={s} showMap={true} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default About;