import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default function Weather() {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: 'c85dc7360bc1a3c4a9a3fb3dbdcf8cfa',
    lat: '55.706573',
    lon: '37.597091',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Elbrus bootcamp"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};
