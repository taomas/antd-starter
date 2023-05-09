import { request, usePost, RabbitKit } from '@hocgin/hkit';
import { stringify } from 'query-string';

export default class {
  static getOne({ id, ...payload }: any) {
    let queryString = stringify(payload);
    return request(`/ums/user-group/${id}?${queryString}`, {
      method: 'GET',
    });
  }

  static paging(payload: any) {
    return request(`/ums/user-group/_paging`, {
      method: 'POST',
      data: { ...payload },
    });
  }

  static insert(payload: any) {
    return request(`/ums/user-group`, {
      method: 'POST',
      data: { ...payload },
    });
  }

  static update({ id, ...payload }: any) {
    return request(`/ums/user-group/${id}`, {
      method: 'PUT',
      data: { ...payload },
    });
  }

  static delete({ id, ...payload }: any) {
    let queryString = stringify(payload);
    return request(`/ums/user-group/${id}?${queryString}`, {
      method: 'DELETE',
    });
  }

  static complete(payload = {}) {
    return usePost(`/ums/user-group/_complete`, { data: { ...payload } })
      .then(RabbitKit.thenDataTryErrorIfExits)
      .then((data = []) =>
        data.map(({ typeName, encoding, id }: any) => ({
          key: encoding,
          value: id,
          description: typeName,
        })),
      );
  }
}
