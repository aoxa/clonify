import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { useStateValue } from "../../context/StateProvider";
import { getAllUsers } from "../../api";
import { actionType } from '../../context/reducer'

const Users = () => {
    const [{allUsers}, dispatch] = useStateValue();
    
    useEffect( ()=> {
        if(!allUsers) {
            const response = getAllUsers(window.sessionStorage.getItem('token'))
            response.then( (data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                })
            })
        }
    })
    
    return (
        <>
        { allUsers && (
            allUsers?.map( (item, index) => (
                    <Card data={item} index={index} key={index}></Card>
                )
            )
        )}
        </>
    );
}

export const Card = ({ data, index }) => {
    return (
        <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay
            cursor-pointer hover:bg-card hover:shadow-md">
            <div className="w-275 flex items-center justify-center">
                <img referrerPolicy="no-referrer" src={data.imageUrl} alt="" className="w-10 h-10 object-cover rounded-md min-w-30 shadow-md" />
            </div>
            <p className="text-base text-textColor w-275 text-center">{data.name}</p>
            <p className="text-base text-textColor w-275 text-center">{data.email}</p>
            <p className="text-base text-textColor w-275 text-center">{data.email_verified ? "True" : "False "}</p>
            <p className="text-base text-textColor w-275 text-center">{data.createdAt}</p>
            <p className="text-base text-textColor w-275 text-center">{data.role}</p>
        </motion.div>
    );
}

export default Users;