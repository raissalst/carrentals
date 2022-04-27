import { CarRepository } from "../../repositories";
import { ErrorHandler } from "../../utils";

const getCarsService = async (req: any) => {
        
        const cars = await new CarRepository().getCars();
        const hasParams: any = req.params;
        const userLoggedType = req.userAuth.user.userType;
        const paramsKeys = Object.keys(hasParams)
        const output = []
        const onlyAvailableAndActiveCars = []
        
        //deixar eles em cima p ja tratar como deve sair sem plate, chassis, .. mas gasta mais memoria, processamento

        cars.map((car)=>{
            if(car.isActive && car.availableToRent) {
                onlyAvailableAndActiveCars.push(car)
            }
        })

        const retrieveCars = []
        
        onlyAvailableAndActiveCars.forEach(element => {
            const { plate, chassis, currentMileage, isActive, ...car } = element;    
            retrieveCars.push(car)
        });

        if (hasParams !== undefined) {

            // tem que ser igual false 
            if((!hasParams.availableToRent || !hasParams.isActive) && (userLoggedType === "admin")){ 
                
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

        const paramsSent = Object.entries(req.params)

        if((auxArrayCustomer.length !== 0) && (userLoggedType === "cliente")){ 
            
            // for (const car in retrieveCars){
            //     for (const keyParam in auxArrayCustomer){
            //         for (const valueParam in ){

            //             if(car[keyParam] === valueParam ){

            //             }
            //         }
            //      //includes
            //     }
            // }      

            return output   
        }
    }        
        
        return retrieveCars

}

export default getCarsService
