import { Dispatch } from "redux";
import { statisticsServices } from "../../services/statistics";

export function getAllCountriesSummary() {
    return async function (dispatch: Dispatch) {
        return statisticsServices.getTodaysSummary()
            .then(res =>
                dispatch({
                    type: "GET_STATISTICS_SUCCESS",
                    payload: res.data
                })
            )
            .catch(err => {
                dispatch({
                    type: "GET_STATISTICS_ERROR",
                    payload: err
                })
            })
    }
}