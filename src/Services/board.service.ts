import { BoardItem } from "../Models/BoardItem"

export class BoardService {
    async getRoutes(): Promise<BoardItem[]> {
        let fetchData = await fetch('https://api-v3.mbta.com/routes', {
            method: 'GET',
        })
        return await fetchData.json().then(d => d.data)
    }

    async getStreamRoutes() {
        return fetch('', {
            headers: {
                'X-API-Key': "bd886faed40c4934b49599c2a9ebd958",
                'Accept': 'text/event-stream'
            }
        })
    }


    async getStopsForRoute(route: string) {
        let fetchData =  await fetch(`https://api-v3.mbta.com/stops?filter[route]=${route}`, {
            method: 'GET'
        })

        return await fetchData.json().then(d => d.data)
    }


    async getScheduleByRoute(routeId: string) {
        let fetchData =  await fetch(`https://api-v3.mbta.com/schedules?filter[route]=${routeId}`, {
            method: 'GET',
            headers: {
                'X-API-Key': "bd886faed40c4934b49599c2a9ebd958",
            }
        })

        return await fetchData.json().then(d => d.data)
    }
}