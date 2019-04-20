import * as rp from "request-promise";
import ResponseSender from '../helpers/responseSender';
import {
  Response,
  Request
} from 'express';
import TokenGenerator from '../helpers/tokenGenerator';
import config from "../config/config";

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
        const authToken = req.headers['token'] as string;
        if (!authToken) {
          ResponseSender.send(res, 400, false, 'Authentication token is required.');
          return;
        }

        TokenGenerator.verify(authToken).then(() => {
          this.fetchRegionList().then((data) => {
            ResponseSender.send(res, 200, true, data);
          });

        }).catch(() => {
          ResponseSender.send(res, 401, false, 'Token expired, Session timed out.');
        });

      });

    app.route('/fetch_forecast_of_day')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const locationkey = body.locationKey;

        const authToken = req.headers['token'] as string;
        if (!authToken) {
          ResponseSender.send(res, 400, false, 'Authentication token is required.');
          return;
        }

        TokenGenerator.verify(authToken).then(() => {
          if (locationkey) {
            this.fetchForecastForDay(locationkey).then((data) => {
              ResponseSender.send(res, 200, true, data);
            });
          } else {
            ResponseSender.send(res, 422, false, 'Missing required parameters - CityName or LocationKey');
          }

        }).catch((error) => {
          console.log('error ' + error);
          ResponseSender.send(res, 401, false, 'Token expired, Session timed out.');
        });


      });

    app.route('/fetch_countries')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const regionId = body.regionID;

        const authToken = req.headers['token'] as string;
        if (!authToken) {
          ResponseSender.send(res, 400, false, 'Authentication token is required.');
          return;
        }

        TokenGenerator.verify(authToken).then(() => {
          if (regionId) {
            this.fetchCountryList(regionId).then((data) => {
              ResponseSender.send(res, 200, true, data);
            });
          }
          else {
            ResponseSender.send(res, 422, false, 'Missing required parameter - regionId');
          }

        }).catch(() => {
          ResponseSender.send(res, 401, false, 'Token expired, Session timed out.');
        });



      });



    app.route('/fetch_top_cities')
      .post((req: Request, res: Response) => {
        this.fetchTopCities().then(
          data => {
            const authToken = req.headers['token'] as string;
            if (!authToken) {
              ResponseSender.send(res, 400, false, 'Authentication token is required.');
              return;
            }

            TokenGenerator.verify(authToken).then(() => {
              ResponseSender.send(res, 200, true, data);

            }).catch(() => {
              ResponseSender.send(res, 401, false, 'Token expired, Session timed out.');
            });
          });
      });

    app.route('/current_conditions')
      .post((req: Request, res: Response) => {
        const body = req.body;
        const locationKey = body.locationKey;
        const authToken = req.headers['token'] as string;
        if (!authToken) {
          ResponseSender.send(res, 400, false, 'Authentication token is required.');
          return;
        }
        TokenGenerator.verify(authToken).then(() => {

          if (locationKey) {
            this.fetchCurrentConditions(locationKey).then(data => {
              ResponseSender.send(res, 200, true, data);
            });
          } else {
            ResponseSender.send(res, 422, false, 'Missing required parameter - locationKey');
          }

        }).catch(() => {
          ResponseSender.send(res, 401, false, 'Token expired, Session timed out.');
        });
      });
  }


  fetchRegionList() {
    return this.sendRequest(this.FETCH_REGION_REQUEST);
  }

  fetchForecastForDay(locationKey: string) {
    return this.sendRequest(this.FETCH_FORECAST_DAY + locationKey);
  }

  fetchCountryList(regionID: string) {
    return this.sendRequest(this.FETCH_COUNTRY_LIST + regionID);
  }

  fetchTopCities() {
    return this.sendRequest(this.FETCH_TOP_COUNTRY_LIST);
  }

  fetchCurrentConditions(locationKey: number) {
    return this.sendRequest(this.FETCH_CURRENT_CONDITIONS + locationKey);
  }


  sendRequest(url: string) {
    return rp({
      method: "GET",
      uri: url,
      json: true,
      resolveWithFullResponse: true,
      headers: {
        "Content-Type": "application/json"
      },
      qs: {
        apikey: config.accu_weather_api_key // -> uri + '?access_token=xxxxx%20xxxxx'
      }
    })
      .then(response => {
        if (response.statusCode == 200) {
          return response.body;
        }
        else {
          return null;
        }
      })
      .catch(function (err) {
        console.log("Error-> " + err);
        return { isAuthorized: false, channelName: null };
      });
  }
}