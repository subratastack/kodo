import { TestBed } from '@angular/core/testing';
import { SEARCH_SERVICE_DI_TOKEN } from '../di-token/search.service.token';

import { SearchService } from './search.service';

fdescribe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SEARCH_SERVICE_DI_TOKEN,
          useClass: SearchService
        }
      ]
    });
    service = TestBed.inject(SEARCH_SERVICE_DI_TOKEN);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should test for normal search with 2 matches', () => {
    service.collection([{ name: "Customer Assurance Liaison", image: "http://lorempixel.com/640/480", description: "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-05-19T12:33:25.545Z" }, { name: "Dynamic Infrastructure Designer", image: "http://lorempixel.com/640/480", description: "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.", dateLastEdited: "2017-11-28T04:59:13.759Z" }, { name: "Regional Configuration Designer", image: "http://lorempixel.com/640/480", description: "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.", dateLastEdited: "2018-07-27T21:33:53.485Z" }, { name: "Customer Assurance Hello", image: "http://lorempixel.com/640/480", description: "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-05-19T12:33:25.545Z" }]);
    service.searchProperties(['name', 'description']);
    service.searchTerm('customer assur');
    expect(service.search().length).toEqual(2);
  });
  it('Should test for normal search with 1 matches', () => {
    service.collection([{ name: "Customer Assurance Liaison", image: "http://lorempixel.com/640/480", description: "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-05-19T12:33:25.545Z" }, { name: "Dynamic Infrastructure Designer", image: "http://lorempixel.com/640/480", description: "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.", dateLastEdited: "2017-11-28T04:59:13.759Z" }, { name: "Regional Configuration Designer", image: "http://lorempixel.com/640/480", description: "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.", dateLastEdited: "2018-07-27T21:33:53.485Z" }]);
    service.searchProperties(['name', 'description']);
    service.searchTerm('customer assur');
    expect(service.search().length).toEqual(1);
  });
  it('Should test for exact search with 1 matches', () => {
    service.collection([{ name: "Customer Assurance Liaison", image: "http://lorempixel.com/640/480", description: "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-05-19T12:33:25.545Z" }, { name: "Dynamic Infrastructure Designer", image: "http://lorempixel.com/640/480", description: "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.", dateLastEdited: "2017-11-28T04:59:13.759Z" }, { name: "Regional Configuration Designer", image: "http://lorempixel.com/640/480", description: "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.", dateLastEdited: "2018-07-27T21:33:53.485Z" }]);
    service.searchProperties(['name', 'description']);
    service.searchTerm('"customer assurance"');
    expect(service.search().length).toEqual(1);
  });
});
