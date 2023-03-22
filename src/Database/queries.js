export default {
    getAllLocations : "SELECT * FROM Locations",
    createLocation : "INSERT INTO Locations (location_name, location_address, location_phone) VALUES (@location_name, @location_address, @location_phone)",
    getLocationById : "SELECT * FROM Locations WHERE id = @id",
    deleteLocation : "DELETE FROM Locations WHERE id = @id",
    updateLocation : "UPDATE Locations SET location_name = @location_name, location_address = @location_address, location_phone = @location_phone WHERE id = @id"
}   