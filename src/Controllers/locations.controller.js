import { getConnection, sql } from "../Database/connection.js"
import queryDB from "../Database/queries.js"

export const getLocations = async (req, res) => {
    try {
        const pool = await getConnection()
        let result = await pool.request().query(queryDB.getAllLocations)
        result = result.recordset
        if(result){
            return res.status(200).send({ message: "Success!", result })
        } else {
            return res.status(404).send({ message: "Records were not found" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Something went wrong" })
    }   
}

export const createLocation = async ( req, res ) => {
    try {
        const { location_name, location_address, location_phone } = req.body
        const pool = await getConnection()

        if(!location_name || !location_address || !location_phone){
            return res.status(400).send({ message: "Missing params, please make sure youre entry all the necesary fields" })
        }

        const location_saved = await pool.request()
            .input("location_name", sql.VarChar, location_name)
            .input("location_address", sql.VarChar, location_address)
            .input("location_phone", sql.VarChar, location_phone)
            .query(queryDB.createLocation)
        
        if(location_saved){
            return res.status(200).send({ message: "Success! Location saved", location_saved })
        } else {
            return res.status(400).send({ message: "Something went wrong, please try again" })
        } 

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Something went wrong" })
    }
}

export const getLocationById = async (req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).send({ message: "Id is necesary for this action" })
        }

        const pool = await getConnection()
        let location = await pool.request()
                             .input('id', id)
                             .query(queryDB.getLocationById)

        location = location.recordset[0]                             
        if(location) {
            return res.status(200).send({ message: "Success!", location })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Something went wrong" })
    }
}

export const deleteLocation = async(req, res) => {
    try {
        const { id } = req.params
        if(!id) {
            return res.status(400).send({ message: "Id is necesary for this action" })
        }

        const pool = await getConnection()
        const result = await pool.request().input('id', id).query(queryDB.deleteLocation)

        if(result) {
            return res.status(200).send({ message: "Success! Location deleted" })
        } else {
            return res.status(400).send({ message: "Location can not be deleted" })
        }


    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Something went wrong" })
    }
}

export const editLocation = async (req, res) =>{
    try {
        const { id } = req.params
        const { location_name, location_address, location_phone } = req.body
        
        if(!id){
            return res.status(400).send({ message: "Id is necesary for this action" })
        } else if(!location_name || !location_address || !location_phone){
            return res.status(400).send({ message: "Missing params, please make sure youre entry all the necesary fields" })
        }

        const pool = await getConnection()
        const locationUpdated = await pool.request()
                                            .input('location_name', sql.VarChar, location_name)
                                            .input('location_address', sql.VarChar, location_address)
                                            .input('location_phone', sql.VarChar, location_phone)
                                            .input('id', sql.Int, id)
                                            .query(queryDB.updateLocation)

        if(locationUpdated){
            return res.status(200).send({ message: "Success!", locationUpdated })
        } else {
            return res.status(400).send({ message: "Location cannot be updated please try again" })
        }                                            

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Something went wrong" })
    }
} 