import { CarRepository } from "../../repositories";

const getCarsService = async () => {

    try {
        
        const cars = await new CarRepository().getCars();
        const onlyAvailableandActiveCars = []
        
        cars.map((car)=>{
            if(car.isActive && car.availableToRent) {
                onlyAvailableandActiveCars.push(car)
            }
        })
        
        const retrieveCars = []
        
        onlyAvailableandActiveCars.forEach(element => {
            const { plate, chassis, currentMileage, isActive, ...car } = element;;    
            retrieveCars.push(car)
        });
        
        return retrieveCars
    } catch (error) {
        return error
    }
}

export default getCarsService

