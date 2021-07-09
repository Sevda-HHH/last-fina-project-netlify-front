import BackgrounSecond from '../../../assets/img/backgrounSecond.png'
interface IProps {
    pageName: string,
    des: string | undefined
}
export const PagesHeading: React.FC<IProps> = ({ pageName, des }) => {
    return (
        <div className="container-fluid" style={{ backgroundImage: ` url(${BackgrounSecond})`, height: '50vh' }} >
            <div className="row d-flex">
                <div className="content">
                    <div className="title text-center w-100">
                        <div className="titleChild"> {pageName}</div>
                    </div>
                    <div className="des text-center w-100">
                        {des}
                    </div>
                </div>
            </div>
        </div>

    )
}