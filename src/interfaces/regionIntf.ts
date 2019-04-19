export interface RegionIntf {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    location?: latLongIntf;
} 

interface latLongIntf {
    lat: number;
    lng: number;
}