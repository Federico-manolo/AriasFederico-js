"use client";
import React from 'react';
import Cartas from '../../Components/Cartas';
import { dataPorCategoria } from '../../api';
import { usePathname } from 'next/navigation';

export default function cartas(){
  //Pathname es recomendado usarlo con "use client", para obtener parametros de la url:
  const pathname = usePathname();
  const pathParts = pathname.split('/'); // Split the pathname by '/'
  const categoria = pathParts[pathParts.length - 1]; // Get the last part of the path

  return (
    <div>
      <Cartas apiCall={dataPorCategoria} name ={categoria} infiniteScroll={true}/>
    </div>
  );
}