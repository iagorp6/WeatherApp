package com.IagoRosa.WeatherApp;

public class WeatherResponse {
    private CurrentWeather current_weather;

    public CurrentWeather getCurrent_weather() { return current_weather; }
    public void setCurrent_weather(CurrentWeather current_weather) { this.current_weather = current_weather; }

    public static class CurrentWeather {
        private double temperature;
        private double windspeed;
        private String time;

        public double getTemperature() { return temperature; }
        public void setTemperature(double temperature) { this.temperature = temperature; }

        public double getWindspeed() { return windspeed; }
        public void setWindspeed(double windspeed) { this.windspeed = windspeed; }

        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
    }
}
