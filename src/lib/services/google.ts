import { Loader } from '@googlemaps/js-api-loader';

declare global {
    interface Window {
        google: any;
    }
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


}