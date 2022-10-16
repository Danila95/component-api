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
const RequestServerApi = ({apiQuery: path, name_component, path_to_data_json}) => {
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
                console.log(response)
                // сюда должнен подаваться сгенерированный (из пропса path_to_data_json) путь до массива данных из response в json
                setResApi(response.data.quotes) // <- path_to_data_json
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