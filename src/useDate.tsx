export const useDate = (date: string | undefined): string => {
    if (!date) {
      return "Data não informada"
    }

    const extractDate = () => {
    const monthList = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const day = date.slice(8, 10);
    const month = monthList[+date.slice(5, 7)];
    const year = date.slice(0, 4);
    const dateData = {
      day: day,
      month: month,
      year: year,
    };
    return dateData;
  };

  const extractedDate = extractDate();

  return `${extractedDate.day} de ${extractedDate.month}, ${extractedDate.year}`
}