import React from 'react'
import cup from '../assets/img/champion.jpg'
const ImgChampion = () => {
    return (
    <>
        <div  className='cupImg'>
            <img
            className='cupChampion'
            src={cup}
            alt='the champion cup'
            />
        </div>
        </>
)
}

export default ImgChampion;