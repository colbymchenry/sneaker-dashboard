import { Loader } from '@googlemaps/js-api-loader';

declare global {
  interface Window {
    google: any;
  }
}

export interface IGoogleAPI {
  searchStores(address: string, city?: string): Promise<any[]>;
  getStoreDetails(placeId: string): Promise<any>;
  getStorePhotos(placeId: string): Promise<string[]>;
  renderMap(element: HTMLElement): any;
}

export class GoogleAPI {
  private readonly apiKey: string;
  private readonly loader: Loader;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.loader = new Loader({
      apiKey: this.apiKey,
      libraries: ['places']
    });
  }

  public async searchStores(address: string, city?: string): Promise<any[]> {
    await this.loader.load();
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: address,
      type: ['shoe_store', 'vintage_store', 'clothing_store', 'store']
    };

    if (city) {
      request.query += ` ${city}`;
    }

    return new Promise((resolve, reject) => {
      service.textSearch(request, (results: any[], status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  public async getStoreDetails(placeId: string): Promise<any> {
    const maps = await this.loader.load();
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'rating', 'opening_hours', 'photos']
        },
        (storeDetails: any, status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            resolve(storeDetails);
          } else {
            reject(status);
          }
        }
      );
    });
  }

  public async getStorePhotos(placeId: string): Promise<string[]> {
    const maps = await this.loader.load();
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['photos']
        },
        (storeDetails: any, status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const photoUrls = storeDetails.photos?.map((photo: any) => {
              return photo.getUrl();
            });
            resolve(photoUrls ?? []);
          } else {
            reject(status);
          }
        }
      );
    });
  }

  public async renderMap(element: HTMLElement) {
    const maps = await this.loader.load();
    const myLatLng = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
    return new window.google.maps.Map(element, {
      center: myLatLng,
      zoom: 12,
    });
  }


}