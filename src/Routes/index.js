import { Router } from "express";
import { getLocations, createLocation, getLocationById, deleteLocation, editLocation } from '../Controllers/locations.controller.js'

const router = Router();

router.get('/get-locations', getLocations )
router.get('/get-location/:id', getLocationById)
router.post('/create-location', createLocation)
router.delete('/delete-location/:id', deleteLocation )
router.put('/edit-location/:id', editLocation)

export default router;