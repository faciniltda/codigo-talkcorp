import api from "../../services/api";

const usePayment = () => {

    const createPayment = async (params) => {
        const { data } = await api.request({
            url: `/gateway/createPayment`,
            method: 'POST',
            params
        });
        return data;
    }

    return {
        createPayment
    }
}

export default usePayment;