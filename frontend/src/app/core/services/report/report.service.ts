import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IResponse, prepareAndDownloadFile, serializeResponse } from '../../helpers';
import { ByUserParam, ReportParam } from '../../../common/models/params';
import { OkTrueModel } from '../../../common/models/response';
import { ReportModel } from '../../../common/models/report';
import { generateQuery } from '../../../common/utils';


const REPORT_API = '/workplace/api/report/';

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(protected http: HttpClient) {
  }

  getReports(query: ByUserParam): Observable<IResponse<ReportModel>> {
    const params = generateQuery(query);

    return this.http
      .get<IResponse<ReportModel>>(`${REPORT_API}`, {params})
      .pipe(
        map(results => serializeResponse(ReportModel, results))
      );
  }

  generateReports(params: ReportParam): Observable<OkTrueModel> {
    return this.http
      .post<OkTrueModel>(`${REPORT_API}generate/`, params);
  }

  downloadReports(reportId: number): Observable<Blob> {
    return this.http
      .get(`${REPORT_API}${reportId}/download/`, {responseType: 'blob', observe: 'response'})
      .pipe(
        map(response => prepareAndDownloadFile(response, 'application/octet-stream'))
      );
  }
}
