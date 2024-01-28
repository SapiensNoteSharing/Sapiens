import countries from '$lib/data/countries';
import regions from '$lib/data/regions';
import provinces from '$lib/data/provinces';
import universities from '$lib/data/universities'
import { State, Region, Province, University } from '$lib/mongodb'

export async function loadDatabase(){
    try{
        const country = await State.insertMany(countries.map(country => ({_id: country.countryId, name: country.countryName})), {ordered: false})
        const regio = await Region.insertMany(regions.map(region => ({_id: region.code, name: region.name, state: 118})), {ordered: false})
        const province = await Province.insertMany(provinces.map(province => ({_id: province.provinceId, name: province.provinceName, region: province.regionId, state: 118})), {ordered: false})
        console.log('inserting')
        universities.forEach(async university => {
            console.log('inserting2')
            const region = await Region.findOne({name: university.region})
            const province = await Province.findOne({name: university.province})
            university.region = region?._id
            university.province = province?._id

            console.log('unviersity', university)

            await University.findOneAndUpdate({name: university.name, type: university.type}, university, {upsert: true, new: true})
        })
    }catch(err){
        console.log(err)
    }

}