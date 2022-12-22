import { keys } from './config';
import { store } from '../../app/store';
import { cacheSearch, cacheRecipe } from '../../features/apiCalls/cachedSearchSlice';


const key = keys.spoonKey;

const endpoints = {
    searchRecipes: "https://api.spoonacular.com/recipes/complexSearch",
    getRecipeInformation: "https://api.spoonacular.com/recipes/"
}

const listToString = (list, string) => {
    if (list.length === 0) return "";
    return `&${string}=${list.toString()}`;
}

export const searchRecipes = async (obj) => {
    const searchUrl = `${endpoints.searchRecipes}?apiKey=${key}&query=${obj.query}`;
    const dietUrl = listToString(obj.diet, 'diet');
    const intolerancesUrl = listToString(obj.intolerances, 'intolerances');
    const timeUrl = obj.maxReadyTime ? `&maxReadyTime=${obj.maxReadyTime}` : '';
    const advancedSearchUrl = `${searchUrl}${dietUrl}${intolerancesUrl}${timeUrl}`;
    try {
        const response = await fetch(advancedSearchUrl);
        if (response.ok) {
            const result = await response.json();
            const toCache = {searchParams: obj, result: result}
            store.dispatch(cacheSearch(toCache));
            return;
        }
        throw new Error(response.statusText);
        } catch (error) {
        console.log(error);
    } 
}

export const getRecipeInformation = async (id) => {
    const getInfoUrl = `${endpoints.getRecipeInformation}${id}/information?apiKey=${key}&includeNutrition=false`;
    try {
        console.log('fetching')
        const response = await fetch(getInfoUrl);
        if (response.ok) {
            console.log('response okay');
            console.log('awaiting json response');
            const result = await response.json();
            console.log('json received: ', result, 'dispatching to store');
            store.dispatch(cacheRecipe(result));
            console.log('returning from api function');
            return true;
        }
        throw new Error(response.statusText);
    } catch (error) {
        console.log(error);
        return false;
    }
    
}