import Cookies from "js-cookie"
import { useRouter } from "next/router";
import React , { useState, useEffect } from "react";

export default function logout({date}) {
    const router = useRouter();


    const setDate = async()=>{
        const D = new Date();
        let d = D.getDate(); 
        // d = 16;
        console.log(date+"  "+d);
        if(d != date){
            console.log("confilct");
            Cookies.set("date",d,{expires:1/24});
            await fetch(`http://localhost:3000/api/deleteList`);
            console.log("deleted");
        }
    }
    useEffect(()=>{
        setDate();

    },[]);

    const handleLogout =  ()=>{
        Cookies.remove("user");
        router.replace('/login');
    }

    return (
        <>
            <button onClick={handleLogout}>logout</button>
        </>
    )
}


export function getServerSideProps({ req , res }){
    let  date = "";
  
    if(req.cookies.date  != undefined){
        date = req.cookies.date;
    }
    return { props : { date : date } };
}