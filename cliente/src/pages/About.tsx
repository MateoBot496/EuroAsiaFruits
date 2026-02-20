import type { JSX } from "react";

function About(): JSX.Element {
    return (
        <>
        <div className="about">
            
            <div className="about1">
                <div className="w-2/5   gap-5">
                    <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
                    <p className="text-lg mb-4 text-justify w-4/5">
                        En EuroAsia Fruits, nos apasiona ofrecer frutas frescas y de alta calidad a nuestros clientes.
                        Nos enorgullece ser un puente entre los productores de frutas y los consumidores, brindando acceso a una amplia variedad de frutas exóticas y locales. 
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Contactar</button>

                </div>
                <img src="https://media.istockphoto.com/id/543212762/es/foto/tractor-en-el-campo-de-primavera-relaciones-sean.jpg?s=612x612&w=0&k=20&c=ua9ZJb046xHKUDsRW2okFfKYJyNd12RMXZ8vESdjUHc=" alt="" />
                
            </div>
            <div className="about2">
                    <h1>
                        Nuestra Misión
                    </h1>
                    <p className="text-lg mb-4 text-justify w-4/5">
                        Nuestra misión es proporcionar a nuestros clientes frutas frescas y de alta calidad, cultivadas de manera sostenible. 
                        Nos esforzamos por ser un puente entre los productores de frutas y los consumidores, brindando acceso a una amplia variedad de frutas exóticas y locales. 
                        Estamos comprometidos con la satisfacción del cliente y la promoción de prácticas agrícolas responsables.
                    </p>
            </div>
            <div className="about3">
                    <h1>
                        Contactanos
                    </h1>

                    <p className="text-lg mb-4 text-justify w-4/5">
                        Si tienes alguna pregunta, comentario o simplemente quieres ponerte en contacto con nosotros, no dudes en enviarnos un mensaje.
                        Puedes hacerlo a través de nuestro formulario de contacto en línea, enviándonos un correo electrónico a 
                        <a href="mailto:contacto@euroasiafruits.com" className="text-blue-500 hover:underline">contacto@euroasiafruits.com</a>
                        o llamándonos al <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a>.
                    </p>
            </div>
            
        </div>
        </>
    )

}
export default About;   