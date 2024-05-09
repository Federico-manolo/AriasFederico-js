"use client";
import React, { useEffect, useState } from 'react';
import { dataCartasPorEquipo } from '../../api';
import ItemListComponent from '@/app/Components/Cartas';
import { usePathname } from 'next/navigation';


export default  function TeamPage(){
  //Pathname es recomendado usarlo con "use client", para obtener parametros de la url:
  const pathname = usePathname();
  const pathParts = pathname.split('/'); // Split the pathname by '/'
  const teamName = pathParts[pathParts.length - 1]; // Get the last part of the path


  return (
    <div>
    <ItemListComponent apiCall={dataCartasPorEquipo} name={teamName} infiniteScroll={false}/>
    </div>
  );
};
