export interface Photo{
    id: string
    collect_id: string
    type: string
    filepath: string
    latitude: number
    longitude: number
    comment?: string
    timestamp: number
}