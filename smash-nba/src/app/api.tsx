"use client";
import axios from 'axios';
import router from 'next/router';
import { useState } from 'react';
import {setCookieAuth} from "./service_autentificacion/AuthController"; 


export const dataEquipos = async () => {
  try {
    const response = await axios.get('https://cyber-strikers-coachvach.vercel.app/rest/equipos');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const dataCartas = async () => {
  try {
    const response = await axios.get('https://cyber-strikers-coachvach.vercel.app/rest/cartaConJugadorConEquipo');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

  export const dataCartasPorEquipo = async (nombreEquipo:String|null) => {
    try {
      const response = await axios.get('https://cyber-strikers-coachvach.vercel.app/rest/cartasPorEquipoPorNombre/'+nombreEquipo);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  export const dataPorCategoria = async (categoria:String|null, page: number, tam_page: number) =>{
    try {
      const response = await axios.get('https://cyber-strikers-coachvach.vercel.app/rest/cartasPorCategoria/'+categoria+'?página='+page+'&tamaño_página='+tam_page);
      return response.data;    
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } 
  }

  export async function loginUser(formData:any){
    
    const response = await axios.get('https://cyber-strikers-coachvach.vercel.app/rest/equipos');
    console.log(response);
    axios.post('https://cyber-strikers-coachvach.vercel.app/rest/login',formData).then(response =>{
        if(response.data.error){
            console.log(response.data.error)
        }else{
            const token = response.data.data.token;
            localStorage.setItem("auth_token", token);
            const user = response.data.data.user;
            localStorage.setItem("user_id", user.id);
            const userName = user.name;
            setCookieAuth(userName);    
            router.back();
        }
    });
}