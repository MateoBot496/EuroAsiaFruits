import type { JSX } from "react";
import tomate from '../assets/tomate2.jpg'

function Home(): JSX.Element {
    return (
        <>
            <div className="home">
                    
                <div style={{ backgroundImage: `url(${tomate})` }} className="homeHero relative ">

                    <div className=" w-[50%] absolute left-0 h-[50vh] flex flex-col justify-center text-center ">
                        <h1 className="homeHero__title">Bienvenidos a EuroAsia Fruits</h1>
                        <p className="homeHero__subtitle">Tu tienda de frutas exóticas en línea</p>
                    </div>
                    
                    <div className="w-full h-[20vh] flex justify-center items-center gap-10 absolute bottom-0">
                        
                        <button className="saberMasButton">Saber mas</button>
                        <button className="saberMasButton negro">Otro boton</button>
                    </div>
                </div>
                    
            </div>
        </>
    )

}
export default Home;