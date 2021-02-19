import React from 'react';


const Banner = () => {
    return (
        <div className="banner d-flex align-items-center flex-column justify-content-center">
            <div className="container">
            <h1 className="w-100 display-2 d-none d-md-block"> <span className="">ENTREPRISE  GÉNÉRALE</span> <br/> DU <br /><span className="text-danger">BÂTIMENT</span> </h1>
            <h1 className="w-100 display-4 mb-5 d-md-none"> <span className="">ENTREPRISE  GÉNÉRALE</span> <br/> DU <br /><span className="text-danger">BÂTIMENT</span> </h1>
            <h2 className="w-100 d-none d-md-block mt-4">CHARPENTE,  COUVERTURE, ISOLATION,  PEINTURE , MAÇONNERIE, CARRELAGE</h2>
            <h4 className="w-100 d-md-none">CHARPENTE,  COUVERTURE, ISOLATION,  PEINTURE , MAÇONNERIE, CARRELAGE</h4>
            </div>
        </div>
    )
}
export default Banner;