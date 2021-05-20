import { TestBed } from '@angular/core/testing';
import { SORTING_SERVICE_DEFAULT_SORTING_KEY, SORTING_SERVICE_DI_TOKEN } from '../di-token/sorting.service.token';

import { SortingService } from './sorting.service';

fdescribe('SortingService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SORTING_SERVICE_DEFAULT_SORTING_KEY,
          useValue: [
            {
              key: 'name',
              direction: 1
            },
            {
              key: 'dateLastEdited',
              direction: 1
            }
          ]
        },
        {
          provide: SORTING_SERVICE_DI_TOKEN,
          useClass: SortingService
        }
      ]
    });
    service = TestBed.inject(SORTING_SERVICE_DI_TOKEN);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort by default sorting keys', () => {
    service.collection([{ name: "Customer Assurance Liaison", image: "http://lorempixel.com/640/480", description: "Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-05-19T12:33:25.545Z" }, { name: "Regional Configuration Designer", image: "http://lorempixel.com/640/480", description: "Rerum voluptatibus deleniti. Et quo ea magnam quisquam aliquam sequi sed praesentium. Similique est maiores. Tempora sed ad dolores error deserunt possimus sed perferendis molestiae. Doloribus fuga velit ipsum voluptatem ut ducimus.", dateLastEdited: "2018-07-27T21:33:53.485Z" }, { name: "Customer Assurance Liaison", image: "http://lorempixel.com/640/480", description: " 2 Vel voluptatem id repudiandae aut omnis. Deleniti tempore aliquam quia magnam eos. Sunt saepe nisi delectus.", dateLastEdited: "2018-04-19T12:33:25.545Z" }, { name: "Dynamic Infrastructure Designer", image: "http://lorempixel.com/640/480", description: "Quaerat in rerum. Possimus reprehenderit provident ea voluptatem qui et enim. Ducimus ea soluta esse modi quia.", dateLastEdited: "2017-11-28T04:59:13.759Z" }]);
    const DATE_FROM_PAYLOAD: number = Date.parse(service.sort()[0]?.dateLastEdited);
    const DATE_TO_EXPECT: number = Date.parse('2018-04-19T12:33:25.545Z');
    expect(DATE_FROM_PAYLOAD).toEqual(DATE_TO_EXPECT);
  });
});
