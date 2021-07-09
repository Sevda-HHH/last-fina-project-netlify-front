import React from 'react'
interface IProps {
    arr: number[],
    setCurrentPage: (a: number) => void
}
export const Paginationn: React.FC<IProps> = ({ arr, setCurrentPage }) => {
    return (
        <>
            <nav aria-label="Page navigation example row">
                <ul className="pagination col-lg-12 col-6 w-50">
                    {(arr.map((d: number) => {
                        return (<li key={d}
                            onClick={() => setCurrentPage(d)}
                            className="page-item" >
                            <button
                                className="mr-2 btn btn-primary text-purple text-dark  page-link" ><b>{d}</b></button>
                        </li>)
                    }))}
                </ul>
            </nav>
        </>
    )
}
