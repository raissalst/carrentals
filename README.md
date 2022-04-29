<h1 align="center">🚙 <a href="#" alt="cookin">Car Rentals</a> 🚙</h1>

<h2>Contents</h2>

- [1. About 💻](#1-about-)
- [2. Application's links 🔗](#2-applications-links-)
- [3. General Functionalities ⚙️](#3-general-functionalities-️)
- [4. Technologies 🧰](#4-technologies-)
  - [4.1 Requisites ☑️](#41-requisites-️)
- [5. Developers' Team 🧑‍💻](#5-developers-team-)
- [6. Terms of Use 📜](#6-terms-of-use-)

<a name="about"></a>

## 1. About 💻

**_Car Rentals_** is an application that focuses on finding a car to rent from a range of car rental companies choices.

The registered companies can register its own fleet of cars and make them available for customers to rent. The registered customers can pick a car to rent, choosing by price, model, among others.

The administrators of the application are allowed to suspend companies or customers activities based on bad reviews or others, making it impossible for them to rent a car.

This API was developed in order to storage administrators, customers and companies with their fleets of cars to rent data and to allow registered customers and companies to rent cars.

All routes require Bearer token authentication (except register and login for customers and companies). Access token can be obtained in login successful response.

This API contains 3 routes and 19 endpoints. For more detailed information about the API and its endpoints, please consult API Documentation in Application links section.

🎓 Project developed as first Capstone of Q4 back end module of the Fullstack Developer Course of [Kenzie Academy Brasil](https://kenzie.com.br/v2/).

<a name="links"></a>

## 2. Application's links 🔗

- <a name="API documentation" href="https://carrental-capstone.herokuapp.com/api/docs/" target="_blank">API Documentation (Swagger)</a>
- <a name="API deploy in Heroku" href="https://carrental-capstone.herokuapp.com/" target="_blank">API Deploy in Heroku</a>

## 3. General Functionalities ⚙️

- [x] Once registered in Car Rentals app and signed in, administrators can:

  - [x] update their e-mail, name, password, phone number, CPF or address data;
  - [x] register new administrators;
  - [x] change customer's or company's status (available/unavailable for rent);
  - [x] get administrators', customers' and companies' private profile information;
  - [x] get a list of unavailable cars, deactivated by companies or that are already rented;
  - [x] get rentals' history information or get a specific rental information;

- [x] Once registered in Car Rentals app and signed in, companies can:

  - [x] update their e-mail, name, password, CNPJ, address data or phone number;
  - [x] register cars for rental;
  - [x] get a list of owned cars;
  - [x] update car's data, such as name, model, brand, year, color, doors, fuel type, plate, gear, chassis, current mileage, price per day of rental or rental availability.
  - [x] make a car unavailable to rent;
  - [x] filter its own cars for rental by rental availability;
  - [x] get rentals' history;
  - [x] get a customer or company public profile information;
  - [x] close rental of a car;

- [x] Once registered in Car Rentals app and signed in, customers can:

  - [x] update their e-mail, name, password, CPF or CNPJ, address data or phone number;
  - [x] retrieve a list of available cars for rental;
  - [x] filter available cars for rental by name, model, brand, year, color, doors, fuel type, gear or rental price per day;
  - [x] rent a car;
  - [x] get car rental history;
  - [x] get a company public profile information;

<a name="technologies"></a>

## 4. Technologies 🧰

- <a name="typescript" href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>
- <a name="nodejs" href="https://nodejs.org/en/" target="_blank">Node</a>
- <a name="expressjs" href="https://expressjs.com/" target="_blank">ExpressJS</a>
- <a name="typeorm" href="https://typeorm.io/" target="_blank">TypeORM</a>
- <a name="postgreSQL" href="https://www.postgresql.org/docs/" target="_blank">PostgreSQL</a>
- <a name="jestL" href="https://jestjs.io/" target="_blank">Jest</a>
- <a name="swagger" href="https://swagger.io/" target="_blank">Swagger API Specification</a>

<a name="requisites"></a>

### 4.1 Requisites ☑️

- PostgreSQL database;

<a name="teamdev"></a>

## 5. Developers' Team 🧑‍💻

<table>
  <tr>
    <td align="center"><a href="https://github.com/gustavolira8813" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/85327159?v=4" width="100px;" alt=""/><br /><sub><b>Gustavo Lira</b></sub></a><br /><a href="https://www.linkedin.com/in/gustavo-lira-ribeiro-gomes/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
    <td align="center"><a href="https://github.com/larissakoliveira" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/82476805?v=4" width="100px;" alt=""/><br /><sub><b>Larissa Oliveira</b></sub></a><br /><a href="https://www.linkedin.com/in/larissakoliveira/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
    <td align="center"><a href="https://github.com/raissalst" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/85745938?v=4" width="100px;" alt=""/><br /><sub><b>Raissa Toledo</b></sub></a><br /><a href="https://www.linkedin.com/in/raissalstoledo/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
    <td align="center"><a href="https://github.com/rbressanelli" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/79763201?s=96&v=4" alt="avatar" width="100px;" alt=""/><br /><sub><b>Roberto Bressanelli</b></sub></a><br /><a href="https://www.linkedin.com/in/robertobressanelli/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
    <td align="center"><a href="https://github.com/patezsidney" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/71736180?v=4" alt="avatar" width="100px;" alt=""/><br /><sub><b>Sidney Patez</b></sub></a><br /><a href="https://www.linkedin.com/in/sidney-patez/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>
     <td align="center"><a href="https://github.com/tuliogp2" title="GitHub"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/81243211?v=4" alt="avatar" width="100px;" alt=""/><br /><sub><b>Tulio Goulart</b></sub></a><br /><a href="https://www.linkedin.com/in/tulio-goulart-pereira/" title="Linkedin"><img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=flat-square&logo=linkedin&logoColor=white"></a></td>

  </tr>
</table>

<a name="terms"></a>

## 6. Terms of Use 📜

This is an Open Source project for educational and non-commercial purposes.

**License type**: <a name="gpl" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">GPL</a>
