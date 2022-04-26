import { CarRepository } from "../../repositories";

const getCarsService = async () => {
        
        const cars = await new CarRepository().getCars();
        const onlyAvailableandActiveCars = []
        
        cars.map((car)=>{
            if(car.isActive && car.availableToRent) {
                onlyAvailableandActiveCars.push(car)
            }
        })
        
        const retrieveCars = []
        
        onlyAvailableandActiveCars.forEach(element => {
            const { plate, chassis, currentMileage, isActive, ...car } = element;    
            retrieveCars.push(car)
        });
        
        return retrieveCars

}

export default getCarsService

