export interface ForecastIntf {
    DailyForecasts: DailyForecast[];
    Headline: HeadLineIntf,
    cityName: string;
    locationKey: string
}

interface HeadLineIntf {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
}

interface DailyForecast {
    Date: string;
    EpochDate: number;
    Temperature: TemperatureIntf;
    Day: DayNightIntf;
    Night: DayNightIntf;
    Sources: [];
    MobileLink: string;
    Link: string;
}

interface TemperatureIntf {
    Minimum: TemperatureValueIntf;
    Maximum: TemperatureValueIntf;
}
interface TemperatureValueIntf {
    Value: number;
    Unit: string;
    UnitType: number;
}
interface DayNightIntf {
    Icon: number;
    IconPhrase: string;
}
