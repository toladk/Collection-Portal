import { Component, Injectable, OnInit } from '@angular/core';
import { CalpayStudentService } from 'src/app/Services/CalpayServices/calpay-student.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable } from 'rxjs';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

declare let $: any;
declare let swal: any;
declare let toastr: any;

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http.get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, { params });
  }

  constructor(private http: HttpClient) {}
}


@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css']
})
export class ManageStudentsComponent implements OnInit {

  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 0;
  sortField = 'MatricNumber';
  sortOrder = 'asc';
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  public search = {
    student: '',
  };

  listOfData: any;
  visible = false;
  account = 'new';
  disabled = false;

  public deleteStudent = {
    Id: null,
    DeleteKey: ''
  }

  public form = {
    Id: '',
    Title: '',
    LastName: '',
    FirstName: '',
    OtherName: '',
    Address: '',
    PhoneNo: '',
    MatricNumber: '',
    Email: '',
    Description: '',
    CreatedBy: '',
    UpdatedBy: ''
  };
  index = 'First-content';
  index2 = 'First-content';
  current =  0;
  current2 =  0;
  errorFlag: any;
  errorMessage: any;
  Type: any;
  Title: any;
  Status: any;
  Detail: any;
  Instance: any;
  type: string;
  newresponse: string;
  actionBotton: string;
  visible2: boolean;
  tableCount: any;
  totalCount: any;
  profResponds: any;
  me: any;
  myEmail: any;
  roles: any;
  permissions: any[];
  role: any;
  constructor(
              private calStudents: CalpayStudentService,
              private ngxService: NgxUiLoaderService,
              private nzMessageService: NzMessageService,
              private notification: NzNotificationService,
              private modal: NzModalService,
              private Jarwis: JarwisService,
              private randomUserService: RandomUserService
  ) { }

  ngOnInit(): void {
    this.ngxService.startLoader('loader-02');
    // this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
    this.loadDataFromServer(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, []);
    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London`
    //   });
    // }
    const permissionArray = []
    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.roles = this.me.roles;
        this.role = this.roles.filter(rol => {
          return rol.applicationName === localStorage.app;
        });
        console.log(this.role[0]);
        console.log(this.role[0].applicationName);
        console.log(this.role[0].permissions);

        this.role[0].permissions.forEach(element => {
        if (element.applicationName === localStorage.app) {
          console.log(element.applicationName);
          permissionArray.push(element.name);
        }
      });
        console.log(permissionArray);
        this.permissions = permissionArray;
      }
    );
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | 'MatricNumber',
    sortOrder: string | 'asc',
    filter: Array<{ key: string; value: string[] }>
  ): void {
    if(pageIndex === 1 || pageIndex === 0){
      pageIndex = 0;
    }else{
      const minus: number = pageIndex - 1;
      pageIndex = minus * pageSize;
    }
    console.log('pageIndex' + ' ' + pageIndex);
    console.log('pageSize' + ' ' + pageSize);
    console.log('sortField' + ' ' + sortField);
    console.log('sortOrder' + ' ' + sortOrder);
    this.loading = true;
    this.calStudents.StudentDetail(pageIndex, pageSize, sortField, sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      this.total = CalStudents.tableCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

    },
    error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
    }
    );

    $('#item_search').on('keyup', function() {
      const value = $(this).val().toLowerCase();
      $('#item tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'MatricNumber';
    const sortOrder = (currentSort && currentSort.value) || 'asc';
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  onSearch(){
    const filter: any = this.search.student;
    this.calStudents.SearchStudent(this.pageIndex, this.pageSize, this.sortField, this.sortOrder, filter).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;

      this.total = CalStudents.totalCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

    },
    error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
    });

  }

  onSearchCouncle(){
    this.search.student = '';
    this.calStudents.StudentDetail(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(data => {
      this.loading = false;
      const CalStudents: any = data;
      console.log(CalStudents.tableCount);
      this.total = CalStudents.tableCount;
      this.listOfData  = CalStudents.data;
      this.tableCount  = CalStudents.tableCount;
      this.totalCount  = CalStudents.totalCount;
      this.ngxService.stopLoader('loader-02');

    },
    error => {
      this.ngxService.stopLoader('loader-02');
      this.loading = false;
    }
    );

  }

  swichAccount(val): void{
    if (val === 'new') {
      this.account = 'new';
    } else if (val === 'existing'){
      this.account = 'existing';
    }
  }

  back(): void {
    this.current = 0;
    this.changeContent();
    // this.data[0] = this.form;
  }

  next(): void {
    this.current += 1;
    this.changeContent();
    // this.data[0] = this.form;
  }

  again(): void{

    this.form.Title = '';
    this.form.LastName = '';
    this.form.FirstName = '';
    this.form.OtherName = '';
    this.form.Address = '';
    this.form.PhoneNo = '';
    this.form.MatricNumber = '';
    this.form.Email = '';
    this.form.Description = '';
    this.form.CreatedBy = '';
    this.form.UpdatedBy = '';
    this.errorFlag = '';
    this.errorMessage = '';
    this.Type = '';
    this.Title = '';
    this.Status = '';
    this.Detail = '';
    this.Instance = '';
    this.current = 0;
    this.changeContent();
    // this.showsDetails = false;
  }

  open(): void {
    this.again();
    this.actionBotton = 'create';
    this.visible = true;
  }

  openUpdate(id): void {
    this.again();
    this.actionBotton = 'update';
    this.ngxService.startLoader('loader-01');
    this.visible = true;
    this.calStudents.getStudentDetail​(id).subscribe(
      data => {
        const getStudentDetail: any = data;
        this.form.Id = id;
        this.form.Title = getStudentDetail.Title;
        this.form.LastName = getStudentDetail.LastName;
        this.form.FirstName = getStudentDetail.FirstName;
        this.form.OtherName = getStudentDetail.OtherName;
        this.form.Address = getStudentDetail.Address;
        this.form.PhoneNo = getStudentDetail.PhoneNo;
        this.form.MatricNumber = getStudentDetail.MatricNumber;
        this.form.Email = getStudentDetail.Email;
        this.form.Description = getStudentDetail.Description;
        this.form.CreatedBy = getStudentDetail.CreatedBy;
        this.ngxService.stopLoader('loader-01');
      },
      error => this.handleError(error)
    );
  }

  warning(Id): void {
    this.ngxService.startLoader('loader-01');
    this.deleteStudent.Id = Id;
    this.again();
    this.visible2 = true;
    this.actionBotton = 'delete';
    this.calStudents.getStudentDetail​(Id).subscribe(
      data => {
        const getStudentDetail: any = data;
        this.form.Id = Id;
        this.form.Title = getStudentDetail.Title;
        this.form.LastName = getStudentDetail.LastName;
        this.form.FirstName = getStudentDetail.FirstName;
        this.form.OtherName = getStudentDetail.OtherName;
        this.form.Address = getStudentDetail.Address;
        this.form.PhoneNo = getStudentDetail.PhoneNo;
        this.form.MatricNumber = getStudentDetail.MatricNumber;
        this.form.Email = getStudentDetail.Email;
        this.form.Description = getStudentDetail.Description;
        this.form.CreatedBy = getStudentDetail.CreatedBy;
        this.ngxService.stopLoader('loader-01');
      },
      error => this.handleError(error)
    );
  }
  ondelete(){
    this.disabled = true;
    this.calStudents.DeleteStudent(this.deleteStudent).subscribe(
          data => {

                this.disabled = false;
                this.ngxService.stopLoader('loader-01');
                this.newresponse  = data.response;
                this.ngOnInit();
                this.errorFlag  = data.errorFlag;
                this.errorMessage  = data.errorMessage;
                this.Type  = data.Type;
                this.Title = data.Title;
                this.Status = data.Status;
                this.Detail = data.Detail;
                this.Instance  = data.Instance;



                if (this.Status === 200) {
                  this.current2 = 1;
                  this.changeContent2();
                  this.type = 'success';
                  this.notification.create(
                    this.type,
                    'Operation Successful',
                    this.newresponse
                  );
                }else{
                  this.type = 'error';
                  this.notification.create(
                    this.type,
                    this.errorMessage,
                    this.newresponse
                  );
                }
          },
          error => {
            this.disabled = false;
            this.ngxService.stopLoader('loader-01');
            this.newresponse  = error.error.validationErrors;
            this.errorFlag  = error.error.errorFlag;
            this.errorMessage  = error.error.errorMessage;
            console.log(this.errorFlag);
            this.Type  = error.error.Type;
            this.Title = error.error.Title;
            this.Status = error.error.Status;
            this.Detail = error.error.Detail;
            this.Instance  = error.error.Instance;
            this.Detail  = error.error.response;

            if (this.errorFlag === true) {
              this.current = 1;
              this.changeContent2();
              this.type = 'error';
              this.notification.create(
                this.type,
                this.Title,
                this.Detail
              );
    }
          }
        );
  }

  close2(): void {
    this.visible2 = false;
  }

  close(): void {
    this.visible = false;
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'Fourth-content';
        break;
      }
      case 4: {
        this.index = 'fifth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  changeContent2(): void {
    switch (this.current2) {
      case 0: {
        this.index2 = 'First-content';
        break;
      }
      case 1: {
        this.index2 = 'Second-content';
        break;
      }
      default: {
        this.index2 = 'error';
      }
    }
  }

  onSubmit(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;
        this.form.CreatedBy = this.profResponds.email;
        console.log(this.form);
        this.calStudents.createStudent(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
    });
  }

  onUpdate(): void{
    this.disabled = true;
    this.ngxService.startLoader('loader-01');

    this.Jarwis.getMe().subscribe(
      data => {
        this.profResponds = data;
        this.me = this.profResponds;
        this.myEmail =  this.profResponds.email;
        this.form.UpdatedBy = this.profResponds.email;
        this.calStudents.UpdateStudent(this.form).subscribe(
          data => this.handleResponse(data),
          error => this.handleError(error)
        );
    });
  }

  handleResponse(data): void{
    this.disabled = false;
    this.ngxService.stopLoader('loader-01');

    this.newresponse  = data.response.Title + ' ' + data.response.FirstName + ' ' + data.response.LastName + ' | ' + data.response.MatricNumber;
    this.ngOnInit();
    this.errorFlag  = data.errorFlag;
    this.errorMessage  = data.errorMessage;
    this.Type  = data.Type;
    this.Title = data.Title;
    this.Status = data.Status;
    this.Detail = data.Detail;
    this.Instance  = data.Instance;

    if (this.Status === 200) {
      this.current += 1;
      this.changeContent();
      this.type = 'success';
      this.notification.create(
        this.type,
        this.errorMessage,
        'Operation Successful'
      );
    }else{
      this.type = 'error';
      this.notification.create(
        this.type,
        this.errorMessage,
        'Operation not Successful'
      );
    }

  }

  handleError(error): void{
    this.disabled = false;
    this.ngxService.stopLoader('loader-01');

    this.newresponse  = error.error.validationErrors;
    this.errorFlag  = error.error.errorFlag;
    this.errorMessage  = error.error.errorMessage;
    console.log(this.errorFlag);
    this.Type  = error.error.Type;
    this.Title = error.error.Title;
    this.Status = error.error.Status;
    this.Detail = error.error.Detail;
    this.Instance  = error.error.Instance;
    this.Detail  = error.error.response;

    if (this.errorFlag === true) {
      this.current += 1;
      this.changeContent();
      this.type = 'error';
      this.notification.create(
        this.type,
        this.Title,
        this.Detail
      );
    }

  }
}
