
export interface ProductListData {
    /** Holds id */
    id: string,
    /** Holds size */
    size: number,
    /** Holds price */
    price: number,
    /** Holds face */
    face: string,
    /** Holds date */
    date: string
}

export interface QueryParams {
    /** Holds pageno */
    pageNo: number,
    /** Holds pageLimit */
    pageLimit: number,
    /** Holds sort */
    sort: string
}