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
  filterMap(map: any): any;
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

  public async filterMap(map: any) {
    const maps = await this.loader.load();
    const myLatLng = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
    const service = new window.google.maps.places.PlacesService(map);

    const request = {
      location: myLatLng,
      radius: 500,
      type: ["shoe_store"]
    };

    const icon = {
      url: "https://firebasestorage.googleapis.com/v0/b/superstar-brands.appspot.com/o/shoe.png?alt=media&token=f3f8444e-8e15-4cf7-ba0f-d07c7f1dfcba",
      scaledSize: new window.google.maps.Size(40, 40),
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          const place = results[i];
          
          // Filter out restaurants, parks, and grocery stores
          if (place.types.indexOf("restaurant") !== -1 || place.types.indexOf("park") !== -1 || place.types.indexOf("grocery_or_supermarket") !== -1) {
            continue;
          }

          console.log(place)

          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: icon,
          });
        }
      }
    });
  }


}