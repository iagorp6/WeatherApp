package com.IagoRosa.WeatherApp;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WeatherController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/weather")
    public WeatherResponse getWeatherByCity(@RequestParam String city) {
        String geoUrl = String.format(
            "https://geocoding-api.open-meteo.com/v1/search?name=%s",
            city
        );
        GeocodingResponse geoData = restTemplate.getForObject(geoUrl, GeocodingResponse.class);

        if (geoData.getResults() == null || geoData.getResults().isEmpty()) {
            throw new RuntimeException("City not found: " + city);
        }
        double latitude = geoData.getResults().get(0).getLatitude();
        double longitude = geoData.getResults().get(0).getLongitude();

        String weatherUrl = String.format(
            "https://api.open-meteo.com/v1/forecast?latitude=%f&longitude=%f&current_weather=true",
            latitude, longitude
        );
        return restTemplate.getForObject(weatherUrl, WeatherResponse.class);
    }
}
