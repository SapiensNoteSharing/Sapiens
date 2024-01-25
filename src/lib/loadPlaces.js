import countries from '$lib/places/countries';
import regions from '$lib/places/regions';
import provinces from '$lib/places/provinces';
import { State, Region, Province } from '$lib/mongodb'

export async function storePlaces(){
    try{
        const country = await State.insertMany(countries.map(country => ({_id: country.countryId, name: country.countryName})), {ordered: false})
        const regio = await Region.insertMany(regions.map(region => ({_id: region.code, name: region.name, state: 118})), {ordered: false})
        const province = await Province.insertMany(provinces.map(province => ({_id: province.provinceId, name: province.provinceName, region: province.regionId, state: 118})), {ordered: false})
    }catch(err){
        console.log(err)
    }

}