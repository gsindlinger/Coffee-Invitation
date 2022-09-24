import { get, writable} from 'svelte/store'
import type {Writable} from 'svelte/store'


export interface Gif {
    url: string;
    description?: string
}


// url Async requesting function
function httpGetAsync(theUrl:string, callback: { (response: string): unknown; (arg0: string): unknown; })
{
    // create the request object
    const xmlHttp:XMLHttpRequest = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(response: string, list:Writable<Gif[]>)
{
    // Parse the JSON response
    const response_objects = JSON.parse(response);

    const top_10_gifs = response_objects["results"]
        .map((g: { media_formats: { gif: { url: unknown; }; }; content_description: unknown; }) => (
            {url: g.media_formats.gif.url, description: g.content_description }))

    list.set(top_10_gifs)

}


// function to call the trending and category endpoints
export function grab_data()
{
    // set the apikey and limit
    const apikey = "AIzaSyCdhXUEKofTMN5QbSaRlIRv9vUenNe7m-4";
    const clientkey = "CrushPage"

    // test search term
    let limit = 20;
    let search_term = "cat+please";

    // using default locale of en_US
    let search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
            apikey +"&client_key=" + clientkey +  "&limit=" + limit;

    httpGetAsync(search_url, (response) => tenorCallback_search(response, gif_list));

         // test search term
    limit = 8;
    search_term = "yess";

    // using default locale of en_US
    search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
            apikey +"&client_key=" + clientkey +  "&limit=" + limit;

    httpGetAsync(search_url, (response) => tenorCallback_search(response, gif_yes_list));

    console.log("test2")
    // data will be loaded by each call's callback
    return;
}

export const gif_list:Writable<Array<Gif>> = writable([])
export const gif_yes_list:Writable<Array<Gif>> = writable([])

export function randomGif(gif_l:Writable<Array<Gif>>) {
    const gif_list_temp = get(gif_l)
    if(gif_list_temp.length > 0) {
        return gif_list_temp[Math.floor(Math.random()*gif_list_temp.length)];
    }else{
        return ({
            url: 'cat-please.gif',
            description: 'PLEEEEASE'
        })
    }
}

