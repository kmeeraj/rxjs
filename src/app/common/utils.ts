import {Observable} from 'rxjs';


export function createObservable() {
  return Observable.create( observer => {
    fetch('api/courses')
      .then((response) => {
        return response.json();
      })
      .then( body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
