export default {
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const response = await services.api.request({
          url: `/api/v1/comments?search[parent]=${id}&limit=*&fields=items(*,author(profile(name)))`,
        });
        dispatch({ type: 'comments/load-success', payload: { data: response.data.result.items } });
      } catch (e) {
        dispatch({ type: 'comments/load-error', payload: { error: e.message } });
      }
    };
  },

  createNewComment: (data) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-start' });
      try {
        const response = await services.api.request({
          // url:`/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted)`;
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`,
          method: 'POST',
          body: JSON.stringify(data),
        });
        dispatch({ type: 'comments/create-success', payload: { data: response.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/create-error', payload: { error: e.message } });
      }
    };
  },
};
