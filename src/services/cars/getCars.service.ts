import { CarRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

const getCarsService = async (req: any) => {
        
        const cars = await new CarRepository().getCars();

        // const { availableToRent, isActive }: any = req.params;       poderia hasParams
        const hasParams: any = req.params;
        const userLoggedType = req.userAuth.user.userType;
        const paramsKeys = Object.keys(hasParams)
        const output = []
        const onlyAvailableandActiveCars = []


        if (hasParams !== undefined) {

            if((hasParams.availableToRent || hasParams.isActive) && (userLoggedType === "admin")){ 
                
                for (const car in cars){
                    for (const key in paramsKeys){
                        if (car[`${key}`] === false){
                            output.push(car)
                        }
                    }
                }      
                return output          
            }
                       

        const paramsForCustomers = ["name", "model", "brand", "year", "color", "doors", "fuelType", "gear", "rentalPricePerDay"]
        
        const auxArrayCustomer = []

        for (const item in paramsKeys){
            if (item in paramsForCustomers){
                auxArrayCustomer.push(item)
            }else {
                throw new ErrorHandler(400, "Filter not available")
            }
        }

        if((auxArrayCustomer.length !== 0) && (userLoggedType === "cliente")){ 
            // const 
            for (const car in cars){
                
            }      
            return output   
            
        }
    }


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

