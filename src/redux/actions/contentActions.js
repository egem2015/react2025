import apiClient from '../../components/http-common';// Yolunuza göre güncelleyin
import { SET_CONTENT } from '../types';

export const fetchContent = (pageName) => async (dispatch) => {
    try {
        // Backend'den içeriği çekecek API çağrısı, şimdi apiClient kullanılıyor

        console.log("pagename : "+pageName);
        const res = await apiClient.get(`/content/${pageName}`); // URL artık base URL'den sonra başlıyor

        console.log("res.data.content : "+res.data);

        dispatch({
            type: SET_CONTENT,
            payload: res.data // Backend'den gelen içerik
        });
    } catch (err) {
        console.error(err);
        // Hata yönetimi burada yapılabilir
        // Özellikle 401 hatasını yakalayıp kullanıcıyı çıkışa zorlayabilirsiniz
        if (err.response && err.response.status === 401) {
            // AuthService.logout() çağırabilir veya kullanıcıyı login sayfasına yönlendirebilirsiniz
        }
    }
};

// Eğer backend yoksa veya sadece frontendde test edecekseniz
export const setLocalContent = (content) => (dispatch) => {
    dispatch({
        type: SET_CONTENT,
        payload: content
    });
};