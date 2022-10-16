import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLoader from '../components/MainLoader'

const SERVER_API = 'https://dummyjson.com'

/*
    функция RequestServerApi подтягивает данные по api, где
    path - относительный путь в url до нужных данных
    nameComponent - имя компонента, который нужно отрендерить на выходе. В пропсах этого компонентах
    подается подтянутые данные из api <*nameComponent* data={resApi}/>
    pathToDataJson - путь до массива данных в JSON
*/
const RequestServerApi = ({apiQuery: path, name_component, pointPath}) => {
    const [resApi, setResApi] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const apiQuery = `${SERVER_API}/${path}` // полный url путь до api
    const RenderComponent = name_component

    const api = async () => {
        try {
            setIsError(false)
            setIsLoading(true)
            const response = await axios.get(apiQuery)
            if (response.status === 200) {
                let result = response[pointPath.firstPoint.nameField]
                if (pointPath.firstPoint.index){
                    result = result[pointPath.firstPoint.index]
                }
                if (pointPath.secondPoint) {
                    result = result[pointPath.secondPoint.nameField]
                    if (pointPath.secondPoint.index) {
                        result = result[pointPath.secondPoint.index]
                    }
                }
                if (pointPath.thirdPoint) {
                    result = result[pointPath.thirdPoint.nameField]
                    if (pointPath.thirdPoint.index) {
                        result = result[pointPath.thirdPoint.index]
                    }
                }
                if (pointPath.fourthPoint) {
                    result = result[pointPath.fourthPoint.nameField]
                    if (pointPath.fourthPoint.index) {
                        result = result[pointPath.fourthPoint.index]
                    }
                }
                setResApi(result)
            } else {
                setIsError(true)
            }
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        api()
    },[])

    return (
        <>
            { isLoading ? 
                <MainLoader /> :
                    isError ? 
                        <h1 className='text-red-800'>Error!!!</h1> :
                        <RenderComponent data={resApi}/>
            } 
        </>
    );
};

export default RequestServerApi;