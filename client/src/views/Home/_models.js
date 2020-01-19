//import content from '../../utils/api/content';
import { toast } from 'react-toastify';

export const home = {
  state: {},
  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        [payload.name]: payload.data
      };
    }
  },
  effects: (dispatch) => ({
    async getAllContent(formData) {
      try {
        // const data = await content.get('get/all', true, formData);
        // await dispatch.home.updateAllContent({ data, name: 'allContent' });
      } catch (error) {
        toast.error(error.message);
      }
    }
  })
};
