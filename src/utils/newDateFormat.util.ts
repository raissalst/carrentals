const newDateFormat = (stringDate: string) => {
  //recebo 'dd/mm/yyyy' que veio do validate do yup
  const newArray = stringDate.split('/');
  //['dd', 'mm', 'yyyy']

  //vai retornar no formato 'YYYY-MM-DDT03:00:00.000Z' aceito pelo banco
  return new Date(`${newArray[1]}/${newArray[0]}/${newArray[2]}`).toISOString();
};

export default newDateFormat;
