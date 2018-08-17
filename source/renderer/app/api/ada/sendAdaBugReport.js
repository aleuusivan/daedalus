// @flow
import moment from 'moment';
import url from 'url';
import { request } from '../lib/reportRequest';
import environment from '../../../../common/environment';

export type SendAdaBugReportRequestParams = {
  requestFormData: {
    email: string,
    subject: string,
    problem: string,
    compressedLog: string,
  },
};

export const sendAdaBugReport = (
  { requestFormData }: SendAdaBugReportRequestParams
): Promise<{}> => {
  const { email, subject, problem, compressedLog } = requestFormData;
  const { version, os, API_VERSION, NETWORK, build, getInstallerVersion, REPORT_URL } = environment;
  const reportUrl = url.parse(REPORT_URL);

  return request({
    hostname: reportUrl.hostname,
    method: 'POST',
    path: '/report',
    port: reportUrl.port,
  }, {
    product: 'Cardano Wallet',
    frontendVersion: version,
    backendVersion: API_VERSION,
    network: NETWORK,
    build,
    installerVersion: getInstallerVersion(),
    os,
    compressedLog,
    date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    magic: 2000000000,
    type: {
      type: 'customreport',
      email,
      subject,
      problem,
    }
  });
};
