import * as request from 'request';
import ResponseSender from '../helpers/responseSender';
import {
  Response,
  Request
} from 'express';

export default class AccuWeather {

  private BASE_URL = 'https://dataservice.accuweather.com/';
  private LOCATION_URL = this.BASE_URL + 'locations/v1/';
  private FORECAST_URL = this.BASE_URL + 'forecasts/v1/';
  private CURRENT_CONDITIONS_URL = this.BASE_URL + 'currentconditions/v1/';
  private FETCH_REGION_REQUEST = this.LOCATION_URL + 'regions';
  private FETCH_FORECAST_DAY = this.FORECAST_URL + 'daily/1day/';
  private FETCH_COUNTRY_LIST = this.LOCATION_URL + 'countries/';
  private FETCH_TOP_COUNTRY_LIST = this.LOCATION_URL + 'topcities/50';
  private FETCH_CURRENT_CONDITIONS = this.CURRENT_CONDITIONS_URL;


  public routes(app): void {
    app.route('/fetch_regions')
      .post((req: Request, res: Response) => {
        this.fetchRegionList().subscribe((data) => {
          ResponseSender.send(res, 200, true, data);
        });
      });

    app.route('/fetch_forecast_of_day')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const cityName = body.cityName;
        const locationkey = body.locationKey;
        if (cityName && locationkey) {
          this.fetchForecastForDay(cityName, locationkey).subscribe((data) => {
            ResponseSender.send(res, 200, true, data);
          });
        } else {
          ResponseSender.send(res, 422, false, 'Missing required parameters - CityName or LocationKey');
        }
      });

    app.route('/fetch_countries')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const regionId = body.regionID;
        if (regionId) {
          this.fetchCountryList(regionId).subscribe((data) => {
            ResponseSender.send(res, 200, true, data);
          });
        }
        else {
          ResponseSender.send(res, 422, false, 'Missing required parameter - regionId');
        }

      });



    app.route('/fetch_top_cities')
      .post((req: Request, res: Response) => {
        this.fetchTopCities().subscribe(
          data => {
            ResponseSender.send(res, 200, true, data);
          });
      });

    app.route('/current_conditions')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const locationKey = body.locationKey;
        if (locationKey) {
          this.fetchCurrentConditions(locationKey).subscribe(data => {
            ResponseSender.send(res, 200, true, data);
          });
        } else {
          ResponseSender.send(res, 422, false, 'Missing required parameter - locationKey');
        }
      });
  }


  fetchRegionList() {
    return request.get(this.FETCH_REGION_REQUEST);
  }

  fetchForecastForDay(cityName: string, locationKey: string) {
    return request.get(this.FETCH_FORECAST_DAY + locationKey);
  }

  fetchCountryList(regionID: string) {
    return request.get(this.FETCH_COUNTRY_LIST + regionID);
  }

  fetchTopCities() {
    return request.get(this.FETCH_TOP_COUNTRY_LIST);
  }

  fetchCurrentConditions(locationKey: number) {
    return request.get(this.FETCH_CURRENT_CONDITIONS + locationKey);
  }

}